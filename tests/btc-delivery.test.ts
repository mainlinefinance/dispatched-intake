import { describe, expect, it, vi } from "vitest";
import {
  classifyBtcDelivery,
  conversionForDelivery,
} from "@/lib/ads/btc-delivery";

const LEAD_ID = "btc_lead_12345678";

describe("BTC delivery outcome", () => {
  it("accepts a 2xx body with a durable id", () => {
    expect(
      classifyBtcDelivery({
        type: "http",
        status: 200,
        body: { leadId: LEAD_ID },
      }),
    ).toEqual({
      form: "success",
      leadId: LEAD_ID,
      conversion: "fire",
      reason: "accepted",
    });
    expect(
      classifyBtcDelivery({
        type: "http",
        status: 201,
        body: { data: { id: 123456789 } },
      }).leadId,
    ).toBe("123456789");
  });

  it("keeps validation errors on the form with no conversion", () => {
    expect(classifyBtcDelivery({ type: "validation_error" })).toMatchObject({
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
        classifyBtcDelivery({
          type: "http",
          status,
          body: { leadId: LEAD_ID },
        }),
      ).toMatchObject({
        form: "error",
        conversion: "skip",
        reason: "http_error",
        leadId: null,
      });
    },
  );

  it("treats offline as a form error", () => {
    expect(classifyBtcDelivery({ type: "offline" })).toMatchObject({
      form: "error",
      conversion: "skip",
      reason: "offline",
    });
  });

  it("does not treat a 2xx without a durable id as success", () => {
    for (const body of [
      {},
      { leadId: "" },
      { leadId: "short" },
      { leadId: "not an id" },
      { ok: true },
      null,
    ]) {
      expect(
        classifyBtcDelivery({ type: "http", status: 200, body }),
      ).toMatchObject({
        form: "error",
        conversion: "skip",
        reason: "no_id",
        leadId: null,
      });
    }
  });

  it("reports only the accepted id", () => {
    const report = vi.fn();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    conversionForDelivery({ type: "validation_error" }, report);
    conversionForDelivery({ type: "offline" }, report);
    conversionForDelivery(
      { type: "http", status: 500, body: { leadId: LEAD_ID } },
      report,
    );
    conversionForDelivery(
      { type: "http", status: 400, body: { leadId: LEAD_ID } },
      report,
    );
    conversionForDelivery({ type: "http", status: 200, body: {} }, report);
    const accepted = conversionForDelivery(
      { type: "http", status: 200, body: { lead_id: LEAD_ID } },
      report,
    );
    expect(accepted.form).toBe("success");
    expect(report).toHaveBeenCalledTimes(1);
    expect(report).toHaveBeenCalledWith(LEAD_ID);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
