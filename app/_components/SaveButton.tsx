"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { toggleInteraction } from "@/app/_lib/manage-interaction";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
    noteId: number;
    initialIsSaved: boolean;
}

export default function SaveButton({ noteId, initialIsSaved }: SaveButtonProps) {
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    // Sync state if parent props change (e.g. on navigation refresh)
    useEffect(() => {
        setIsSaved(initialIsSaved);
    }, [initialIsSaved, noteId]);

    // Handle Realtime Subscription
    useEffect(() => {

        const channel = supabase
            .channel(`saved_notes_${noteId}`)
            .on(
                'broadcast',
                {
                    event: 'interaction_update',
                },
                (payload) => {
                    const eventType = payload.payload.eventType;
                    if (eventType === 'INSERT') {
                        setIsSaved(true);
                    } else if (eventType === 'DELETE') {
                        setIsSaved(false);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [noteId, supabase]);

    const handleSave = async (e: React.MouseEvent) => {
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
            // Optimistic update
            setIsSaved(!isSaved);

            if (isSaved) {
                // Unsave
                await toggleInteraction("save", noteId, false);
            } else {
                // Save
                await toggleInteraction("save", noteId, true);
            }
        } catch (error) {
            console.error("Error toggling save:", error);
            // Revert optimistic update
            setIsSaved(isSaved);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSave}
            disabled={loading}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: loading ? "default" : "pointer",
                padding: "6px",
                borderRadius: "50%",
                color: isSaved ? "var(--primary)" : "var(--foreground-muted)",
                transition: "all 0.2s ease",
            }}
            title={isSaved ? "Unsave note" : "Save note"}
            onMouseEnter={(e) => {
                if (!isSaved && !loading) {
                    e.currentTarget.style.color = "var(--primary-soft)";
                    e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                }
            }}
            onMouseLeave={(e) => {
                if (!isSaved && !loading) {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                    e.currentTarget.style.background = "transparent";
                }
            }}
        >
            <i className={isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
        </button>
    );
}
