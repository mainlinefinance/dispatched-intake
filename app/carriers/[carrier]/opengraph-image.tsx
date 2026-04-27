import { ImageResponse } from "next/og";
import { getCarrier } from "@/lib/data/carriers";

export const alt = "Carrier review — Dispatched";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF7F2";
const SUNKEN = "#F2EEE5";
const INK = "#0E1A22";
const STEEL = "#1F4561";
const TERTIARY = "#5A6369";

type Params = { carrier: string };

export async function generateImageMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { carrier } = await params;
  const c = getCarrier(carrier);
  if (!c) return [];
  return [
    {
      id: c.slug,
      alt: `${c.name} — commercial trucking insurance review — Dispatched`,
      contentType,
      size,
    },
  ];
}

export default async function OgImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { carrier } = await params;
  const c = getCarrier(carrier);
  if (!c) {
    return new ImageResponse(<div>Carrier not found</div>, { ...size });
  }

  const ratingLabel =
    c.notRated === true
      ? "Not Rated by AM Best"
      : c.amBestRating && c.amBestVerifiedAt
        ? `${c.amBestRating} · verified ${c.amBestVerifiedAt}`
        : "AM Best rating pending";

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
            justifyContent: "space-between",
            fontSize: 22,
            color: STEEL,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span>Dispatched · Carrier review</span>
          <span style={{ color: TERTIARY }}>
            {c.parentGroup ?? "Independent"}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {c.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: TERTIARY,
            }}
          >
            <span
              style={{
                background: SUNKEN,
                padding: "10px 18px",
                borderRadius: 8,
              }}
            >
              {ratingLabel}
            </span>
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
          <span>Commercial trucking insurance review</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
