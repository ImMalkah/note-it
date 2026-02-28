"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { toggleInteraction } from "@/app/_lib/manage-interaction";
import { useRouter } from "next/navigation";
import UserListModal from "./UserListModal";

interface LikeButtonProps {
    noteId: number;
    initialLikesCount: number;
    initialIsLiked: boolean;
}

export default function LikeButton({ noteId, initialLikesCount, initialIsLiked }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    // Sync state if parent props change (e.g. on navigation refresh)
    useEffect(() => {
        setIsLiked(initialIsLiked);
        setLikesCount(initialLikesCount);
    }, [initialIsLiked, initialLikesCount, noteId]);

    // Handle Realtime Subscription
    useEffect(() => {

        const channel = supabase
            .channel(`note_likes_${noteId}`)
            .on(
                'broadcast',
                {
                    event: 'interaction_update',
                },
                (payload) => {
                    const { newCount } = payload.payload;
                    if (typeof newCount === 'number') {
                        setLikesCount(newCount);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [noteId, supabase]);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) return;
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
            return;
        }

        const userId = session.user.id;

        try {
            // Optimistic UI update
            setIsLiked(!isLiked);
            setLikesCount(prev => isLiked ? Math.max(0, prev - 1) : prev + 1);

            if (isLiked) {
                // Unlike
                await toggleInteraction("like", noteId, false);
            } else {
                // Like
                await toggleInteraction("like", noteId, true);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert optimistic update
            setIsLiked(isLiked);
            setLikesCount(likesCount);
        } finally {
            setLoading(false);
        }
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                    onClick={handleLike}
                    disabled={loading}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        border: "none",
                        cursor: loading ? "default" : "pointer",
                        padding: "4px 8px",
                        borderRadius: "20px",
                        color: isLiked ? "var(--primary)" : "var(--foreground-muted)",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        if (!isLiked && !loading) {
                            e.currentTarget.style.color = "var(--primary-soft)";
                            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLiked && !loading) {
                            e.currentTarget.style.color = "var(--foreground-muted)";
                            e.currentTarget.style.background = "transparent";
                        }
                    }}
                >
                    <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                </button>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (likesCount > 0) setShowModal(true);
                    }}
                    style={{
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "var(--foreground-muted)",
                        cursor: likesCount > 0 ? "pointer" : "default",
                        transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        if (likesCount > 0) e.currentTarget.style.color = "var(--foreground)";
                    }}
                    onMouseLeave={(e) => {
                        if (likesCount > 0) e.currentTarget.style.color = "var(--foreground-muted)";
                    }}
                >
                    {likesCount}
                </div>
            </div>

            <UserListModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Liked By"
                type="likes"
                targetId={noteId}
            />
        </>
    );
}
