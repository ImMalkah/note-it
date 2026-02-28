"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/client";

interface DeleteNoteButtonProps {
    noteId: number;
}

export default function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.from("notes").delete().eq("id", noteId);

        if (error) {
            alert("Failed to delete note: " + error.message);
            setLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
    };

    if (!confirming) {
        return (
            <button
                onClick={() => setConfirming(true)}
                style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#ef4444",
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                }}
            >
                🗑 Delete this note
            </button>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
            }}
        >
            <span
                style={{
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    fontWeight: 500,
                }}
            >
                Are you sure?
            </span>
            <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                    padding: "8px 20px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "white",
                    background: "#ef4444",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    opacity: loading ? 0.6 : 1,
                }}
            >
                {loading ? "Deleting..." : "Yes, delete"}
            </button>
            <button
                onClick={() => setConfirming(false)}
                style={{
                    padding: "8px 20px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--foreground-muted)",
                    background: "var(--background)",
                    border: "1px solid var(--border-subtle)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
            >
                Cancel
            </button>
        </div>
    );
}
