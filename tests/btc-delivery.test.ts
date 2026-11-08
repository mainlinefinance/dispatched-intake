import { describe, expect, it, vi } from "vitest";
import { classifyWidgetHostDelivery } from "@/lib/ads/btc-delivery";

const LEAD_ID = "btc_lead_12345678";

describe("widget-host HTTP is not BTC acceptance", () => {
  it("does not accept a 2xx body that contains a durable id", () => {
    expect(
      classifyWidgetHostDelivery({
        type: "http",
        status: 200,
        body: { leadId: LEAD_ID },
      }),
    ).toEqual({
      form: "error",
      leadId: null,
      conversion: "skip",
      reason: "widget_http_not_btc",
    });
    expect(
      classifyWidgetHostDelivery({
        type: "http",
        status: 201,
        body: { data: { id: 123456789 } },
      }),
    ).toMatchObject({ conversion: "skip", reason: "widget_http_not_btc", leadId: null });
  });

  it("keeps validation errors on the form with no conversion", () => {
    expect(classifyWidgetHostDelivery({ type: "validation_error" })).toEqual({
      form: "error",
      conversion: "skip",
      reason: "validation_error",
      leadId: null,
    });
  });

  it.each([400, 404, 422, 500, 503])(
    "keeps HTTP %s on the form even if the body contains an id",
    (status) => {
      expect(
        classifyWidgetHostDelivery({
          type: "http",
          status,
          body: { leadId: LEAD_ID },
        }),
      ).toEqual({
        form: "error",
        conversion: "skip",
        reason: "http_error",
        leadId: null,
      });
    },
  );

  it("treats offline and a 2xx without an id as form errors", () => {
    expect(classifyWidgetHostDelivery({ type: "offline" })).toMatchObject({
      conversion: "skip",
      reason: "offline",
    });
    for (const body of [{}, { leadId: "" }, { leadId: "short" }, { ok: true }, null]) {
      expect(
        classifyWidgetHostDelivery({ type: "http", status: 200, body }),
      ).toMatchObject({ conversion: "skip", reason: "no_id", leadId: null });
    }
  });

  it("does not call the network while classifying", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    classifyWidgetHostDelivery({
      type: "http",
      status: 200,
      body: { leadId: LEAD_ID },
    });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
