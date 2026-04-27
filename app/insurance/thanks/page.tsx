import type { Metadata } from "next";
import Link from "next/link";
import { BROKER_PARTNER_NAME } from "@/lib/insuranceLeadStore";

export const metadata: Metadata = {
  title: "Quote request received — Dispatched",
  description:
    "Your insurance quote request has been received and is being routed to our broker partner.",
  robots: { index: false, follow: false },
};

type SP = { id?: string };

export default async function InsuranceThanksPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const { id } = await searchParams;
  return (
    <div className="ins-page">
      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Submitted</span>
            <h1 className="ins-hero-title">
              We&apos;ve received your request.
            </h1>
            <p className="ins-hero-sub">
              Your operation profile is on its way to{" "}
              <strong>{BROKER_PARTNER_NAME}</strong>, our named producer
              partner. Expect contact within 1 business hour during weekday
              business hours, or first thing the next business day otherwise.
            </p>
            {id ? (
              <p className="ins-compliance-note">
                Reference ID: <code>{id}</code>. Save this for any follow-up.
              </p>
            ) : null}
            <p className="ins-compliance-note">
              You consented to be contacted by Dispatched Finance and{" "}
              {BROKER_PARTNER_NAME} by phone, text, and email. You can opt out
              at any time by replying STOP to texts or asking the agent who
              calls. We do not share your information beyond this one
              partner.
            </p>
            <p>
              <Link href="/insurance">← Back to insurance products</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
