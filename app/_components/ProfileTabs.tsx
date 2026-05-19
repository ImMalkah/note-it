"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NoteCard from "@/app/_components/NoteCard";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

interface Note {
    id: number;
    mood: string | null;
    content: string;
    author: string;
    authorAvatarUrl?: string | null;
    date: string;
    likesCount: number;
    savesCount: number;
}

interface ProfileTabsProps {
    profileId?: string;
    currentUserId?: string;
    username: string;
    notes: Note[];
    savedNotes: Note[];
    likedNotes: Note[];
    isOwnProfile: boolean;
    likedVisible: boolean;
    userLikes: Set<number>;
    userSaves: Set<number>;
}

export default function ProfileTabs({
    profileId,
    currentUserId,
    username,
    notes,
    savedNotes,
    likedNotes,
    isOwnProfile,
    likedVisible,
    userLikes,
    userSaves
}: ProfileTabsProps) {
    // Local state for optimistic UI updates (e.g., instant delete)
    const [localNotes, setLocalNotes] = useState(notes);
    const [localSaved, setLocalSaved] = useState(savedNotes);
    const [localLiked, setLocalLiked] = useState(likedNotes);

    // Sync state if props change (e.g., on router refresh)
    useEffect(() => setLocalNotes(notes), [notes]);
    useEffect(() => setLocalSaved(savedNotes), [savedNotes]);
    useEffect(() => setLocalLiked(likedNotes), [likedNotes]);

    const handleDelete = (deletedId: number) => {
        setLocalNotes(prev => prev.filter(n => n.id !== deletedId));
        setLocalSaved(prev => prev.filter(n => n.id !== deletedId));
        setLocalLiked(prev => prev.filter(n => n.id !== deletedId));
    };

    // "notes" | "saved" | "liked"
    const [activeTab, setActiveTab] = useState("notes");

    // Pagination states
    const [pages, setPages] = useState({ notes: 1, saved: 1, liked: 1 });
    const [hasMore, setHasMore] = useState({ 
        notes: notes.length >= 20, 
        saved: savedNotes.length >= 20, 
        liked: likedNotes.length >= 20 
    });
    const [loadingMore, setLoadingMore] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // For updating visibility settings
    const [isLikedVisible, setIsLikedVisible] = useState(likedVisible);
    const [loadingSettings, setLoadingSettings] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    const fetchMoreNotes = useCallback(async () => {
        if (loadingMore || !hasMore[activeTab as keyof typeof hasMore] || !profileId) return;
        setLoadingMore(true);

        const page = pages[activeTab as keyof typeof pages];
        const from = page * 20;
        const to = from + 19;

        let query;
        if (activeTab === "notes") {
            query = supabase
                .from("notes")
                .select("id, mood, content, created_at, note_likes(count), saved_notes(count), profiles!notes_author_id_fkey(username, avatar_url)")
                .eq("author_id", profileId)
                .order("created_at", { ascending: false })
                .range(from, to);
        } else if (activeTab === "saved") {
            query = supabase
                .from("saved_notes")
                .select(`
                    note_id,
                    notes (id, mood, content, created_at, profiles!notes_author_id_fkey(username, avatar_url), note_likes(count), saved_notes(count))
                `)
                .eq("user_id", profileId)
                .order("created_at", { ascending: false })
                .range(from, to);
        } else if (activeTab === "liked") {
            query = supabase
                .from("note_likes")
                .select(`
                    note_id,
                    notes (id, mood, content, created_at, profiles!notes_author_id_fkey(username, avatar_url), note_likes(count), saved_notes(count))
                `)
                .eq("user_id", profileId)
                .order("created_at", { ascending: false })
                .range(from, to);
        }

        if (query) {
            const { data } = await query;
            let rawNotes: any[] = [];
            
            if (data && data.length > 0) {
                if (activeTab === "notes") {
                    rawNotes = data;
                } else {
                    rawNotes = data.map((d: any) => d.notes).filter(n => n);
                }

                if (currentUserId && rawNotes.length > 0) {
                    const ids = rawNotes.map(n => n.id);
                    const [likesRes, savesRes] = await Promise.all([
                        supabase.from("note_likes").select("note_id").eq("user_id", currentUserId).in("note_id", ids),
                        supabase.from("saved_notes").select("note_id").eq("user_id", currentUserId).in("note_id", ids)
                    ]);
                    
                    if (likesRes.data) likesRes.data.forEach(l => userLikes.add(l.note_id));
                    if (savesRes.data) savesRes.data.forEach(s => userSaves.add(s.note_id));
                }

                const formatted = rawNotes.map(n => ({
                    id: n.id,
                    mood: n.mood,
                    content: n.content,
                    author: n.profiles?.username || "unknown",
                    authorAvatarUrl: n.profiles?.avatar_url,
                    date: new Date(n.created_at).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "2-digit",
                        hour: "2-digit", minute: "2-digit", hour12: true,
                    }),
                    likesCount: n.note_likes?.[0]?.count || 0,
                    savesCount: n.saved_notes?.[0]?.count || 0,
                }));

                if (activeTab === "notes") {
                    setLocalNotes(prev => {
                        const existingIds = new Set(prev.map(n => n.id));
                        return [...prev, ...formatted.filter(n => !existingIds.has(n.id))];
                    });
                } else if (activeTab === "saved") {
                    setLocalSaved(prev => {
                        const existingIds = new Set(prev.map(n => n.id));
                        return [...prev, ...formatted.filter(n => !existingIds.has(n.id))];
                    });
                } else if (activeTab === "liked") {
                    setLocalLiked(prev => {
                        const existingIds = new Set(prev.map(n => n.id));
                        return [...prev, ...formatted.filter(n => !existingIds.has(n.id))];
                    });
                }

                setPages(prev => ({ ...prev, [activeTab]: prev[activeTab as keyof typeof prev] + 1 }));
                if (data.length < 20) {
                    setHasMore(prev => ({ ...prev, [activeTab]: false }));
                }
            } else {
                setHasMore(prev => ({ ...prev, [activeTab]: false }));
            }
        }
        
        setLoadingMore(false);
    }, [activeTab, loadingMore, hasMore, pages, profileId, currentUserId, supabase, userLikes, userSaves]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchMoreNotes();
            }
        }, { threshold: 0.1 });

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchMoreNotes]);

    const handleToggleSetting = async (field: "saved_notes_visible" | "liked_notes_visible", currentValue: boolean) => {
        setLoadingSettings(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { error } = await supabase
                .from("profiles")
                .update({ [field]: !currentValue })
                .eq("id", session.user.id);

            if (!error) {
                if (field === "liked_notes_visible") setIsLikedVisible(!currentValue);
                router.refresh();
            }
        }
        setLoadingSettings(false);
    };

    const renderNotes = (noteList: Note[], emptyMessage: string) => {
        if (noteList.length === 0) {
            return (
                <div style={{
                    textAlign: "center", padding: "60px 24px",
                    color: "var(--foreground-muted)", background: "var(--surface)",
                    borderRadius: "16px", border: "1px solid var(--border-subtle)",
                }}>
                    <p style={{ fontSize: "2rem", marginBottom: "12px" }}>📝</p>
                    <p style={{ fontSize: "0.9rem" }}>{emptyMessage}</p>
                </div>
            );
        }

        return (
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", alignItems: "start", gap: "20px"
            }}>
                {noteList.map((note, index) => (
                    <NoteCard
                        key={note.id}
                        id={note.id}
                        mood={note.mood}
                        author={note.author}
                        date={note.date}
                        content={note.content}
                        index={index}
                        initialLikesCount={note.likesCount}
                        initialSavesCount={note.savesCount}
                        initialIsLiked={userLikes.has(note.id)}
                        initialIsSaved={userSaves.has(note.id)}
                        authorAvatarUrl={note.authorAvatarUrl}
                        isAuthor={isOwnProfile}
                        onDeleteAction={handleDelete}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            {/* Tabs Navigation */}
            <div style={{
                display: "flex", gap: "24px", borderBottom: "1px solid var(--border-subtle)", marginBottom: "24px"
            }}>
                <button
                    onClick={() => setActiveTab("notes")}
                    style={{
                        padding: "12px 0", background: "none", border: "none",
                        borderBottom: activeTab === "notes" ? "2px solid var(--primary)" : "2px solid transparent",
                        color: activeTab === "notes" ? "var(--foreground)" : "var(--foreground-muted)",
                        fontWeight: activeTab === "notes" ? 600 : 500,
                        fontSize: "1rem", cursor: "pointer", transition: "all 0.2s ease"
                    }}
                >
                    Notes
                </button>

                {isOwnProfile && (
                    <button
                        onClick={() => setActiveTab("saved")}
                        style={{
                            padding: "12px 0", background: "none", border: "none",
                            borderBottom: activeTab === "saved" ? "2px solid var(--primary)" : "2px solid transparent",
                            color: activeTab === "saved" ? "var(--foreground)" : "var(--foreground-muted)",
                            fontWeight: activeTab === "saved" ? 600 : 500,
                            fontSize: "1rem", cursor: "pointer", transition: "all 0.2s ease"
                        }}
                    >
                        Saved
                    </button>
                )}

                {(isOwnProfile || isLikedVisible) && (
                    <button
                        onClick={() => setActiveTab("liked")}
                        style={{
                            padding: "12px 0", background: "none", border: "none",
                            borderBottom: activeTab === "liked" ? "2px solid var(--primary)" : "2px solid transparent",
                            color: activeTab === "liked" ? "var(--foreground)" : "var(--foreground-muted)",
                            fontWeight: activeTab === "liked" ? 600 : 500,
                            fontSize: "1rem", cursor: "pointer", transition: "all 0.2s ease"
                        }}
                    >
                        Liked
                    </button>
                )}
            </div>

            {/* Tab Context / Settings */}
            {isOwnProfile && activeTab === "liked" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--foreground-muted)", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={isLikedVisible}
                            disabled={loadingSettings}
                            onChange={() => handleToggleSetting("liked_notes_visible", isLikedVisible)}
                        />
                        Make Liked Notes Public
                    </label>
                </div>
            )}

            {/* Tab Content */}
            {activeTab === "notes" && renderNotes(localNotes, `${username} hasn't written any notes yet.`)}
            {activeTab === "saved" && renderNotes(localSaved, isOwnProfile ? "You haven't saved any notes yet." : `${username} hasn't saved any notes.`)}
            {activeTab === "liked" && renderNotes(localLiked, isOwnProfile ? "You haven't liked any notes yet." : `${username} hasn't liked any notes.`)}
            
            {/* Infinite Scroll Trigger */}
            <div 
                ref={observerTarget} 
                style={{ 
                    height: "40px", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                    marginTop: "20px"
                }}
            >
                {loadingMore && (
                    <div style={{ color: "var(--primary)", fontSize: "0.9rem" }}>
                        Loading more notes...
                    </div>
                )}
                {!hasMore[activeTab as keyof typeof hasMore] && 
                 ((activeTab === "notes" && localNotes.length > 0) || 
                  (activeTab === "saved" && localSaved.length > 0) || 
                  (activeTab === "liked" && localLiked.length > 0)) && (
                    <div style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
                        You've reached the end!
                    </div>
                )}
            </div>
        </div>
    );
}
