"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";
import MentionsTextarea from "@/app/_components/MentionsTextarea";

export default function NewNotePage() {
    const [title, setTitle] = useState("");
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
            title: title.trim(),
            content: content.trim(),
            author_id: user.id,
        }).select("id").single();

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
            return;
        }

        // --- Notifications Logic ---
        const combinedText = `${title.trim()} ${content.trim()}`;
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
                background:
                    "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
                padding: "60px 24px 80px",
            }}
        >
            <div
                className="gradient-border"
                style={{
                    background: "var(--surface)",
                    borderRadius: "16px",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "800px",
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
                        <p
                            style={{
                                fontSize: "0.9rem",
                                color: "var(--foreground-muted)",
                                margin: "4px 0 0",
                            }}
                        >
                            Share something with everyone
                        </p>
                    </div>
                    <Link
                        href="/"
                        style={{
                            padding: "8px 16px",
                            borderRadius: "10px",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            color: "var(--foreground-muted)",
                            background: "var(--background)",
                            border: "1px solid var(--border-subtle)",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                        }}
                    >
                        ← Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label
                            htmlFor="title"
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
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            maxLength={100}
                            placeholder="Give your note a title..."
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--background)",
                                color: "var(--foreground)",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) =>
                                (e.currentTarget.style.borderColor = "var(--primary)")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.borderColor = "var(--border-subtle)")
                            }
                        />
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
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--background)",
                                color: "var(--foreground)",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                                resize: "vertical",
                                minHeight: "120px",
                                fontFamily: "inherit",
                                lineHeight: 1.6,
                                boxSizing: "border-box",
                            }}
                        />
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
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "12px",
                            background: loading
                                ? "var(--surface-hover)"
                                : "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                            color: "white",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: loading ? "none" : "0 4px 15px var(--primary-soft)",
                        }}
                    >
                        {loading ? "Publishing..." : "Publish Note"}
                    </button>
                </form>
            </div>
        </div>
    );
}
