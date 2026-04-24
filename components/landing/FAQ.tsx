"use client";

import { useState, type ReactNode } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { IconChevronDown } from "./icons";

type FaqItem = { q: string; a: ReactNode };

const faqs: FaqItem[] = [
  {
    q: "What rates can I actually expect?",
    a: (
      <>
        Rates depend on your revenue, time in business, and credit band. For
        working capital, most of our borrowers land between{" "}
        <code>14% – 34% APR</code>. For equipment loans secured by the truck,
        rates typically run <code>9% – 18% APR</code>. You&rsquo;ll see the
        exact APR, term length, and total cost on every term sheet before you
        sign — no bait-and-switch.
      </>
    ),
  },
  {
    q: "What documents do I need?",
    a: (
      <>
        The basics: last 3 months of business bank statements, your EIN or
        SSN, DOT number, and a driver&rsquo;s license. For loans over $75k
        we&rsquo;ll also ask for your most recent Schedule C or 1120 and
        current settlement statements from your carrier or broker. No business
        plan, no tax preparer letter, no IFTA printouts unless a specific
        lender requests them.
      </>
    ),
  },
  {
    q: "What credit score do I need?",
    a: (
      <>
        We route applications starting at a <code>500 FICO</code>. Lenders on
        our panel go lower than most banks because they underwrite on revenue
        and equipment, not just credit. Below 580, expect rates on the higher
        end of the range and a tighter maximum. Above 680, you qualify for our
        full product set.
      </>
    ),
  },
  {
    q: "How fast is fast, really?",
    a: (
      <>
        Soft approval and lender match: typically 20 minutes after you
        complete the application. Funds in your account:{" "}
        <code>31 hours median</code> across all loans funded in the last 90
        days. Same-day funding happens for approvals before 2pm CT when the
        lender has your verified bank account on file.
      </>
    ),
  },
  {
    q: "What happens after I apply?",
    a: (
      <>
        You get a soft approval range and a shortlist of 2–4 matched lenders.
        Pick one. The chosen lender runs a hard pull and sends a final term
        sheet within 4 hours. You review it, ask questions (one phone number,
        not a call center), e-sign from your phone, and the wire goes out.
        That&rsquo;s it.
      </>
    ),
  },
  {
    q: "Will this hurt my credit?",
    a: (
      <>
        Not at the start. The Dispatched application is a <code>soft pull</code>{" "}
        — it does not show on your credit report and does not affect your
        score. A hard pull only happens once you pick a lender and move
        forward on their term sheet. If you shop around, the hard pulls fall
        inside a 14-day rate-shopping window and count as one inquiry.
      </>
    ),
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section sunken" id="faq">
      <div className="container">
        <div className="section-head centered">
          <span className="eyebrow">Questions we get asked</span>
          <h2>Frequently asked.</h2>
          <p className="faq-centered-foot">
            Still stuck? Call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> — a
            human picks up.
          </p>
        </div>
        <div className="faq-wrap">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const buttonId = `faq-btn-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
                <button
                  type="button"
                  id={buttonId}
                  className="faq-button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <IconChevronDown className="chev" />
                </button>
                <div
                  id={panelId}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <div className="faq-answer-inner">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
