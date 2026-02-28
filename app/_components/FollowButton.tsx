"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
    targetUserId: string;
    initialIsFollowing: boolean;
}

export default function FollowButton({ targetUserId, initialIsFollowing }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        setIsFollowing(initialIsFollowing);
    }, [initialIsFollowing]);

    const handleFollowToggle = async () => {
        if (loading) return;
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
            return;
        }

        const currentUserId = session.user.id;

        try {
            if (isFollowing) {
                // Unfollow
                const { error } = await supabase
                    .from("user_follows")
                    .delete()
                    .match({ follower_id: currentUserId, following_id: targetUserId });

                if (error) throw error;
                setIsFollowing(false);
            } else {
                // Follow
                const { error } = await supabase
                    .from("user_follows")
                    .insert({ follower_id: currentUserId, following_id: targetUserId });

                if (error) throw error;
                setIsFollowing(true);
            }
            router.refresh(); // Refresh page to update counts or feed
        } catch (error) {
            console.error("Error toggling follow:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleFollowToggle}
            disabled={loading}
            style={{
                padding: "8px 24px",
                borderRadius: "20px",
                background: isFollowing ? "transparent" : "var(--primary)",
                color: isFollowing ? "var(--foreground)" : "white",
                border: isFollowing ? "1px solid var(--border)" : "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: loading ? "default" : "pointer",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                if (isFollowing && !loading) {
                    e.currentTarget.style.color = "#ef4444";
                    e.currentTarget.style.borderColor = "#ef4444";
                    e.currentTarget.textContent = "Unfollow";
                }
            }}
            onMouseLeave={(e) => {
                if (isFollowing && !loading) {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.textContent = "Following";
                }
            }}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}
