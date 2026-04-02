import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a1420 0%, #132235 60%, #1a2f46 100%)",
          padding: 56,
          color: "#e7edf4",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            borderRadius: 36,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(8,14,22,0.72)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            padding: 48,
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 96,
              height: 96,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "linear-gradient(145deg,#8b8b8b,#2b2b2b)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 20,
                width: 56,
                height: 56,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "linear-gradient(145deg,#666,#1f1f1f)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 26,
                top: 64,
                width: 44,
                height: 4,
                borderRadius: 999,
                transform: "rotate(-45deg)",
                background: "linear-gradient(90deg,#ffbd55,#ffe7a8,#f3a62f)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: 1.2 }}>Линия Гранита</div>
            <div style={{ fontSize: 28, opacity: 0.9, letterSpacing: 0.8 }}>Архитектура памяти</div>
            <div style={{ marginTop: 18, fontSize: 22, color: "#b9c8d8" }}>
              Каталог памятников и благоустройство
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

