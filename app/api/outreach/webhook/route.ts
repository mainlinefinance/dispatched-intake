import { createHmac, timingSafeEqual } from "node:crypto";

import { OPT_OUT_PATTERN, suppress, type SuppressReason } from "@/lib/outreach/suppress";

/* AgentMail webhook receiver for outbound email.

   Subscribe it to message.bounced, message.complained and
   message.received. Hard bounces, spam complaints and replies that ask to
   be removed all end in the same place: the address goes on the
   organization block list (see lib/outreach/suppress.ts).

   AgentMail signs deliveries with Svix. The check below is the Svix
   scheme (HMAC-SHA256 over "id.timestamp.body" with the base64 secret
   that follows the "whsec_" prefix), done inline to avoid a dependency. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOLERANCE_SECONDS = 300;

function verify(body: string, headers: Headers, secret: string): boolean {
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatures = headers.get("svix-signature");
  if (!id || !timestamp || !signatures || !secret.startsWith("whsec_")) return false;
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) return false;

  const key = Buffer.from(secret.slice("whsec_".length), "base64");
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${body}`).digest();
  return signatures.split(" ").some((entry) => {
    const [version, value] = entry.split(",");
    if (version !== "v1" || !value) return false;
    const given = Buffer.from(value, "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

/** "Jane Doe <jane@example.com>" -> "jane@example.com". */
function address(from: unknown): string | null {
  if (typeof from !== "string") return null;
  const match = from.match(/<([^>]+)>/);
  const value = (match ? match[1] : from).trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}

type Event = {
  event_type?: string;
  bounce?: { type?: string; recipients?: { address?: string }[] };
  complaint?: { recipients?: string[] };
  message?: { from?: unknown; subject?: unknown; extracted_text?: unknown; text?: unknown };
};

function targets(event: Event): { emails: string[]; reason: SuppressReason } | null {
  switch (event.event_type) {
    case "message.bounced": {
      // Transient bounces (full mailbox, greylisting) are not a reason to
      // drop an address for good.
      if (/transient|temporary|soft/i.test(event.bounce?.type ?? "")) return null;
      const emails = (event.bounce?.recipients ?? []).map((r) => address(r.address));
      return { emails: emails.filter((e): e is string => e !== null), reason: "bounce" };
    }
    case "message.complained": {
      const emails = (event.complaint?.recipients ?? []).map(address);
      return { emails: emails.filter((e): e is string => e !== null), reason: "complaint" };
    }
    case "message.received": {
      const message = event.message ?? {};
      const body = message.extracted_text ?? message.text ?? "";
      // Only the opening of the reply counts; quoted history below it
      // contains our own "reply unsubscribe" footer.
      const head = `${typeof message.subject === "string" ? message.subject : ""}\n${typeof body === "string" ? body.slice(0, 300) : ""}`;
      const from = address(message.from);
      if (!from || !OPT_OUT_PATTERN.test(head)) return null;
      return { emails: [from], reason: "reply-opt-out" };
    }
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  if (!verify(body, request.headers, process.env.AGENTMAIL_WEBHOOK_SECRET ?? "")) {
    return new Response(null, { status: 400 });
  }

  let event: Event;
  try {
    event = JSON.parse(body) as Event;
  } catch {
    return new Response(null, { status: 400 });
  }

  const found = targets(event);
  if (found) {
    try {
      for (const email of found.emails) await suppress(email, found.reason);
    } catch (err) {
      // A non-2xx makes AgentMail retry with backoff.
      console.error("[outreach webhook] suppress failed", err);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 204 });
}
