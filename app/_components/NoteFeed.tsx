"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import NoteCard from "./NoteCard";
import Link from "next/link";

export interface FormattedNote {
    id: number;
    title: string;
    content: string;
    author: string;
    authorAvatarUrl: string | null;
    date: string;
    likesCount: number;
    savesCount: number;
    isLiked: boolean;
    isSaved: boolean;
}

interface NoteFeedProps {
    initialNotes: FormattedNote[];
    userId?: string; // logged-in user, used to fetch per-user like/save status
}

export default function NoteFeed({ initialNotes, userId }: NoteFeedProps) {
    const [notes, setNotes] = useState<FormattedNote[]>(initialNotes);
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel("notes-feed-realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "notes" },
                async (payload) => {
                    const newId = payload.new.id as number;

                    // Fetch the full note with profile and like count
                    const { data: note } = await supabase
                        .from("notes")
                        .select(
                            `id, title, content, created_at,
               profiles!notes_author_id_fkey(username, avatar_url),
               note_likes(count)`
                        )
                        .eq("id", newId)
                        .single();

                    if (!note) return;

                    const profile = note.profiles as unknown as {
                        username: string;
                        avatar_url: string | null;
                    } | null;

                    let isLiked = false;
                    let isSaved = false;
                    if (userId) {
                        const [likeRes, saveRes] = await Promise.all([
                            supabase
                                .from("note_likes")
                                .select("note_id")
                                .eq("user_id", userId)
                                .eq("note_id", newId)
                                .maybeSingle(),
                            supabase
                                .from("saved_notes")
                                .select("note_id")
                                .eq("user_id", userId)
                                .eq("note_id", newId)
                                .maybeSingle(),
                        ]);
                        isLiked = !!likeRes.data;
                        isSaved = !!saveRes.data;
                    }

                    const formatted: FormattedNote = {
                        id: note.id,
                        title: note.title,
                        content: note.content,
                        author: profile?.username || "unknown",
                        authorAvatarUrl: profile?.avatar_url || null,
                        date: new Date(note.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        }),
                        likesCount: (note.note_likes as { count: number }[])?.[0]?.count || 0,
                        savesCount: 0,
                        isLiked,
                        isSaved,
                    };

                    // Prepend the new note to the top of the list
                    setNotes((prev) => [formatted, ...prev]);
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "notes" },
                (payload) => {
                    const deletedId = payload.old.id as number;
                    setNotes((prev) => prev.filter((n) => n.id !== deletedId));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    if (notes.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--foreground-muted)" }}>
                <p style={{ fontSize: "3rem", marginBottom: "16px" }}>📝</p>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px", color: "var(--foreground)" }}>
                    No notes yet
                </h2>
                <p style={{ fontSize: "0.9rem", marginBottom: "24px" }}>
                    {userId ? "Be the first to share a note!" : "Login or register to start sharing notes."}
                </p>
                {userId ? (
                    <Link
                        href="/new_note"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "12px 24px", borderRadius: "12px",
                            background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                            color: "white", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                        }}
                    >
                        + Write your first note
                    </Link>
                ) : (
                    <Link
                        href="/register"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "12px 24px", borderRadius: "12px",
                            background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                            color: "white", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                        }}
                    >
                        Get started
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: "20px",
            }}
        >
            {notes.map((note, index) => (
                <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    author={note.author}
                    date={note.date}
                    content={note.content}
                    index={index}
                    initialLikesCount={note.likesCount}
                    initialSavesCount={note.savesCount}
                    initialIsLiked={note.isLiked}
                    initialIsSaved={note.isSaved}
                    authorAvatarUrl={note.authorAvatarUrl}
                />
            ))}
        </div>
    );
}
