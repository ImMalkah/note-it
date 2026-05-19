"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";
import MentionsTextarea from "./MentionsTextarea";
import { MOODS } from "@/app/_utils/moods";
import { X, Camera } from "lucide-react";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBio: string | null;
    currentAvatarUrl: string | null;
    userId: string;
    currentMood?: string | null;
    currentInstagram?: string | null;
    currentFacebook?: string | null;
    currentSnapchat?: string | null;
}

export default function EditProfileModal({
    isOpen,
    onClose,
    currentBio,
    currentAvatarUrl,
    userId,
    currentMood,
    currentInstagram,
    currentFacebook,
    currentSnapchat,
}: EditProfileModalProps) {
    const [bio, setBio] = useState(currentBio || "");
    const [mood, setMood] = useState(currentMood || "");
    const [instagram, setInstagram] = useState(currentInstagram || "");
    const [facebook, setFacebook] = useState(currentFacebook || "");
    const [snapchat, setSnapchat] = useState(currentSnapchat || "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(currentAvatarUrl);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

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
                    avatar_url: newAvatarUrl,
                    mood: mood || null,
                    instagram: instagram || null,
                    facebook: facebook || null,
                    snapchat: snapchat || null
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

    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-xl md:p-5 animate-fade-in" onClick={onClose}>
            <div 
                className="relative flex flex-col w-full h-full md:h-auto md:max-h-[90vh] md:max-w-[550px] bg-white/5 backdrop-blur-[32px] saturate-150 border border-white/10 md:rounded-[24px] md:shadow-[0_40px_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden animate-slide-down"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-black/10 shrink-0 pt-10 md:pt-5">
                    <h2 className="gradient-text m-0 text-xl font-extrabold tracking-tight">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 border-none text-[var(--foreground-muted)] cursor-pointer flex items-center justify-center transition-colors">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 custom-scrollbar pb-24 md:pb-8">
                    
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-3">
                        <label className="cursor-pointer relative block">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" className="w-[110px] h-[110px] rounded-full object-cover border-4 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" />
                            ) : (
                                <div className="w-[110px] h-[110px] rounded-full bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                    <Camera size={32} className="text-[var(--foreground-muted)]" strokeWidth={1.5} />
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <div className="absolute bottom-0 right-0 bg-[var(--primary)] rounded-full w-9 h-9 flex items-center justify-center border-2 border-black/50 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                                <Camera size={16} color="white" strokeWidth={2.5} />
                            </div>
                        </label>
                        <span className="text-sm text-[var(--foreground-muted)] font-medium">Tap to change photo</span>
                    </div>

                    {/* Bio Edit */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Bio</label>
                        <MentionsTextarea
                            value={bio}
                            onChange={(val) => setBio(val)}
                            placeholder="Tell us about yourself..."
                            rows={3}
                            style={{
                                width: "100%", padding: "14px 16px", borderRadius: "12px", boxSizing: "border-box",
                                border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(0, 0, 0, 0.2)",
                                color: "var(--foreground)", fontSize: "0.95rem", resize: "none",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)", outline: "none", transition: "border-color 0.3s ease",
                                fontFamily: "inherit"
                            }}
                        />
                    </div>

                    {/* Mood Edit */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Current Mood</label>
                        <div className="flex flex-wrap gap-2.5">
                            <button
                                type="button"
                                onClick={() => setMood("")}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 border ${!mood ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                <span className={`text-[0.9rem] font-medium ${!mood ? 'text-white' : 'text-[var(--foreground-muted)]'}`}>No mood</span>
                            </button>
                            {MOODS.map((m) => {
                                const isSelected = mood === m.id;
                                return (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setMood(m.id)}
                                        style={{
                                            background: isSelected ? `${m.color}15` : "",
                                            borderColor: isSelected ? m.color : "",
                                            boxShadow: isSelected ? `0 4px 12px ${m.color}20, inset 0 1px 2px rgba(255,255,255,0.1)` : "none",
                                        }}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border ${isSelected ? 'translate-y-[-1px]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-[1px]'}`}
                                        title={m.label}
                                    >
                                        <div style={{ color: isSelected ? m.color : "var(--foreground-muted)", display: "flex" }}>
                                            <m.icon size={16} strokeWidth={isSelected ? 2.5 : 2} />
                                        </div>
                                        <span
                                            style={{ color: isSelected ? m.color : "var(--foreground)" }}
                                            className={`text-[0.9rem] ${isSelected ? 'font-semibold' : 'font-medium'}`}
                                        >
                                            {m.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Social Links Edit */}
                    <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                        <label className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Social Links</label>

                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#E1306C]/15 flex items-center justify-center shrink-0">
                                <i className="fa-brands fa-instagram text-[#E1306C] text-[1.2rem]"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="Instagram username"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-[var(--foreground)] text-[0.95rem] outline-none shadow-inner transition-colors focus:border-[#E1306C]/50"
                            />
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#1877F2]/15 flex items-center justify-center shrink-0">
                                <i className="fa-brands fa-facebook text-[#1877F2] text-[1.2rem]"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="Facebook username"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-[var(--foreground)] text-[0.95rem] outline-none shadow-inner transition-colors focus:border-[#1877F2]/50"
                            />
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#FFFC00]/15 flex items-center justify-center shrink-0">
                                <i className="fa-brands fa-snapchat text-[#FFFC00] text-[1.2rem]"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="Snapchat username"
                                value={snapchat}
                                onChange={(e) => setSnapchat(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-[var(--foreground)] text-[0.95rem] outline-none shadow-inner transition-colors focus:border-[#FFFC00]/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer (Sticky on Mobile) */}
                <div className="px-6 py-5 border-t border-white/10 flex justify-end gap-3.5 bg-black/30 shrink-0 absolute bottom-0 left-0 right-0 md:relative">
                    <button onClick={onClose} disabled={loading} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--foreground)] cursor-pointer font-semibold transition-all duration-200">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={loading} className={`px-7 py-3 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] border-none text-white cursor-pointer font-bold shadow-[0_6px_20px_var(--primary-soft)] transition-all duration-200 ${loading ? 'scale-[0.98]' : 'hover:scale-[1.02]'}`}>
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
