import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import { notFound } from "next/navigation";
import NoteCard from "@/app/_components/NoteCard";
import FollowButton from "@/app/_components/FollowButton";
import ProfileTabs from "@/app/_components/ProfileTabs";
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
        .select("id, username, created_at, saved_notes_visible, liked_notes_visible, bio, avatar_url")
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
                        background: "var(--surface)",
                        borderRadius: "16px",
                        padding: "32px 40px",
                        marginBottom: "36px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        {/* Avatar */}
                        {profile.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt={profile.username}
                                style={{
                                    width: "64px", height: "64px", borderRadius: "50%",
                                    objectFit: "cover", flexShrink: 0,
                                    border: "2px solid var(--border-subtle)",
                                    background: "var(--surface)"
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    color: "white",
                                    flexShrink: 0,
                                }}
                            >
                                {(profile.username as string).charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1
                                className="gradient-text"
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    margin: 0,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {profile.username}
                            </h1>
                            <p
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--foreground-muted)",
                                    margin: "4px 0 0",
                                }}
                            >
                                Member since {memberSince}
                            </p>
                            <ProfileFollowCounts
                                profileId={profile.id}
                                followersCount={followersCount}
                                followingCount={followingCount}
                            />
                            {profile.bio && (
                                <p style={{ fontSize: "0.9rem", color: "var(--foreground)", marginTop: "12px", lineHeight: 1.5, maxWidth: "500px", whiteSpace: "pre-wrap" }}>
                                    {profile.bio}
                                </p>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                        {isOwnProfile ? (
                            <EditProfileButton currentBio={profile.bio} currentAvatarUrl={profile.avatar_url} userId={profile.id} />
                        ) : user && (
                            <FollowButton targetUserId={profile.id} initialIsFollowing={isFollowing} isFollower={isFollower} />
                        )}
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
