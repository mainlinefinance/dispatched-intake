import { durableLeadId } from "@/lib/ads/btc-delivery";

// Parent-side contract for the Mainline widget repository.
//
// This origin never sees Big Think Capital's HTTP response. The widget
// host's own 2xx is not that response. The widget repo has to post this
// message only after BTC has accepted the lead and returned a durable id.
// This file cannot make that true; it only refuses every other message.
//
// Required payload:
//   { type: "mainline-widget-lead-accepted", acceptance: "btc", leadId }
// The sender must be the apply iframe's contentWindow, and event.origin
// must be exactly the widget origin (scheme + host + port, no path).

export const LEAD_ACCEPTED_TYPE = "mainline-widget-lead-accepted";
export const BTC_ACCEPTANCE = "btc";

export type TrustedLeadMessage = {
  data: unknown;
  origin: string;
  source: MessageEventSource | null;
  iframeWindow: MessageEventSource | null;
  widgetOrigin: string | null;
};

export function leadIdFromAcceptedMessage(message: TrustedLeadMessage): string | null {
  const { data, origin, source, iframeWindow, widgetOrigin } = message;
  if (!widgetOrigin || origin !== widgetOrigin) return null;
  if (!iframeWindow || source !== iframeWindow) return null;
  if (!data || typeof data !== "object") return null;
  const candidate = data as Record<string, unknown>;
  if (candidate.type !== LEAD_ACCEPTED_TYPE) return null;
  if (candidate.acceptance !== BTC_ACCEPTANCE) return null;
  return durableLeadId(candidate.leadId);
}
