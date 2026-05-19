"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
        mood: string | null;
    } | null;
}

export default function NotificationClientList({ userId, initialNotifications }: { userId: string, initialNotifications: Notification[] }) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [markingAll, setMarkingAll] = useState(false);
    
    // Pagination states
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialNotifications.length >= 20);
    const [loadingMore, setLoadingMore] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const supabase = createClient();
    const router = useRouter();

    const fetchMoreNotifications = useCallback(async () => {
        if (loadingMore || !hasMore || !userId) return;
        setLoadingMore(true);

        const from = page * 20;
        const to = from + 19;

        const { data: newNotifs } = await supabase
            .from("notifications")
            .select(`
                id, 
                is_read, 
                created_at, 
                type,
                actor:profiles!notifications_actor_id_fkey(id, username, avatar_url), 
                note:notes(id, mood)
            `)
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .range(from, to);

        if (newNotifs && newNotifs.length > 0) {
            setNotifications(prev => {
                const existingIds = new Set(prev.map(n => n.id));
                const uniqueNew = newNotifs.filter(n => !existingIds.has(n.id));
                return [...prev, ...uniqueNew as unknown as Notification[]];
            });
            setPage(p => p + 1);
            if (newNotifs.length < 20) setHasMore(false);
        } else {
            setHasMore(false);
        }
        setLoadingMore(false);
    }, [page, hasMore, loadingMore, userId, supabase]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchMoreNotifications();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchMoreNotifications]);

    const fetchSingleNotification = async (id: number) => {
        const { data } = await supabase
            .from("notifications")
            .select(`
                id, 
                is_read, 
                created_at, 
                type,
                actor:profiles!notifications_actor_id_fkey(id, username, avatar_url), 
                note:notes(id, mood)
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

        if (notif.type === 'follow' && notif.actor) {
            router.push(`/profile/${notif.actor.username}`);
        } else if (notif.note) {
            router.push(`/note/${notif.note.id}`);
        }
    };

    const handleMarkAllRead = async () => {
        const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
        if (unreadIds.length === 0) return;
        setMarkingAll(true);
        // Optimistic update
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        await supabase
            .from("notifications")
            .update({ is_read: true })
            .in("id", unreadIds);
        setMarkingAll(false);
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
            {/* Header bar with Mark All Read */}
            {notifications.some(n => !n.is_read) && (
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "12px 20px",
                    borderBottom: "1px solid var(--border-subtle)",
                }}>
                    <button
                        onClick={handleMarkAllRead}
                        disabled={markingAll}
                        style={{
                            padding: "6px 16px",
                            borderRadius: "20px",
                            border: "1px solid var(--primary)",
                            background: "transparent",
                            color: "var(--primary)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: markingAll ? "default" : "pointer",
                            opacity: markingAll ? 0.5 : 1,
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (!markingAll) {
                                e.currentTarget.style.background = "var(--primary)";
                                e.currentTarget.style.color = "white";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!markingAll) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--primary)";
                            }
                        }}
                    >
                        {markingAll ? "Marking..." : "Mark all as read"}
                    </button>
                </div>
            )}
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
                const actorName = actor?.username || "Someone";

                let actionText = "interacted with";
                let icon = "🔔";

                if (notif.type === 'like') {
                    actionText = "liked your post";
                    icon = "❤️";
                } else if (notif.type === 'save') {
                    actionText = "saved your post";
                    icon = "🔖";
                } else if (notif.type === 'follow') {
                    actionText = "followed you";
                    icon = "👤";
                } else if (notif.type === 'mention') {
                    actionText = "mentioned you";
                    icon = "💬";
                }

                return (
                    <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "20px 24px",
                            background: notif.is_read ? "transparent" : "rgba(255, 255, 255, 0.04)",
                            borderBottom: isLast ? "none" : "1px solid rgba(255, 255, 255, 0.06)",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                            if (notif.is_read) {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                            } else {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (notif.is_read) {
                                e.currentTarget.style.background = "transparent";
                            } else {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                            }
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
                            <p style={{ margin: "0 0 4px 0", fontSize: "0.95rem", color: "var(--foreground)", lineHeight: 1.4, fontWeight: notif.is_read ? 400 : 600 }}>
                                <span style={{ color: "var(--foreground)", fontWeight: 700 }}>{actor?.username}</span> {actionText}
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
            
            {/* Infinite Scroll Trigger */}
            <div 
                ref={observerTarget} 
                style={{ 
                    height: "40px", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                    padding: "16px 0",
                    borderTop: notifications.length > 0 ? "1px solid rgba(255, 255, 255, 0.06)" : "none"
                }}
            >
                {loadingMore && (
                    <div style={{ color: "var(--primary)", fontSize: "0.85rem" }}>
                        Loading older notifications...
                    </div>
                )}
                {!hasMore && notifications.length > 0 && (
                    <div style={{ color: "var(--foreground-muted)", fontSize: "0.85rem" }}>
                        You're all caught up!
                    </div>
                )}
            </div>
        </div>
    );
}
