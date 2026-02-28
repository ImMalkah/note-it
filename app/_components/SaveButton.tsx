"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
    noteId: number;
    initialIsSaved: boolean;
}

export default function SaveButton({ noteId, initialIsSaved }: SaveButtonProps) {
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        setIsSaved(initialIsSaved);
    }, [initialIsSaved]);

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
            if (isSaved) {
                // Unsave
                const { error } = await supabase
                    .from("saved_notes")
                    .delete()
                    .match({ user_id: userId, note_id: noteId });

                if (error) throw error;

                setIsSaved(false);
            } else {
                // Save
                const { error } = await supabase
                    .from("saved_notes")
                    .insert({ user_id: userId, note_id: noteId });

                if (error) throw error;

                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error toggling save:", error);
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
