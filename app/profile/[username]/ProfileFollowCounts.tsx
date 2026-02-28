"use client";

import { useState } from "react";
import UserListModal from "@/app/_components/UserListModal";

interface ProfileFollowCountsProps {
    profileId: string;
    followersCount: number;
    followingCount: number;
}

export default function ProfileFollowCounts({ profileId, followersCount, followingCount }: ProfileFollowCountsProps) {
    const [modalType, setModalType] = useState<"followers" | "following" | null>(null);

    return (
        <>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "0.85rem", color: "var(--foreground)" }}>
                <span
                    onClick={() => setModalType("followers")}
                    style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                    <strong>{followersCount}</strong> Followers
                </span>
                <span
                    onClick={() => setModalType("following")}
                    style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                    <strong>{followingCount}</strong> Following
                </span>
            </div>

            <UserListModal
                isOpen={modalType !== null}
                onClose={() => setModalType(null)}
                title={modalType === "followers" ? "Followers" : "Following"}
                type={modalType || "followers"}
                targetId={profileId}
            />
        </>
    );
}
