import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/data/products";
import { getInsuranceState } from "@/lib/data/states";
import { isStateMoneyPagePublished } from "@/lib/data/moneyPageIndex";

export const alt = "Commercial trucking insurance — Dispatched";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF7F2";
const SUNKEN = "#F2EEE5";
const INK = "#0E1A22";
const STEEL = "#1F4561";
const TERTIARY = "#5A6369";

type Params = { product: string; state: string };

export async function generateImageMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product, state } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  if (!p || !s) return [];
  if (!isStateMoneyPagePublished(p.slug, s.slug)) return [];
  return [
    {
      id: `${p.slug}-${s.slug}`,
      alt: `${p.name} for commercial trucking in ${s.name} — Dispatched`,
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
  const { product, state } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  const headline =
    p && s ? `${p.name} for commercial trucking in ${s.name}.` : "Commercial trucking insurance — Dispatched";
  const eyebrow = p && s ? `${p.shortLabel} · ${s.abbr}` : "Insurance";

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
          <span>Dispatched · Insurance</span>
          <span style={{ color: TERTIARY }}>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 24,
              color: TERTIARY,
            }}
          >
            <span
              style={{
                background: SUNKEN,
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              Carriers · {s ? s.topCarriers.length : 0}
            </span>
            <span
              style={{
                background: SUNKEN,
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              Sourced editorial
            </span>
            <span
              style={{
                background: SUNKEN,
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              State DOI context
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
          <span>Compare carriers writing your DOT class</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
