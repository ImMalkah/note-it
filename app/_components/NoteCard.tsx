"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/client";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { getMoodById } from "@/app/_utils/moods";

interface NoteCardProps {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
    index: number;
    initialLikesCount?: number;
    initialIsLiked?: boolean;
    initialIsSaved?: boolean;
    initialSavesCount?: number;
    authorAvatarUrl?: string | null;
    isAuthor?: boolean;
    onDeleteAction?: (id: number) => void;
}
export default function NoteCard({
    id,
    title,
    author,
    date,
    content,
    index,
    initialLikesCount = 0,
    initialIsLiked = false,
    initialIsSaved = false,
    initialSavesCount = 0,
    authorAvatarUrl,
    isAuthor = false,
    onDeleteAction,
}: NoteCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    // Function to parse content and turn @username into links
    const renderContentWithMentions = (text: string) => {
        const parts = text.split(/(@[a-zA-Z0-9_]+)/g);
        return parts.map((part, i) => {
            if (part.startsWith('@')) {
                const username = part.slice(1);
                return (
                    <Link
                        key={i}
                        href={`/profile/${username}`}
                        className="gradient-text"
                        style={{ fontWeight: 600 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </Link>
                );
            }
            return <React.Fragment key={i}>{part}</React.Fragment>;
        });
    };
    return (
        <div
            className="gradient-border"
            onClick={() => router.push(`/note/${id}`)}
            style={{
                background: "var(--surface)",
                borderRadius: "16px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                animationDelay: `${index * 0.05}s`,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.3), 0 0 30px var(--primary-soft)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
                {/* Trash Can (Absolutely positioned to stay out of document flow) */}
                {isAuthor && (
                    <button
                        onClick={async (e) => {
                            e.stopPropagation();
                            if (isDeleting) return;
                            if (window.confirm("Are you sure you want to delete this note?")) {
                                setIsDeleting(true);
                                const supabase = createClient();
                                await supabase.from("notes").delete().eq("id", id);
                                if (onDeleteAction) onDeleteAction(id);
                                router.refresh();
                            }
                        }}
                        disabled={isDeleting}
                        style={{
                            position: "absolute",
                            top: "24px",
                            right: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#ef4444",
                            fontSize: "1rem",
                            transition: "all 0.2s ease",
                            flexShrink: 0,
                            border: "none",
                            cursor: isDeleting ? "not-allowed" : "pointer",
                            opacity: isDeleting ? 0.5 : 1,
                            zIndex: 10,
                        }}
                        onMouseEnter={(e) => {
                            if (!isDeleting) {
                                e.currentTarget.style.background = "#ef4444";
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isDeleting) {
                                e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                                e.currentTarget.style.color = "#ef4444";
                                e.currentTarget.style.transform = "scale(1)";
                            }
                        }}
                        aria-label={`Delete note: ${title}`}
                    >
                        🗑
                    </button>
                )}

                {/* Title Row */}
                {title ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: "12px",
                            marginBottom: "12px",
                            paddingRight: isAuthor ? "40px" : "0", // Prevent overlap with absolute trash can
                        }}
                    >
                        {(() => {
                            const mood = getMoodById(title);
                            if (mood) {
                                return (
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "4px 12px",
                                            borderRadius: "20px",
                                            background: `${mood.color}15`,
                                            border: `1px solid ${mood.color}30`,
                                            flex: 1,
                                        }}
                                    >
                                        <span style={{ fontSize: "1.2rem" }}>{mood.emoji}</span>
                                        <span
                                            style={{
                                                fontSize: "0.95rem",
                                                fontWeight: 600,
                                                color: mood.color,
                                                letterSpacing: "0.02em",
                                            }}
                                        >
                                            Feeling {mood.label.toLowerCase()}
                                        </span>
                                    </div>
                                );
                            }

                            // Fallback for legacy text titles
                            return (
                                <h2
                                    style={{
                                        fontSize: "1.25rem",
                                        fontWeight: 700,
                                        color: "var(--foreground)",
                                        margin: 0,
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.01em",
                                        flex: 1,
                                    }}
                                >
                                    {title}
                                </h2>
                            );
                        })()}
                    </div>
                ) : null}

                {/* Author */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "4px",
                        paddingRight: !title && isAuthor ? "40px" : "0",
                    }}
                >
                    {authorAvatarUrl ? (
                        <img src={authorAvatarUrl} alt={author} style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid var(--border-subtle)" }} />
                    ) : (
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                            {author.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span
                        style={{
                            fontSize: "0.8rem",
                            color: "var(--foreground-muted)",
                            fontWeight: 400,
                        }}
                    >
                        by
                    </span>
                    <Link
                        href={`/profile/${author}`}
                        className="gradient-text"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        {author}
                    </Link>
                </div>

                {/* Date */}
                <p
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--foreground-muted)",
                        margin: 0,
                        opacity: 0.7,
                        fontWeight: 400,
                    }}
                >
                    {date}
                </p>

                {/* Divider */}
                <div
                    style={{
                        height: "1px",
                        background: "linear-gradient(90deg, var(--border), transparent)",
                        margin: "16px 0",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--foreground-muted)",
                        margin: 0,
                        lineHeight: 1.65,
                        fontWeight: 400,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: "16px",
                    }}
                >
                    {renderContentWithMentions(content)}
                </div>

                {/* Footer Interactions */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border-subtle)",
                    }}
                >
                    <LikeButton
                        noteId={id}
                        initialLikesCount={initialLikesCount}
                        initialIsLiked={initialIsLiked}
                    />
                    <SaveButton
                        noteId={id}
                        initialIsSaved={initialIsSaved}
                        initialSavesCount={initialSavesCount}
                    />
                </div>
            </div>
        </div>
    );
}
