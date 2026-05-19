"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import NotificationBell from "./NotificationBell";
import UserSearchBar from "./UserSearchBar";

interface NavbarProps {
  user: { id: string; username: string; email: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [navigatingHref, setNavigatingHref] = useState<string | null>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  const activePage = getActivePage(pathname);

  useEffect(() => {
    if (!isPending && navigatingHref) {
      setMobileOpen(false);
      setNavigatingHref(null);
    }
  }, [isPending, pathname, navigatingHref]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    // If it's a mobile click and not just opening in new tab
    if (window.innerWidth <= 640 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (href === pathname) {
        setMobileOpen(false);
        return;
      }
      setNavigatingHref(href);
      startTransition(() => {
        router.push(href);
      });
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      className="animate-slide-down"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top Loading Bar */}
      {isPending && (
        <div
          className="loading-bar"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "3px",
            background: "var(--primary)",
            boxShadow: "0 0 10px var(--primary-glow), 0 0 5px var(--primary)",
            zIndex: 100,
          }}
        />
      )}

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

        {/* Search Bar - Hidden on very small screens, responsive width otherwise */}
        <div style={{ flex: 1, maxWidth: "300px", margin: "0 24px" }} className="desktop-search">
          <UserSearchBar />
        </div>

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
                  className="btn btn-ghost btn-sm"
                >
                  Logout
                </button>
                <NotificationBell userId={user.id} />
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
          className="btn btn-icon mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{ display: "none", border: "1px solid var(--border-subtle)", borderRadius: "10px", width: 40, height: 40 }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="animate-fade-in-up"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(48px) saturate(150%)",
            WebkitBackdropFilter: "blur(48px) saturate(150%)",
            zIndex: 40,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="animate-slide-down"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "rgba(10, 10, 15, 0.95)",
            backdropFilter: "blur(48px) saturate(180%)",
            WebkitBackdropFilter: "blur(48px) saturate(180%)",
            padding: "8px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            zIndex: 50,
          }}
        >
          <div style={{ padding: "8px 16px 16px" }}>
            <UserSearchBar />
          </div>
          <NavLink
            href="/"
            label="Posts"
            active={activePage === "posts"}
            mobile
            onClick={(e) => handleNavClick("/", e)}
          />
          <NavLink
            href="/about"
            label="About"
            active={activePage === "about"}
            mobile
            onClick={(e) => handleNavClick("/about", e)}
          />
          <div
            style={{
              height: "1px",
              background: "rgba(255, 255, 255, 0.08)",
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
                onClick={(e) => handleNavClick("/register", e)}
              />
              <NavLink
                href="/login"
                label="Login"
                active={activePage === "login"}
                mobile
                accent
                onClick={(e) => handleNavClick("/login", e)}
              />
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost"
                style={{ width: "100%", justifyContent: "flex-start", borderRadius: "10px" }}
              >
                Logout
              </button>
              <div style={{ padding: "0 16px" }}>
                <NotificationBell userId={user.id} />
              </div>
              <NavLink
                href={`/profile/${user.username}`}
                label={user.username}
                active={activePage === "profile"}
                mobile
                accent
                onClick={(e) => handleNavClick(`/profile/${user.username}`, e)}
              />
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .desktop-nav, .desktop-search {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @keyframes loading-progress {
          0% { width: 0%; left: 0; }
          50% { width: 70%; left: 0; }
          100% { width: 30%; left: 100%; }
        }
        .loading-bar {
          animation: loading-progress 1.5s ease-in-out infinite;
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
  href, label, active, accent, mobile, onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  accent?: boolean;
  mobile?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`btn btn-nav${active ? " active" : ""}${mobile ? " mobile-nav-item" : ""}`}
      style={{
        color: active
          ? "var(--primary)"
          : accent
          ? "var(--primary)"
          : undefined,
        width: mobile ? "100%" : undefined,
        justifyContent: mobile ? "flex-start" : undefined,
        borderRadius: mobile ? "10px" : undefined,
      }}
    >
      {label}
    </Link>
  );
}
