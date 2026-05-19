"use client";

import Link from "next/link";
import React, { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/client";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { getMoodById } from "@/app/_utils/moods";
import { Trash2 } from "lucide-react";

interface NoteCardProps {
    id: number;
    mood?: string | null;
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
    mood,
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

    // Track mouse position on pointerdown so we can tell a clean click
    // apart from a click-hold-drag (text selection). If the pointer moved
    // more than 5px we skip navigation.
    const pointerOrigin = useRef<{ x: number; y: number } | null>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        pointerOrigin.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!pointerOrigin.current) return;
        const dx = Math.abs(e.clientX - pointerOrigin.current.x);
        const dy = Math.abs(e.clientY - pointerOrigin.current.y);
        pointerOrigin.current = null;
        // If user dragged (text selection), bail out
        if (dx > 5 || dy > 5) return;
        // Also skip if there is an active text selection
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        router.push(`/note/${id}`);
    };

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
            className={index >= 0 ? "hover-glass-card animate-fade-in-up" : "hover-glass-card"}
            onPointerDown={handlePointerDown}
            onClick={handleClick}
            style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                borderRadius: "24px",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                animationDelay: index >= 0 ? `${index * 0.05}s` : undefined,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                userSelect: "text",
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
                        aria-label={`Delete note`}
                    >
                        <Trash2 size={16} strokeWidth={2} />
                    </button>
                )}

                {/* Mood Row */}
                {mood ? (
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
                            const moodObj = getMoodById(mood);
                            if (moodObj) {
                                return (
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "4px 12px",
                                            borderRadius: "20px",
                                            background: `${moodObj.color}15`,
                                            border: `1px solid ${moodObj.color}30`,
                                            flex: 1,
                                        }}
                                    >
                                        <div style={{ color: moodObj.color, display: "flex" }}>
                                            <moodObj.icon size={20} strokeWidth={2.5} />
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "0.95rem",
                                                fontWeight: 600,
                                                color: moodObj.color,
                                                letterSpacing: "0.02em",
                                            }}
                                        >
                                            Feeling {moodObj.label.toLowerCase()}
                                        </span>
                                    </div>
                                );
                            }
                            return null;
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
                        paddingRight: !mood && isAuthor ? "40px" : "0",
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
                        background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
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
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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
