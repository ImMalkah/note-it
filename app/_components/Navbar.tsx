"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/app/_lib/supabase/client";

interface NavbarProps {
  user: { id: string; username: string; email: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const activePage = getActivePage(pathname);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      className="glass animate-slide-down"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          className="gradient-text"
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          note it!
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="desktop-nav"
        >
          {/* Left links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <NavLink href="/" label="Posts" active={activePage === "posts"} />
            <NavLink
              href="/about"
              label="About"
              active={activePage === "about"}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "var(--border-subtle)",
              margin: "0 12px",
            }}
          />

          {/* Right links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {!user ? (
              <>
                <NavLink
                  href="/register"
                  label="Register"
                  active={activePage === "register"}
                />
                <NavLink
                  href="/login"
                  label="Login"
                  active={activePage === "login"}
                  accent
                />
              </>
            ) : (
              <>
                <button
                  onClick={handleSignOut}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    transition: "all 0.2s ease",
                    color: "var(--foreground-muted)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.background = "var(--surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Logout
                </button>
                <NavLink
                  href={`/profile/${user.username}`}
                  label={user.username}
                  active={activePage === "profile"}
                  accent
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "8px 10px",
            cursor: "pointer",
            color: "var(--foreground)",
            fontSize: "1.1rem",
            transition: "all 0.2s ease",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="animate-slide-down"
          style={{
            padding: "8px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <NavLink
            href="/"
            label="Posts"
            active={activePage === "posts"}
            mobile
          />
          <NavLink
            href="/about"
            label="About"
            active={activePage === "about"}
            mobile
          />
          <div
            style={{
              height: "1px",
              background: "var(--border-subtle)",
              margin: "4px 0",
            }}
          />
          {!user ? (
            <>
              <NavLink
                href="/register"
                label="Register"
                active={activePage === "register"}
                mobile
              />
              <NavLink
                href="/login"
                label="Login"
                active={activePage === "login"}
                mobile
                accent
              />
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  transition: "all 0.2s ease",
                  color: "var(--foreground-muted)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Logout
              </button>
              <NavLink
                href={`/profile/${user.username}`}
                label={user.username}
                active={activePage === "profile"}
                mobile
                accent
              />
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

function getActivePage(
  pathname: string
): "posts" | "about" | "register" | "login" | "profile" | "other" {
  if (pathname === "/") return "posts";
  if (pathname === "/about") return "about";
  if (pathname === "/register") return "register";
  if (pathname === "/login") return "login";
  if (pathname.startsWith("/profile")) return "profile";
  return "other";
}

function NavLink({
  href,
  label,
  active,
  accent,
  mobile,
}: {
  href: string;
  label: string;
  active: boolean;
  accent?: boolean;
  mobile?: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    padding: mobile ? "10px 16px" : "8px 16px",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: active ? 600 : 500,
    letterSpacing: "0.01em",
    transition: "all 0.2s ease",
    display: "block",
    color: active
      ? "var(--primary)"
      : accent
        ? "var(--primary)"
        : "var(--foreground-muted)",
    background: active ? "var(--primary-soft)" : "transparent",
  };

  return (
    <Link
      href={href}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = "var(--foreground)";
          e.currentTarget.style.background = "var(--surface-hover)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = accent
            ? "var(--primary)"
            : "var(--foreground-muted)";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {label}
    </Link>
  );
}
