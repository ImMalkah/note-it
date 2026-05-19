export default function BackgroundBlobs() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div 
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "45vw",
          height: "45vw",
          maxWidth: "800px",
          maxHeight: "800px",
          background: "var(--gradient-start)",
          filter: "blur(140px)",
          opacity: 0.35,
          borderRadius: "50%",
          animation: "float 15s ease-in-out infinite",
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "40vw",
          height: "40vw",
          maxWidth: "700px",
          maxHeight: "700px",
          background: "var(--gradient-end)",
          filter: "blur(160px)",
          opacity: 0.25,
          borderRadius: "50%",
          animation: "float 18s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
