import { createHmac, timingSafeEqual } from "node:crypto";

/* Signed unsubscribe links.

   The link carries the recipient address and an HMAC over it, so the
   unsubscribe endpoint needs no database lookup and cannot be used to
   unsubscribe (or probe for) addresses we never emailed. The same secret
   (OUTREACH_UNSUBSCRIBE_SECRET) must be set where emails are rendered and
   on the web service that verifies them.

   This file has no project imports on purpose: it is loaded by both the
   Next.js route and the Node sender script. */

function normalize(email: string): string {
  return email.trim().toLowerCase();
}

function sign(email: string, secret: string): string {
  return createHmac("sha256", secret).update(normalize(email)).digest("base64url");
}

export function unsubscribeUrl(siteUrl: string, email: string, secret: string): string {
  if (!secret) throw new Error("OUTREACH_UNSUBSCRIBE_SECRET is required");
  const url = new URL("/api/outreach/unsubscribe", siteUrl);
  url.searchParams.set("e", Buffer.from(normalize(email)).toString("base64url"));
  url.searchParams.set("t", sign(email, secret));
  return url.toString();
}

/** Returns the verified, normalized address, or null if the link is bad. */
export function verifyUnsubscribe(
  e: string | null,
  t: string | null,
  secret: string,
): string | null {
  if (!e || !t || !secret) return null;
  const email = Buffer.from(e, "base64url").toString("utf8");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  const expected = Buffer.from(sign(email, secret));
  const given = Buffer.from(t);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  return normalize(email);
}

/** RFC 8058 one-click headers. Gmail and Yahoo require these from bulk
    senders. */
export function listUnsubscribeHeaders(url: string, inboxAddress: string): Record<string, string> {
  return {
    "List-Unsubscribe": `<${url}>, <mailto:${inboxAddress}?subject=unsubscribe>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}
