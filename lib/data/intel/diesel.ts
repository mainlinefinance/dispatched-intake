import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  DieselSnapshotSchema,
  type DieselSnapshot,
  type DieselRegion,
  type PaddSlug,
} from "@/lib/validation/pulseSchema";

/* ===========================================================================
   Diesel snapshot reader.

   Source of truth: lib/data/intel/snapshots/diesel/latest.json (and a dated
   peer like 2026-W21.json). The cron handler at /api/cron/pulse-diesel writes
   both; pages read latest.json via getLatestDiesel().

   In production these files live on a Render Disk mounted at
   /var/data/intel-snapshots. The env var PULSE_SNAPSHOTS_DIR overrides the
   read root so dev / CI / staging can point at the in-repo seed.
   =========================================================================== */

const REPO_SNAPSHOTS_ROOT = path.join(process.cwd(), "lib", "data", "intel", "snapshots");

function snapshotsRoot(): string {
  const override = process.env.PULSE_SNAPSHOTS_DIR;
  return override && override.length > 0 ? override : REPO_SNAPSHOTS_ROOT;
}

export function dieselSnapshotPath(period: "latest" | string): string {
  return path.join(snapshotsRoot(), "diesel", `${period}.json`);
}

function repoDieselSnapshotPath(period: "latest" | string): string {
  return path.join(REPO_SNAPSHOTS_ROOT, "diesel", `${period}.json`);
}

/* Two-tier read: primary path (Render Disk mount in prod), then in-repo seed.
   The seed makes /pulse pages render on cold containers (disk newly mounted,
   cron hasn't fired yet) and on the build host (where the disk doesn't exist
   at all). Once the Monday cron writes a fresh snapshot, the primary path
   wins and the seed becomes inert. Errors other than ENOENT propagate. */
async function readSnapshotWithFallback(period: "latest" | string): Promise<string> {
  const primary = dieselSnapshotPath(period);
  try {
    return await readFile(primary, "utf-8");
  } catch (err) {
    if (!isEnoent(err)) throw err;
    const seed = repoDieselSnapshotPath(period);
    if (seed === primary) throw err;
    return await readFile(seed, "utf-8");
  }
}

function isEnoent(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "ENOENT"
  );
}

export async function getLatestDiesel(): Promise<DieselSnapshot> {
  const raw = await readSnapshotWithFallback("latest");
  const parsed = DieselSnapshotSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(
      `Diesel snapshot failed schema validation: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

export function getDieselRegion(
  snapshot: DieselSnapshot,
  slug: PaddSlug,
): DieselRegion | undefined {
  return snapshot.payload.regions.find((r) => r.slug === slug);
}

export const PADD_LABELS: Record<PaddSlug, string> = {
  national: "U.S. National",
  "padd-1": "PADD 1 — East Coast",
  "padd-2": "PADD 2 — Midwest",
  "padd-3": "PADD 3 — Gulf Coast",
  "padd-4": "PADD 4 — Rocky Mountain",
  "padd-5": "PADD 5 — West Coast",
};

export const PADD_DESCRIPTIONS: Record<PaddSlug, string> = {
  national:
    "U.S. weekly retail on-highway diesel — the headline number every owner-op sees at the pump.",
  "padd-1":
    "East Coast — PADD 1A (New England), 1B (Central Atlantic), 1C (Lower Atlantic). The most expensive PADD most weeks; densest traffic, tightest refining.",
  "padd-2":
    "Midwest — 15 states from North Dakota to Ohio down to Oklahoma and Kentucky. Heaviest dry-van lanes in the country.",
  "padd-3":
    "Gulf Coast — Texas, Louisiana, and the refining heart of the U.S. Lowest diesel prices most weeks; tariff and fuel-surcharge math anchors here.",
  "padd-4":
    "Rocky Mountain — Idaho, Montana, Wyoming, Colorado, Utah. Sparse refining capacity, long pipelines; prices move on West Coast supply.",
  "padd-5":
    "West Coast — California, Arizona, Nevada, Oregon, Washington, Alaska, Hawaii. The most expensive PADD almost every week; CARB diesel and state taxes anchor the spread.",
};

export function formatPrice(usdPerGal: number): string {
  return `$${usdPerGal.toFixed(3)}`;
}

export function formatChange(absChange: number, pctChange: number): string {
  const sign = absChange >= 0 ? "+" : "";
  return `${sign}${absChange.toFixed(3)} (${sign}${pctChange.toFixed(1)}%)`;
}

/* Hero-strip delta string: "+0.012 WoW · +3.2% YoY" or, when yearAgo data
   is unavailable, "+0.012 WoW · — YoY". Renders "—" (em dash) rather than
   collapsing missing data into a misleading +0.0%. */
export function formatHeroDelta(
  changeAbs: number,
  yoyChangePct: number | undefined,
): string {
  const wowSign = changeAbs >= 0 ? "+" : "";
  const wow = `${wowSign}${changeAbs.toFixed(3)} WoW`;
  if (yoyChangePct === undefined) return `${wow} · — YoY`;
  const yoySign = yoyChangePct >= 0 ? "+" : "";
  return `${wow} · ${yoySign}${yoyChangePct.toFixed(1)}% YoY`;
}

const DAY_MS = 86_400_000;
const DIESEL_STALE_THRESHOLD_DAYS = 10;

/* Server-side staleness check. Lives here (not in the badge component)
   because React purity rules forbid Date.now() during component render.
   Diesel snapshots refresh weekly on Mondays; anything older than 10 days
   is treated as a delayed refresh. */
export function isDieselSnapshotStale(generatedAt: string): boolean {
  const ageMs = new Date().getTime() - new Date(generatedAt).getTime();
  return ageMs > DIESEL_STALE_THRESHOLD_DAYS * DAY_MS;
}
