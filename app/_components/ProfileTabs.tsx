"use client";

import { useState } from "react";
import NoteCard from "@/app/_components/NoteCard";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

interface Note {
    id: number;
    title: string;
    content: string;
    author: string;
    authorAvatarUrl?: string | null;
    date: string;
    likesCount: number;
}

interface ProfileTabsProps {
    username: string;
    notes: Note[];
    savedNotes: Note[];
    likedNotes: Note[];
    isOwnProfile: boolean;
    savedVisible: boolean;
    likedVisible: boolean;
    userLikes: Set<number>;
    userSaves: Set<number>;
}

export default function ProfileTabs({
    username,
    notes,
    savedNotes,
    likedNotes,
    isOwnProfile,
    savedVisible,
    likedVisible,
    userLikes,
    userSaves
}: ProfileTabsProps) {
    // "notes" | "saved" | "liked"
    const [activeTab, setActiveTab] = useState("notes");

    // For updating visibility settings
    const [isSavedVisible, setIsSavedVisible] = useState(savedVisible);
    const [isLikedVisible, setIsLikedVisible] = useState(likedVisible);
    const [loadingSettings, setLoadingSettings] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    const handleToggleSetting = async (field: "saved_notes_visible" | "liked_notes_visible", currentValue: boolean) => {
        setLoadingSettings(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { error } = await supabase
                .from("profiles")
                .update({ [field]: !currentValue })
                .eq("id", session.user.id);

            if (!error) {
                if (field === "saved_notes_visible") setIsSavedVisible(!currentValue);
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
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "20px"
            }}>
                {noteList.map((note, index) => (
                    <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        author={note.author}
                        date={note.date}
                        content={note.content}
                        index={index}
                        initialLikesCount={note.likesCount}
                        initialIsLiked={userLikes.has(note.id)}
                        initialIsSaved={userSaves.has(note.id)}
                        authorAvatarUrl={note.authorAvatarUrl}
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

                {(isOwnProfile || isSavedVisible) && (
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
            {isOwnProfile && activeTab === "saved" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--foreground-muted)", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={isSavedVisible}
                            disabled={loadingSettings}
                            onChange={() => handleToggleSetting("saved_notes_visible", isSavedVisible)}
                        />
                        Make Saved Notes Public
                    </label>
                </div>
            )}

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
            {activeTab === "notes" && renderNotes(notes, `${username} hasn't written any notes yet.`)}
            {activeTab === "saved" && renderNotes(savedNotes, isOwnProfile ? "You haven't saved any notes yet." : `${username} hasn't saved any notes.`)}
            {activeTab === "liked" && renderNotes(likedNotes, isOwnProfile ? "You haven't liked any notes yet." : `${username} hasn't liked any notes.`)}
        </div>
    );
}
