import { KITS } from "./kits.ts";
import type { Lead, RenderedEmail, RenderOptions, Step } from "./types.ts";

/* ===========================================================================
   Renders a kit step for one lead as subject + plain text + HTML.

   Email clients ignore external stylesheets and CSS variables, so the
   brand tokens from app/styles/tokens.css are restated here as literals.
   If a token changes there, change it here too.

   Two layouts:
     plain    — reads like a typed email. The default for cold outreach.
     branded  — paper background, white card, trail-green button. For
                recipients who already engaged.
   Neither layout loads images or tracking pixels.
   =========================================================================== */

export const EMAIL_TOKENS = {
  paper: "#FAF7F2", // --color-bg-paper
  surface: "#FFFFFF", // --color-bg-surface
  ink: "#0E1A22", // --color-ink-primary
  inkSecondary: "#3B4750", // --color-ink-secondary
  inkTertiary: "#5A6369", // --color-ink-tertiary
  link: "#1F4561", // --color-steel-600
  eyebrow: "#6E3507", // --color-hiviz-800
  accent: "#E67A1F", // --color-hiviz-400
  cta: "#5F7A4E", // --color-trail-green
  border: "#E0D8CA", // --color-border
  // Web fonts do not load in most mail clients; Archivo and IBM Plex Sans
  // lead the stacks for the clients that have them installed.
  fontDisplay: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontBody:
    "'IBM Plex Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
} as const;

export const LEGAL = {
  entity: "Dispatched, Inc.",
  address: "12895 Josey Lane #124, Dallas, TX 75234",
} as const;

export function getStep(lead: Lead, step: number): Step {
  const found = KITS[lead.segment].steps.find((s) => s.step === step);
  if (!found) throw new Error(`No step ${step} in kit ${lead.segment}`);
  return found;
}

/** Deterministic A/B pick so a re-run never changes a lead's subject. */
export function pickSubject(subjects: string[], dot: string): string {
  let sum = 0;
  for (const ch of dot) sum += ch.charCodeAt(0);
  return subjects[sum % subjects.length];
}

function fill(template: string, lead: Lead, senderName: string): string {
  const values: Record<string, string> = {
    company: lead.company,
    dot: lead.dot,
    state: lead.state,
    units: String(lead.powerUnits),
    sender: senderName,
  };
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key];
    if (value === undefined) throw new Error(`Unknown token {{${key}}}`);
    return value;
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function ctaUrl(siteUrl: string, lead: Lead, step: Step): string {
  const url = new URL(step.cta.path, siteUrl);
  url.searchParams.set("utm_source", "fmcsa");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", `outbound-${lead.segment}`);
  url.searchParams.set("utm_content", `step-${step.step}`);
  return url.toString();
}

function footerLines(lead: Lead, unsubscribeUrl: string): string[] {
  return [
    `You're receiving this because ${lead.company} is listed in the public FMCSA registry (DOT ${lead.dot}). This is a commercial message from ${LEGAL.entity}, ${LEGAL.address}.`,
    "Dispatched is a referral service for commercial / business financing only. It is not a lender and does not offer consumer credit. Approval is not guaranteed; rates and terms are set by each financing partner.",
    `Unsubscribe: ${unsubscribeUrl}`,
  ];
}

export function renderEmail(
  lead: Lead,
  stepNumber: number,
  options: RenderOptions,
): RenderedEmail {
  const step = getStep(lead, stepNumber);
  const { senderName, siteUrl, unsubscribeUrl, layout = "plain" } = options;
  if (!senderName.trim()) throw new Error("senderName is required");

  const paragraphs = step.body.map((p) => fill(p, lead, senderName));
  const link = ctaUrl(siteUrl, lead, step);
  const signature = [senderName, "Dispatched"];
  const footer = footerLines(lead, unsubscribeUrl);
  const subject = step.subjects
    ? fill(pickSubject(step.subjects, lead.dot), lead, senderName)
    : undefined;

  const text = [
    ...paragraphs.slice(0, -1),
    `${step.cta.label}: ${link}`,
    paragraphs[paragraphs.length - 1],
    signature.join("\n"),
    "--",
    ...footer,
  ].join("\n\n");

  const html =
    layout === "branded"
      ? brandedHtml({ paragraphs, link, label: step.cta.label, signature, footer, unsubscribeUrl })
      : plainHtml({ paragraphs, link, label: step.cta.label, signature, footer, unsubscribeUrl });

  return { subject, text, html };
}

type HtmlParts = {
  paragraphs: string[];
  link: string;
  label: string;
  signature: string[];
  footer: string[];
  unsubscribeUrl: string;
};

const T = EMAIL_TOKENS;

function footerHtml(parts: HtmlParts): string {
  // The last footer line is the unsubscribe URL; render it as a link.
  const prose = parts.footer.slice(0, -1);
  const style = `margin:0 0 8px;font-family:${T.fontBody};font-size:12px;line-height:1.5;color:${T.inkTertiary};`;
  return [
    ...prose.map((line) => `<p style="${style}">${escapeHtml(line)}</p>`),
    `<p style="${style}"><a href="${escapeHtml(parts.unsubscribeUrl)}" style="color:${T.inkTertiary};text-decoration:underline;">Unsubscribe</a></p>`,
  ].join("\n");
}

function plainHtml(parts: HtmlParts): string {
  const p = `margin:0 0 16px;font-family:${T.fontBody};font-size:15px;line-height:1.6;color:${T.ink};`;
  const body = parts.paragraphs.map((t) => `<p style="${p}">${escapeHtml(t)}</p>`);
  const cta = `<p style="${p}"><a href="${escapeHtml(parts.link)}" style="color:${T.link};font-weight:600;text-decoration:underline;">${escapeHtml(parts.label)}</a></p>`;
  // The opt-out line stays last in the body, after the link.
  body.splice(body.length - 1, 0, cta);
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:16px;background:${T.surface};">
<div style="max-width:560px;">
${body.join("\n")}
<p style="${p}">${parts.signature.map(escapeHtml).join("<br>")}</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid ${T.border};">
${footerHtml(parts)}
</div>
</div>
</body>
</html>`;
}

function brandedHtml(parts: HtmlParts): string {
  const p = `margin:0 0 16px;font-family:${T.fontBody};font-size:16px;line-height:1.6;color:${T.ink};`;
  const body = parts.paragraphs.map((t) => `<p style="${p}">${escapeHtml(t)}</p>`);
  const button = `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="border-radius:8px;background:${T.cta};">
<a href="${escapeHtml(parts.link)}" style="display:inline-block;padding:14px 22px;font-family:${T.fontBody};font-size:15px;font-weight:600;line-height:1;color:#FFFFFF;text-decoration:none;">${escapeHtml(parts.label)}</a>
</td></tr></table>`;
  body.splice(body.length - 1, 0, button);
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:${T.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${T.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 0 16px;font-family:${T.fontDisplay};font-size:22px;font-weight:700;letter-spacing:-0.01em;color:${T.ink};">
<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${T.accent};margin-right:8px;"></span>Dispatched
</td></tr>
<tr><td style="padding:32px;background:${T.surface};border:1px solid ${T.border};border-radius:12px;">
<p style="margin:0 0 16px;font-family:${T.fontBody};font-size:12px;font-weight:600;line-height:1.2;letter-spacing:0.08em;text-transform:uppercase;color:${T.eyebrow};">Built for trucking</p>
${body.join("\n")}
<p style="${p}margin-bottom:0;color:${T.inkSecondary};">${parts.signature.map(escapeHtml).join("<br>")}</p>
</td></tr>
<tr><td style="padding:24px 8px 0;">
${footerHtml(parts)}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
