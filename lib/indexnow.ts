import "server-only";

/* ===========================================================================
   IndexNow protocol — instant URL submission to Bing, Yandex, Yep,
   Seznam, and Naver. Google does NOT participate (yet).

   Protocol: https://www.indexnow.org/documentation
   Endpoint: https://api.indexnow.org/IndexNow

   The verification key lives at /public/{KEY}.txt (publicly fetchable
   so search engines can confirm ownership of the submitting domain).

   Triggered on demand via /api/indexnow (with secret guard) — typically
   from a Render post-deploy webhook or a cron job. Can also be called
   manually after pushing significant new content.

   Why bother: Bing tops 4% of US desktop search and is the default for
   ChatGPT, Copilot, and Perplexity grounding. IndexNow gets new content
   indexed in hours instead of days/weeks.
   =========================================================================== */

export const INDEXNOW_KEY = "099a42764f90415e1cfceb9597e9d203";
export const INDEXNOW_KEY_LOCATION = `https://dispatched.finance/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_HOST = "dispatched.finance";
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

export type IndexNowResult =
  | { ok: true; status: number; urlCount: number }
  | { ok: false; status: number; error: string };

/* Submit a batch of URLs to IndexNow. The endpoint accepts up to 10,000
   URLs per call; in practice we batch in chunks of 1,000 to keep payloads
   small. All URLs must be on the same host as the verification key. */
export async function submitToIndexNow(
  urls: ReadonlyArray<string>,
): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: false, status: 0, error: "No URLs provided." };
  }
  const sameHost = urls.every((u) => u.startsWith(`https://${INDEXNOW_HOST}/`));
  if (!sameHost) {
    return {
      ok: false,
      status: 0,
      error: `All URLs must be on host ${INDEXNOW_HOST}`,
    };
  }

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    // IndexNow returns 200 / 202 on success. 422 means key validation
    // failed; 400 means malformed payload; 403 means key file mismatch.
    if (res.status === 200 || res.status === 202) {
      return { ok: true, status: res.status, urlCount: urls.length };
    }
    const body = await res.text().catch(() => "");
    return {
      ok: false,
      status: res.status,
      error: `IndexNow returned ${res.status}: ${body.slice(0, 200)}`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown fetch error";
    return { ok: false, status: 0, error: msg };
  }
}

/* Chunk a large URL list into batches of N (default 1,000) and submit
   each sequentially. Returns aggregated result. */
export async function submitBatchedToIndexNow(
  urls: ReadonlyArray<string>,
  batchSize = 1000,
): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: false, status: 0, error: "No URLs provided." };
  }

  let totalSubmitted = 0;
  let lastStatus = 0;
  const errors: string[] = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const chunk = urls.slice(i, i + batchSize);
    const result = await submitToIndexNow(chunk);
    if (result.ok) {
      totalSubmitted += result.urlCount;
      lastStatus = result.status;
    } else {
      errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${result.error}`);
    }
  }

  if (errors.length > 0) {
    return {
      ok: false,
      status: lastStatus,
      error: errors.join(" | "),
    };
  }
  return { ok: true, status: lastStatus, urlCount: totalSubmitted };
}
