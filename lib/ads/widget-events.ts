import { durableLeadId } from "@/lib/ads/btc-delivery";

// The live widget posts `mainline-widget-resize` only. It does not post a
// lead result. This parser is the parent-side gate for the message the
// frame would have to send after its own POST /api/widget-lead returns 2xx
// with a durable id. Any other payload is ignored.

export const LEAD_ACCEPTED_TYPE = "mainline-widget-lead-accepted";

export function leadIdFromAcceptedMessage(
  data: unknown,
  origin: string,
  widgetOrigin: string | null,
): string | null {
  if (!widgetOrigin || origin !== widgetOrigin) return null;
  if (!data || typeof data !== "object") return null;
  const candidate = data as Record<string, unknown>;
  if (candidate.type !== LEAD_ACCEPTED_TYPE) return null;
  return durableLeadId(candidate.leadId);
}
