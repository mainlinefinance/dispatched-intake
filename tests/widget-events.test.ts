import { describe, expect, it } from "vitest";
import { LEAD_ACCEPTED_TYPE, leadIdFromAcceptedMessage } from "@/lib/ads/widget-events";

const ORIGIN = "https://mainline.tryoption.ai";
const LEAD_ID = "btc_lead_12345678";
const frame = { kind: "apply-iframe" } as unknown as MessageEventSource;
const otherWindow = { kind: "other-window" } as unknown as MessageEventSource;

function read(
  overrides: Partial<Parameters<typeof leadIdFromAcceptedMessage>[0]> = {},
) {
  return leadIdFromAcceptedMessage({
    data: {
      type: LEAD_ACCEPTED_TYPE,
      acceptance: "btc",
      leadId: LEAD_ID,
    },
    origin: ORIGIN,
    source: frame,
    iframeWindow: frame,
    widgetOrigin: ORIGIN,
    ...overrides,
  });
}

describe("trusted BTC acceptance message", () => {
  it("requires the exact origin, the iframe window, acceptance btc, and a durable id", () => {
    expect(read()).toBe(LEAD_ID);
  });

  it("rejects the same origin when the sender is not the iframe", () => {
    expect(read({ source: otherWindow })).toBeNull();
    expect(read({ source: null })).toBeNull();
    expect(read({ iframeWindow: null })).toBeNull();
  });

  it("rejects a lookalike origin even from the iframe window", () => {
    expect(read({ origin: "https://mainline.tryoption.ai.evil.com" })).toBeNull();
    expect(read({ origin: "https://evil.example" })).toBeNull();
    expect(read({ origin: "https://mainline.tryoption.ai/w/dispatched-finance" })).toBeNull();
    expect(read({ origin: "http://mainline.tryoption.ai" })).toBeNull();
    expect(read({ widgetOrigin: null })).toBeNull();
  });

  it("rejects a widget 2xx signal that is not the BTC acceptance message", () => {
    expect(read({ data: { type: "mainline-widget-resize", height: 640 } })).toBeNull();
    expect(read({ data: { type: LEAD_ACCEPTED_TYPE, leadId: LEAD_ID, status: 200 } })).toBeNull();
    expect(read({ data: { type: LEAD_ACCEPTED_TYPE, acceptance: "widget", leadId: LEAD_ID } })).toBeNull();
    expect(read({ data: { type: LEAD_ACCEPTED_TYPE, acceptance: "btc", leadId: "" } })).toBeNull();
    expect(read({ data: { type: LEAD_ACCEPTED_TYPE, acceptance: "btc", leadId: "short" } })).toBeNull();
    expect(read({ data: "200" })).toBeNull();
  });
});
