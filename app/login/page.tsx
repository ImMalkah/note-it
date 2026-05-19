"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";
import { checkUsername, loginWithUsernameOrEmail } from "./actions";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState<1 | 2>(1);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [foundUsername, setFoundUsername] = useState<string | null>(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const passwordInputRef = useRef<HTMLInputElement>(null);

    // Auto focus password input when moving to step 2
    useEffect(() => {
        if (step === 2 && passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    }, [step]);

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier.trim()) return;
        
        setError("");
        setLoading(true);

        try {
            const result = await checkUsername(identifier);
            if (result.found) {
                setAvatarUrl(result.avatar_url);
                setFoundUsername(result.username);
                setStep(2);
            } else {
                if (identifier.includes("@")) {
                    setAvatarUrl(null);
                    setFoundUsername(null);
                    setStep(2);
                } else {
                    router.push(`/register?username=${encodeURIComponent(identifier)}`);
                }
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setShowResend(false);
        setLoading(true);

        const result = await loginWithUsernameOrEmail(identifier, password);

        if (!result.success) {
            setError(result.error || "Failed to sign in.");
            if (result.error?.toLowerCase().includes("email not confirmed")) {
                setShowResend(true);
            }
            setLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
    };

    const handleResend = async () => {
        setError("");
        setMessage("");
        setLoading(true);
        const supabase = createClient();
        
        // This only works if it's an email, if they entered a username we can't resend easily from client
        // unless we use the email.
        if (!identifier.includes("@")) {
            setError("Please log in with your email to resend confirmation.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.resend({
            type: "signup",
            email: identifier,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage("Confirmation email resent. Please check your inbox.");
            setShowResend(false);
        }
        setLoading(false);
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
                {step === 1 ? (
                    <div className="stagger-children animate-slide-down">
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

                        <form onSubmit={handleContinue}>
                            <div style={{ marginBottom: "32px" }}>
                                <label
                                    htmlFor="identifier"
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
                                    Username or Email
                                </label>
                                <input
                                    id="identifier"
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                    placeholder="malkah or your@email.com"
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
                                disabled={loading || !identifier.trim()}
                                style={{
                                    width: "100%",
                                    padding: "16px",
                                    borderRadius: "14px",
                                    background: (loading || !identifier.trim())
                                        ? "rgba(255, 255, 255, 0.1)"
                                        : "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                    color: (loading || !identifier.trim()) ? "rgba(255, 255, 255, 0.5)" : "white",
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    border: "none",
                                    cursor: (loading || !identifier.trim()) ? "not-allowed" : "pointer",
                                    transition: "all 0.3s ease",
                                    boxShadow: (loading || !identifier.trim()) ? "none" : "0 8px 25px var(--primary-soft)",
                                    transform: loading ? "scale(0.98)" : "scale(1)",
                                }}
                            >
                                {loading ? "Loading..." : "Continue"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="stagger-children animate-fade-in-up">
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", gap: "16px" }}>
                            {avatarUrl ? (
                                <img 
                                    src={avatarUrl} 
                                    alt="Avatar" 
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid var(--primary)",
                                        boxShadow: "0 8px 20px rgba(230, 118, 185, 0.3)",
                                        animation: "fadeInUp 0.5s ease-out forwards",
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    color: "white",
                                    boxShadow: "0 8px 20px rgba(230, 118, 185, 0.3)",
                                    animation: "fadeInUp 0.5s ease-out forwards",
                                }}>
                                    {(foundUsername || identifier).charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--foreground)" }}>
                                    Welcome back,
                                </h1>
                                <p className="gradient-text" style={{ fontSize: "1rem", fontWeight: 600, margin: 0, display: "inline-block" }}>
                                    {foundUsername || identifier}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: "32px" }}>
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
                                    ref={passwordInputRef}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                            {message && (
                                <div
                                    style={{
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        background: "rgba(16, 185, 129, 0.1)",
                                        border: "1px solid rgba(16, 185, 129, 0.2)",
                                        color: "#10b981",
                                        fontSize: "0.85rem",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {message}
                                </div>
                            )}

                            {showResend && (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={loading}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "12px",
                                        background: "transparent",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        color: "var(--foreground)",
                                        fontSize: "0.9rem",
                                        fontWeight: 500,
                                        cursor: loading ? "not-allowed" : "pointer",
                                        transition: "all 0.2s ease",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Resend confirmation email
                                </button>
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
                                    marginBottom: "16px",
                                }}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    background: "transparent",
                                    color: "var(--foreground-muted)",
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "var(--foreground)"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground-muted)"}
                            >
                                Use a different account
                            </button>
                        </form>
                    </div>
                )}

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
