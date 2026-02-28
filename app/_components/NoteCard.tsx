"use client";

import Link from "next/link";
import React from 'react';
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

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
}: NoteCardProps) {
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
            style={{
                background: "var(--surface)",
                borderRadius: "16px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                animationDelay: `${index * 0.05}s`,
                cursor: "default",
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
            <div style={{ padding: "24px" }}>
                {/* Title Row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginBottom: "12px",
                    }}
                >
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

                    <Link
                        href={`/note/${id}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "var(--primary-soft)",
                            color: "var(--primary)",
                            fontSize: "0.85rem",
                            transition: "all 0.2s ease",
                            flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--primary)";
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--primary-soft)";
                            e.currentTarget.style.color = "var(--primary)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                        aria-label={`Expand note: ${title}`}
                    >
                        ↗
                    </Link>
                </div>

                {/* Author */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "4px",
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
                        marginTop: "16px",
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
