import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import { notFound } from "next/navigation";
import ProfileTabs from "@/app/_components/ProfileTabs";
import ExpandableAvatar from "@/app/_components/ExpandableAvatar";
import SocialWidgets from "@/app/_components/SocialWidgets";
import FollowButton from "@/app/_components/FollowButton";
import { getMoodById } from "@/app/_utils/moods";
import ProfileFollowCounts from "./ProfileFollowCounts";
import EditProfileButton from "./EditProfileButton";

interface PageProps {
    params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params;
    const supabase = await createClient();

    // Fetch the profile
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, created_at, saved_notes_visible, liked_notes_visible, bio, avatar_url, header_url, mood, instagram, facebook, snapchat")
        .eq("username", username)
        .single();

    if (profileError || !profile) {
        notFound();
    }

    const { data: { user } } = await supabase.auth.getUser();
    const isOwnProfile = user?.id === profile.id;

    // Fetch Follow Counts
    const [followersRes, followingRes] = await Promise.all([
        supabase.from("user_follows").select("follower_id", { count: 'exact', head: true }).eq("following_id", profile.id),
        supabase.from("user_follows").select("following_id", { count: 'exact', head: true }).eq("follower_id", profile.id)
    ]);

    const followersCount = followersRes.count || 0;
    const followingCount = followingRes.count || 0;

    // Check if current user is following this profile, and if this profile is following the current user
    let isFollowing = false;
    let isFollower = false;
    if (user && !isOwnProfile) {
        const { data } = await supabase
            .from("user_follows")
            .select("follower_id")
            .match({ follower_id: user.id, following_id: profile.id })
            .single();
        if (data) isFollowing = true;

        const { data: followerData } = await supabase
            .from("user_follows")
            .select("follower_id")
            .match({ follower_id: profile.id, following_id: user.id })
            .single();
        if (followerData) isFollower = true;
    }

    // Fetch their notes
    const { data: notes } = await supabase
        .from("notes")
        .select("id, title, content, created_at, note_likes(count), saved_notes(count)")
        .eq("author_id", profile.id)
        .order("created_at", { ascending: false });

    const formattedNotes = (notes || []).map((note) => ({
        id: note.id as number,
        title: note.title as string,
        content: note.content as string,
        author: profile.username as string,
        date: new Date(note.created_at as string).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
        likesCount: (note.note_likes as any)?.[0]?.count || 0,
        savesCount: (note.saved_notes as any)?.[0]?.count || 0,
    }));

    // Fetch Saved Notes strictly if own profile
    let savedNotes: any[] = [];
    if (isOwnProfile) {
        const { data: saves } = await supabase
            .from("saved_notes")
            .select(`
                note_id,
                notes (id, title, content, created_at, profiles!notes_author_id_fkey(username), note_likes(count), saved_notes(count))
            `)
            .eq("user_id", profile.id)
            .order("created_at", { ascending: false });

        savedNotes = (saves || [])
            .filter(s => s.notes) // ensure note still exists
            .map(s => {
                const n = s.notes as any;
                return {
                    id: n.id,
                    title: n.title,
                    content: n.content,
                    author: n.profiles?.username || "unknown",
                    date: new Date(n.created_at).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "2-digit",
                        hour: "2-digit", minute: "2-digit", hour12: true,
                    }),
                    likesCount: n.note_likes?.[0]?.count || 0,
                    savesCount: n.saved_notes?.[0]?.count || 0,
                };
            });
    }

    // Fetch Liked Notes if visible or own profile
    let likedNotes: any[] = [];
    if (isOwnProfile || profile.liked_notes_visible) {
        const { data: likes } = await supabase
            .from("note_likes")
            .select(`
                note_id,
                notes (id, title, content, created_at, profiles!notes_author_id_fkey(username), note_likes(count), saved_notes(count))
            `)
            .eq("user_id", profile.id)
            .order("created_at", { ascending: false });

        likedNotes = (likes || [])
            .filter(l => l.notes)
            .map(l => {
                const n = l.notes as any;
                return {
                    id: n.id,
                    title: n.title,
                    content: n.content,
                    author: n.profiles?.username || "unknown",
                    date: new Date(n.created_at).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "2-digit",
                        hour: "2-digit", minute: "2-digit", hour12: true,
                    }),
                    likesCount: n.note_likes?.[0]?.count || 0,
                    savesCount: n.saved_notes?.[0]?.count || 0,
                };
            });
    }

    // User's specific likes/saves for NoteCard states
    let userLikes = new Set<number>();
    let userSaves = new Set<number>();

    if (user) {
        // Collect all note IDs on page
        const allIds = new Set([
            ...formattedNotes.map(n => n.id),
            ...savedNotes.map(n => n.id),
            ...likedNotes.map(n => n.id),
        ]);
        const idArray = Array.from(allIds);

        if (idArray.length > 0) {
            const [likesRes, savesRes] = await Promise.all([
                supabase.from("note_likes").select("note_id").eq("user_id", user.id).in("note_id", idArray),
                supabase.from("saved_notes").select("note_id").eq("user_id", user.id).in("note_id", idArray)
            ]);

            if (likesRes.data) likesRes.data.forEach(l => userLikes.add(l.note_id));
            if (savesRes.data) savesRes.data.forEach(s => userSaves.add(s.note_id));
        }
    }

    const memberSince = new Date(
        profile.created_at as string
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    return (
        <div
            style={{
                minHeight: "calc(100vh - 64px)",
                background:
                    "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
                padding: "40px 24px 80px",
            }}
        >
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "40px 24px 80px",
                }}
            >
                {/* Back link */}
                <Link
                    href="/"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "var(--foreground-muted)",
                        background: "var(--surface)",
                        border: "1px solid var(--border-subtle)",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        marginBottom: "32px",
                    }}
                >
                    ← Back
                </Link>

                {/* Profile Header */}
                <div
                    className="gradient-border"
                    style={{
                        backgroundImage: profile.header_url
                            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(${profile.header_url})`
                            : "none",
                        backgroundColor: profile.header_url ? "transparent" : "var(--surface)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "16px",
                        marginBottom: "36px",
                        position: "relative",
                        overflow: "hidden", // Important so the banner doesn't spill out
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Decorative Top Banner (Only if no custom header) */}
                    {!profile.header_url && (
                        <div
                            style={{
                                height: "140px",
                                width: "100%",
                                background: "linear-gradient(135deg, var(--primary-soft) 0%, var(--gradient-end) 100%)",
                                opacity: 0.8,
                            }}
                        />
                    )}

                    {/* Spacer when custom header is used to push content down appropriately */}
                    {profile.header_url && (
                        <div style={{ height: "140px", width: "100%" }} />
                    )}

                    {/* Action Button (Top Right Absolute) */}
                    <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
                        {isOwnProfile ? (
                            <EditProfileButton
                                currentBio={profile.bio}
                                currentAvatarUrl={profile.avatar_url}
                                userId={profile.id}
                                currentMood={profile.mood}
                                currentInstagram={profile.instagram}
                                currentFacebook={profile.facebook}
                                currentSnapchat={profile.snapchat}
                                currentHeaderUrl={profile.header_url}
                            />
                        ) : user && (
                            <FollowButton targetUserId={profile.id} initialIsFollowing={isFollowing} isFollower={isFollower} />
                        )}
                    </div>

                    {/* Unified Profile Content Container over Background */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        padding: "0 32px 32px",
                        position: "relative",
                        zIndex: 2,
                    }}>
                        {/* Soft Translucent Wrapper around text/avatar */}
                        <div style={{
                            marginTop: "-60px", // Pull it up to overlap the top banner slightly
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "600px",
                            background: "rgba(0, 0, 0, 0.25)", // Very gentle dark tint
                            backdropFilter: "blur(2px)", // Extremely soft blur
                            WebkitBackdropFilter: "blur(2px)",
                            padding: "32px 24px",
                            borderRadius: "24px", // Round edges cleanly
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
                        }}>
                            {/* Avatar (Nested inside the soft container completely) */}
                            <div style={{
                                marginBottom: "16px",
                                borderRadius: "50%",
                            }}>
                                {profile.avatar_url ? (
                                    <ExpandableAvatar
                                        avatarUrl={profile.avatar_url}
                                        username={profile.username}
                                        size={112}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "112px",
                                            height: "112px",
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "2.5rem",
                                            fontWeight: 800,
                                            color: "white",
                                        }}
                                    >
                                        {(profile.username as string).charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h1
                                className="gradient-text"
                                style={{
                                    fontSize: "1.75rem",
                                    fontWeight: 800,
                                    margin: 0,
                                    letterSpacing: "-0.02em",
                                    textAlign: "center"
                                }}
                            >
                                {profile.username}
                            </h1>
                            <p style={{ fontSize: "0.9rem", color: "var(--foreground-muted)", margin: "4px 0 0", textAlign: "center" }}>
                                Member since {memberSince}
                            </p>

                            <ProfileFollowCounts
                                profileId={profile.id}
                                followersCount={followersCount}
                                followingCount={followingCount}
                            />

                            {/* Render User Mood if set */}
                            {profile.mood && (() => {
                                const mood = getMoodById(profile.mood);
                                if (!mood) return null;
                                return (
                                    <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                                        <div
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "6px 16px",
                                                borderRadius: "20px",
                                                background: `${mood.color}15`,
                                                border: `1px solid ${mood.color}30`,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            <span style={{ fontSize: "1.1rem" }}>{mood.emoji}</span>
                                            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: mood.color }}>
                                                Feeling {mood.label.toLowerCase()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Bio */}
                            {profile.bio && (
                                <p style={{ fontSize: "0.95rem", color: "var(--foreground)", marginTop: "20px", lineHeight: 1.6, textAlign: "center", whiteSpace: "pre-wrap" }}>
                                    {profile.bio}
                                </p>
                            )}

                            {/* Render Social Links */}
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "24px" }}>
                                <SocialWidgets
                                    instagram={profile.instagram}
                                    facebook={profile.facebook}
                                    snapchat={profile.snapchat}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Component to toggle between Notes, Saved, Liked */}
                <ProfileTabs
                    username={profile.username}
                    notes={formattedNotes}
                    savedNotes={savedNotes}
                    likedNotes={likedNotes}
                    isOwnProfile={isOwnProfile}
                    likedVisible={profile.liked_notes_visible}
                    userLikes={userLikes}
                    userSaves={userSaves}
                />
            </div>
        </div>
    );
}
