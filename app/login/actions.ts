"use server";

import { createClient } from "@/app/_lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function checkUsername(usernameOrEmail: string) {
    const supabase = await createClient();
    
    // If it's an email, we can't easily look up the profile unless we search by email 
    // but profiles usually only has username/id.
    // However, if they type a username, we check profiles.
    const searchUsername = usernameOrEmail.split('@')[0];

    const { data } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .ilike("username", searchUsername)
        .single();
        
    if (data) {
        return { username: data.username, avatar_url: data.avatar_url, found: true };
    }
    
    return { found: false };
}

export async function loginWithUsernameOrEmail(usernameOrEmail: string, password: string) {
    const supabase = await createClient();
    let email = usernameOrEmail;

    if (!usernameOrEmail.includes("@")) {
        // It's a username. We need to find the email using service role.
        const supabaseAdmin = createSupabaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        // Find user id from profiles
        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .ilike("username", usernameOrEmail)
            .single();
            
        if (profile) {
            // Find email from auth.users
            const { data: userData } = await supabaseAdmin.auth.admin.getUserById(profile.id);
            if (userData?.user?.email) {
                email = userData.user.email;
            }
        }
    }

    // Now sign in
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true };
}
