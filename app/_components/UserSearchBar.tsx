"use client";

import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserInfo {
    username: string;
    avatar_url?: string | null;
}

export default function UserSearchBar() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    // We want to differentiate between "no results yet" vs "empty results"
    const [hasSearched, setHasSearched] = useState(false);

    const router = useRouter();
    const supabase = createClient();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!query || query.trim() === "") {
            setUsers([]);
            setHasSearched(false);
            return;
        }

        const fetchUsers = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .ilike('username', `${query}%`)
                .limit(5);

            if (data) {
                setUsers(data as UserInfo[]);
            }
            setSelectedIndex(0);
            setHasSearched(true);
        };

        // Debounce search by 200ms
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Handle selecting a user
    const navigateToProfile = (username: string) => {
        setQuery("");
        setUsers([]);
        setIsFocused(false);
        inputRef.current?.blur();
        router.push(`/profile/${username}`);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (users.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % users.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + users.length) % users.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                navigateToProfile(users[selectedIndex].username);
            }
        }

        if (e.key === "Escape") {
            inputRef.current?.blur();
            setIsFocused(false);
        }
    };

    const renderUsernameWithHighlight = (username: string, searchStr: string) => {
        if (!searchStr) return username;
        const lowerUsername = username.toLowerCase();
        const lowerQuery = searchStr.toLowerCase();
        const matchStart = lowerUsername.indexOf(lowerQuery);

        if (matchStart === -1) return username;

        const before = username.substring(0, matchStart);
        const match = username.substring(matchStart, matchStart + searchStr.length);
        const after = username.substring(matchStart + searchStr.length);

        return (
            <>
                {before}
                <span style={{ color: "var(--primary)", fontWeight: 800 }}>{match}</span>
                {after}
            </>
        );
    };

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
            <div style={{ position: "relative" }}>
                <i className="fa-solid fa-search" style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: isFocused ? "var(--primary)" : "var(--foreground-muted)",
                    fontSize: "0.9rem",
                    transition: "color 0.2s ease"
                }}></i>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // Delay hiding so clicks on the dropdown register before blur unmounts it
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    placeholder="Search users..."
                    style={{
                        width: "100%",
                        padding: "10px 16px 10px 38px",
                        borderRadius: "20px",
                        border: `1px solid ${isFocused ? "var(--primary)" : "rgba(255, 255, 255, 0.1)"}`,
                        background: isFocused ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.2)",
                        color: "var(--foreground)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "all 0.3s ease",
                        boxShadow: isFocused 
                            ? "0 0 0 3px var(--primary-soft), inset 0 2px 4px rgba(0,0,0,0.2)" 
                            : "inset 0 2px 4px rgba(0,0,0,0.2)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                />
            </div>

            {/* Autocomplete Dropdown */}
            {isFocused && query.trim() !== "" && (
                <div style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "0",
                    background: "rgba(20, 20, 25, 0.6)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    zIndex: 100,
                    width: "100%",
                    overflow: "hidden",
                    animation: "slideDown 0.2s ease-out forwards",
                    padding: "8px",
                }}>
                    <div style={{ padding: "8px 12px", fontSize: "0.75rem", fontWeight: 700, color: "var(--foreground-muted)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                        Users
                    </div>

                    {users.length > 0 ? (
                        users.map((user, idx) => {
                            const isSelected = idx === selectedIndex;
                            return (
                                <div
                                    key={user.username}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigateToProfile(user.username);
                                    }}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "10px 12px",
                                        cursor: "pointer",
                                        background: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                                        borderRadius: "12px",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {user.avatar_url ? (
                                        <img src={user.avatar_url} alt={user.username} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid rgba(255, 255, 255, 0.1)" }} />
                                    ) : (
                                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: "white", flexShrink: 0, boxShadow: "0 4px 10px rgba(230, 118, 185, 0.3)" }}>
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span style={{ color: isSelected ? "var(--foreground)" : "var(--foreground-muted)", fontSize: "0.95rem", fontWeight: isSelected ? 600 : 500, transition: "color 0.2s ease" }}>
                                        {renderUsernameWithHighlight(user.username, query)}
                                    </span>
                                </div>
                            );
                        })
                    ) : hasSearched ? (
                        <div style={{ padding: "16px", textAlign: "center", color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
                            No users found.
                        </div>
                    ) : (
                        <div style={{ padding: "16px", textAlign: "center", color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
                            Searching...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
