import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  DieselSnapshotSchema,
  PADD_SLUGS,
  type DieselRegion,
  type DieselSeriesPoint,
  type DieselSnapshot,
  type PaddSlug,
} from "@/lib/validation/pulseSchema";
import { PADD_LABELS } from "@/lib/data/intel/diesel";

/* ===========================================================================
   /api/cron/pulse-diesel — weekly EIA fetch + snapshot writer.

   Schedule: Mondays ~18:00 UTC, after EIA publishes the week's retail
   on-highway diesel survey. See render.yaml for the cron job definition.

   Auth model copied verbatim from /api/cron/indexnow — Bearer CRON_SECRET,
   constant-time compare. Same secret on the web service AND the cron job.

   On success the route writes two files atomically:
     ${SNAPSHOTS_DIR}/diesel/${YYYY-W##}.json   (immutable per-week record)
     ${SNAPSHOTS_DIR}/diesel/latest.json        (pointer the pages read)

   On failure the route logs console.error and returns 503 (soft cron failure
   → operator-visible). It does NOT overwrite latest.json on failure; the
   pages keep serving the previous good snapshot.
   =========================================================================== */

export const dynamic = "force-dynamic";

const EIA_BASE = "https://api.eia.gov/v2/petroleum/pri/gnd/data/";

/* EIA series IDs for "Weekly U.S. No 2 Diesel Retail Prices (Dollars per Gallon)".
   Each PADD has its own series. Confirm against the EIA Open Data v2 docs:
   https://www.eia.gov/opendata/browser/petroleum/pri/gnd */
const EIA_SERIES: Record<PaddSlug, string> = {
  national: "EMD_EPD2D_PTE_NUS_DPG",
  "padd-1": "EMD_EPD2D_PTE_R10_DPG",
  "padd-2": "EMD_EPD2D_PTE_R20_DPG",
  "padd-3": "EMD_EPD2D_PTE_R30_DPG",
  "padd-4": "EMD_EPD2D_PTE_R40_DPG",
  "padd-5": "EMD_EPD2D_PTE_R50_DPG",
};

const SNAPSHOTS_DIR =
  process.env.PULSE_SNAPSHOTS_DIR ||
  path.join(process.cwd(), "lib", "data", "intel", "snapshots");

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function isAuthorized(req: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ")) return false;
  const provided = header.slice("Bearer ".length).trim();
  return timingSafeEqual(provided, expected);
}

/* EIA v2 returns rows shaped:
     { period: "2026-05-18", value: "3.812", ... }
   We need the last 10 weekly rows per series, sorted ascending. */
type EiaRow = { period: string; value: string };

async function fetchSeries(
  seriesId: string,
  apiKey: string,
): Promise<EiaRow[]> {
  const url = new URL(EIA_BASE);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("frequency", "weekly");
  url.searchParams.set("data[0]", "value");
  url.searchParams.set("facets[series][]", seriesId);
  url.searchParams.set("sort[0][column]", "period");
  url.searchParams.set("sort[0][direction]", "desc");
  url.searchParams.set("length", "60");
  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "dispatched-pulse-diesel-cron/1.0" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`EIA ${seriesId} ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { response?: { data?: EiaRow[] } };
  const rows = json.response?.data ?? [];
  return rows.reverse();
}

function isoWeekStamp(d: Date): string {
  const tmp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${week.toString().padStart(2, "0")}`;
}

function buildRegion(slug: PaddSlug, rows: EiaRow[]): DieselRegion {
  if (rows.length < 2) {
    throw new Error(`EIA series for ${slug} returned fewer than 2 weekly rows`);
  }
  const series: DieselSeriesPoint[] = rows
    .slice(-9)
    .map((r) => ({
      period: r.period,
      pricePerGallon: Number(r.value),
    }))
    .filter((p) => Number.isFinite(p.pricePerGallon) && p.pricePerGallon > 0);
  if (series.length < 2) {
    throw new Error(`EIA series for ${slug} produced fewer than 2 usable points`);
  }

  const latest = series[series.length - 1];
  const prior = series[series.length - 2];
  if (!latest || !prior) {
    throw new Error(`EIA series for ${slug} missing latest/prior point`);
  }
  const current = latest.pricePerGallon;
  const previous = prior.pricePerGallon;
  const changeAbs = current - previous;
  const changePct = (changeAbs / previous) * 100;

  // Find the row ~52 weeks back for YoY.
  const yearAgoRow = rows[rows.length - 53];
  const yearAgoVal = yearAgoRow ? Number(yearAgoRow.value) : undefined;
  const yearAgo =
    yearAgoVal && Number.isFinite(yearAgoVal) && yearAgoVal > 0
      ? yearAgoVal
      : undefined;
  const yoyChangePct =
    yearAgo !== undefined ? ((current - yearAgo) / yearAgo) * 100 : undefined;

  return {
    slug,
    label: PADD_LABELS[slug],
    current: Number(current.toFixed(3)),
    previous: Number(previous.toFixed(3)),
    changeAbs: Number(changeAbs.toFixed(3)),
    changePct: Number(changePct.toFixed(2)),
    ...(yearAgo !== undefined
      ? { yearAgo: Number(yearAgo.toFixed(3)) }
      : {}),
    ...(yoyChangePct !== undefined
      ? { yoyChangePct: Number(yoyChangePct.toFixed(2)) }
      : {}),
    series,
  };
}

async function writeSnapshotAtomic(
  dir: string,
  filename: string,
  body: string,
): Promise<void> {
  await mkdir(dir, { recursive: true });
  const target = path.join(dir, filename);
  const tmp = `${target}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(tmp, body, "utf-8");
  const { rename } = await import("node:fs/promises");
  await rename(tmp, target);
}

export async function POST(req: Request): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 },
    );
  }

  const apiKey = process.env.EIA_API_KEY;
  if (!apiKey) {
    console.error("[pulse-diesel] missing EIA_API_KEY env var");
    return NextResponse.json(
      { ok: false, error: "missing_eia_api_key" },
      { status: 503 },
    );
  }

  try {
    const regions: DieselRegion[] = [];
    let latestPeriod = "";
    for (const slug of PADD_SLUGS) {
      const rows = await fetchSeries(EIA_SERIES[slug], apiKey);
      const region = buildRegion(slug, rows);
      regions.push(region);
      const last = region.series[region.series.length - 1];
      if (last && (!latestPeriod || last.period > latestPeriod)) {
        latestPeriod = last.period;
      }
    }

    const generatedAt = new Date().toISOString();
    const snapshot: DieselSnapshot = {
      pillar: "diesel",
      generatedAt,
      period: isoWeekStamp(new Date(latestPeriod || generatedAt)),
      source: "EIA",
      sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
      methodologyHash: "eia-weekly-onhwy-v1",
      payload: {
        asOf: latestPeriod,
        unit: "USD/gal",
        regions,
      },
    };

    const parsed = DieselSnapshotSchema.safeParse(snapshot);
    if (!parsed.success) {
      console.error(
        `[pulse-diesel] built snapshot failed schema validation: ${parsed.error.message}`,
      );
      return NextResponse.json(
        { ok: false, error: "schema_validation_failed" },
        { status: 503 },
      );
    }

    const body = JSON.stringify(parsed.data, null, 2);
    const dir = path.join(SNAPSHOTS_DIR, "diesel");
    await writeSnapshotAtomic(dir, `${parsed.data.period}.json`, body);
    await writeSnapshotAtomic(dir, "latest.json", body);

    console.log(
      `[pulse-diesel] wrote period=${parsed.data.period} regions=${regions.length} asOf=${latestPeriod}`,
    );

    return NextResponse.json(
      { ok: true, period: parsed.data.period, asOf: latestPeriod, regions: regions.length },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[pulse-diesel] failed: ${message}`);
    return NextResponse.json(
      { ok: false, error: "fetch_or_write_failed" },
      { status: 503 },
    );
  }
}
