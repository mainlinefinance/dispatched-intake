import { describe, expect, it } from "vitest";
import { formatMoney, formatMoneyDigitsOnly, maskPhone } from "@/lib/format";

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
