/* ===========================================================================
   Single source of truth for the homepage FAQ.

   `aJsx` is the rich React rendering used by the FAQ accordion (with inline
   <code>, <a>, etc.). `aText` is the plain-prose equivalent used to emit
   FAQPage JSON-LD. The two MUST stay semantically equivalent — Google
   penalizes meaningful divergence between visible FAQ content and the
   schema. Edit both fields together; treat this file as a contract.
   =========================================================================== */

import type { ReactNode } from "react";

export type HomepageFaqItem = {
  q: string;
  aText: string;
  aJsx: ReactNode;
};

export const homepageFaqs: HomepageFaqItem[] = [
  {
    q: "What rates can I actually expect?",
    aText:
      "Rates depend on your revenue, time in business, and credit band. For working capital, most of our borrowers land between 14% – 34% APR. For equipment loans secured by the truck, rates typically run 9% – 18% APR. These are observed panel ranges, not guarantees — see the methodology page for details. You'll see the exact APR, term length, and total cost on every term sheet before you sign — no bait-and-switch.",
    aJsx: (
      <>
        Rates depend on your revenue, time in business, and credit band. For
        working capital, most of our borrowers land between{" "}
        <code>14% – 34% APR</code>. For equipment loans secured by the truck,
        rates typically run <code>9% – 18% APR</code>. These are observed panel
        ranges, not guarantees — see{" "}
        <a href="/methodology#finance-rates">methodology</a>. You&rsquo;ll see
        the exact APR, term length, and total cost on every term sheet before
        you sign — no bait-and-switch.
      </>
    ),
  },
  {
    q: "What documents do I need?",
    aText:
      "The basics: last 3 months of business bank statements, your EIN or SSN, DOT number, and a driver's license. For loans over $75k we'll also ask for your most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax preparer letter, no IFTA printouts unless a specific lender requests them.",
    aJsx: (
      <>
        The basics: last 3 months of business bank statements, your EIN or SSN,
        DOT number, and a driver&rsquo;s license. For loans over $75k we&rsquo;ll
        also ask for your most recent Schedule C or 1120 and current settlement
        statements from your carrier or broker. No business plan, no tax
        preparer letter, no IFTA printouts unless a specific lender requests
        them.
      </>
    ),
  },
  {
    q: "What credit score do I need?",
    aText:
      "We route applications starting at a 500 FICO. Lenders on our panel go lower than most banks because they underwrite on revenue and equipment, not just credit. Below 580, expect rates on the higher end of the range and a tighter maximum. Above 680, you qualify for our full product set. For operators below 500 or actively in a credit event, factoring with no credit check on you is often the right product — the factor underwrites the broker who owes the invoice, not the operator.",
    aJsx: (
      <>
        We route applications starting at a <code>500 FICO</code>. Lenders on
        our panel go lower than most banks because they underwrite on revenue
        and equipment, not just credit. Below 580, expect rates on the higher
        end of the range and a tighter maximum. Above 680, you qualify for our
        full product set. For operators below 500 or actively in a credit
        event,{" "}
        <a href="/factoring/no-credit-check">
          factoring with no credit check on you
        </a>{" "}
        is often the right product — the factor underwrites the broker who owes
        the invoice, not the operator.
      </>
    ),
  },
  {
    q: "How fast is fast, really?",
    aText:
      "Soft approval and lender match: typically 20 minutes after you complete the application. Funds in your account: same banking day after the chosen lender signs off, when the wire instruction lands before that bank's cutoff. Wires that miss the cutoff settle the next banking day.",
    aJsx: (
      <>
        Soft approval and lender match: typically 20 minutes after you complete
        the application. Funds in your account: same banking day after the
        chosen lender signs off, when the wire instruction lands before that
        bank&rsquo;s cutoff. Wires that miss the cutoff settle the next banking
        day.
      </>
    ),
  },
  {
    q: "What happens after I apply?",
    aText:
      "You get a soft approval range and a shortlist of 2–4 matched lenders. Pick one. The chosen lender runs a hard pull and sends a final term sheet within 4 hours. You review it, ask questions (one phone number, not a call center), e-sign from your phone, and the wire goes out. That's it.",
    aJsx: (
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
    aText:
      "Not at the start. The Dispatched application is a soft pull — it does not show on your credit report and does not affect your score. A hard pull only happens once you pick a lender and move forward on their term sheet. If you shop around, the hard pulls fall inside a 14-day rate-shopping window and count as one inquiry.",
    aJsx: (
      <>
        Not at the start. The Dispatched application is a <code>soft pull</code>
        {" "}— it does not show on your credit report and does not affect your
        score. A hard pull only happens once you pick a lender and move forward
        on their term sheet. If you shop around, the hard pulls fall inside a
        14-day rate-shopping window and count as one inquiry.
      </>
    ),
  },
];
