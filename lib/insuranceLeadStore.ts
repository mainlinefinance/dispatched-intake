import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import type { InsuranceStarterSubmission } from "./insuranceValidation";

/* ===========================================================================
   Phase 2 lead persistence — newline-delimited JSON file plus stderr
   structured log. Render's filesystem is ephemeral; the file is
   dev/staging convenience and the log is what production aggregation
   actually retains. A real DATABASE_URL ingest replaces both in v3.

   When INSURANCE_LEAD_REQUIRE_TCPA is set (production), submissions missing
   either trustedFormCert or jornayaToken are rejected by the route handler
   *before* this function is called. This module does not enforce that gate
   itself — it only persists what it is given.

   The single broker partner constant below is the name used in the consent
   string at the moment of submission. Multi-partner round-robin or
   appetite-based routing is a v3 problem.
   =========================================================================== */

export const BROKER_PARTNER_NAME = "ACME Trucking Insurance Brokers";

const LEAD_FILE_REL = path.join("data", "leads", "insurance-leads.ndjson");

export type StoredInsuranceLead = {
  leadId: string;
  receivedAt: string;
  brokerPartner: string;
  submission: InsuranceStarterSubmission;
};

export async function appendInsuranceLead(
  submission: InsuranceStarterSubmission,
): Promise<StoredInsuranceLead> {
  const record: StoredInsuranceLead = {
    leadId: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    brokerPartner: BROKER_PARTNER_NAME,
    submission,
  };

  const line = JSON.stringify(record) + "\n";

  // Production-aggregated structured log — Render captures stdout/stderr.
  console.log("[insurance lead]", line.trimEnd());

  // Best-effort file persistence. Filesystem is ephemeral on Render's
  // free / starter tiers; do not rely on this for downstream broker handoff.
  try {
    const abs = path.join(process.cwd(), LEAD_FILE_REL);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.appendFile(abs, line, "utf8");
  } catch (err) {
    // File write failed — log and continue. The structured stderr log above
    // is still the authoritative trail.
    console.error("[insurance lead] file persistence failed", err);
  }

  return record;
}

export function isTcpaRequired(): boolean {
  return process.env.INSURANCE_LEAD_REQUIRE_TCPA === "true";
}
