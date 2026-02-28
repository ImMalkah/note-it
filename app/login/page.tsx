"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
    };

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
                    padding: "40px",
                    width: "100%",
                    maxWidth: "420px",
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
                    Welcome back
                </h1>
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--foreground-muted)",
                        marginBottom: "32px",
                    }}
                >
                    Sign in to your account
                </p>

                <form onSubmit={handleLogin}>
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
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--background)",
                                color: "var(--foreground)",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) =>
                                (e.currentTarget.style.borderColor = "var(--primary)")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.borderColor = "var(--border-subtle)")
                            }
                        />
                    </div>

                    <div style={{ marginBottom: "28px" }}>
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
                            placeholder="••••••••"
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--background)",
                                color: "var(--foreground)",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) =>
                                (e.currentTarget.style.borderColor = "var(--primary)")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.borderColor = "var(--border-subtle)")
                            }
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
                            padding: "14px",
                            borderRadius: "12px",
                            background: loading
                                ? "var(--surface-hover)"
                                : "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                            color: "white",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: loading ? "none" : "0 4px 15px var(--primary-soft)",
                        }}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "0.85rem",
                        color: "var(--foreground-muted)",
                        marginTop: "24px",
                    }}
                >
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="gradient-text"
                        style={{ fontWeight: 600 }}
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
