"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";
import MentionsTextarea from "@/app/_components/MentionsTextarea";
import { MOODS } from "@/app/_utils/moods";

export default function NewNotePage() {
    const [selectedMood, setSelectedMood] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setError("You must be logged in to create a note");
            setLoading(false);
            return;
        }

        const { data: noteData, error: insertError } = await supabase.from("notes").insert({
            mood: selectedMood.trim() || null,
            content: content.trim(),
            author_id: user.id,
        }).select("id").single();

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
            return;
        }

        // --- Notifications Logic ---
        const combinedText = `${content.trim()}`;
        const mentionRegex = /@([a-zA-Z0-9_]+)/g;
        const mentionedUsernames = new Set<string>();
        let match;

        while ((match = mentionRegex.exec(combinedText)) !== null) {
            mentionedUsernames.add(match[1]);
        }

        if (mentionedUsernames.size > 0) {
            // Find all corresponding user IDs
            const { data: profiles } = await supabase
                .from("profiles")
                .select("id, username")
                .in("username", Array.from(mentionedUsernames));

            if (profiles && profiles.length > 0) {
                const notificationsToInsert = profiles
                    .filter(p => p.id !== user.id) // Don't notify self
                    .map(p => ({
                        user_id: p.id,
                        actor_id: user.id,
                        note_id: noteData.id,
                        type: "mention",
                        is_read: false
                    }));

                if (notificationsToInsert.length > 0) {
                    await supabase.from("notifications").insert(notificationsToInsert);
                }
            }
        }
        // ---

        router.push("/");
        router.refresh();
    };

    return (

        <div
            style={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                background: "transparent",
                padding: "60px 24px 80px",
            }}
        >
            <div
                className="animate-slide-down stagger-children"
                style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "800px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "32px",
                    }}
                >
                    <div>
                        <h1
                            className="gradient-text"
                            style={{
                                fontSize: "1.75rem",
                                fontWeight: 800,
                                letterSpacing: "-0.03em",
                                margin: 0,
                            }}
                        >
                            New Note
                        </h1>

                    </div>
                    <Link href="/" className="btn btn-ghost btn-sm">
                        ← Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                color: "var(--foreground-muted)",
                                marginBottom: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            How are you feeling?
                        </label>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                            }}
                        >
                            {MOODS.map((mood) => {
                                const isSelected = selectedMood === mood.id;
                                return (
                                    <button
                                        key={mood.id}
                                        type="button"
                                        onClick={() => setSelectedMood(mood.id)}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "10px 18px",
                                            borderRadius: "20px",
                                            background: isSelected ? `${mood.color}15` : "rgba(255, 255, 255, 0.03)",
                                            border: `1px solid ${isSelected ? mood.color : "rgba(255, 255, 255, 0.1)"}`,
                                            cursor: "pointer",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            transform: isSelected ? "translateY(-2px)" : "translateY(0)",
                                            boxShadow: isSelected ? `0 8px 16px ${mood.color}20, inset 0 2px 4px rgba(255,255,255,0.1)` : "inset 0 2px 4px rgba(0,0,0,0.1)",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                                                e.currentTarget.style.transform = "translateY(-1px)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }
                                        }}
                                    >
                                        <div style={{ color: isSelected ? mood.color : "var(--foreground-muted)", transition: "color 0.2s ease", display: "flex" }}>
                                            <mood.icon size={18} strokeWidth={isSelected ? 2.5 : 2} />
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "0.9rem",
                                                fontWeight: isSelected ? 600 : 500,
                                                color: isSelected ? mood.color : "var(--foreground)",
                                            }}
                                        >
                                            {mood.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                    </div>

                    <div style={{ marginBottom: "28px" }}>
                        <label
                            htmlFor="content"
                            style={{
                                display: "block",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                color: "var(--foreground-muted)",
                                marginBottom: "8px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Content
                        </label>
                        <MentionsTextarea
                            id="content"
                            value={content}
                            onChange={(val) => setContent(val)}
                            required
                            rows={6}
                            placeholder="Write your note here..."
                            maxLength={300}
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                background: "rgba(0, 0, 0, 0.2)",
                                color: "var(--foreground)",
                                fontSize: "0.95rem",
                                outline: "none",
                                transition: "all 0.3s ease",
                                resize: "vertical",
                                minHeight: "120px",
                                fontFamily: "inherit",
                                lineHeight: 1.6,
                                boxSizing: "border-box",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "8px",
                                fontSize: "0.8rem",
                                color: content.length >= 300 ? "#ef4444" : "var(--foreground-muted)",
                                fontWeight: content.length >= 300 ? 600 : 400,
                            }}
                        >
                            {content.length}/300 characters
                        </div>
                    </div>

                    {error && (
                        <div
                            style={{
                                padding: "12px 16px",
                                borderRadius: "10px",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                color: "#ef4444",
                                fontSize: "0.85rem",
                                marginBottom: "20px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="btn-publish"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {loading
                            ? <><span className="btn-spinner" /> Noting...</>
                            : "Note"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
