import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#2B1A12", padding: 80, color: "#F6EFE6" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, letterSpacing: 8, color: "#B8893B", fontFamily: "serif" }}>BELMONT</div>
          <div style={{ fontSize: 22, letterSpacing: 14, marginTop: 4 }}>COFFEE HOUSE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 56, fontFamily: "serif", lineHeight: 1.1, maxWidth: 900 }}>{site.heroHeadline}</div>
          <div style={{ fontSize: 24, marginTop: 28, color: "#D9B97A" }}>Kenya · Ethiopia · Rwanda · Tanzania · Uganda</div>
        </div>
      </div>
    ),
    size,
  );
}
