"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import NoteCard from "./NoteCard";
import Link from "next/link";

export interface FormattedNote {
    id: number;
    mood: string | null;
    content: string;
    author: string;
    authorId: string;
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
    // Only tracks the IDs of the *latest* batch — replaced, never accumulated.
    // This keeps the stagger delay bounded to the batch size (max ~1s).
    const [currentBatchIds, setCurrentBatchIds] = useState<Set<number>>(new Set());
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialNotes.length >= 20);
    const [loadingMore, setLoadingMore] = useState(false);
    
    const supabase = createClient();
    const observerTarget = useRef<HTMLDivElement>(null);

    const fetchMoreNotes = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);

        const from = page * 20;
        const to = from + 19;

        const { data: newNotes } = await supabase
            .from("notes")
            .select(`
                id, mood, content, created_at, author_id,
                profiles!notes_author_id_fkey(username, avatar_url),
                note_likes(count),
                saved_notes(count)
            `)
            .order("created_at", { ascending: false })
            .range(from, to);

        if (newNotes && newNotes.length > 0) {
            let userLikes = new Set<number>();
            let userSaves = new Set<number>();

            if (userId) {
                const noteIds = newNotes.map(n => n.id);
                const [likesRes, savesRes] = await Promise.all([
                    supabase.from("note_likes").select("note_id").eq("user_id", userId).in("note_id", noteIds),
                    supabase.from("saved_notes").select("note_id").eq("user_id", userId).in("note_id", noteIds)
                ]);

                if (likesRes.data) likesRes.data.forEach(l => userLikes.add(l.note_id));
                if (savesRes.data) savesRes.data.forEach(s => userSaves.add(s.note_id));
            }

            const formatted = newNotes.map((note) => {
                const profile = note.profiles as unknown as { username: string, avatar_url: string | null } | null;
                return {
                    id: note.id as number,
                    mood: note.mood as string | null,
                    content: note.content as string,
                    author: profile?.username || "unknown",
                    authorId: note.author_id as string,
                    authorAvatarUrl: profile?.avatar_url || null,
                    date: new Date(note.created_at as string).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }),
                    likesCount: (note.note_likes as any)?.[0]?.count || 0,
                    savesCount: (note.saved_notes as any)?.[0]?.count || 0,
                    isLiked: userLikes.has(note.id as number),
                    isSaved: userSaves.has(note.id as number),
                };
            });

            setNotes(prev => {
                const existingIds = new Set(prev.map(n => n.id));
                const uniqueNewNotes = formatted.filter(n => !existingIds.has(n.id));
                // Replace (not accumulate) — stagger index stays 0-based per batch
                setCurrentBatchIds(new Set(uniqueNewNotes.map(n => n.id)));
                return [...prev, ...uniqueNewNotes];
            });
            setPage(p => p + 1);
            if (newNotes.length < 20) setHasMore(false);
        } else {
            setHasMore(false);
        }

        setLoadingMore(false);
    }, [page, hasMore, loadingMore, supabase, userId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchMoreNotes();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchMoreNotes]);

    useEffect(() => {
        const channel = supabase
            .channel("notes-feed-realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "notes" },
                async (payload: any) => {
                    const newId = payload.new.id as number;

                    // Fetch the full note with profile and like count
                    const { data: note } = await supabase
                        .from("notes")
                        .select(
                            `id, mood, content, created_at, author_id,
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
                        mood: note.mood,
                        content: note.content,
                        author: profile?.username || "unknown",
                        authorId: note.author_id,
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
                (payload: any) => {
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
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                    alignItems: "start",
                    gap: "20px",
                    marginBottom: "40px"
                }}
            >
                {notes.map((note) => {
                    const batchArr = Array.from(currentBatchIds);
                    const batchIndex = batchArr.indexOf(note.id);
                    const isNew = batchIndex !== -1;
                    return (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            mood={note.mood}
                            author={note.author}
                            date={note.date}
                            content={note.content}
                            index={isNew ? batchIndex : -1}
                            initialLikesCount={note.likesCount}
                            initialSavesCount={note.savesCount}
                            initialIsLiked={note.isLiked}
                            initialIsSaved={note.isSaved}
                            authorAvatarUrl={note.authorAvatarUrl}
                            isAuthor={userId === note.authorId}
                            onDeleteAction={(deletedId) => setNotes((prev) => prev.filter((n) => n.id !== deletedId))}
                        />
                    );
                })}
            </div>
            
            {/* Infinite Scroll Trigger */}
            <div 
                ref={observerTarget} 
                style={{ 
                    height: "40px", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center" 
                }}
            >
                {loadingMore && (
                    <div style={{ color: "var(--primary)", fontSize: "0.9rem" }}>
                        Loading more notes...
                    </div>
                )}
                {!hasMore && notes.length > 0 && (
                    <div style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
                        You've reached the end!
                    </div>
                )}
            </div>
        </div>
    );
}
