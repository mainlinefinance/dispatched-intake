#!/usr/bin/env node
/**
 * Turns an FMCSA company census CSV into data/outreach/leads.ndjson.
 *
 *   npm run outreach:import -- path/to/census.csv [--mx]
 *
 * Keeps US carriers with 1-10 power units and a usable email, then drops
 * every address that appears on more than one DOT number: those belong to
 * permit and compliance services that file on behalf of many carriers,
 * not to the carrier.
 *
 * --mx additionally drops addresses whose domain has no MX record. That
 * removes dead domains only. Run the output through a mailbox verifier
 * before sending; census emails are old and bounce heavily.
 */
import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import { resolveMx } from "node:dns/promises";
import path from "node:path";
import { createInterface } from "node:readline";

import { normalizeRow } from "../../lib/outreach/fmcsa.ts";
import type { Lead } from "../../lib/outreach/types.ts";

const OUT = path.join("data", "outreach", "leads.ndjson");

/** Splits one CSV record. Returns null while a quoted field is still open
    (the record continues on the next line). */
function splitCsv(record: string): string[] | null {
  const fields: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < record.length; i++) {
    const ch = record[i];
    if (quoted) {
      if (ch === '"' && record[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      fields.push(field);
      field = "";
    } else field += ch;
  }
  if (quoted) return null;
  fields.push(field);
  return fields;
}

async function hasMx(domain: string, cache: Map<string, Promise<boolean>>): Promise<boolean> {
  let pending = cache.get(domain);
  if (!pending) {
    pending = resolveMx(domain).then(
      (records) => records.length > 0,
      () => false,
    );
    cache.set(domain, pending);
  }
  return pending;
}

async function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) {
    console.error("Usage: npm run outreach:import -- <census.csv> [--mx]");
    process.exit(1);
  }

  const now = new Date();
  const skipped = new Map<string, number>();
  const bump = (reason: string) => skipped.set(reason, (skipped.get(reason) ?? 0) + 1);
  const leads: Lead[] = [];
  const emailCount = new Map<string, number>();

  let header: string[] | null = null;
  let pending = "";
  let rows = 0;
  const lines = createInterface({ input: createReadStream(file, "utf8"), crlfDelay: Infinity });
  for await (const line of lines) {
    pending = pending ? `${pending}\n${line}` : line;
    const fields = splitCsv(pending);
    if (!fields) continue;
    pending = "";
    if (!header) {
      header = fields.map((h) => h.replace(/^﻿/, "").trim().toLowerCase());
      continue;
    }
    rows++;
    const row: Record<string, string> = {};
    header.forEach((name, i) => (row[name] = fields[i] ?? ""));
    const result = normalizeRow(row, now);
    if (!result.ok) {
      bump(result.reason);
      continue;
    }
    leads.push(result.lead);
    emailCount.set(result.lead.email, (emailCount.get(result.lead.email) ?? 0) + 1);
  }

  let kept = leads.filter((lead) => {
    if (emailCount.get(lead.email) === 1) return true;
    bump("email-shared-across-dots");
    return false;
  });

  if (args.includes("--mx")) {
    const cache = new Map<string, Promise<boolean>>();
    const checked: Lead[] = [];
    const BATCH = 50;
    for (let i = 0; i < kept.length; i += BATCH) {
      const batch = kept.slice(i, i + BATCH);
      const results = await Promise.all(batch.map((l) => hasMx(l.email.split("@")[1], cache)));
      batch.forEach((lead, j) => (results[j] ? checked.push(lead) : bump("no-mx")));
    }
    kept = checked;
  }

  mkdirSync(path.dirname(OUT), { recursive: true });
  writeFileSync(OUT, kept.map((l) => JSON.stringify(l)).join("\n") + (kept.length ? "\n" : ""));

  const bySegment = new Map<string, number>();
  for (const lead of kept) bySegment.set(lead.segment, (bySegment.get(lead.segment) ?? 0) + 1);
  console.log(`Rows read: ${rows}`);
  console.log(`Leads written: ${kept.length} -> ${OUT}`);
  console.log("By segment:", Object.fromEntries(bySegment));
  console.log("Skipped:", Object.fromEntries(skipped));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
