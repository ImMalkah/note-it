"use client";

interface SocialWidgetsProps {
    instagram?: string | null;
    facebook?: string | null;
    snapchat?: string | null;
}

export default function SocialWidgets({ instagram, facebook, snapchat }: SocialWidgetsProps) {
    if (!instagram && !facebook && !snapchat) return null;

    return (
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            {instagram && (
                <a
                    href={`https://instagram.com/${instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "rgba(225, 48, 108, 0.1)", color: "#E1306C",
                        border: "1px solid rgba(225, 48, 108, 0.2)", transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)", e.currentTarget.style.background = "#E1306C"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)", e.currentTarget.style.background = "rgba(225, 48, 108, 0.1)"; e.currentTarget.style.color = "#E1306C"; }}
                    title={`Instagram: ${instagram}`}
                >
                    <i className="fa-brands fa-instagram" style={{ fontSize: "1.2rem" }}></i>
                </a>
            )}
            {facebook && (
                <a
                    href={`https://facebook.com/${facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "rgba(24, 119, 242, 0.1)", color: "#1877F2",
                        border: "1px solid rgba(24, 119, 242, 0.2)", transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)", e.currentTarget.style.background = "#1877F2"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)", e.currentTarget.style.background = "rgba(24, 119, 242, 0.1)"; e.currentTarget.style.color = "#1877F2"; }}
                    title={`Facebook: ${facebook}`}
                >
                    <i className="fa-brands fa-facebook" style={{ fontSize: "1.2rem" }}></i>
                </a>
            )}
            {snapchat && (
                <a
                    href={`https://snapchat.com/add/${snapchat}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "rgba(255, 252, 0, 0.1)", color: "#d6d304",
                        border: "1px solid rgba(255, 252, 0, 0.3)", transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)", e.currentTarget.style.background = "#FFFC00"; e.currentTarget.style.color = "#333"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)", e.currentTarget.style.background = "rgba(255, 252, 0, 0.1)"; e.currentTarget.style.color = "#d6d304"; }}
                    title={`Snapchat: ${snapchat}`}
                >
                    <i className="fa-brands fa-snapchat" style={{ fontSize: "1.1rem" }}></i>
                </a>
            )}
        </div>
    );
}
