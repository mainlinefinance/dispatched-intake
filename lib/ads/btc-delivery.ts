// Outcomes for a response this page can actually hold.
//
// The live form posts to the widget host (`POST /api/widget-lead`). That
// response is not Big Think Capital's response. A widget-host 2xx, with or
// without an id, does not accept the lead and does not report a conversion.
// This module does not call the network and does not invent a BTC status.

const ID_RE = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/;

export type WidgetHostDeliveryInput =
  | { type: "validation_error" }
  | { type: "offline" }
  | { type: "http"; status: number; body?: unknown };

export type WidgetHostDeliveryOutcome = {
  form: "error";
  leadId: null;
  conversion: "skip";
  reason:
    | "validation_error"
    | "offline"
    | "http_error"
    | "no_id"
    | "widget_http_not_btc";
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

export function classifyWidgetHostDelivery(
  input: WidgetHostDeliveryInput,
): WidgetHostDeliveryOutcome {
  if (input.type === "validation_error") {
    return skipped("validation_error");
  }
  if (input.type === "offline") {
    return skipped("offline");
  }
  if (!Number.isInteger(input.status) || input.status < 200 || input.status > 299) {
    return skipped("http_error");
  }
  if (!durableIdInBody(input.body)) {
    return skipped("no_id");
  }
  return skipped("widget_http_not_btc");
}

function skipped(
  reason: WidgetHostDeliveryOutcome["reason"],
): WidgetHostDeliveryOutcome {
  return { form: "error", leadId: null, conversion: "skip", reason };
}

function durableIdInBody(body: unknown, depth = 0): boolean {
  if (!body || typeof body !== "object" || depth > 1) return false;
  const record = body as Record<string, unknown>;
  for (const key of ["leadId", "lead_id", "applicationId", "application_id", "id"]) {
    if (durableLeadId(record[key])) return true;
  }
  if ("data" in record) return durableIdInBody(record.data, depth + 1);
  return false;
}
