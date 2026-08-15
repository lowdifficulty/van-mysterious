import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-url";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          color: "#f3ead8",
        }}
      >
        <div style={{ display: "flex", height: 42, background: "#000000" }} />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "36px 80px 32px",
            background:
              "radial-gradient(ellipse at 78% 16%, rgba(201,164,74,0.26) 0%, transparent 40%), radial-gradient(ellipse at 10% 90%, rgba(61,26,36,0.62) 0%, transparent 52%), linear-gradient(160deg, #14090d 0%, #070506 50%, #0c090b 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 11,
              textTransform: "uppercase",
              color: "#c9a44a",
            }}
          >
            Midnight cinema · fictional archive
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 152,
              lineHeight: 0.86,
              marginTop: 14,
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            Van
          </div>
          <div
            style={{
              display: "flex",
              width: 240,
              height: 1,
              marginTop: 22,
              background:
                "linear-gradient(90deg, transparent, #c9a44a, transparent)",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 22,
              maxWidth: 820,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#e8d5a3",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              maxWidth: 780,
              fontSize: 22,
              lineHeight: 1.4,
              color: "#a89f93",
            }}
          >
            Stills, diary pages, and playable weather.
          </div>
        </div>
        <div style={{ display: "flex", height: 42, background: "#000000" }} />
      </div>
    ),
    { ...size },
  );
}
