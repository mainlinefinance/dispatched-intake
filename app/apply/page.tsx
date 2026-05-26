import type { Metadata } from "next";
import LendflowWidget from "./_components/LendflowWidget";
import ApplyFaq from "./_components/ApplyFaq";
import { JsonLd, faqPage } from "@/components/seo/JsonLd";
import {
  IconShieldCheck,
  IconDollarCircle,
  IconLock,
} from "@/components/landing/icons";

export const metadata: Metadata = {
  title: "Apply for trucking funding — soft pull | Dispatched",
  description:
    "Apply for trucking working capital, equipment, or repair financing. Soft-pull match — no impact to your credit. No upfront fees.",
  // Conversion endpoint — embedded Lendflow widget. No SEO value as a landing
  // page; indexing it would dilute ranking signals across the actual money
  // pages (working capital, equipment, etc.) that should rank for funding
  // intent. Follow links so internal anchors still pass equity.
  robots: { index: false, follow: true },
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply for trucking funding — soft pull | Dispatched",
    description:
      "Apply for trucking working capital, equipment, or repair financing. Soft-pull match — no impact to your credit. No upfront fees.",
    url: "/apply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for trucking funding — soft pull | Dispatched",
    description:
      "Apply for trucking working capital, equipment, or repair financing. Soft-pull match — no impact to your credit. No upfront fees.",
  },
};

// Same source feeds both the visible accordion (<ApplyFaq>) and the
// FAQPage JSON-LD — answers stay byte-identical, no schema/visible-content
// divergence penalty from Google. Edit both representations by editing
// this one array.
const faqs = [
  {
    q: "What happens after I submit the application?",
    a: "You see a soft-approval range and a shortlist of 2 to 4 matched lenders. You pick the lender that fits. The chosen lender runs a hard pull and sends a final term sheet (APR, term, total cost). You review, ask questions on the phone, e-sign from your phone, and the wire goes out once the lender clears final docs.",
  },
  {
    q: "Will applying affect my credit score?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens once you pick a specific lender and move forward on their term sheet. If you compare offers from multiple lenders, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.",
  },
  {
    q: "Are there any upfront fees to apply?",
    a: "No. The Dispatched application is free. Lenders on the panel pay Dispatched on funded loans — the operator pays nothing to apply, nothing to match, and nothing to get a term sheet. If a lender charges an origination fee at funding, that fee is itemized on the term sheet you sign before any money moves.",
  },
  {
    q: "What information do you collect on the application?",
    a: "The basics needed to underwrite a trucking finance application: legal name and contact details, EIN or SSN, DOT and MC numbers, monthly revenue range, time in business, and what the funds are for. Bank statements and tax documents are uploaded after the soft-approval step, only to the lenders you choose to move forward with.",
  },
  {
    q: "How long does the application take?",
    a: "The application is short — designed so you can complete it on a phone in a parking lot. No document uploads required at the soft-pull stage. Document collection happens after you pick a lender, on that lender's secure portal.",
  },
];

export default function ApplyPage() {
  return (
    <main id="main-content" className="apply-shell">
      <JsonLd payload={faqPage(faqs)} />

      <header className="apply-header">
        <h1 className="t-h1">Apply for funding</h1>
      </header>

      <ul
        className="apply-trust"
        role="list"
        aria-label="Application guarantees"
      >
        <li className="apply-trust-chip">
          <IconShieldCheck size={20} className="apply-trust-icon" />
          <span>Soft pull — no credit impact</span>
        </li>
        <li className="apply-trust-chip">
          <IconDollarCircle size={20} className="apply-trust-icon" />
          <span>No upfront fees, ever</span>
        </li>
        <li className="apply-trust-chip">
          <IconLock size={20} className="apply-trust-icon" />
          <span>Bank-grade encryption</span>
        </li>
      </ul>

      <LendflowWidget />

      {/* Lendflow (the embedded application vendor) holds SOC 2 Type II via
          Thoropass. Phrased as a property of the application infrastructure,
          not a Dispatched certification, to stay accurate while the
          partnership is unannounced. Verified on lendflow.com 2026-05-26. */}
      <p className="apply-infrastructure">
        <IconLock className="apply-infrastructure-icon" />
        <span>
          Application infrastructure is SOC 2 Type II audited and used by
          major US lenders.
        </span>
      </p>

      <aside className="apply-founder" aria-label="From the founder">
        <div className="apply-founder-mark" aria-hidden>
          AO
        </div>
        <div>
          <p className="apply-founder-body">
            Built by operators for operators. Dispatched gets paid only when
            you fund — never on applications.
          </p>
          <p className="apply-founder-sig">
            <strong>Angelo Orru Neto</strong>, Founder &middot;{" "}
            <a href="/about">About Dispatched</a>
          </p>
        </div>
      </aside>

      <ApplyFaq items={faqs} />
    </main>
  );
}
