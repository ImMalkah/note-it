"use client";

import { useState } from "react";

interface ExpandableAvatarProps {
    avatarUrl: string;
    username: string;
    size?: number;
}

export default function ExpandableAvatar({ avatarUrl, username, size = 64 }: ExpandableAvatarProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <img
                src={avatarUrl}
                alt={username}
                onClick={() => setIsExpanded(true)}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: "2px solid var(--border-subtle)",
                    background: "var(--surface)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            />

            {isExpanded && (
                <div
                    onClick={() => setIsExpanded(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0, 0, 0, 0.8)",
                        backdropFilter: "blur(5px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "zoom-out",
                        padding: "20px",
                    }}
                >
                    <img
                        src={avatarUrl}
                        alt={username}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: "16px",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                            animation: "scaleIn 0.2s ease-out",
                        }}
                    />
                </div>
            )}
            <style>{`
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </>
    );
}
