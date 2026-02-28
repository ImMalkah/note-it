"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/_lib/supabase/client";
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
    const supabase = createClient();

    useEffect(() => {
        setIsLiked(initialIsLiked);
        setLikesCount(initialLikesCount);
    }, [initialIsLiked, initialLikesCount]);

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
            if (isLiked) {
                // Unlike
                const { error } = await supabase
                    .from("note_likes")
                    .delete()
                    .match({ user_id: userId, note_id: noteId });

                if (error) throw error;

                setIsLiked(false);
                setLikesCount(prev => Math.max(0, prev - 1));
            } else {
                // Like
                const { error } = await supabase
                    .from("note_likes")
                    .insert({ user_id: userId, note_id: noteId });

                if (error) throw error;

                setIsLiked(true);
                setLikesCount(prev => prev + 1);
            }
            // Optional: trigger a router.refresh() if you want the server components to update
            // router.refresh();
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert optimistic update
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
