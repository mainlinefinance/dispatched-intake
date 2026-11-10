import { withSocial } from "@/lib/seo/social";
import type { Metadata } from "next";
import Link from "next/link";
import { DISCLOSURES } from "@/lib/copy";

export const metadata: Metadata = withSocial({
  title: `${DISCLOSURES.title} — Dispatched`,
  description: DISCLOSURES.subtitle,
  alternates: { canonical: "/disclosures" },
}, "/disclosures");

export default function DisclosuresPage() {
  return (
    <main id="main-content" className="disclosures">
      <Link href="/apply" className="back-link">
        ← Back to intake
      </Link>
      <h1>{DISCLOSURES.title}</h1>
      <p className="lead">{DISCLOSURES.subtitle}</p>
      {DISCLOSURES.items.map((item) => (
        <section key={item.footnote} id={`fn-${item.footnote}`} className="item">
          <h2>
            <sup>{item.footnote}</sup> {item.heading}
          </h2>
          <p>{item.body}</p>
        </section>
      ))}
      <section className="item">
        <h2>How to read these disclosures</h2>
        <p>
          Each numbered note above matches a footnote marker next to a claim
          or a range somewhere on the site. The note says what the claim
          means, what it depends on, and where it stops applying. Nothing on
          this page is an offer of credit or of insurance, and nothing here
          replaces the documents a financing partner or an insurance
          producer gives you: the term sheet, the loan agreement, and the
          policy are what bind.
        </p>
      </section>
      <section className="item">
        <h2>What Dispatched is and is not</h2>
        <p>
          Dispatched is a referral and introduction service for commercial
          and business financing and for commercial trucking insurance. It
          is not a lender, not an insurer, and not a provider of consumer
          credit. Financing is offered and funded by third-party financing
          partners, who set the rates, fees, amounts, and timing and who
          decide whether to approve an application. Approval is not
          guaranteed. Dispatched is paid by financing partners when a loan
          is funded and does not charge a business a fee to apply.
        </p>
      </section>
      <section className="item">
        <h2>Where to go next</h2>
        <p>
          The <Link href="/methodology">methodology page</Link> explains how
          each published range is sourced. The{" "}
          <Link href="/privacy">privacy policy</Link> covers what happens to
          the information you submit. Questions about a specific disclosure
          can be sent to{" "}
          <a href="mailto:support@dispatched.finance">
            support@dispatched.finance
          </a>
          .
        </p>
      </section>
    </main>
  );
}
