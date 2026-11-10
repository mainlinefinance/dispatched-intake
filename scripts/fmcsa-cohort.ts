#!/usr/bin/env node
/**
 * FMCSA month-6 cohort builder for cold email outreach.
 *
 * Lists for-hire property carriers whose operating authority reached
 * six months old inside a date window. Six months is the minimum time in
 * business for most of Big Think Capital's products (working capital, line
 * of credit, equipment), so this is the moment a carrier becomes fundable.
 * See docs/outreach/cold-outreach-playbook.md.
 *
 * Sources (FMCSA open data on data.transportation.gov, public, no key):
 *   - 9mw4-x3tu  AuthHist - All With History (grants before the May 2026
 *                switch to FMCSA's Motus registration system; MM/DD/YYYY)
 *   - yu5v-wbh6  Motus AuthHist - All With History (grants and status
 *                changes after the switch; YYYYMMDD)
 *   - az4n-8mr2  Company Census File (email, fleet size, state, status)
 *
 * The output has no phone column on purpose. Outreach is email only: many
 * census phone numbers are cell phones, and calling or texting them without
 * consent is the TCPA exposure the playbook rules out.
 *
 * Usage:
 *   npm run outreach:cohort                       # anniversaries in the last 30 days
 *   npm run outreach:cohort -- --from 2026-11-10 --to 2026-12-10
 *   npm run outreach:cohort -- --exclude-states CA,NY --max-units 5
 *
 * Behind an HTTPS proxy (e.g. a cloud sandbox), Node's fetch needs
 * NODE_USE_ENV_PROXY=1 (and NODE_EXTRA_CA_CERTS if the proxy re-signs TLS).
 *
 * Output: outreach-data/fmcsa-cohort-<from>_<to>.csv (gitignored — it holds
 * contact data). Every address still needs a verifier pass (MillionVerifier
 * or NeverBounce) before it goes into a sending tool.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export interface CohortOptions {
  /** First six-month anniversary date to include (YYYY-MM-DD). */
  from: string;
  /** Last six-month anniversary date to include (YYYY-MM-DD). */
  to: string;
  /** Authority age that defines the cohort, in months. */
  months: number;
  minUnits: number;
  maxUnits: number;
  /** Physical-address states to drop (BTC does not take CA referrals). */
  excludeStates: string[];
  /** Drop an email used by more than this many USDOT numbers (filing services). */
  maxSharedEmail: number;
  /**
   * Drop a business domain used by more than this many carriers in the cohort.
   * Filing and permit services give each client a different mailbox on their
   * own domain, which the per-address check above does not catch.
   */
  maxSharedDomain: number;
  out: string;
}

export function parseArgs(argv: string[], today: string): CohortOptions {
  const flags = new Map<string, string>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const eq = arg.indexOf("=");
    if (eq !== -1) {
      flags.set(arg.slice(2, eq), arg.slice(eq + 1));
    } else {
      flags.set(arg.slice(2), argv[i + 1] ?? "");
      i++;
    }
  }

  const to = flags.get("to") || today;
  const from = flags.get("from") || addDays(to, -30);
  for (const [name, value] of [
    ["from", from],
    ["to", to],
  ]) {
    if (!isIsoDate(value)) throw new Error(`--${name} must be YYYY-MM-DD, got "${value}"`);
  }
  if (from > to) throw new Error(`--from (${from}) is after --to (${to})`);

  const int = (name: string, fallback: number) => {
    const raw = flags.get(name);
    if (raw === undefined || raw === "") return fallback;
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 0) throw new Error(`--${name} must be a whole number`);
    return n;
  };

  const excludeRaw = flags.get("exclude-states");
  const excludeStates = (excludeRaw === undefined ? "CA" : excludeRaw)
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  return {
    from,
    to,
    months: int("months", 6),
    minUnits: int("min-units", 1),
    maxUnits: int("max-units", 10),
    excludeStates,
    maxSharedEmail: int("max-shared-email", 2),
    maxSharedDomain: int("max-shared-domain", 3),
    out: flags.get("out") || `outreach-data/fmcsa-cohort-${from}_${to}.csv`,
  };
}

// ---------------------------------------------------------------------------
// Dates (all UTC, YYYY-MM-DD strings)
// ---------------------------------------------------------------------------

export function isIsoDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Calendar-month arithmetic that clamps to the last day (Aug 31 − 6 → Feb 28/29). */
export function addMonths(date: string, months: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const target = new Date(Date.UTC(y, m - 1 + months, 1));
  const lastDay = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();
  target.setUTCDate(Math.min(d, lastDay));
  return target.toISOString().slice(0, 10);
}

/** Grant dates whose anniversary can fall in [from, to]. Callers re-check exactly. */
export function grantWindow(opts: Pick<CohortOptions, "from" | "to" | "months">) {
  return {
    grantFrom: addMonths(opts.from, -opts.months),
    grantTo: addMonths(opts.to, -opts.months),
  };
}

/** "05/08/2026" → "2026-05-08" (pre-Motus AuthHist). */
export function parseSlashDate(s: string | undefined): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s ?? "");
  return m ? `${m[3]}-${m[1]}-${m[2]}` : null;
}

/** "20260508" → "2026-05-08" (Motus and census). */
export function parseCompactDate(s: string | undefined): string | null {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(s ?? "");
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

/** Months between two YYYY-MM-DD values, e.g. "2026-04-01".."2026-05-31" → ["2026-04","2026-05"]. */
export function monthsBetween(from: string, to: string): string[] {
  const out: string[] = [];
  let cursor = `${from.slice(0, 7)}-01`;
  while (cursor.slice(0, 7) <= to.slice(0, 7)) {
    out.push(cursor.slice(0, 7));
    cursor = addMonths(cursor, 1);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Record shaping
// ---------------------------------------------------------------------------

/** AuthHist pads DOT numbers ("04569723"); the census does not ("4569723"). */
export function normalizeDot(dot: string | undefined): string | null {
  const digits = (dot ?? "").trim();
  if (!/^\d+$/.test(digits)) return null;
  const stripped = digits.replace(/^0+/, "");
  return stripped === "" ? null : stripped;
}

const FREE_MAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "rocketmail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com", "icloud.com",
  "me.com", "mac.com", "comcast.net", "att.net", "sbcglobal.net", "bellsouth.net",
  "verizon.net", "cox.net", "charter.net", "earthlink.net", "protonmail.com",
  "proton.me", "mail.com", "gmx.com", "zoho.com",
]);

const EMAIL_RE = /^[^\s@,;]+@[^\s@,;]+\.[A-Za-z]{2,}$/;

export type EmailType = "free" | "business";

/** Lower-cased address and its type, or null when it is not a usable address. */
export function classifyEmail(raw: string | undefined): { email: string; type: EmailType } | null {
  const email = (raw ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return null;
  const domain = email.slice(email.indexOf("@") + 1);
  return { email, type: FREE_MAIL_DOMAINS.has(domain) ? "free" : "business" };
}

export type Tier = "ICP-1" | "ICP-2";

/** ICP-1: 2–10 trucks. ICP-2: one truck. Outside the band → null. */
export function tierFor(powerUnits: number, opts: Pick<CohortOptions, "minUnits" | "maxUnits">): Tier | null {
  if (!Number.isFinite(powerUnits) || powerUnits < opts.minUnits || powerUnits > opts.maxUnits) {
    return null;
  }
  return powerUnits === 1 ? "ICP-2" : "ICP-1";
}

export interface Grant {
  dot: string;
  docket: string;
  /** YYYY-MM-DD */
  grantedOn: string;
}

/** One grant per USDOT number, earliest date wins (both sources can list the same docket). */
export function mergeGrants(grants: Grant[]): Grant[] {
  const byDot = new Map<string, Grant>();
  for (const g of grants) {
    const seen = byDot.get(g.dot);
    if (!seen || g.grantedOn < seen.grantedOn) byDot.set(g.dot, g);
  }
  return [...byDot.values()].sort((a, b) => a.grantedOn.localeCompare(b.grantedOn) || a.dot.localeCompare(b.dot));
}

export interface MotusStatusRow {
  docket_number?: string;
  op_auth_status?: string;
  status_change_date?: string;
}

/** Latest Motus status per docket ("Active", "Inactive", …). */
export function latestStatusByDocket(rows: MotusStatusRow[]): Map<string, string> {
  const latest = new Map<string, { date: string; status: string }>();
  for (const r of rows) {
    if (!r.docket_number || !r.op_auth_status) continue;
    const date = r.status_change_date ?? "";
    const prev = latest.get(r.docket_number);
    if (!prev || date >= prev.date) latest.set(r.docket_number, { date, status: r.op_auth_status });
  }
  return new Map([...latest].map(([docket, v]) => [docket, v.status]));
}

export type CensusRow = Record<string, string | undefined>;

export interface CohortRow {
  tier: Tier;
  dot_number: string;
  mc_docket: string;
  legal_name: string;
  dba_name: string;
  contact_name: string;
  email: string;
  email_type: EmailType;
  city: string;
  state: string;
  power_units: number;
  drivers: number;
  authority_granted: string;
  six_month_date: string;
  cargo: string;
  mcs150_date: string;
}

export type ExclusionReason =
  | "anniversary-outside-window"
  | "authority-not-active"
  | "not-in-census"
  | "usdot-not-active"
  | "not-for-hire"
  | "outside-us"
  | "excluded-state"
  | "fleet-size"
  | "no-usable-email"
  | "shared-email"
  | "shared-domain"
  | "duplicate-email";

export interface SelectionResult {
  rows: CohortRow[];
  excluded: Record<ExclusionReason, number>;
}

const UPPER_WORDS = /\b(Llc|Inc|Llp|Lp|Usa|Ii|Iii|Iv|Dba)\b/g;

export function titleCase(s: string | undefined): string {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\b([a-z])/g, (c) => c.toUpperCase())
    .replace(UPPER_WORDS, (w) => w.toUpperCase());
}

/** Cargo flags are columns like crgo_genfreight = "X". */
function cargoList(row: CensusRow): string {
  return Object.keys(row)
    .filter((k) => k.startsWith("crgo_") && !k.endsWith("_desc") && row[k] === "X")
    .map((k) => k.slice(5))
    .sort()
    .join(";");
}

export function selectCarriers(
  grants: Grant[],
  census: Map<string, CensusRow>,
  motusStatus: Map<string, string>,
  sharedEmailCounts: Map<string, number>,
  opts: CohortOptions,
): SelectionResult {
  const excluded = {
    "anniversary-outside-window": 0,
    "authority-not-active": 0,
    "not-in-census": 0,
    "usdot-not-active": 0,
    "not-for-hire": 0,
    "outside-us": 0,
    "excluded-state": 0,
    "fleet-size": 0,
    "no-usable-email": 0,
    "shared-email": 0,
    "shared-domain": 0,
    "duplicate-email": 0,
  } satisfies Record<ExclusionReason, number>;
  const drop = (reason: ExclusionReason) => {
    excluded[reason]++;
  };

  const rows: CohortRow[] = [];
  const usedEmails = new Set<string>();

  for (const g of mergeGrants(grants)) {
    const anniversary = addMonths(g.grantedOn, opts.months);
    if (anniversary < opts.from || anniversary > opts.to) {
      drop("anniversary-outside-window");
      continue;
    }
    const status = motusStatus.get(g.docket);
    if (status !== undefined && status.toLowerCase() !== "active") {
      drop("authority-not-active");
      continue;
    }
    const c = census.get(g.dot);
    if (!c) {
      drop("not-in-census");
      continue;
    }
    if (c.status_code !== "A") {
      drop("usdot-not-active");
      continue;
    }
    if (!(c.classdef ?? "").toUpperCase().includes("AUTHORIZED FOR HIRE")) {
      drop("not-for-hire");
      continue;
    }
    if ((c.phy_country ?? "").toUpperCase() !== "US") {
      drop("outside-us");
      continue;
    }
    const state = (c.phy_state ?? "").toUpperCase();
    if (opts.excludeStates.includes(state)) {
      drop("excluded-state");
      continue;
    }
    const units = Number(c.power_units ?? NaN);
    const tier = tierFor(units, opts);
    if (!tier) {
      drop("fleet-size");
      continue;
    }
    const mail = classifyEmail(c.email_address);
    if (!mail) {
      drop("no-usable-email");
      continue;
    }
    if ((sharedEmailCounts.get(mail.email) ?? 1) > opts.maxSharedEmail) {
      drop("shared-email");
      continue;
    }
    if (usedEmails.has(mail.email)) {
      drop("duplicate-email");
      continue;
    }
    usedEmails.add(mail.email);

    rows.push({
      tier,
      dot_number: g.dot,
      mc_docket: g.docket,
      legal_name: titleCase(c.legal_name),
      dba_name: titleCase(c.dba_name),
      contact_name: titleCase(c.company_officer_1),
      email: mail.email,
      email_type: mail.type,
      city: titleCase(c.phy_city),
      state,
      power_units: units,
      drivers: Number(c.total_drivers ?? 0) || 0,
      authority_granted: g.grantedOn,
      six_month_date: anniversary,
      cargo: cargoList(c),
      mcs150_date: parseCompactDate(c.mcs150_date) ?? "",
    });
  }

  // Second pass: business domains shared by many carriers are filing services.
  const domainOf = (email: string) => email.slice(email.indexOf("@") + 1);
  const domainCounts = new Map<string, number>();
  for (const r of rows) {
    if (r.email_type !== "business") continue;
    const d = domainOf(r.email);
    domainCounts.set(d, (domainCounts.get(d) ?? 0) + 1);
  }
  const kept = rows.filter((r) => {
    if (r.email_type === "business" && (domainCounts.get(domainOf(r.email)) ?? 0) > opts.maxSharedDomain) {
      drop("shared-domain");
      return false;
    }
    return true;
  });

  return { rows: kept, excluded };
}

const CSV_COLUMNS: (keyof CohortRow)[] = [
  "tier", "dot_number", "mc_docket", "legal_name", "dba_name", "contact_name",
  "email", "email_type", "city", "state", "power_units", "drivers",
  "authority_granted", "six_month_date", "cargo", "mcs150_date",
];

export function toCsv(rows: CohortRow[]): string {
  const cell = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [CSV_COLUMNS.join(","), ...rows.map((r) => CSV_COLUMNS.map((k) => cell(r[k])).join(","))].join("\n") + "\n";
}

/** SoQL string literal. */
export function soqlString(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

// ---------------------------------------------------------------------------
// FMCSA open-data client (Socrata SODA API)
// ---------------------------------------------------------------------------

const SODA = "https://data.transportation.gov/resource";
const PRE_MOTUS_AUTH = "9mw4-x3tu";
const MOTUS_AUTH = "yu5v-wbh6";
const CENSUS = "az4n-8mr2";
const PAGE = 50_000;
const BATCH = 100;

const PRE_MOTUS_PROPERTY_TYPES = [
  "MOTOR PROPERTY COMMON CARRIER",
  "MOTOR PROPERTY CONTRACT CARRIER",
  "FOR HIRE PROPERTY",
];
const MOTUS_PROPERTY_TYPE = "Motor Carrier of Property (Except Household Goods)";

type Row = Record<string, string | undefined>;

async function soda(dataset: string, params: Record<string, string>): Promise<Row[]> {
  const rows: Row[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const qs = new URLSearchParams({ ...params, $limit: String(PAGE), $offset: String(offset) });
    const url = `${SODA}/${dataset}.json?${qs}`;
    let page: Row[] | null = null;
    for (let attempt = 1; attempt <= 4 && page === null; attempt++) {
      try {
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (res.ok) {
          page = (await res.json()) as Row[];
        } else if (res.status < 500 && res.status !== 429) {
          throw new Error(`${dataset}: HTTP ${res.status} ${await res.text()}`);
        }
      } catch (err) {
        if (attempt === 4 || (err instanceof Error && err.message.startsWith(`${dataset}:`))) throw err;
      }
      if (page === null) await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
    if (page === null) throw new Error(`${dataset}: no response`);
    rows.push(...page);
    if (page.length < PAGE) return rows;
  }
}

async function inBatches<T>(items: string[], run: (batch: string[]) => Promise<T[]>): Promise<T[]> {
  const out: T[] = [];
  const batches = chunk(items, BATCH);
  const CONCURRENCY = 4;
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const results = await Promise.all(batches.slice(i, i + CONCURRENCY).map(run));
    for (const r of results) out.push(...r);
  }
  return out;
}

async function fetchGrants(grantFrom: string, grantTo: string): Promise<Grant[]> {
  const grants: Grant[] = [];

  // Pre-Motus: text dates, so select whole months and filter exactly here.
  const monthClauses = monthsBetween(grantFrom, grantTo)
    .map((ym) => `orig_served_date like '${ym.slice(5, 7)}/%/${ym.slice(0, 4)}'`)
    .join(" OR ");
  const preMotus = await soda(PRE_MOTUS_AUTH, {
    $select: "docket_number, dot_number, orig_served_date",
    $where:
      `original_action_desc = 'GRANTED' AND disp_action_desc IS NULL ` +
      `AND mod_col_1 IN (${PRE_MOTUS_PROPERTY_TYPES.map(soqlString).join(", ")}) ` +
      `AND (${monthClauses})`,
    $order: ":id",
  });
  for (const r of preMotus) {
    const dot = normalizeDot(r.dot_number);
    const grantedOn = parseSlashDate(r.orig_served_date);
    if (dot && r.docket_number && grantedOn && grantedOn >= grantFrom && grantedOn <= grantTo) {
      grants.push({ dot, docket: r.docket_number, grantedOn });
    }
  }

  // Motus: compact dates sort as text. Reason is "GRANTED" or "Granted".
  const motus = await soda(MOTUS_AUTH, {
    $select: "docket_number, usdot_number, status_change_date",
    $where:
      `upper(reason) = 'GRANTED' AND op_auth_type = ${soqlString(MOTUS_PROPERTY_TYPE)} ` +
      `AND status_change_date >= '${grantFrom.replaceAll("-", "")}' ` +
      `AND status_change_date <= '${grantTo.replaceAll("-", "")}'`,
    $order: ":id",
  });
  for (const r of motus) {
    const dot = normalizeDot(r.usdot_number);
    const grantedOn = parseCompactDate(r.status_change_date);
    if (dot && r.docket_number && grantedOn) grants.push({ dot, docket: r.docket_number, grantedOn });
  }

  return grants;
}

async function fetchMotusStatus(dockets: string[]): Promise<Map<string, string>> {
  const rows = await inBatches(dockets, (batch) =>
    soda(MOTUS_AUTH, {
      $select: "docket_number, op_auth_status, status_change_date",
      $where: `docket_number IN (${batch.map(soqlString).join(", ")})`,
    }),
  );
  return latestStatusByDocket(rows);
}

async function fetchCensus(dots: string[]): Promise<Map<string, CensusRow>> {
  const rows = await inBatches(dots, (batch) =>
    soda(CENSUS, { $where: `dot_number IN (${batch.map(soqlString).join(", ")})` }),
  );
  return new Map(rows.filter((r) => r.dot_number).map((r) => [r.dot_number as string, r]));
}

/** How many USDOT records across the whole census share each address. */
async function fetchSharedEmailCounts(emails: string[]): Promise<Map<string, number>> {
  const rows = await inBatches(emails, (batch) =>
    soda(CENSUS, {
      $select: "lower(email_address) AS email, count(*) AS n",
      $where: `lower(email_address) IN (${batch.map(soqlString).join(", ")})`,
      $group: "email",
    }),
  );
  return new Map(rows.map((r) => [r.email ?? "", Number(r.n ?? 0)]));
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv.slice(2), new Date().toISOString().slice(0, 10));
  const { grantFrom, grantTo } = grantWindow(opts);
  const log = (msg: string) => process.stderr.write(`[cohort] ${msg}\n`);

  log(`anniversaries ${opts.from} → ${opts.to} (authority granted ${grantFrom} → ${grantTo})`);
  const grants = mergeGrants(await fetchGrants(grantFrom, grantTo));
  log(`${grants.length} carriers granted property authority in that range`);

  const [motusStatus, census] = await Promise.all([
    fetchMotusStatus([...new Set(grants.map((g) => g.docket))]),
    fetchCensus(grants.map((g) => g.dot)),
  ]);
  const candidateEmails = [
    ...new Set(
      [...census.values()]
        .map((c) => classifyEmail(c.email_address)?.email)
        .filter((e): e is string => Boolean(e)),
    ),
  ];
  const sharedEmailCounts = await fetchSharedEmailCounts(candidateEmails);

  const { rows, excluded } = selectCarriers(grants, census, motusStatus, sharedEmailCounts, opts);

  const outPath = resolve(opts.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, toCsv(rows));

  const count = (pred: (r: CohortRow) => boolean) => rows.filter(pred).length;
  log(`kept ${rows.length}: ICP-1 (2–${opts.maxUnits} trucks) ${count((r) => r.tier === "ICP-1")}, ICP-2 (1 truck) ${count((r) => r.tier === "ICP-2")}`);
  log(`email type: free-mail ${count((r) => r.email_type === "free")}, business domain ${count((r) => r.email_type === "business")}`);
  log(`excluded: ${Object.entries(excluded).filter(([, n]) => n > 0).map(([k, n]) => `${k} ${n}`).join(", ") || "none"}`);
  log(`wrote ${outPath}`);
  log("next: run every address through a verifier before importing it into a sender");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    process.stderr.write(`[cohort] failed: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  });
}
