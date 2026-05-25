import { z } from "zod";

/* ===========================================================================
   Schemas for Dispatched Pulse — the operational-intelligence layer at /pulse.

   Every snapshot file written by an /api/cron/pulse-* route validates against
   one of these schemas before it lands on disk. Pages that read the snapshot
   trust the on-disk shape and do not re-validate.

   Snapshot envelope is shared across pillars: { generatedAt, period, source,
   sourceUrl, payload, methodologyHash }. The pillar-specific payload shape
   varies.
   =========================================================================== */

const ISO_DATE = z.string().regex(
  /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/,
  "Must be an ISO 8601 date or date-time.",
);

const PERIOD = z.string().regex(
  /^\d{4}-(W\d{2}|\d{2}|Q[1-4])$/,
  "Period must be YYYY-WW (week), YYYY-MM (month), or YYYY-Q# (quarter).",
);

/* ---------------------------------------------------------------------------
   Diesel. EIA weekly retail on-highway diesel. National + 5 PADD regions.
   PADD 1 (East Coast), 2 (Midwest), 3 (Gulf Coast), 4 (Rocky Mountain),
   5 (West Coast). Prices in USD per gallon to three decimals (EIA's
   native precision).
   ------------------------------------------------------------------------ */

export const PADD_SLUGS = ["national", "padd-1", "padd-2", "padd-3", "padd-4", "padd-5"] as const;
export type PaddSlug = (typeof PADD_SLUGS)[number];

export const DieselSeriesPointSchema = z.object({
  period: ISO_DATE,
  pricePerGallon: z.number().positive().max(20),
});

export const DieselRegionSchema = z.object({
  slug: z.enum(PADD_SLUGS),
  label: z.string().min(1).max(80),
  current: z.number().positive().max(20),
  previous: z.number().positive().max(20),
  changeAbs: z.number(),
  changePct: z.number(),
  yearAgo: z.number().positive().max(20).optional(),
  yoyChangePct: z.number().optional(),
  series: z.array(DieselSeriesPointSchema).min(1).max(520),
});

export const DieselPayloadSchema = z.object({
  asOf: ISO_DATE,
  unit: z.literal("USD/gal"),
  regions: z.array(DieselRegionSchema).length(6),
});

export const DieselSnapshotSchema = z.object({
  pillar: z.literal("diesel"),
  generatedAt: ISO_DATE,
  period: PERIOD,
  source: z.literal("EIA"),
  sourceUrl: z.string().url(),
  methodologyHash: z.string().min(4).max(64),
  payload: DieselPayloadSchema,
});

export type DieselSnapshot = z.infer<typeof DieselSnapshotSchema>;
export type DieselRegion = z.infer<typeof DieselRegionSchema>;
export type DieselSeriesPoint = z.infer<typeof DieselSeriesPointSchema>;
