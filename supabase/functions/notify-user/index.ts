import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req: Request) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await req.json();

    // Support both pg_net 'record' object and direct row payload
    const record = payload.record || payload;
    
    if (!record || !record.user_id) {
      return new Response("Missing record or user_id in payload", { status: 400 });
    }

    const { user_id, id, actor_id, note_id, type: notifType } = record;

    // Create an admin client to bypass RLS for broadcasting
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch the full notification with actor info and note info
    const { data: notification, error: fetchError } = await supabase
      .from("notifications")
      .select(`
        id,
        is_read,
        created_at,
        type,
        actor:profiles!notifications_actor_id_fkey(id, username, avatar_url),
        note:notes(id, title)
      `)
      .eq("id", id)
      .single();

    if (fetchError || !notification) {
      console.error("Failed to fetch notification details:", fetchError);
      // Still broadcast a basic notification without enrichment
    }

    // The React components listen on two distinct channels (Bell and Page)
    // We broadcast the new notification to both so they update instantly.
    const payloadData = notification ?? { id, user_id, actor_id, note_id, type: notifType, is_read: false };

    // Function to safely broadcast and close channel
    const sendBroadcast = async (channelName: string) => {
      return new Promise((resolve) => {
        const channel = supabase.channel(channelName);
        channel.subscribe(async (status: string) => {
          if (status === 'SUBSCRIBED') {
            const resp = await channel.send({
              type: "broadcast",
              event: "new_notification",
              payload: payloadData,
            });
            await supabase.removeChannel(channel);
            resolve(resp);
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
             resolve("failed");
          }
        });
      });
    };

    // 1. Alert the Notification Bell (Navbar)
    const broadcastBell = await sendBroadcast(`notifications-bell-${user_id}`);

    // 2. Alert the specific Notifications Page List
    const broadcastPage = await sendBroadcast(`public:notifications_page:user_id=eq.${user_id}`);

    console.log("Broadcasts sent successfully => Bell:", broadcastBell, "| Page:", broadcastPage);

    return new Response(
      JSON.stringify({ success: true, channels: ['bell', 'page'], broadcastBell, broadcastPage }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", "Connection": "keep-alive" },
      }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
