import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        position: "relative",
        overflow: "hidden",
        background: "var(--background)",
      }}
    >


      {/* Main Content Container (Full Width) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h1
            className="gradient-text"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              fontWeight: 800,
              marginBottom: "24px",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            note it!
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              color: "var(--foreground-muted)",
              lineHeight: 1.8,
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            A sophisticated space for sharing thoughts, ideas, and messages with the people who matter most. Connect deeply, express freely.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "32px",
            width: "100%",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              padding: "40px 32px",
              borderRadius: "28px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="hover-glass-card"
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Write Notes
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
              Express your deepest thoughts and feelings securely. Document your journey with our distraction-free editor.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              padding: "40px 32px",
              borderRadius: "28px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="hover-glass-card"
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Connect
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
              Build a network of meaningful relationships. Follow your friends and stay updated with their latest thoughts.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              padding: "40px 32px",
              borderRadius: "28px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="hover-glass-card"
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Profiles
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
              Discover and explore curated user collections. Customize your own space to reflect your true personality.
            </p>
          </div>

          {/* Card 4 */}
          <div
            style={{
              padding: "40px 32px",
              borderRadius: "28px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="hover-glass-card"
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Secure
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
              Advanced privacy controls for peace of mind. Only you decide who gets to see and interact with your content.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 40px",
              borderRadius: "100px",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--foreground)",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            className="hover-glass-btn"
          >
            ← Back to Notes
          </Link>
        </div>
        
        {/* SVG Gradients Definition */}
        <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
        </svg>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            33% { transform: translate(50px, -80px) scale(1.1) rotate(5deg); }
            66% { transform: translate(-40px, 40px) scale(0.9) rotate(-5deg); }
            100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          }
          .hover-glass-card:hover {
            transform: translateY(-8px) scale(1.02);
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          }
          .hover-glass-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            transform: translateY(-4px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2) !important;
          }
        `}} />
      </div>
    </div>
  );
}
