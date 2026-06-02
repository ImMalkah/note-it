"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";
import { toggleInteraction } from "@/app/_lib/manage-interaction";

interface FollowButtonProps {
    targetUserId: string;
    initialIsFollowing: boolean;
    isFollower?: boolean;
    enableRealtime?: boolean;
}

export default function FollowButton({ targetUserId, initialIsFollowing, isFollower = false, enableRealtime = false }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(false);
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        setIsFollowing(initialIsFollowing);
    }, [initialIsFollowing, targetUserId]);

    useEffect(() => {
        if (!enableRealtime) return;

        const channel = supabase
            .channel(`user_follows_${targetUserId}`)
            .on('broadcast', { event: 'interaction_update' }, async (payload: any) => {
                const { follower_id } = payload.payload;
                const { data: { session } } = await supabase.auth.getSession();
                const currentUserId = session?.user?.id;

                if (currentUserId && follower_id === currentUserId) {
                    if (payload.payload.eventType === 'INSERT') setIsFollowing(true);
                    else if (payload.payload.eventType === 'DELETE') setIsFollowing(false);
                } else {
                    router.refresh();
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [targetUserId, supabase, router, enableRealtime]);

    const handleFollowToggle = async () => {
        if (loading) return;
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.push("/login"); setLoading(false); return; }

        setIsFollowing(!isFollowing);

        try {
            await toggleInteraction("follow", targetUserId, !isFollowing);
            router.refresh();
        } catch {
            setIsFollowing(isFollowing);
        } finally {
            setLoading(false);
        }
    };

    const label = isFollowing
        ? (hovered ? "Unfollow" : "Following")
        : (isFollower ? "Follow Back" : "Follow");

    return (
        <button
            onClick={handleFollowToggle}
            disabled={loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`btn ${isFollowing ? "btn-following" : "btn-follow"}`}
            style={{ minWidth: 110, transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}
        >
            {loading ? <span className="btn-spinner" /> : label}
        </button>
    );
}
