// Decision for the live funding submission.
//
// The browser form posts to Mainline `POST /api/widget-lead` (Big Think
// Capital). This repo does not call that API. A conversion is allowed only
// for an HTTP 2xx body that carries a durable id. Validation errors, offline
// failures, 4xx, 5xx, and a 2xx without an id stay on the form and do not
// convert. There is no WithFunded client in this codebase.

const ID_RE = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/;

const ID_KEYS = ["leadId", "lead_id", "applicationId", "application_id", "id"] as const;

export type BtcDeliveryInput =
  | { type: "validation_error" }
  | { type: "offline" }
  | { type: "http"; status: number; body?: unknown };

export type BtcDeliveryOutcome = {
  form: "success" | "error";
  leadId: string | null;
  conversion: "fire" | "skip";
  reason:
    | "validation_error"
    | "offline"
    | "http_error"
    | "no_id"
    | "accepted";
};

export function durableLeadId(value: unknown): string | null {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) {
    value = String(value);
  }
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!ID_RE.test(trimmed)) return null;
  return trimmed;
}

export function extractDurableLeadId(body: unknown, depth = 0): string | null {
  if (!body || typeof body !== "object" || depth > 1) return null;
  const record = body as Record<string, unknown>;
  for (const key of ID_KEYS) {
    const id = durableLeadId(record[key]);
    if (id) return id;
  }
  if ("data" in record) return extractDurableLeadId(record.data, depth + 1);
  return null;
}

export function classifyBtcDelivery(input: BtcDeliveryInput): BtcDeliveryOutcome {
  if (input.type === "validation_error") {
    return {
      form: "error",
      leadId: null,
      conversion: "skip",
      reason: "validation_error",
    };
  }
  if (input.type === "offline") {
    return {
      form: "error",
      leadId: null,
      conversion: "skip",
      reason: "offline",
    };
  }
  if (!Number.isInteger(input.status) || input.status < 200 || input.status > 299) {
    return {
      form: "error",
      leadId: null,
      conversion: "skip",
      reason: "http_error",
    };
  }
  const leadId = extractDurableLeadId(input.body);
  if (!leadId) {
    return {
      form: "error",
      leadId: null,
      conversion: "skip",
      reason: "no_id",
    };
  }
  return {
    form: "success",
    leadId,
    conversion: "fire",
    reason: "accepted",
  };
}

export function conversionForDelivery(
  input: BtcDeliveryInput,
  report: (leadId: string) => void,
): BtcDeliveryOutcome {
  const outcome = classifyBtcDelivery(input);
  if (outcome.conversion === "fire" && outcome.leadId) {
    report(outcome.leadId);
  }
  return outcome;
}
