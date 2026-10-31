import { ImageResponse } from "next/og";
import { business, tesettur } from "@/content/site";

export const alt = `${business.displayName} · ${business.mall.name}, ${business.district} / ${business.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1b1716";
const PAPER = "#f5efe9";
const ACCENT = "#8a2f2b";

/** Google Fonts'tan TTF alır; ağ yoksa null döner ve ImageResponse varsayılan yazı tipine düşer. */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const place = `${business.mall.name} · ${business.district} / ${business.city}`;
  const bottom = `${business.servicesLine} · ${tesettur.title}`;
  const all = `${business.displayName}${place}${bottom}${business.tagline}Demo`;
  const [display, body] = await Promise.all([
    loadFont("DM+Serif+Display", all),
    loadFont("Jost:wght@400", all),
  ]);
  const fonts: { name: string; data: ArrayBuffer; weight: 400; style: "normal" }[] = [];
  if (display) fonts.push({ name: "Display", data: display, weight: 400, style: "normal" });
  if (body) fonts.push({ name: "Body", data: body, weight: 400, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "72px 80px",
          position: "relative",
          fontFamily: body ? "Body" : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 56,
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: PAPER,
            border: `2px solid ${ACCENT}`,
            padding: "6px 16px",
          }}
        >
          Demo
        </div>
        <div style={{ display: "flex", width: 96, height: 6, background: ACCENT }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 112,
              lineHeight: 1.05,
              letterSpacing: -1,
              fontFamily: display ? "Display" : undefined,
            }}
          >
            {business.displayName}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 38, color: PAPER, opacity: 0.85 }}>{place}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: PAPER, opacity: 0.8 }}>{bottom}</div>
      </div>
    ),
    { ...size, fonts },
  );
}
