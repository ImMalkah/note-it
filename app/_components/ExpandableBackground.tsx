"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ExpandableBackgroundProps {
    headerUrl: string;
}

export default function ExpandableBackground({ headerUrl }: ExpandableBackgroundProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isExpanded]);

    return (
        <>
            {/* Invisible overlay over the entire profile card background */}
            <div
                onClick={() => setIsExpanded(true)}
                title="View Background"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1, // Sits between the background image and the content container (zIndex: 2)
                    cursor: "pointer",
                }}
            />

            {/* Fullscreen expanded portal */}
            {isExpanded && mounted && createPortal(
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
                        WebkitBackdropFilter: "blur(5px)",
                        zIndex: 99999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "zoom-out",
                        padding: "20px",
                    }}
                >
                    <img
                        src={headerUrl}
                        alt="Profile Background Header"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: "16px",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                            animation: "scaleIn 0.2s ease-out",
                            objectFit: "contain",
                        }}
                    />
                </div>,
                document.body
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
