"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";
import { toggleInteraction } from "@/app/_lib/manage-interaction";

interface FollowButtonProps {
    targetUserId: string;
    initialIsFollowing: boolean;
    isFollower?: boolean;
}

export default function FollowButton({ targetUserId, initialIsFollowing, isFollower = false }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        setIsFollowing(initialIsFollowing);
    }, [initialIsFollowing, targetUserId]);

    // Handle Realtime Subscription
    useEffect(() => {
        const channel = supabase
            .channel(`user_follows_${targetUserId}`)
            .on(
                'broadcast',
                {
                    event: 'interaction_update',
                },
                async (payload) => {
                    const { follower_id } = payload.payload;
                    const { data: { session } } = await supabase.auth.getSession();
                    const currentUserId = session?.user?.id;

                    // Only update visually if the broadcast was about *this* user toggling
                    if (currentUserId && follower_id === currentUserId) {
                        if (payload.payload.eventType === 'INSERT') {
                            setIsFollowing(true);
                        } else if (payload.payload.eventType === 'DELETE') {
                            setIsFollowing(false);
                        }
                    } else {
                        // Optional: trigger a router.refresh() if someone ELSE followed to update external counts on the page
                        router.refresh();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [targetUserId, supabase, router]);

    const handleFollowToggle = async () => {
        if (loading) return;
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
            setLoading(false);
            return;
        }

        // Optimistic UI Update
        setIsFollowing(!isFollowing);

        try {
            await toggleInteraction("follow", targetUserId, !isFollowing);
            router.refresh(); // Update the profile counts if necessary
        } catch (error) {
            console.error("Error toggling follow:", error);
            // Revert optimistic update
            setIsFollowing(isFollowing);
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
            {isFollowing ? "Following" : (isFollower ? "Follow Back" : "Follow")}
        </button>
    );
}
