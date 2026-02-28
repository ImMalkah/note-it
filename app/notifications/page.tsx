import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";
import NotificationClientList from "./NotificationClientList";

export default async function NotificationsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: notifications, error } = await supabase
        .from("notifications")
        .select(`
            id, 
            is_read, 
            created_at, 
            type,
            actor:profiles!notifications_actor_id_fkey(id, username, avatar_url), 
            note:notes(id, title)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div
            style={{
                minHeight: "calc(100vh - 64px)",
                background:
                    "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
                padding: "60px 24px 80px",
            }}
        >
            <div
                style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                <div style={{ marginBottom: "32px" }}>
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            color: "var(--foreground)",
                            margin: "0 0 8px 0",
                        }}
                    >
                        Notifications
                    </h1>
                    <p style={{ margin: 0, color: "var(--foreground-muted)", fontSize: "0.95rem" }}>
                        See who's talking about you.
                    </p>
                </div>

                <div
                    className="gradient-border"
                    style={{
                        background: "var(--surface)",
                        borderRadius: "16px",
                        overflow: "hidden"
                    }}
                >
                    <NotificationClientList initialNotifications={notifications || []} />
                </div>
            </div>
        </div>
    );
}
