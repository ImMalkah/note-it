"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { createClient } from "@/app/_lib/supabase/client";

interface UserInfo {
    username: string;
    avatar_url?: string;
}

interface MentionsTextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    style?: React.CSSProperties;
    rows?: number;
    id?: string;
    required?: boolean;
}

export default function MentionsTextarea({ value, onChange, placeholder, style, rows = 6, id, required }: MentionsTextareaProps) {
    const [mentionQuery, setMentionQuery] = useState<string | null>(null);
    const [mentionStartIndex, setMentionStartIndex] = useState<number>(-1);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const supabase = createClient();

    useEffect(() => {
        if (mentionQuery === null) {
            setUsers([]);
            return;
        }

        const fetchUsers = async () => {
            if (mentionQuery.length === 0) {
                // Fetch random or recent 5 users if query is empty
                const { data } = await supabase.from('profiles').select('username, avatar_url').limit(5);
                if (data) setUsers(data as UserInfo[]);
            } else {
                const { data } = await supabase
                    .from('profiles')
                    .select('username, avatar_url')
                    .ilike('username', `${mentionQuery}%`)
                    .limit(5);
                if (data) setUsers(data as UserInfo[]);
            }
            setSelectedIndex(0);
        };
        fetchUsers();
    }, [mentionQuery]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        onChange(newValue);

        const cursorPosition = e.target.selectionStart;
        const textBeforeCursor = newValue.substring(0, cursorPosition);
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');

        if (lastAtIndex !== -1) {
            // Check if there's any space between @ and cursor
            const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
            if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
                // it's a mention query!
                setMentionQuery(textAfterAt);
                setMentionStartIndex(lastAtIndex);
                return;
            }
        }

        // Not a mention
        setMentionQuery(null);
        setMentionStartIndex(-1);
    };

    const insertMention = (username: string) => {
        if (mentionStartIndex === -1 || !textareaRef.current) return;
        const currentPos = textareaRef.current.selectionStart;

        const before = value.substring(0, mentionStartIndex);
        const after = value.substring(currentPos);

        const newValue = `${before}@${username} ${after}`;
        onChange(newValue);

        setMentionQuery(null);
        setMentionStartIndex(-1);

        // Restore focus and cursor position
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                const newPos = before.length + username.length + 2; // +1 for @ and +1 for trailing space
                textareaRef.current.setSelectionRange(newPos, newPos);
            }
        }, 10); // Small delay to allow the React state to settle
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (mentionQuery !== null && users.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % users.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + users.length) % users.length);
            } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                insertMention(users[selectedIndex].username);
            } else if (e.key === "Escape") {
                setMentionQuery(null);
                setMentionStartIndex(-1);
            }
        }
    };

    const renderUsernameWithHighlight = (username: string, query: string) => {
        if (!query) return username;
        const lowerUsername = username.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const matchStart = lowerUsername.indexOf(lowerQuery);

        if (matchStart === -1) return username;

        const before = username.substring(0, matchStart);
        const match = username.substring(matchStart, matchStart + query.length);
        const after = username.substring(matchStart + query.length);

        return (
            <>
                {before}
                <span style={{ color: "var(--primary)", fontWeight: 800 }}>{match}</span>
                {after}
            </>
        );
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <textarea
                id={id}
                required={required}
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={rows}
                style={{
                    ...style,
                    borderColor: isFocused ? "var(--primary)" : "var(--border-subtle)",
                }}
                onFocus={(e) => {
                    setIsFocused(true);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    // Delay hiding the popup so clicks can register
                    setTimeout(() => {
                        setMentionQuery(null);
                    }, 200);
                }}
            />

            {mentionQuery !== null && users.length > 0 && (
                <div style={{
                    position: "absolute",
                    bottom: "100%", // pop up above the textarea (or could be top: "100%")
                    left: "0",
                    background: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    zIndex: 50,
                    width: "250px",
                    overflow: "hidden",
                    marginBottom: "8px",
                    animation: "fadeIn 0.2s ease-out",
                }}>
                    <div style={{ padding: "8px 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground-muted)", borderBottom: "1px solid var(--border-subtle)", textTransform: "uppercase" }}>
                        Mentions
                    </div>
                    {users.map((user, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                            <div
                                key={user.username}
                                onClick={(e) => {
                                    e.preventDefault();
                                    insertMention(user.username);
                                }}
                                onMouseEnter={() => setSelectedIndex(idx)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 12px",
                                    cursor: "pointer",
                                    background: isSelected ? "var(--background-secondary)" : "transparent",
                                    transition: "background 0.2s ease",
                                    borderLeft: isSelected ? "3px solid var(--primary)" : "3px solid transparent",
                                }}
                            >
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={user.username} style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid var(--border-subtle)" }} />
                                ) : (
                                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span style={{ color: "var(--foreground)", fontSize: "0.95rem" }}>
                                    {renderUsernameWithHighlight(user.username, mentionQuery)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
