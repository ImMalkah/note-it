import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import { notFound } from "next/navigation";
import DeleteNoteButton from "./DeleteNoteButton";

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
        .select("id, title, content, created_at, author_id, profiles!notes_author_id_fkey(username)")
        .eq("id", noteId)
        .single();

    if (error || !note) {
        notFound();
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const profile = note.profiles as unknown as { username: string } | null;
    const authorName = profile?.username || "unknown";
    const isAuthor = user?.id === note.author_id;

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
                    maxWidth: "700px",
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

                    {/* Author and Date */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                        }}
                    >
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
