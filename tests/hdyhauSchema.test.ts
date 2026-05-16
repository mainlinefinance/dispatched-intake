import { describe, expect, it } from "vitest";
import {
  HDYHAU_CHANNELS,
  HDYHAU_WRITE_IN_MAX,
  HdyhauSchema,
} from "@/lib/validation/hdyhauSchema";

describe("HdyhauSchema", () => {
  it.each(HDYHAU_CHANNELS.filter((c) => c !== "other"))(
    "accepts a valid payload for channel %s without writeIn",
    (channel) => {
      const result = HdyhauSchema.safeParse({
        channel,
        source: "apply",
      });
      expect(result.success).toBe(true);
    },
  );

  it("requires writeIn when channel is 'other'", () => {
    const result = HdyhauSchema.safeParse({
      channel: "other",
      source: "qualify",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["writeIn"]);
    }
  });

  it("accepts 'other' with writeIn", () => {
    const result = HdyhauSchema.safeParse({
      channel: "other",
      writeIn: "Heard from my dispatcher",
      source: "qualify",
    });
    expect(result.success).toBe(true);
  });

  it("rejects writeIn over the max length", () => {
    const result = HdyhauSchema.safeParse({
      channel: "other",
      writeIn: "x".repeat(HDYHAU_WRITE_IN_MAX + 1),
      source: "apply",
    });
    expect(result.success).toBe(false);
  });

  it("trims writeIn whitespace", () => {
    const result = HdyhauSchema.safeParse({
      channel: "other",
      writeIn: "   from a podcast   ",
      source: "apply",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.writeIn).toBe("from a podcast");
    }
  });

  it("rejects unknown channel values", () => {
    const result = HdyhauSchema.safeParse({
      channel: "facebook",
      source: "apply",
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown source values", () => {
    const result = HdyhauSchema.safeParse({
      channel: "chatgpt",
      source: "homepage",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing source", () => {
    const result = HdyhauSchema.safeParse({ channel: "chatgpt" });
    expect(result.success).toBe(false);
  });

  it("rejects empty-string writeIn when channel is 'other'", () => {
    const result = HdyhauSchema.safeParse({
      channel: "other",
      writeIn: "   ",
      source: "apply",
    });
    expect(result.success).toBe(false);
  });
});
