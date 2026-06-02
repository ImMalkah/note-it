"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/app/_lib/supabase/client";
import Link from "next/link";
import FollowButton from "./FollowButton";

interface UserListModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: "followers" | "following" | "likes";
    targetId: string | number;
}

interface UserData {
    id: string;
    username: string;
    avatar_url?: string | null;
}

export default function UserListModal({ isOpen, onClose, title, type, targetId }: UserListModalProps) {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserFollowing, setCurrentUserFollowing] = useState<Set<string>>(new Set());
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (!isOpen) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Get current user to figure out follow status
                const { data: { session } } = await supabase.auth.getSession();
                const loggedInUserId = session?.user?.id || null;
                setCurrentUserId(loggedInUserId);

                let fetchedUsers: UserData[] = [];

                if (type === "followers") {
                    const { data } = await supabase
                        .from("user_follows")
                        .select("profiles!user_follows_follower_id_fkey(id, username, avatar_url)")
                        .eq("following_id", targetId);

                    if (data) {
                        fetchedUsers = data.map((d: any) => d.profiles).filter(Boolean);
                    }
                } else if (type === "following") {
                    const { data } = await supabase
                        .from("user_follows")
                        .select("profiles!user_follows_following_id_fkey(id, username, avatar_url)")
                        .eq("follower_id", targetId);

                    if (data) {
                        fetchedUsers = data.map((d: any) => d.profiles).filter(Boolean);
                    }
                } else if (type === "likes") {
                    const { data } = await supabase
                        .from("note_likes")
                        .select("profiles(id, username, avatar_url)")
                        .eq("note_id", targetId);

                    if (data) {
                        fetchedUsers = data.map((d: any) => d.profiles).filter(Boolean);
                    }
                }

                setUsers(fetchedUsers);

                // Fetch who the current user is following out of this list
                if (loggedInUserId && fetchedUsers.length > 0) {
                    const userIds = fetchedUsers.map(u => u.id);
                    const { data: followingData } = await supabase
                        .from("user_follows")
                        .select("following_id")
                        .eq("follower_id", loggedInUserId)
                        .in("following_id", userIds);

                    if (followingData) {
                        const followingSet = new Set<string>(followingData.map((d: any) => d.following_id as string));
                        setCurrentUserFollowing(followingSet);
                    }
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        setMounted(true);
    }, [isOpen, type, targetId, supabase]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
        }} onClick={(e) => {
            e.stopPropagation();
            onClose();
        }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                borderRadius: "24px",
                width: "90%",
                maxWidth: "400px",
                maxHeight: "80vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <h2 style={{ margin: 0, fontSize: "1.25rem", color: "var(--foreground)", fontWeight: 700 }}>{title}</h2>
                    <button onClick={onClose} style={{
                        background: "transparent", border: "none", color: "var(--foreground-muted)",
                        cursor: "pointer", fontSize: "1.5rem", lineHeight: 1, padding: 0
                    }}>&times;</button>
                </div>

                {/* Body */}
                <div style={{
                    padding: "16px 24px",
                    overflowY: "auto",
                    flex: 1
                }}>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--foreground-muted)" }}>
                            Loading...
                        </div>
                    ) : users.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--foreground-muted)" }}>
                            No users found.
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {users.map((u) => (
                                <div key={u.id} style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        {u.avatar_url ? (
                                            <img src={u.avatar_url} alt={u.username} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid var(--border-subtle)" }} />
                                        ) : (
                                            <div style={{
                                                width: "40px", height: "40px", borderRadius: "50%",
                                                background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "white", fontWeight: 700, fontSize: "1rem"
                                            }}>
                                                {u.username.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <Link href={`/profile/${u.username}`} onClick={onClose} style={{
                                            color: "var(--foreground)", textDecoration: "none", fontWeight: 600
                                        }}>
                                            {u.username}
                                        </Link>
                                    </div>

                                    {currentUserId && currentUserId !== u.id && (
                                        <FollowButton
                                            targetUserId={u.id}
                                            initialIsFollowing={currentUserFollowing.has(u.id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
