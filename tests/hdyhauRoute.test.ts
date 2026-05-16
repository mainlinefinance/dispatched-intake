import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/hdyhau/route";

const ORIGIN = "http://localhost:3000";

function makeRequest(body: unknown, opts: { invalidJson?: boolean } = {}) {
  return new Request(`${ORIGIN}/api/hdyhau`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: opts.invalidJson ? "not-json{" : JSON.stringify(body),
  });
}

describe("POST /api/hdyhau", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid AI-channel payload and returns ok", async () => {
    const res = await POST(
      makeRequest({ channel: "chatgpt", source: "apply" }),
    );
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean };
    expect(json.ok).toBe(true);
  });

  it("accepts 'other' channel with writeIn", async () => {
    const res = await POST(
      makeRequest({
        channel: "other",
        writeIn: "From my dispatcher",
        source: "qualify",
      }),
    );
    expect(res.status).toBe(200);
  });

  it("rejects malformed JSON with 400 invalid_json", async () => {
    const res = await POST(makeRequest({}, { invalidJson: true }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toBe("invalid_json");
  });

  it("rejects 'other' without writeIn with 400 validation_failed", async () => {
    const res = await POST(makeRequest({ channel: "other", source: "apply" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as {
      error: string;
      issues: { path: (string | number)[] }[];
    };
    expect(json.error).toBe("validation_failed");
    expect(json.issues.some((i) => i.path.includes("writeIn"))).toBe(true);
  });

  it("rejects unknown channel", async () => {
    const res = await POST(
      makeRequest({ channel: "tiktok", source: "apply" }),
    );
    expect(res.status).toBe(400);
  });

  it("rejects unknown source", async () => {
    const res = await POST(
      makeRequest({ channel: "chatgpt", source: "homepage" }),
    );
    expect(res.status).toBe(400);
  });

  it("logs the parsed payload to stdout", async () => {
    const logSpy = vi.spyOn(console, "log");
    await POST(makeRequest({ channel: "reddit", source: "qualify" }));
    const calls = logSpy.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0]?.[0]).toBe("[hdyhau]");
    expect(calls[0]?.[1]).toContain('"channel":"reddit"');
    expect(calls[0]?.[1]).toContain('"source":"qualify"');
  });
});
