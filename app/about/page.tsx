import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at top, var(--background-secondary) 0%, var(--background) 60%)",
        padding: "24px",
      }}
    >
      <div
        className="gradient-border"
        style={{
          background: "var(--surface)",
          borderRadius: "16px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1
          className="gradient-text"
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "16px",
            letterSpacing: "-0.03em",
          }}
        >
          note it!
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--foreground-muted)",
            lineHeight: 1.8,
            marginBottom: "24px",
            maxWidth: "450px",
            margin: "0 auto 24px",
          }}
        >
          A little app for sharing love notes, kind words, and sweet messages
          with the people who matter most. 💕
        </p>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--border), transparent)",
            margin: "32px 0",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "var(--background)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "4px" }}>✍️</p>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "2px",
              }}
            >
              Write Notes
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--foreground-muted)",
              }}
            >
              Share your thoughts & feelings
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "var(--background)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "4px" }}>❤️</p>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "2px",
              }}
            >
              Spread Love
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--foreground-muted)",
              }}
            >
              Leave sweet messages for others
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "var(--background)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "4px" }}>👤</p>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "2px",
              }}
            >
              Profiles
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--foreground-muted)",
              }}
            >
              See all of someone&apos;s notes
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "var(--background)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "4px" }}>🔒</p>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "2px",
              }}
            >
              Secure
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--foreground-muted)",
              }}
            >
              Only you can delete your notes
            </p>
          </div>
        </div>

        <Link
          href="/"
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
            textDecoration: "none",
            boxShadow: "0 4px 15px var(--primary-soft)",
          }}
        >
          ← Back to Notes
        </Link>
      </div>
    </div>
  );
}
