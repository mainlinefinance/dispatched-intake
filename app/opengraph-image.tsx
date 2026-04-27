import { ImageResponse } from "next/og";

export const alt = "Dispatched — capital and insurance for commercial trucking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF7F2";
const INK = "#0E1A22";
const STEEL = "#1F4561";
const TERTIARY = "#5A6369";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: STEEL,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Dispatched
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 920,
            }}
          >
            Capital and insurance for commercial trucking.
          </div>
          <div
            style={{
              fontSize: 28,
              color: TERTIARY,
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Working capital matched to commercial lenders. Insurance compared
            against carriers writing your DOT class, in your state.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: TERTIARY,
          }}
        >
          <span>dispatched.finance</span>
          <span>Owner-ops · Small fleets</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
