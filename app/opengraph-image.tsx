import { ImageResponse } from "next/og";

export const alt = "TharinduJB — AI and Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "76px",
        color: "#f4f7f3",
        background: "linear-gradient(135deg, #07100b 0%, #0b1118 70%, #122117 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#b8f53e", fontSize: 25, letterSpacing: 5 }}>
          <span style={{ width: 12, height: 12, borderRadius: 99, background: "#b8f53e", boxShadow: "0 0 24px #b8f53e" }} />
          AI · SOFTWARE · AUTOMATION
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 800, letterSpacing: -7 }}>
          Tharindu<span style={{ color: "#b8f53e" }}>JB</span>
        </div>
        <div style={{ maxWidth: 820, color: "#b8c2bb", fontSize: 35, lineHeight: 1.35 }}>
          Building intelligent systems that turn real-world problems into useful products.
        </div>
        <div style={{ display: "flex", gap: "14px", marginTop: "16px" }}>
          {["Python", "Machine Learning", "Next.js", "FastAPI"].map((item) => (
            <span key={item} style={{ padding: "13px 20px", border: "1px solid rgba(184,245,62,.4)", borderRadius: 99, color: "#dfffa2", fontSize: 20 }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", right: 70, top: 65, width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 28, background: "#b8f53e", color: "#0b1108", fontSize: 48, fontWeight: 900 }}>
        JB
      </div>
    </div>,
    size,
  );
}
