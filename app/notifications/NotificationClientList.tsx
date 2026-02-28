"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

// Types matching Supabase query
interface Notification {
    id: number;
    is_read: boolean;
    created_at: string;
    type: string;
    actor: {
        id: string;
        username: string;
        avatar_url: string | null;
    } | null;
    note: {
        id: number;
        title: string;
    } | null;
}

export default function NotificationClientList({ userId, initialNotifications }: { userId: string, initialNotifications: Notification[] }) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const supabase = createClient();
    const router = useRouter();

    const fetchSingleNotification = async (id: number) => {
        const { data } = await supabase
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

        return data as Notification | null;
    };

    const handleNotificationClick = async (notif: Notification) => {
        if (!notif.is_read) {
            // Optimistic update
            setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n));

            // Background network request
            await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("id", notif.id);
        }

        if (notif.note) {
            router.push(`/note/${notif.note.id}`);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const channel = supabase
            .channel(`public:notifications_page:user_id=eq.${userId}`)
            .on(
                'broadcast',
                { event: 'new_notification' },
                async (payload) => {
                    const newNotif = payload.payload as unknown as Notification;

                    if (newNotif && newNotif.actor) {
                        setNotifications(prev => [newNotif, ...prev]);
                    } else if (newNotif) {
                        const fetched = await fetchSingleNotification(newNotif.id);
                        if (fetched) {
                            setNotifications(prev => [fetched, ...prev]);
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    if (notifications.length === 0) {
        return (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--foreground-muted)" }}>
                <i className="fa-regular fa-bell" style={{ fontSize: "2rem", marginBottom: "16px", opacity: 0.5 }}></i>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>You don&apos;t have any notifications yet.</p>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {notifications.map((notif, i) => {
                const isLast = i === notifications.length - 1;

                // Format relative time
                const date = new Date(notif.created_at);
                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMins / 60);
                const diffDays = Math.floor(diffHours / 24);

                let timeStr = "";
                if (diffMins < 60) timeStr = `${Math.max(1, diffMins)}m ago`;
                else if (diffHours < 24) timeStr = `${diffHours}h ago`;
                else timeStr = `${diffDays}d ago`;

                const actor = notif.actor;

                return (
                    <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "16px",
                            padding: "20px 24px",
                            background: notif.is_read ? "transparent" : "var(--primary-soft)",
                            borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
                            cursor: "pointer",
                            transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (notif.is_read) e.currentTarget.style.background = "var(--surface-hover)";
                        }}
                        onMouseLeave={(e) => {
                            if (notif.is_read) e.currentTarget.style.background = "transparent";
                        }}
                    >
                        {/* Avatar */}
                        {actor?.avatar_url ? (
                            <img
                                src={actor.avatar_url}
                                alt={actor.username}
                                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid var(--border-subtle)" }}
                            />
                        ) : (
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                                {actor?.username?.charAt(0).toUpperCase() || "?"}
                            </div>
                        )}

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: "0 0 4px 0", fontSize: "0.95rem", color: "var(--foreground)", lineHeight: 1.4, fontWeight: notif.is_read ? 400 : 700 }}>
                                <span style={{ color: "var(--foreground)" }}>{actor?.username}</span> mentioned you in a note: <span style={{ fontStyle: "italic", opacity: 0.9 }}>&quot;{notif.note?.title}&quot;</span>
                            </p>
                            <span style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", fontWeight: 500 }}>
                                {timeStr}
                            </span>
                        </div>

                        {!notif.is_read && (
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: "6px" }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
