#!/usr/bin/env node
/**
 * Instantly import file builder.
 *
 * Turns a cohort CSV from scripts/fmcsa-cohort.ts into a CSV that Instantly
 * maps on upload: Email first, predefined columns (Company Name, Location)
 * auto-map, everything else becomes a custom variable used as {{Column}}.
 * The campaign copy that uses these variables is in
 * docs/outreach/instantly-campaign.md.
 *
 * What it does on top of the cohort:
 *   - keeps the tiers you ask for (default ICP-1, the first batch)
 *   - drops carriers whose six-month date is still in the future, so
 *     "turned 6 months old on …" is never sent early
 *   - drops anything on a suppression list: "stop" replies, past imports,
 *     or whole domains (lines like "@example.com")
 *   - with --verified, keeps only addresses a verifier marked deliverable
 *     (MillionVerifier or NeverBounce result CSVs). Without it, tick
 *     "Verify leads" when uploading to Instantly.
 *   - newest anniversaries first, then larger fleets, capped by --limit
 *
 * Usage:
 *   npm run outreach:instantly -- --in outreach-data/fmcsa-cohort-2026-10-11_2026-11-10.csv --limit 300
 *   npm run outreach:instantly -- --in <cohort.csv> --tier ICP-1,ICP-2 \
 *     --verified outreach-data/verifier-results.csv \
 *     --suppress outreach-data/instantly-m6-icp1-2026-11-10.csv
 *
 * outreach-data/suppression.csv is always applied when it exists. Keep every
 * "stop" reply in it (one email or @domain per line, or a CSV with an email
 * column) as well as in Instantly's global blocklist.
 *
 * Output: outreach-data/instantly-m6-<tiers>-<as-of>.csv (gitignored).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { csvRecords, parseCsv } from "./csv.mjs";

export { csvRecords, parseCsv };

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export interface ImportOptions {
  in: string;
  tiers: string[];
  limit: number | null;
  /** Carriers whose six-month date is after this day are held back. */
  asOf: string;
  verified: string | null;
  suppress: string[];
  out: string;
}

export const DEFAULT_SUPPRESSION_FILE = "outreach-data/suppression.csv";

export function parseArgs(argv: string[], today: string): ImportOptions {
  const single = new Map<string, string>();
  const suppress: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const eq = arg.indexOf("=");
    const key = eq === -1 ? arg.slice(2) : arg.slice(2, eq);
    let value: string;
    if (eq !== -1) {
      value = arg.slice(eq + 1);
    } else {
      value = argv[i + 1] ?? "";
      i++;
    }
    if (key === "suppress") suppress.push(value);
    else single.set(key, value);
  }

  const input = single.get("in");
  if (!input) throw new Error("--in <cohort.csv> is required (output of npm run outreach:cohort)");

  const asOf = single.get("as-of") || today;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) throw new Error(`--as-of must be YYYY-MM-DD, got "${asOf}"`);

  const tiers = (single.get("tier") || "ICP-1")
    .split(",")
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);
  for (const t of tiers) {
    if (t !== "ICP-1" && t !== "ICP-2") throw new Error(`--tier must be ICP-1, ICP-2 or both, got "${t}"`);
  }

  let limit: number | null = null;
  const rawLimit = single.get("limit");
  if (rawLimit) {
    limit = Number(rawLimit);
    if (!Number.isInteger(limit) || limit < 1) throw new Error("--limit must be a positive whole number");
  }

  const tierSlug = tiers.map((t) => t.toLowerCase().replace("-", "")).join("-");
  return {
    in: input,
    tiers,
    limit,
    asOf,
    verified: single.get("verified") || null,
    suppress: suppress.filter(Boolean),
    out: single.get("out") || `outreach-data/instantly-m6-${tierSlug}-${asOf}.csv`,
  };
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

export type CsvRecord = Record<string, string>;

function cell(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// ---------------------------------------------------------------------------
// Shaping
// ---------------------------------------------------------------------------

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-11-03" → "November 3". */
export function formatMonthDay(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return "";
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}`;
}

const LEGAL_SUFFIX = /[\s,.]+(L\.?L\.?C|INC|INCORPORATED|CORP|CORPORATION|CO|LTD|L\.?P|L\.?L\.?P|PLLC)\.?$/i;

/** Names as people say them: "S & P Jones LLC" → "S & P Jones". */
export function casualCompanyName(name: string): string {
  let out = name.trim();
  for (let prev = ""; prev !== out; ) {
    prev = out;
    out = out.replace(LEGAL_SUFFIX, "").replace(/[\s,.]+$/, "");
  }
  return out || name.trim();
}

export interface Suppression {
  emails: Set<string>;
  domains: Set<string>;
}

/**
 * Reads emails from any list: a CSV with an "email" column (Instantly
 * exports, earlier import files, verifier results) or one entry per line.
 * Entries without a local part ("@example.com" or "example.com") suppress a
 * whole domain.
 */
export function readSuppression(text: string, into: Suppression = { emails: new Set(), domains: new Set() }): Suppression {
  const rows = parseCsv(text);
  if (rows.length === 0) return into;
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const emailCol = header.indexOf("email");
  const values = emailCol !== -1 ? rows.slice(1).map((r) => r[emailCol] ?? "") : rows.map((r) => r[0] ?? "");

  for (const raw of values) {
    const v = raw.trim().toLowerCase();
    if (!v) continue;
    if (v.startsWith("@")) into.domains.add(v.slice(1));
    else if (v.includes("@")) into.emails.add(v);
    else if (/^[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) into.domains.add(v);
  }
  return into;
}

const DELIVERABLE = new Set(["ok", "valid", "good", "deliverable"]);
const STATUS_COLUMNS = ["result", "quality", "status", "verification_result", "email_status"];

/** email → verifier verdict, from a MillionVerifier or NeverBounce result file. */
export function readVerification(text: string): Map<string, string> {
  const records = csvRecords(text);
  const out = new Map<string, string>();
  if (records.length === 0) return out;
  const statusCol = STATUS_COLUMNS.find((c) => c in records[0]);
  if (!("email" in records[0]) || !statusCol) {
    throw new Error(`verifier file needs an "email" column and one of: ${STATUS_COLUMNS.join(", ")}`);
  }
  for (const r of records) {
    if (r.email) out.set(r.email.toLowerCase(), r[statusCol].toLowerCase());
  }
  return out;
}

export function isDeliverable(status: string | undefined): boolean {
  return status !== undefined && DELIVERABLE.has(status);
}

export interface InstantlyRow {
  Email: string;
  "Company Name": string;
  Location: string;
  Six_Month_Date: string;
  Tier: string;
  Trucks: string;
  Email_Type: string;
  DOT_Number: string;
  MC_Docket: string;
  Authority_Date: string;
  Cargo: string;
  Officer: string;
}

/** Column order matters: Instantly wants Email first. Headers stay ≤ 20 characters. */
export const INSTANTLY_COLUMNS: (keyof InstantlyRow)[] = [
  "Email", "Company Name", "Location", "Six_Month_Date", "Tier", "Trucks",
  "Email_Type", "DOT_Number", "MC_Docket", "Authority_Date", "Cargo", "Officer",
];

export type DropReason = "other-tier" | "not-yet-6-months" | "suppressed" | "not-verified" | "over-limit";

export function buildImport(
  cohort: CsvRecord[],
  opts: Pick<ImportOptions, "tiers" | "limit" | "asOf">,
  suppression: Suppression,
  verification: Map<string, string> | null,
): { rows: InstantlyRow[]; dropped: Record<DropReason, number> } {
  const dropped: Record<DropReason, number> = {
    "other-tier": 0,
    "not-yet-6-months": 0,
    suppressed: 0,
    "not-verified": 0,
    "over-limit": 0,
  };

  const eligible = cohort.filter((r) => {
    const email = (r.email ?? "").toLowerCase();
    if (!opts.tiers.includes((r.tier ?? "").toUpperCase())) {
      dropped["other-tier"]++;
      return false;
    }
    if (!r.six_month_date || r.six_month_date > opts.asOf) {
      dropped["not-yet-6-months"]++;
      return false;
    }
    const domain = email.slice(email.indexOf("@") + 1);
    if (suppression.emails.has(email) || suppression.domains.has(domain)) {
      dropped.suppressed++;
      return false;
    }
    if (verification && !isDeliverable(verification.get(email))) {
      dropped["not-verified"]++;
      return false;
    }
    return true;
  });

  eligible.sort(
    (a, b) =>
      b.six_month_date.localeCompare(a.six_month_date) ||
      Number(b.power_units ?? 0) - Number(a.power_units ?? 0) ||
      (a.dot_number ?? "").localeCompare(b.dot_number ?? ""),
  );

  const kept = opts.limit === null ? eligible : eligible.slice(0, opts.limit);
  dropped["over-limit"] = eligible.length - kept.length;

  const rows = kept.map((r) => {
    const name = r.dba_name || r.legal_name || "";
    return {
      Email: r.email.toLowerCase(),
      "Company Name": casualCompanyName(name),
      Location: [r.city, r.state].filter(Boolean).join(", "),
      Six_Month_Date: formatMonthDay(r.six_month_date),
      Tier: r.tier.toUpperCase(),
      Trucks: r.power_units ?? "",
      Email_Type: r.email_type ?? "",
      DOT_Number: r.dot_number ?? "",
      MC_Docket: r.mc_docket ?? "",
      Authority_Date: r.authority_granted ?? "",
      Cargo: r.cargo ?? "",
      Officer: r.contact_name ?? "",
    };
  });

  return { rows, dropped };
}

export function toInstantlyCsv(rows: InstantlyRow[]): string {
  return [INSTANTLY_COLUMNS.join(","), ...rows.map((r) => INSTANTLY_COLUMNS.map((k) => cell(r[k])).join(","))].join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs(process.argv.slice(2), new Date().toISOString().slice(0, 10));
  const log = (msg: string) => process.stderr.write(`[instantly] ${msg}\n`);

  const cohort = csvRecords(readFileSync(resolve(opts.in), "utf8"));
  log(`${cohort.length} carriers in ${opts.in}`);

  const suppressionFiles = [...opts.suppress];
  if (existsSync(DEFAULT_SUPPRESSION_FILE) && !suppressionFiles.includes(DEFAULT_SUPPRESSION_FILE)) {
    suppressionFiles.unshift(DEFAULT_SUPPRESSION_FILE);
  }
  const suppression: Suppression = { emails: new Set(), domains: new Set() };
  for (const f of suppressionFiles) readSuppression(readFileSync(resolve(f), "utf8"), suppression);
  log(
    suppressionFiles.length
      ? `suppressing ${suppression.emails.size} emails and ${suppression.domains.size} domains from ${suppressionFiles.join(", ")}`
      : "no suppression list yet (create outreach-data/suppression.csv after the first stop reply)",
  );

  const verification = opts.verified ? readVerification(readFileSync(resolve(opts.verified), "utf8")) : null;

  const { rows, dropped } = buildImport(cohort, opts, suppression, verification);
  const outPath = resolve(opts.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, toInstantlyCsv(rows));

  log(`kept ${rows.length} (${opts.tiers.join(" + ")}, six-month date on or before ${opts.asOf})`);
  log(`dropped: ${Object.entries(dropped).filter(([, n]) => n > 0).map(([k, n]) => `${k} ${n}`).join(", ") || "none"}`);
  log(`wrote ${outPath}`);
  log(
    verification
      ? "verified file applied: upload with \"Verify leads\" unchecked"
      : "NOT verified yet: tick \"Verify leads\" on upload (0.25 Instantly credits per lead), or rerun with --verified",
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (err) {
    process.stderr.write(`[instantly] failed: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  }
}
