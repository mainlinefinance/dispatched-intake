import type { Metadata } from "next";
import LendflowWidget from "./_components/LendflowWidget";
import { JsonLd, faqPage } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Apply for trucking funding — soft pull",
  description:
    "Apply for trucking working capital, equipment, or repair financing. Soft-pull match in 20 minutes. No upfront fees. Funds same banking day on approval.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply for trucking funding — soft pull",
    description:
      "Apply for trucking working capital, equipment, or repair financing. Soft-pull match in 20 minutes. No upfront fees. Funds same banking day on approval.",
    url: "/apply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for trucking funding — soft pull",
    description:
      "Apply for trucking working capital, equipment, or repair financing. Soft-pull match in 20 minutes. No upfront fees. Funds same banking day on approval.",
  },
};

const applyFaqs = [
  {
    q: "What happens after I submit the application?",
    a: "You see a soft-approval range and a shortlist of 2 to 4 matched lenders typically within 20 minutes. You pick the lender that fits. The chosen lender runs a hard pull and sends a final term sheet (APR, term, total cost) usually within 4 hours. You review, ask questions on the phone, e-sign from your phone, and the wire goes out the same banking day if it lands before the cutoff.",
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
    a: "Most applicants finish in under 7 minutes. The application is structured so you can complete it on a phone in a parking lot — no document uploads required at the soft-pull stage. Document collection happens after you pick a lender, on that lender's secure portal.",
  },
];

export default function ApplyPage() {
  return (
    <main
      id="main-content"
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "var(--space-12) var(--gutter-mobile)",
      }}
    >
      <JsonLd payload={faqPage(applyFaqs)} />
      <header style={{ marginBottom: "var(--space-8)" }}>
        <h1 className="t-h1">Apply for funding</h1>
        <p
          className="t-body-lg"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Get matched with funding partners in minutes. No impact to your
          credit.
        </p>
      </header>
      <LendflowWidget />
    </main>
  );
}
