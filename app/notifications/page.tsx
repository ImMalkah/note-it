import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";
import NotificationClientList from "@/app/notifications/NotificationClientList";

export default async function NotificationsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: notifications } = await supabase
        .from("notifications")
        .select(`
            id, 
            is_read, 
            created_at, 
            type,
            actor:profiles!notifications_actor_id_fkey(id, username, avatar_url), 
            note:notes(id, mood)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(0, 19);

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
                        See who&apos;s talking about you.
                    </p>
                </div>

                <div
                    className="animate-slide-down"
                    style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(32px) saturate(180%)",
                        WebkitBackdropFilter: "blur(32px) saturate(180%)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        borderRadius: "24px",
                        overflow: "hidden"
                    }}
                >
                    <NotificationClientList userId={user.id} initialNotifications={notifications as any || []} />
                </div>
            </div>
        </div>
    );
}
