import { suppress } from "@/lib/outreach/suppress";
import { verifyUnsubscribe } from "@/lib/outreach/unsubscribe";

/* Unsubscribe endpoint for outbound email.

   GET  — the link in the email footer. Shows a confirmation button rather
          than unsubscribing outright, because mail security scanners
          follow every link in a message.
   POST — the confirmation button, and the RFC 8058 one-click request that
          Gmail and Yahoo send when the reader uses their native
          "Unsubscribe" control. Both carry the signed address in the
          query string. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPPORT = "support@dispatched.finance";

function page(title: string, body: string, status: number): Response {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${title} · Dispatched</title></head>
<body style="margin:0;padding:48px 20px;background:#FAF7F2;color:#0E1A22;font-family:'IBM Plex Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;">
<main style="max-width:520px;margin:0 auto;padding:32px;background:#FFFFFF;border:1px solid #E0D8CA;border-radius:12px;">
<h1 style="margin:0 0 16px;font-family:Archivo,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;letter-spacing:-0.01em;">${title}</h1>
${body}
</main></body></html>`;
  return new Response(html, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}

/** Returns the verified address, HTML-escaped for the pages below. */
function verified(request: Request): { email: string; shown: string } | null {
  const params = new URL(request.url).searchParams;
  const email = verifyUnsubscribe(
    params.get("e"),
    params.get("t"),
    process.env.OUTREACH_UNSUBSCRIBE_SECRET ?? "",
  );
  if (!email) return null;
  const shown = email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return { email, shown };
}

const INVALID = `<p>This unsubscribe link is incomplete or has been altered. Email <a href="mailto:${SUPPORT}" style="color:#1F4561;">${SUPPORT}</a> and we will remove you by hand.</p>`;

export async function GET(request: Request) {
  const target = verified(request);
  if (!target) return page("Link not recognized", INVALID, 400);
  return page(
    "Unsubscribe",
    `<p>Stop all Dispatched emails to <strong>${target.shown}</strong>?</p>
<form method="post"><button type="submit" style="min-height:44px;padding:14px 22px;border:0;border-radius:8px;background:#5F7A4E;color:#FFFFFF;font:600 15px/1 inherit;cursor:pointer;">Yes, unsubscribe me</button></form>`,
    200,
  );
}

export async function POST(request: Request) {
  const target = verified(request);
  if (!target) return page("Link not recognized", INVALID, 400);
  try {
    await suppress(target.email, "unsubscribe");
  } catch (err) {
    console.error("[outreach unsubscribe] failed", err);
    return page(
      "Something went wrong",
      `<p>We could not record your request. Email <a href="mailto:${SUPPORT}" style="color:#1F4561;">${SUPPORT}</a> and we will remove you by hand.</p>`,
      500,
    );
  }
  return page(
    "You're unsubscribed",
    `<p><strong>${target.shown}</strong> will not receive further emails from Dispatched.</p>`,
    200,
  );
}
