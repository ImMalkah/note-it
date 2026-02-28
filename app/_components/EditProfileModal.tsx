"use client";

import { useState } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBio: string | null;
    currentAvatarUrl: string | null;
    userId: string;
}

export default function EditProfileModal({ isOpen, onClose, currentBio, currentAvatarUrl, userId }: EditProfileModalProps) {
    const [bio, setBio] = useState(currentBio || "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(currentAvatarUrl);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            let newAvatarUrl = currentAvatarUrl;

            // 1. Upload new avatar if selected
            if (avatarFile) {
                const fileExt = avatarFile.name.split('.').pop();
                const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("avatars")
                    .upload(fileName, avatarFile, { upsert: true });

                if (uploadError) throw uploadError;

                // Get public URL
                const { data: publicUrlData } = supabase.storage
                    .from("avatars")
                    .getPublicUrl(fileName);

                newAvatarUrl = publicUrlData.publicUrl;
            }

            // 2. Update profiles table
            const { error: updateError } = await supabase
                .from("profiles")
                .update({
                    bio: bio,
                    avatar_url: newAvatarUrl
                })
                .eq("id", userId);

            if (updateError) throw updateError;

            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 1000,
            backdropFilter: "blur(4px)"
        }} onClick={onClose}>
            <div style={{
                background: "var(--surface)", borderRadius: "16px",
                width: "90%", maxWidth: "400px", overflow: "hidden",
                display: "flex", flexDirection: "column",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ margin: 0, fontSize: "1.25rem", color: "var(--foreground)", fontWeight: 700 }}>Edit Profile</h2>
                    <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--foreground-muted)", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1, padding: 0 }}>&times;</button>
                </div>

                <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Avatar Upload */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                        <label style={{ cursor: "pointer", position: "relative" }}>
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-subtle)" }} />
                            ) : (
                                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--border-subtle)" }}>
                                    <i className="fa-solid fa-camera" style={{ color: "var(--foreground-muted)", fontSize: "1.2rem" }}></i>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                        </label>
                        <span style={{ fontSize: "0.85rem", color: "var(--foreground-muted)" }}>Click to change photo</span>
                    </div>

                    {/* Bio Edit */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--foreground)" }}>Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            style={{
                                width: "100%", padding: "12px", borderRadius: "10px", boxSizing: "border-box",
                                border: "1px solid var(--border-subtle)", background: "var(--background)",
                                color: "var(--foreground)", fontSize: "0.95rem", resize: "none"
                            }}
                        />
                    </div>
                </div>

                <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <button onClick={onClose} disabled={loading} style={{ padding: "8px 16px", borderRadius: "8px", background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--foreground)", cursor: "pointer", fontWeight: 600 }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={loading} style={{ padding: "8px 16px", borderRadius: "8px", background: "var(--primary)", border: "none", color: "white", cursor: "pointer", fontWeight: 600 }}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
