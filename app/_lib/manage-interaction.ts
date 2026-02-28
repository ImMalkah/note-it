import { createClient } from "./supabase/client";

export async function toggleInteraction(action: "like" | "save" | "follow", targetId: number | string, isAdding: boolean) {
    const supabase = createClient();
    
    // Get the current session to get the JWT
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        throw new Error("You must be logged in to do this.");
    }

    const { data, error } = await supabase.functions.invoke('manage-interaction', {
        body: { action, targetId, isAdding }
    });

    if (error) {
        console.error("Invoke Error Payload:", error);
        throw new Error(`Failed to toggle ${action}: ${error.message || JSON.stringify(error)}`);
    }

    return data;
}
