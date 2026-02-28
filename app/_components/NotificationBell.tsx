"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotificationBell({ userId }: { userId: string }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const supabase = createClient();
    const pathname = usePathname();

    const fetchUnreadCount = async () => {
        const { count, error } = await supabase
            .from("notifications")
            .select('*', { count: 'exact', head: true })
            .eq("user_id", userId)
            .eq("is_read", false);

        if (!error && count !== null) {
            setUnreadCount(count);
        }
    };

    useEffect(() => {
        if (!userId) return;

        fetchUnreadCount();

        // Subscribe to realtime notification changes for this specific user
        const channel = supabase
            .channel(`public:notifications:user_id=eq.${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to INSERTs and UPDATEs
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    // Re-fetch the proper count whenever changes happen
                    fetchUnreadCount();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    const isActive = pathname === '/notifications';

    return (
        <Link
            href="/notifications"
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
        </Link>
    );
}
