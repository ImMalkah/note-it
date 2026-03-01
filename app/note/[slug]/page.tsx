import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import { notFound } from "next/navigation";
import DeleteNoteButton from "./DeleteNoteButton";
import LikeButton from "@/app/_components/LikeButton";
import SaveButton from "@/app/_components/SaveButton";
import { getMoodById } from "@/app/_utils/moods";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function NotePage({ params }: PageProps) {
    const { slug } = await params;
    const noteId = parseInt(slug, 10);

    if (isNaN(noteId)) {
        notFound();
    }

    const supabase = await createClient();

    const { data: note, error } = await supabase
        .from("notes")
        .select("id, title, content, created_at, author_id, profiles!notes_author_id_fkey(username, avatar_url), note_likes(count), saved_notes(count)")
        .eq("id", noteId)
        .single();

    if (error || !note) {
        notFound();
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const profile = note.profiles as unknown as { username: string, avatar_url: string | null } | null;
    const authorName = profile?.username || "unknown";
    const authorAvatarUrl = profile?.avatar_url || null;
    const isAuthor = user?.id === note.author_id;

    let isLiked = false;
    let isSaved = false;

    if (user) {
        const [likesRes, savesRes] = await Promise.all([
            supabase.from("note_likes").select("note_id").eq("user_id", user.id).eq("note_id", noteId).single(),
            supabase.from("saved_notes").select("note_id").eq("user_id", user.id).eq("note_id", noteId).single()
        ]);
        if (likesRes.data) isLiked = true;
        if (savesRes.data) isSaved = true;
    }

    const likesCount = (note.note_likes as any)?.[0]?.count || 0;
    const savesCount = (note.saved_notes as any)?.[0]?.count || 0;

    const formattedDate = new Date(note.created_at as string).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }
    );

    return (
        <div
            style={{
                minHeight: "calc(100vh - 64px)",
                background:
                    "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
                padding: "60px 24px 80px",
            }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                {/* Back link */}
                <Link
                    href="/"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "var(--foreground-muted)",
                        background: "var(--surface)",
                        border: "1px solid var(--border-subtle)",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        marginBottom: "24px",
                    }}
                >
                    ← Back to all notes
                </Link>

                {/* Note Card */}
                <div
                    className="gradient-border"
                    style={{
                        background: "var(--surface)",
                        borderRadius: "16px",
                        padding: "40px",
                    }}
                >
                    {/* Title */}
                    {(() => {
                        const mood = getMoodById(note.title);
                        if (mood) {
                            return (
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "8px 24px",
                                        borderRadius: "100px",
                                        background: `${mood.color}15`,
                                        border: `1px solid ${mood.color}30`,
                                        marginBottom: "24px",
                                    }}
                                >
                                    <span style={{ fontSize: "1.8rem" }}>{mood.emoji}</span>
                                    <span
                                        style={{
                                            fontSize: "1.25rem",
                                            fontWeight: 700,
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
                            <h1
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    color: "var(--foreground)",
                                    margin: "0 0 16px",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.3,
                                }}
                            >
                                {note.title}
                            </h1>
                        );
                    })()}

                    {/* Author and Date */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                        }}
                    >
                        {authorAvatarUrl ? (
                            <img src={authorAvatarUrl} alt={authorName} style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid var(--border-subtle)" }} />
                        ) : (
                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                                {authorName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span
                            style={{
                                fontSize: "0.85rem",
                                color: "var(--foreground-muted)",
                            }}
                        >
                            by
                        </span>
                        <Link
                            href={`/profile/${authorName}`}
                            className="gradient-text"
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: 600,
                            }}
                        >
                            {authorName}
                        </Link>
                    </div>

                    <p
                        style={{
                            fontSize: "0.8rem",
                            color: "var(--foreground-muted)",
                            margin: "0 0 24px",
                            opacity: 0.7,
                        }}
                    >
                        {formattedDate}
                    </p>

                    {/* Divider */}
                    <div
                        style={{
                            height: "1px",
                            background:
                                "linear-gradient(90deg, var(--border), transparent)",
                            margin: "0 0 24px",
                        }}
                    />

                    {/* Content */}
                    <div
                        style={{
                            fontSize: "1rem",
                            color: "var(--foreground)",
                            lineHeight: 1.8,
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {note.content}
                    </div>

                    {/* Footer Interactions */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "32px",
                            paddingTop: "16px",
                            borderTop: "1px solid var(--border-subtle)",
                        }}
                    >
                        <LikeButton
                            noteId={noteId}
                            initialLikesCount={likesCount}
                            initialIsLiked={isLiked}
                        />
                        <SaveButton
                            noteId={noteId}
                            initialIsSaved={isSaved}
                            initialSavesCount={savesCount}
                        />
                    </div>

                    {/* Delete Button (only for author) */}
                    {isAuthor && (
                        <>
                            <div
                                style={{
                                    height: "1px",
                                    background:
                                        "linear-gradient(90deg, var(--border), transparent)",
                                    margin: "32px 0 24px",
                                }}
                            />
                            <DeleteNoteButton noteId={note.id as number} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
