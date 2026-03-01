"use client";

import { useState } from "react";
import EditProfileModal from "@/app/_components/EditProfileModal";

interface EditProfileButtonProps {
    currentBio: string | null;
    currentAvatarUrl: string | null;
    userId: string;
    currentMood?: string | null;
    currentInstagram?: string | null;
    currentFacebook?: string | null;
    currentSnapchat?: string | null;
}

export default function EditProfileButton({ currentBio, currentAvatarUrl, userId, currentMood, currentInstagram, currentFacebook, currentSnapchat }: EditProfileButtonProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsEditing(true)}
                style={{
                    padding: "8px 16px", borderRadius: "10px", fontSize: "0.85rem",
                    fontWeight: 600, color: "var(--foreground)", background: "transparent",
                    border: "1px solid var(--border-subtle)", cursor: "pointer",
                    transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                }}
            >
                Edit Profile
            </button>
            <EditProfileModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                currentBio={currentBio}
                currentAvatarUrl={currentAvatarUrl}
                userId={userId}
                currentMood={currentMood}
                currentInstagram={currentInstagram}
                currentFacebook={currentFacebook}
                currentSnapchat={currentSnapchat}
            />
        </>
    );
}
