import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Missing authorization header", { status: 401, headers: corsHeaders });
    }
    const token = authHeader.replace("Bearer ", "");

    const { action, targetId, isAdding } = await req.json();

    if (!action || !targetId || isAdding === undefined) {
      return new Response("Missing required fields", { status: 400, headers: corsHeaders });
    }
    
    // Validate Action
    if (action !== "like" && action !== "save" && action !== "follow") {
        return new Response("Invalid action", { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error("Auth getUser error:", userError);
      return new Response(JSON.stringify({ error: "Invalid token", details: userError }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const userId = user.id;
    let table = "";
    let notifType = "";
    let matchQuery = {};
    let insertQuery = {};
    let targetOwnerId = "";
    let channelName = "";

    if (action === "follow") {
        table = "user_follows";
        notifType = "follow";
        matchQuery = { follower_id: userId, following_id: targetId };
        insertQuery = { follower_id: userId, following_id: targetId };
        targetOwnerId = targetId; // targetId is the user being followed
        channelName = `user_follows_${targetId}`;
    } else {
        table = action === "like" ? "note_likes" : "saved_notes";
        notifType = action === "like" ? "like" : "save";
        matchQuery = { user_id: userId, note_id: targetId };
        insertQuery = { user_id: userId, note_id: targetId };
        channelName = `${table}_${targetId}`;
        
        // Lookup the note author for notifications
        const { data: note } = await supabase.from("notes").select("author_id").eq("id", targetId).single();
        if (note) targetOwnerId = note.author_id;
    }

    // Standard toggle operation
    if (isAdding) {
        // First check if it exists so we don't spam duplicate errors or notifications
        const { count } = await supabase.from(table).select("*", { count: 'exact', head: true }).match(matchQuery);
        
        if (count === 0) {
            const { error: insertError } = await supabase.from(table).insert(insertQuery);
            if (insertError) throw insertError;
            
            // Get absolute count to prevent client race conditions
            const countCol = table === 'user_follows' ? 'following_id' : 'note_id';
            const { count: absoluteCount } = await supabase.from(table).select("*", { count: 'exact', head: true }).eq(countCol, targetId);

            // Broadcast successful insertion to Realtime channels
            const channel = supabase.channel(channelName);
            channel.subscribe((status: string) => {
                if (status === 'SUBSCRIBED') {
                    channel.send({
                        type: 'broadcast',
                        event: 'interaction_update',
                        payload: { eventType: 'INSERT', newCount: absoluteCount, ...insertQuery }
                    });
                }
            });
            
            // Check target owner to see if notification is warranted
            if (targetOwnerId && targetOwnerId !== userId) {
                // Determine if a notification of this exact type/note/actor combination already exists today to prevent spam
                const oneDayAgo = new Date();
                oneDayAgo.setDate(oneDayAgo.getDate() - 1);
                
                let notifMatchQuery = supabase
                    .from("notifications")
                    .select("id")
                    .eq("user_id", targetOwnerId)
                    .eq("actor_id", userId)
                    .eq("type", notifType)
                    .gte("created_at", oneDayAgo.toISOString());

                if (action !== "follow") {
                    notifMatchQuery = notifMatchQuery.eq("note_id", targetId);
                }
                
                const { data: recentNotifs } = await notifMatchQuery.limit(1);

                // Only create notification if they haven't spammed likes/saves/follows today
                if (!recentNotifs || recentNotifs.length === 0) {
                    const notifPayload: any = {
                        user_id: targetOwnerId,
                        actor_id: userId,
                        type: notifType,
                    };
                    if (action !== "follow") notifPayload.note_id = targetId;
                    
                    await supabase.from("notifications").insert(notifPayload);
                }
            }
        }
    } else {
        // Remove Action
        const { error: deleteError } = await supabase.from(table).delete().match(matchQuery);
        if (deleteError) throw deleteError;
        
        // Get absolute count to prevent client race conditions
        const countCol = table === 'user_follows' ? 'following_id' : 'note_id';
        const { count: absoluteCount } = await supabase.from(table).select("*", { count: 'exact', head: true }).eq(countCol, targetId);

        // Broadcast successful deletion to Realtime channels
        const channel = supabase.channel(channelName);
        channel.subscribe((status: string) => {
            if (status === 'SUBSCRIBED') {
                channel.send({
                    type: 'broadcast',
                    event: 'interaction_update',
                    payload: { eventType: 'DELETE', newCount: absoluteCount, ...matchQuery }
                });
            }
        });
        
        // Cleanup associated notification (only look for relatively recent ones related to this action)
        if (targetOwnerId && targetOwnerId !== userId) {
            let notifDeleteQuery = supabase
                .from("notifications")
                .select("id")
                .eq("user_id", targetOwnerId)
                .eq("actor_id", userId)
                .eq("type", notifType)
                .order("created_at", { ascending: false });

            if (action !== "follow") {
                notifDeleteQuery = notifDeleteQuery.eq("note_id", targetId);
            }
                
            const { data: notifsToDelete } = await notifDeleteQuery.limit(1);
                
            if (notifsToDelete && notifsToDelete.length > 0) {
                await supabase.from("notifications").delete().eq("id", notifsToDelete[0].id);
            }
        }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Interaction Management edge function error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
