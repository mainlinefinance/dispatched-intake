import { describe, expect, it } from "vitest";
import {
  formatMoney,
  formatMoneyDigitsOnly,
  maskPhone,
  parseDollars,
} from "@/lib/format";

describe("formatMoney", () => {
  it("formats with $ prefix and commas", () => {
    expect(formatMoney(95000)).toBe("$95,000");
    expect(formatMoney(0)).toBe("$0");
    expect(formatMoney(1234567)).toBe("$1,234,567");
  });
});

describe("formatMoneyDigitsOnly", () => {
  it("strips non-digits and comma-formats", () => {
    expect(formatMoneyDigitsOnly("95a000")).toBe("95,000");
    expect(formatMoneyDigitsOnly("$1,234")).toBe("1,234");
    expect(formatMoneyDigitsOnly("")).toBe("");
  });
});

describe("parseDollars", () => {
  it("handles plain integer input", () => {
    expect(parseDollars("80000")).toBe(80_000);
  });

  it("strips $ and commas (typical user-format paste)", () => {
    expect(parseDollars("$80,000")).toBe(80_000);
    expect(parseDollars("1,234,567")).toBe(1_234_567);
  });

  it("discards a decimal portion BEFORE digit-stripping (regression: 100x bug)", () => {
    /* If the helper naively did raw.replace(/\D/g, ""), "$80,000.50" would
       become "8000050" → 8,000,050 — a 100x error. Splitting on "." first
       prevents this. */
    expect(parseDollars("$80,000.50")).toBe(80_000);
    expect(parseDollars("80000.99")).toBe(80_000);
    expect(parseDollars("1,500.25")).toBe(1_500);
  });

  it("returns 0 on empty or non-numeric input", () => {
    expect(parseDollars("")).toBe(0);
    expect(parseDollars("abc")).toBe(0);
    expect(parseDollars(".50")).toBe(0);
  });
});

describe("maskPhone", () => {
  it("masks all but the last 4 digits and preserves format chars", () => {
    expect(maskPhone("(405) 318-2740")).toBe("(\u2022\u2022\u2022) \u2022\u2022\u2022-2740");
  });

  it("handles a plain 10-digit string", () => {
    expect(maskPhone("4053182740")).toBe("\u2022\u2022\u2022\u2022\u2022\u20222740");
  });

  it("returns input unchanged when fewer than 4 digits", () => {
    expect(maskPhone("123")).toBe("123");
  });
});
