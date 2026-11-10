import type { Lead, Segment } from "./types.ts";

/* Turns one row of the FMCSA company census into a Lead, or a reason it
   was skipped. Column names differ between the census downloads (the
   legacy CSV is upper-case, the data.transportation.gov export is
   lower-case and renames a few fields), so lookups go through aliases. */

export const MAX_POWER_UNITS = 10;
const NEW_AUTHORITY_DAYS = 365;

const ALIASES = {
  dot: ["dot_number", "usdot", "usdot_number"],
  email: ["email_address", "email"],
  legalName: ["legal_name"],
  dbaName: ["dba_name"],
  state: ["phy_state", "physical_state", "state"],
  country: ["phy_country", "physical_country", "country"],
  units: ["nbr_power_unit", "power_units", "tot_pwr", "total_power_units"],
  addDate: ["add_date", "adddate"],
} as const;

const US_STATES = new Set(
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(
    " ",
  ),
);

// Shared mailboxes that are rarely the owner, plus domains we never mail.
const ROLE_LOCALPARTS = new Set([
  "abuse", "postmaster", "noreply", "no-reply", "donotreply", "webmaster",
  "hostmaster", "compliance", "legal", "privacy", "security", "spam",
]);
const BLOCKED_TLDS = [".gov", ".mil", ".edu"];
const KEEP_UPPER = new Set(["LLC", "INC", "LTD", "LP", "LLP", "PLLC", "CO", "USA", "II", "III", "IV"]);

export type SkipReason =
  | "no-email"
  | "bad-email"
  | "role-or-blocked-domain"
  | "not-us"
  | "no-dot"
  | "no-name"
  | "units-out-of-range";

export type NormalizeResult =
  | { ok: true; lead: Lead }
  | { ok: false; reason: SkipReason };

function pick(row: Record<string, string>, names: readonly string[]): string {
  for (const name of names) {
    const value = row[name];
    if (value !== undefined && value.trim() !== "") return value.trim();
  }
  return "";
}

/** "JOHN SMITH TRUCKING LLC" -> "John Smith Trucking LLC". */
export function displayCase(name: string): string {
  return name
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => {
      const bare = word.replace(/[.,]/g, "").toUpperCase();
      if (KEEP_UPPER.has(bare)) return word.toUpperCase();
      // Leave words that already carry mixed case or digits alone.
      if (/\d/.test(word) || (word !== word.toUpperCase() && word !== word.toLowerCase())) {
        return word;
      }
      // Capitalize after the start and after joiners: A&B, O'Brien, J.B.
      return word.toLowerCase().replace(/(^|[&'"(\-\/.])([a-z])/g, (_, pre: string, ch: string) => pre + ch.toUpperCase());
    })
    .join(" ");
}

/** Accepts YYYYMMDD, YYYY-MM-DD[...], MM/DD/YYYY and DD-MON-YY. */
export function parseCensusDate(raw: string): string | undefined {
  const value = raw.trim();
  let y: number, m: number, d: number;
  let match: RegExpMatchArray | null;
  if ((match = value.match(/^(\d{4})(\d{2})(\d{2})$/)) || (match = value.match(/^(\d{4})-(\d{2})-(\d{2})/))) {
    [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  } else if ((match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) {
    [m, d, y] = [Number(match[1]), Number(match[2]), Number(match[3])];
  } else if ((match = value.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2})$/))) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    m = months.indexOf(match[2].toLowerCase()) + 1;
    d = Number(match[1]);
    // Two-digit years: the census began in the 1970s.
    y = Number(match[3]) + (Number(match[3]) >= 70 ? 1900 : 2000);
  } else {
    return undefined;
  }
  if (m < 1 || m > 12 || d < 1 || d > 31) return undefined;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function segmentFor(powerUnits: number, addDate: string | undefined, now: Date): Segment {
  if (addDate) {
    const ageDays = (now.getTime() - new Date(`${addDate}T00:00:00Z`).getTime()) / 86_400_000;
    if (ageDays >= 0 && ageDays <= NEW_AUTHORITY_DAYS) return "new-authority";
  }
  return powerUnits === 1 ? "owner-operator" : "small-fleet";
}

/** `row` keys must already be lower-cased. */
export function normalizeRow(row: Record<string, string>, now: Date = new Date()): NormalizeResult {
  const email = pick(row, ALIASES.email).toLowerCase();
  if (!email) return { ok: false, reason: "no-email" };
  if (!/^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(email) || email.length > 254) {
    return { ok: false, reason: "bad-email" };
  }
  const [local, domain] = email.split("@");
  if (ROLE_LOCALPARTS.has(local) || BLOCKED_TLDS.some((tld) => domain.endsWith(tld))) {
    return { ok: false, reason: "role-or-blocked-domain" };
  }

  // CAN-SPAM governs US recipients. Canadian and Mexican carriers in the
  // census fall under consent-based rules (CASL), so they are excluded.
  const state = pick(row, ALIASES.state).toUpperCase();
  const country = pick(row, ALIASES.country).toUpperCase();
  if (!US_STATES.has(state) || (country !== "" && country !== "US")) {
    return { ok: false, reason: "not-us" };
  }

  const dot = pick(row, ALIASES.dot).replace(/\D/g, "");
  if (!dot) return { ok: false, reason: "no-dot" };

  const company = displayCase(pick(row, ALIASES.dbaName) || pick(row, ALIASES.legalName));
  if (!company) return { ok: false, reason: "no-name" };

  const powerUnits = Number.parseInt(pick(row, ALIASES.units), 10);
  if (!Number.isFinite(powerUnits) || powerUnits < 1 || powerUnits > MAX_POWER_UNITS) {
    return { ok: false, reason: "units-out-of-range" };
  }

  const addDate = parseCensusDate(pick(row, ALIASES.addDate));
  return {
    ok: true,
    lead: { dot, email, company, state, powerUnits, addDate, segment: segmentFor(powerUnits, addDate, now) },
  };
}
