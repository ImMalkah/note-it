import Link from "next/link";
import NoteFeed from "./_components/NoteFeed";
import { createClient } from "./_lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Basic query
  let query = supabase
    .from("notes")
    .select(`
      id, 
      title, 
      content, 
      created_at, 
      profiles!notes_author_id_fkey(username, avatar_url),
      note_likes(count)
    `)
    .order("created_at", { ascending: false });

  // If user is logged in, only fetch notes from followed users
  // (Assuming home page is a feed. If no follows exist, it will be empty)
  // For now, let's just show all notes, but pass down like/save status
  const { data: notes, error } = await query;

  // If logged in, fetch the user's specific likes and saves to pass to the client components
  let userLikes = new Set<number>();
  let userSaves = new Set<number>();

  if (user && notes) {
    const noteIds = notes.map(n => n.id);

    const [likesRes, savesRes] = await Promise.all([
      supabase.from("note_likes").select("note_id").eq("user_id", user.id).in("note_id", noteIds),
      supabase.from("saved_notes").select("note_id").eq("user_id", user.id).in("note_id", noteIds)
    ]);

    if (likesRes.data) likesRes.data.forEach(l => userLikes.add(l.note_id));
    if (savesRes.data) savesRes.data.forEach(s => userSaves.add(s.note_id));
  }

  const formattedNotes = (notes || []).map((note) => {
    const profile = note.profiles as unknown as { username: string, avatar_url: string | null } | null;
    return {
      id: note.id as number,
      title: note.title as string,
      content: note.content as string,
      author: profile?.username || "unknown",
      authorAvatarUrl: profile?.avatar_url || null,
      date: new Date(note.created_at as string).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      likesCount: (note.note_likes as any)?.[0]?.count || 0,
      isLiked: userLikes.has(note.id as number),
      isSaved: userSaves.has(note.id as number),
    };
  });

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        background:
          "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Header area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "36px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                margin: 0,
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
              }}
            >
              All Notes
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--foreground-muted)",
                margin: "4px 0 0",
                fontWeight: 400,
              }}
            >
              {formattedNotes.length} note
              {formattedNotes.length !== 1 ? "s" : ""} shared with love
            </p>
          </div>

          {user && (
            <Link
              href="/new_note"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px var(--primary-soft)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>+</span>
              new note
            </Link>
          )}
        </div>

        {/* Live note feed — client component with real-time subscriptions */}
        <NoteFeed initialNotes={formattedNotes} userId={user?.id} />

        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#ef4444",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <p>Failed to load notes. Please try again later.</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 480px) {
          div [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
