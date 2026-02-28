"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

export default function NotificationBell({ userId }: { userId: string }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [toasts, setToasts] = useState<Notification[]>([]);

    const supabase = createClient();
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        // Fetch unread count
        const { count } = await supabase
            .from("notifications")
            .select('*', { count: 'exact', head: true })
            .eq("user_id", userId)
            .eq("is_read", false);

        if (count !== null) setUnreadCount(count);

        // Fetch recent notifications for dropdown
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
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(5);

        if (data) setNotifications(data as unknown as Notification[]);
    };

    useEffect(() => {
        if (!userId) return;

        // Fetch initial data on mount
        fetchNotifications();

        // Subscribe to real-time inserts on the notifications table.
        // The notifications table is in the supabase_realtime publication,
        // so postgres_changes works reliably without race conditions.
        const channel = supabase
            .channel(`notifications-bell-${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${userId}`
                },
                async (payload) => {
                    // Refresh the full list to get enriched actor/note data
                    await fetchNotifications();

                    // Also show a toast — fetch the enriched record
                    const { data: newNotif } = await supabase
                        .from("notifications")
                        .select(`
                            id, is_read, created_at, type,
                            actor:profiles!notifications_actor_id_fkey(id, username, avatar_url),
                            note:notes(id, title)
                        `)
                        .eq("id", payload.new.id)
                        .single();

                    if (newNotif) {
                        setToasts(prev => [...prev, newNotif as unknown as Notification]);
                        setTimeout(() => {
                            setToasts(prev => prev.filter(t => t.id !== (newNotif as { id: number }).id));
                        }, 6000);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);


    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = async (notif: Notification) => {
        setIsDropdownOpen(false); // Close dropdown
        setToasts(prev => prev.filter(t => t.id !== notif.id)); // Hide toast if clicked

        if (!notif.is_read) {
            // Optimistic local update
            setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));

            // Background update
            await supabase.from("notifications").update({ is_read: true }).eq("id", notif.id);
        }

        if (notif.note) {
            router.push(`/note/${notif.note.id}`);
        }
    };

    const isActive = pathname === '/notifications' || isDropdownOpen;

    return (
        <div ref={dropdownRef} style={{ position: "relative" }}>
            {/* Bell Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: isActive ? "var(--primary-soft)" : "transparent",
                    color: isActive ? "var(--primary)" : "var(--foreground-muted)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.color = "var(--foreground)";
                        e.currentTarget.style.background = "var(--surface-hover)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.color = "var(--foreground-muted)";
                        e.currentTarget.style.background = "transparent";
                    }
                }}
                aria-label="Notifications"
            >
                <i className="fa-solid fa-bell" style={{ fontSize: "1.1rem" }}></i>

                {unreadCount > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "var(--primary)",
                            color: "white",
                            fontSize: "0.6rem",
                            fontWeight: 800,
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid var(--background)",
                            animation: "pulse-glow 2s infinite",
                        }}
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    className="animate-slide-down"
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        width: "350px",
                        background: "var(--surface)",
                        borderRadius: "16px",
                        border: "1px solid var(--border-subtle)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                        overflow: "hidden",
                        zIndex: 100,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <div style={{ padding: "16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}>Notifications</h3>
                        {unreadCount > 0 && (
                            <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>{unreadCount} unread</span>
                        )}
                    </div>

                    <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                        {notifications.length === 0 ? (
                            <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--foreground-muted)" }}>
                                <p style={{ margin: 0, fontSize: "0.9rem" }}>No notifications yet.</p>
                            </div>
                        ) : (
                            notifications.map(notif => {
                                const actor = notif.actor;
                                const isUnread = !notif.is_read;
                                return (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "12px",
                                            padding: "16px",
                                            background: isUnread ? "var(--primary-soft)" : "transparent",
                                            borderBottom: "1px solid var(--border-subtle)",
                                            cursor: "pointer",
                                            transition: "background 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isUnread) e.currentTarget.style.background = "var(--surface-hover)";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isUnread) e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        {actor?.avatar_url ? (
                                            <img src={actor.avatar_url} alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid var(--border-subtle)" }} />
                                        ) : (
                                            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                                                {actor?.username?.charAt(0).toUpperCase() || "?"}
                                            </div>
                                        )}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem", color: "var(--foreground)", lineHeight: 1.4, fontWeight: isUnread ? 700 : 400 }}>
                                                <span style={{ color: "var(--foreground)" }}>{actor?.username}</span> mentioned you in a note: <span style={{ fontStyle: "italic", opacity: 0.9 }}>&quot;{notif.note?.title}&quot;</span>
                                            </p>
                                        </div>
                                        {isUnread && (
                                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: "6px" }} />
                                        )}
                                    </div>
                                )
                            })
                        )}
                    </div>

                    <div style={{ padding: "12px", borderTop: "1px solid var(--border-subtle)", textAlign: "center", background: "var(--background-secondary)" }}>
                        <Link href="/notifications" onClick={() => setIsDropdownOpen(false)} style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600 }}>
                            View all notifications
                        </Link>
                    </div>
                </div>
            )}

            {/* Float Toasts for new notifications */}
            <div style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                zIndex: 9999,
                pointerEvents: "none", // Let clicks pass through empty space
            }}>
                {toasts.map(toast => {
                    const actor = toast.actor;
                    return (
                        <div
                            key={toast.id}
                            onClick={() => handleNotificationClick(toast)}
                            className="animate-slide-down"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "16px",
                                background: "var(--surface)",
                                borderRadius: "12px",
                                border: "1px solid var(--border)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                                cursor: "pointer",
                                width: "320px",
                                pointerEvents: "auto", // Re-enable clicks
                            }}
                        >
                            {actor?.avatar_url ? (
                                <img src={actor.avatar_url} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                            ) : (
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: "white" }}>
                                    {actor?.username?.charAt(0).toUpperCase() || "?"}
                                </div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: "0", fontSize: "0.9rem", color: "var(--foreground)", fontWeight: 700 }}>New Mention</p>
                                <p style={{ margin: "2px 0 0 0", fontSize: "0.85rem", color: "var(--foreground-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{actor?.username}</span> mentioned you in <span style={{ fontStyle: "italic", opacity: 0.9 }}>&quot;{toast.note?.title}&quot;</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
