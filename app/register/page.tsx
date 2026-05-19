"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const prefillUsername = params.get("username");
            if (prefillUsername) {
                setUsername(prefillUsername);
            }
        }
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (username.length < 2) {
            setError("Username must be at least 2 characters");
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError("Username can only contain letters, numbers, and underscores");
            return;
        }

        setLoading(true);

        const supabase = createClient();

        // Check if username is taken
        const { data: existing } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", username)
            .single();

        if (existing) {
            setError("That username is already taken");
            setLoading(false);
            return;
        }

        // Sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                },
            },
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        if (data.session) {
            router.push("/");
            router.refresh();
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                padding: "24px",
            }}
        >
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "48px 40px",
                    width: "100%",
                    maxWidth: "440px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <h1
                    className="gradient-text"
                    style={{
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        marginBottom: "8px",
                        letterSpacing: "-0.03em",
                    }}
                >
                    Create account
                </h1>
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--foreground-muted)",
                        marginBottom: "32px",
                    }}
                >
                    Join note it! and start sharing
                </p>

                {success ? (
                    <div className="stagger-children" style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background: "rgba(16, 185, 129, 0.15)",
                                color: "#10b981",
                                marginBottom: "16px",
                                boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                            }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px", color: "var(--foreground)" }}>Check your email</h2>
                        <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                            We sent a confirmation link to <strong style={{ color: "var(--foreground)" }}>{email}</strong>. Please click the link to confirm your account and log in.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="stagger-children">
                        <div style={{ marginBottom: "20px" }}>
                            <label
                                htmlFor="username"
                                style={{
                                    display: "block",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    color: "var(--foreground-muted)",
                                    marginBottom: "8px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="malkah"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: "rgba(0, 0, 0, 0.2)",
                                    color: "var(--foreground)",
                                    fontSize: "0.95rem",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    boxSizing: "border-box",
                                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-soft), inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                    e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label
                                htmlFor="email"
                                style={{
                                    display: "block",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    color: "var(--foreground-muted)",
                                    marginBottom: "8px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: "rgba(0, 0, 0, 0.2)",
                                    color: "var(--foreground)",
                                    fontSize: "0.95rem",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    boxSizing: "border-box",
                                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-soft), inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                    e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label
                                htmlFor="password"
                                style={{
                                    display: "block",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    color: "var(--foreground-muted)",
                                    marginBottom: "8px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="••••••••"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: "rgba(0, 0, 0, 0.2)",
                                    color: "var(--foreground)",
                                    fontSize: "0.95rem",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    boxSizing: "border-box",
                                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-soft), inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                    e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "32px" }}>
                            <label
                                htmlFor="confirmPassword"
                                style={{
                                    display: "block",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    color: "var(--foreground-muted)",
                                    marginBottom: "8px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: "rgba(0, 0, 0, 0.2)",
                                    color: "var(--foreground)",
                                    fontSize: "0.95rem",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    boxSizing: "border-box",
                                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-soft), inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                    e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.2)";
                                }}
                            />
                        </div>

                        {error && (
                            <div
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    background: "rgba(239, 68, 68, 0.1)",
                                    border: "1px solid rgba(239, 68, 68, 0.2)",
                                    color: "#ef4444",
                                    fontSize: "0.85rem",
                                    marginBottom: "20px",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "16px",
                                borderRadius: "14px",
                                background: loading
                                    ? "rgba(255, 255, 255, 0.1)"
                                    : "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 700,
                                border: "none",
                                cursor: loading ? "not-allowed" : "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: loading ? "none" : "0 8px 25px var(--primary-soft)",
                                transform: loading ? "scale(0.98)" : "scale(1)",
                            }}
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                )}

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "0.85rem",
                        color: "var(--foreground-muted)",
                        marginTop: "24px",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="gradient-text"
                        style={{ fontWeight: 600 }}
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
