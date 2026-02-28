import { createClient } from "./supabase/client";

export async function toggleInteraction(action: "like" | "save" | "follow", targetId: number | string, isAdding: boolean) {
    const supabase = createClient();
    
    // Get the current session to get the JWT
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        throw new Error("You must be logged in to do this.");
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl('');
    // Ensure we slice out the trailing path to just get the project URL + functions/v1
    const supabaseUrl = publicUrl.split('/storage/v1')[0];
    const functionUrl = `${supabaseUrl}/functions/v1/manage-interaction`;

    const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ action, targetId, isAdding }),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to toggle ${action}: ${errText}`);
    }

    return await response.json();
}
