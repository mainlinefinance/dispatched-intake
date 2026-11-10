#!/usr/bin/env node
/**
 * Sequence renderer: shows the cold emails exactly as carriers will read them.
 *
 * Reads the three steps from docs/outreach/instantly-campaign.md (the single
 * source of the copy) and renders them for rows of an Instantly import file,
 * resolving what Instantly resolves at send time:
 *   - spintax           {{RANDOM | a | b}}, with variables inside options
 *   - variables         {{companyName}}, {{Six_Month_Date}}, …
 *   - fallbacks         {{companyName | your company}}
 *   - the Tier branch   {% if Tier == "ICP-1" %}…{% endif %}
 *
 * Spintax picks are seeded per carrier and step, so reruns give the same
 * variant. The first carrier is also rendered as a one-truck carrier, to
 * check that the fleet line disappears cleanly.
 *
 * Outputs (both gitignored under outreach-data/):
 *   - sequence-preview.md   for reading and review
 *   - sequence-tests.json   {label, step, subject, text}[] for test sends to
 *                           your own inboxes. It holds no carrier email
 *                           addresses, so it cannot be sent to a carrier by
 *                           mistake.
 *
 * Usage:
 *   npm run outreach:render -- --in outreach-data/instantly-m6-icp1-2026-11-10.csv
 *   npm run outreach:render -- --in <file> --count 3 --sender Angelo \
 *     --address "Dispatched, Inc., PO Box 123, Dallas, TX 75201"
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { csvRecords, parseCsv } from "./csv.mjs";

export const SEQUENCE_DOC = "docs/outreach/instantly-campaign.md";
export const ADDRESS_PLACEHOLDER = "[POSTAL ADDRESS]";

// ---------------------------------------------------------------------------
// Sequence document
// ---------------------------------------------------------------------------

export interface SequenceStep {
  step: number;
  /** Heading text after "Step N", e.g. "(day 0)". */
  timing: string;
  /** Only step 1 has a subject; follow-ups reply in the same thread. */
  subject: string | null;
  body: string;
}

/** Pulls the fenced blocks under each "### Step N" heading. */
export function parseSequenceDoc(md: string): SequenceStep[] {
  const steps: SequenceStep[] = [];
  const section = /^### Step (\d+)([^\n]*)\n([\s\S]*?)(?=^#{2,3} |(?![\s\S]))/gm;
  for (const m of md.matchAll(section)) {
    const blocks = [...m[3].matchAll(/```[^\n]*\n([\s\S]*?)\n```/g)].map((b) => b[1]);
    if (blocks.length !== 1 && blocks.length !== 2) {
      throw new Error(`Step ${m[1]} must have a body block, or a subject block and a body block`);
    }
    steps.push({
      step: Number(m[1]),
      timing: m[2].trim(),
      subject: blocks.length === 2 ? blocks[0].trim() : null,
      body: blocks[blocks.length - 1],
    });
  }
  if (steps.length === 0) throw new Error(`no "### Step N" sections found in ${SEQUENCE_DOC}`);
  if (steps[0].subject === null) throw new Error("step 1 needs a subject block");
  return steps;
}

// ---------------------------------------------------------------------------
// Template rendering (the subset of Instantly syntax the copy uses)
// ---------------------------------------------------------------------------

export type Vars = Record<string, string>;

/** {% if Name == "value" %}…{% endif %}. Anything else in {% %} is rejected. */
export function applyConditions(template: string, vars: Vars): string {
  const out = template.replace(
    /\{%\s*if\s+(\w+)\s*==\s*"([^"]*)"\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g,
    (_, name: string, value: string, inner: string) => {
      if (!(name in vars)) throw new Error(`unknown variable "${name}" in a Liquid condition`);
      return vars[name] === value ? inner : "";
    },
  );
  if (out.includes("{%")) throw new Error("unsupported Liquid tag: only {% if X == \"y\" %}…{% endif %} is rendered");
  return out;
}

/** Index of the "}}" that closes the "{{" at `open`, counting nesting. */
function matchClose(s: string, open: number): number {
  let depth = 0;
  for (let i = open; i < s.length - 1; ) {
    if (s.startsWith("{{", i)) {
      depth++;
      i += 2;
    } else if (s.startsWith("}}", i)) {
      depth--;
      if (depth === 0) return i;
      i += 2;
    } else {
      i++;
    }
  }
  return -1;
}

/** Splits on "|" that are not inside a nested {{ }}. */
function splitTopLevel(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < s.length; ) {
    if (s.startsWith("{{", i)) {
      depth++;
      i += 2;
    } else if (s.startsWith("}}", i)) {
      depth--;
      i += 2;
    } else {
      if (s[i] === "|" && depth === 0) {
        parts.push(s.slice(start, i));
        start = i + 1;
      }
      i++;
    }
  }
  parts.push(s.slice(start));
  return parts.map((p) => p.trim());
}

function resolveTag(inner: string, vars: Vars, rand: () => number): string {
  const parts = splitTopLevel(inner);
  if (parts[0] === "RANDOM") {
    const options = parts.slice(1);
    if (options.length === 0) throw new Error("{{RANDOM}} needs at least one option");
    return renderSpin(options[Math.floor(rand() * options.length)], vars, rand);
  }
  for (let k = 0; k < parts.length; k++) {
    const part = parts[k];
    const isName = /^\w+$/.test(part);
    if (isName && part in vars) {
      if (vars[part]) return vars[part];
      continue; // empty value: try the next fallback
    }
    if (k === 0) throw new Error(`unknown variable {{${part}}} — check the column name (variables are case-sensitive)`);
    return renderSpin(part, vars, rand); // literal fallback
  }
  return "";
}

/** Resolves {{RANDOM | …}}, {{variable}} and {{variable | fallback}}. */
export function renderSpin(template: string, vars: Vars, rand: () => number): string {
  let out = "";
  let i = 0;
  while (i < template.length) {
    const open = template.indexOf("{{", i);
    if (open === -1) {
      out += template.slice(i);
      break;
    }
    out += template.slice(i, open);
    const close = matchClose(template, open);
    if (close === -1) throw new Error(`unclosed "{{" near: ${template.slice(open, open + 40)}`);
    out += resolveTag(template.slice(open + 2, close), vars, rand);
    i = close + 2;
  }
  return out;
}

export function renderTemplate(template: string, vars: Vars, rand: () => number): string {
  return renderSpin(applyConditions(template, vars), vars, rand);
}

/** Deterministic RNG (FNV-1a seed → mulberry32) so a carrier always gets the same variant. */
export function seededRandom(key: string): () => number {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Rows → rendered emails
// ---------------------------------------------------------------------------

/**
 * Instantly variables for one import-file row. Predefined columns become
 * Instantly's camelCase names; custom columns keep their header.
 * Records come from csvRecords(), so keys are lower-cased headers.
 */
export function varsForRow(row: Record<string, string>, headers: string[], sender: string): Vars {
  const predefined: Record<string, string> = {
    email: "email",
    "company name": "companyName",
    location: "location",
  };
  const vars: Vars = { sendingAccountFirstName: sender };
  for (const header of headers) {
    const key = header.trim();
    const name = predefined[key.toLowerCase()] ?? key;
    vars[name] = row[key.toLowerCase()] ?? "";
  }
  return vars;
}

export interface RenderedEmail {
  /** Carrier label for the preview, e.g. "TMJ Transport (DOT 4512345, ICP-1)". No email address. */
  label: string;
  step: number;
  timing: string;
  subject: string;
  text: string;
}

export function renderSequence(
  steps: SequenceStep[],
  vars: Vars,
  label: string,
  seedKey: string,
  address: string | null,
): RenderedEmail[] {
  let threadSubject = "";
  return steps.map((s) => {
    const rand = seededRandom(`${seedKey}#${s.step}`);
    if (s.subject !== null) threadSubject = renderTemplate(s.subject, vars, rand);
    let text = renderTemplate(s.body, vars, rand).trimEnd();
    if (address) text = text.split(ADDRESS_PLACEHOLDER).join(address);
    return {
      label,
      step: s.step,
      timing: s.timing,
      subject: s.subject !== null ? threadSubject : `Re: ${threadSubject}`,
      text,
    };
  });
}

export function previewMarkdown(emails: RenderedEmail[], generatedOn: string, addressSet: boolean): string {
  const lines = [
    "# Sequence preview",
    "",
    `_Rendered from ${SEQUENCE_DOC} on ${generatedOn}. Spintax picks are seeded per carrier and step, so reruns show the same variant._`,
    "",
  ];
  if (!addressSet) {
    lines.push(`> **Footer not ready:** ${ADDRESS_PLACEHOLDER} is still a placeholder. Rerun with --address before any real send.`, "");
  }
  let current = "";
  for (const e of emails) {
    if (e.label !== current) {
      current = e.label;
      lines.push(`## ${e.label}`, "");
    }
    lines.push(`### Step ${e.step} ${e.timing}`, "", `**Subject:** ${e.subject}`, "", "```text", e.text, "```", "");
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

interface CliOptions {
  in: string;
  count: number;
  sender: string;
  address: string | null;
  outDir: string;
}

export function parseArgs(argv: string[]): CliOptions {
  const flags = new Map<string, string>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const eq = arg.indexOf("=");
    if (eq !== -1) flags.set(arg.slice(2, eq), arg.slice(eq + 1));
    else {
      flags.set(arg.slice(2), argv[i + 1] ?? "");
      i++;
    }
  }
  const input = flags.get("in");
  if (!input) throw new Error("--in <instantly import file> is required (output of npm run outreach:instantly)");
  const count = Number(flags.get("count") || 5);
  if (!Number.isInteger(count) || count < 1) throw new Error("--count must be a positive whole number");
  return {
    in: input,
    count,
    sender: flags.get("sender") || "[SENDER]",
    address: flags.get("address") || null,
    outDir: flags.get("out-dir") || "outreach-data",
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const steps = parseSequenceDoc(readFileSync(resolve(SEQUENCE_DOC), "utf8"));
  const text = readFileSync(resolve(opts.in), "utf8");
  const headers = parseCsv(text)[0] ?? [];
  const rows = csvRecords(text).slice(0, opts.count);
  if (rows.length === 0) throw new Error(`no rows in ${opts.in}`);

  const emails: RenderedEmail[] = [];
  rows.forEach((row, index) => {
    const vars = varsForRow(row, headers, opts.sender);
    const label = `${vars.companyName} (DOT ${vars.DOT_Number ?? "?"}, ${vars.Tier ?? "?"}, ${vars.Trucks ?? "?"} trucks)`;
    const seed = vars.email || String(index);
    emails.push(...renderSequence(steps, vars, label, seed, opts.address));
    if (index === 0 && vars.Tier === "ICP-1") {
      const asOneTruck = { ...vars, Tier: "ICP-2", Trucks: "1" };
      emails.push(...renderSequence(steps, asOneTruck, `${vars.companyName} rendered as a one-truck carrier (ICP-2 check)`, seed, opts.address));
    }
  });

  const today = new Date().toISOString().slice(0, 10);
  const mdPath = resolve(opts.outDir, "sequence-preview.md");
  const jsonPath = resolve(opts.outDir, "sequence-tests.json");
  mkdirSync(dirname(mdPath), { recursive: true });
  writeFileSync(mdPath, previewMarkdown(emails, today, opts.address !== null));
  writeFileSync(jsonPath, JSON.stringify(emails, null, 2) + "\n");

  const log = (msg: string) => process.stderr.write(`[render] ${msg}\n`);
  log(`${steps.length} steps × ${rows.length} carriers (+ ICP-2 check) = ${emails.length} emails`);
  log(`wrote ${mdPath}`);
  log(`wrote ${jsonPath} (no carrier addresses: for test sends to your own inboxes)`);
  if (!opts.address) log(`footer still has ${ADDRESS_PLACEHOLDER}: pass --address before any real send`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    process.stderr.write(`[render] failed: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  });
}
