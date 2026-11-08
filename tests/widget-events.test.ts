import { describe, expect, it } from "vitest";
import { LEAD_ACCEPTED_TYPE, leadIdFromAcceptedMessage } from "@/lib/ads/widget-events";

const ORIGIN = "https://mainline.tryoption.ai";
const LEAD_ID = "btc_lead_12345678";

describe("widget lead message", () => {
  it("reads a durable id only from the widget origin", () => {
    expect(
      leadIdFromAcceptedMessage(
        { type: LEAD_ACCEPTED_TYPE, leadId: LEAD_ID },
        ORIGIN,
        ORIGIN,
      ),
    ).toBe(LEAD_ID);
  });

  it("ignores resize, other origins, and an id that is not durable", () => {
    expect(
      leadIdFromAcceptedMessage(
        { type: "mainline-widget-resize", height: 640 },
        ORIGIN,
        ORIGIN,
      ),
    ).toBeNull();
    expect(
      leadIdFromAcceptedMessage(
        { type: LEAD_ACCEPTED_TYPE, leadId: LEAD_ID },
        "https://evil.example",
        ORIGIN,
      ),
    ).toBeNull();
    expect(
      leadIdFromAcceptedMessage(
        { type: LEAD_ACCEPTED_TYPE, leadId: "x" },
        ORIGIN,
        ORIGIN,
      ),
    ).toBeNull();
    expect(leadIdFromAcceptedMessage("not-json", ORIGIN, ORIGIN)).toBeNull();
    expect(leadIdFromAcceptedMessage({ type: LEAD_ACCEPTED_TYPE, leadId: LEAD_ID }, ORIGIN, null)).toBeNull();
  });
});
