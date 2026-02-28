import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import { notFound } from "next/navigation";
import NoteCard from "@/app/_components/NoteCard";

interface PageProps {
    params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params;
    const supabase = await createClient();

    // Fetch the profile
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, created_at")
        .eq("username", username)
        .single();

    if (profileError || !profile) {
        notFound();
    }

    // Fetch their notes
    const { data: notes } = await supabase
        .from("notes")
        .select("id, title, content, created_at")
        .eq("author_id", profile.id)
        .order("created_at", { ascending: false });

    const formattedNotes = (notes || []).map((note) => ({
        id: note.id as number,
        title: note.title as string,
        content: note.content as string,
        author: profile.username as string,
        date: new Date(note.created_at as string).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
    }));

    const memberSince = new Date(
        profile.created_at as string
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    return (
        <div
            style={{
                minHeight: "calc(100vh - 64px)",
                background:
                    "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
                padding: "40px 24px 80px",
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
                        marginBottom: "32px",
                    }}
                >
                    ← Back
                </Link>

                {/* Profile Header */}
                <div
                    className="gradient-border"
                    style={{
                        background: "var(--surface)",
                        borderRadius: "16px",
                        padding: "32px 40px",
                        marginBottom: "36px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        {/* Avatar */}
                        <div
                            style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.5rem",
                                fontWeight: 800,
                                color: "white",
                                flexShrink: 0,
                            }}
                        >
                            {(profile.username as string).charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1
                                className="gradient-text"
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    margin: 0,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {profile.username}
                            </h1>
                            <p
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--foreground-muted)",
                                    margin: "4px 0 0",
                                }}
                            >
                                Member since {memberSince} · {formattedNotes.length} note
                                {formattedNotes.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <h2
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: "20px",
                    }}
                >
                    Notes by {profile.username}
                </h2>

                {formattedNotes.length === 0 ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px 24px",
                            color: "var(--foreground-muted)",
                            background: "var(--surface)",
                            borderRadius: "16px",
                            border: "1px solid var(--border-subtle)",
                        }}
                    >
                        <p style={{ fontSize: "2rem", marginBottom: "12px" }}>📝</p>
                        <p style={{ fontSize: "0.9rem" }}>
                            {profile.username} hasn&apos;t written any notes yet.
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {formattedNotes.map((note, index) => (
                            <NoteCard
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                author={note.author}
                                date={note.date}
                                content={note.content}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
