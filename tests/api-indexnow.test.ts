import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

import { POST } from "@/app/api/cron/indexnow/route";

const ORIGIN = "http://localhost:3000";
const SECRET = "test-cron-secret-32-bytes-or-so";

const SAMPLE_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://dispatched.finance/</loc></url>
  <url><loc>https://dispatched.finance/insurance</loc></url>
  <url><loc>https://dispatched.finance/qualify</loc></url>
  <url><loc>https://other-host.example.com/leak</loc></url>
</urlset>`;

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request(`${ORIGIN}/api/cron/indexnow`, {
    method: "POST",
    headers,
  });
}

describe("POST /api/cron/indexnow", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.CRON_SECRET = SECRET;
    process.env.INDEXNOW_HOST = "dispatched.finance";
    delete process.env.INDEXNOW_KEY;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    fetchMock = vi.fn(async (input: string | URL | Request) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/sitemap.xml")) {
        return new Response(SAMPLE_SITEMAP, { status: 200 });
      }
      if (url.startsWith("https://api.indexnow.org/")) {
        return new Response("", { status: 200 });
      }
      throw new Error(`unexpected fetch ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete process.env.CRON_SECRET;
    delete process.env.INDEXNOW_HOST;
    delete process.env.INDEXNOW_KEY;
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("returns 401 when the Authorization header is missing", async () => {
    const res = await POST(makeRequest());
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ ok: false, submitted: 0, error: "unauthorized" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 401 when the bearer token is wrong", async () => {
    const res = await POST(makeRequest({ authorization: "Bearer nope" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("unauthorized");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 401 when CRON_SECRET is unset (closed by default)", async () => {
    delete process.env.CRON_SECRET;
    const res = await POST(
      makeRequest({ authorization: `Bearer ${SECRET}` }),
    );
    expect(res.status).toBe(401);
  });

  it("submits on-host URLs and returns the count when authorized", async () => {
    const res = await POST(
      makeRequest({ authorization: `Bearer ${SECRET}` }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    // Three on-host URLs; the off-host leak is filtered.
    expect(body).toEqual({ ok: true, submitted: 3 });

    const apiCall = fetchMock.mock.calls.find(([u]) =>
      String(u).startsWith("https://api.indexnow.org/"),
    );
    expect(apiCall).toBeDefined();
    const init = apiCall![1] as RequestInit;
    const payload = JSON.parse(String(init.body));
    expect(payload.host).toBe("dispatched.finance");
    expect(payload.key).toBe("f7d09b96f43c7976a9a6e1f50552181f");
    expect(payload.keyLocation).toBe(
      "https://dispatched.finance/f7d09b96f43c7976a9a6e1f50552181f.txt",
    );
    expect(payload.urlList).toEqual([
      "https://dispatched.finance/",
      "https://dispatched.finance/insurance",
      "https://dispatched.finance/qualify",
    ]);
  });

  it("returns 200 with submitted: 0 when the sitemap has no URLs", async () => {
    fetchMock.mockImplementationOnce(
      async () =>
        new Response(
          `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
          { status: 200 },
        ),
    );
    const res = await POST(
      makeRequest({ authorization: `Bearer ${SECRET}` }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, submitted: 0 });
  });

  it("returns 500 when the sitemap fetch fails", async () => {
    fetchMock.mockImplementationOnce(
      async () => new Response("nope", { status: 502 }),
    );
    const res = await POST(
      makeRequest({ authorization: `Bearer ${SECRET}` }),
    );
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.error).toMatch(/^sitemap_fetch_failed_/);
  });

  it("returns 503 when the IndexNow API errors", async () => {
    fetchMock.mockImplementation(async (input: string | URL | Request) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/sitemap.xml")) {
        return new Response(SAMPLE_SITEMAP, { status: 200 });
      }
      return new Response("rate limited", { status: 429 });
    });
    const res = await POST(
      makeRequest({ authorization: `Bearer ${SECRET}` }),
    );
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe("indexnow_api_429");
  });

  it("honors INDEXNOW_KEY env override", async () => {
    process.env.INDEXNOW_KEY = "abc123def456abc123def456abc123de";
    const res = await POST(
      makeRequest({ authorization: `Bearer ${SECRET}` }),
    );
    expect(res.status).toBe(200);
    const apiCall = fetchMock.mock.calls.find(([u]) =>
      String(u).startsWith("https://api.indexnow.org/"),
    );
    const payload = JSON.parse(String((apiCall![1] as RequestInit).body));
    expect(payload.key).toBe("abc123def456abc123def456abc123de");
    expect(payload.keyLocation).toBe(
      "https://dispatched.finance/abc123def456abc123def456abc123de.txt",
    );
  });
});
