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
      "Rates depend on your revenue, time in business, and credit profile. For working capital, illustrative panel ranges have often fallen between 14% – 34% APR. For equipment loans secured by the truck, illustrative ranges have often run 9% – 18% APR. These ranges are illustrative only; actual rates are set by lenders and vary. You'll see the exact APR, term length, and total cost on every term sheet before you sign.",
    aJsx: (
      <>
        Rates depend on your revenue, time in business, and credit profile. For
        working capital, illustrative panel ranges have often fallen between{" "}
        <code>14% – 34% APR</code>. For equipment loans secured by the truck,
        illustrative ranges have often run <code>9% – 18% APR</code>. These
        ranges are illustrative only; actual rates are set by lenders and vary
        — see{" "}
        <a href="/methodology#finance-rates">methodology</a>. You&rsquo;ll see
        the exact APR, term length, and total cost on every term sheet before
        you sign.
      </>
    ),
  },
  {
    q: "What documents do I need?",
    aText:
      "The basics for commercial / business financing: last 3 months of business bank statements, your EIN (or SSN when required for a sole proprietor business application), DOT number, and a driver's license. SSN/EIN is collected so financing partners can verify your business identity and underwrite a commercial application; it is handled under our Privacy Policy. For loans over $75k we'll also ask for your most recent Schedule C or 1120 and current settlement statements from your carrier or broker. This service is for commercial / business financing only — not personal or consumer credit.",
    aJsx: (
      <>
        The basics for commercial / business financing: last 3 months of
        business bank statements, your EIN (or SSN when required for a sole
        proprietor business application), DOT number, and a driver&rsquo;s
        license. SSN/EIN is collected so financing partners can verify your
        business identity and underwrite a commercial application; see our{" "}
        <a href="/privacy">Privacy Policy</a>. For loans over $75k we&rsquo;ll
        also ask for your most recent Schedule C or 1120 and current settlement
        statements from your carrier or broker. This service is for commercial
        / business financing only — not personal or consumer credit.
      </>
    ),
  },
  {
    q: "What credit profile do I need?",
    aText:
      "We introduce commercial financing applications across a range of credit profiles. Financing partners on our panel often weigh business revenue and equipment alongside credit history. Lower credit profiles may see higher rates and tighter maximums; stronger profiles may see a broader product set. For operators rebuilding credit, factoring that underwrites broker receivables (not a consumer credit score alone) can be an option. Approval is not guaranteed.",
    aJsx: (
      <>
        We introduce commercial financing applications across a range of credit
        profiles. Financing partners on our panel often weigh business revenue
        and equipment alongside credit history. Lower credit profiles may see
        higher rates and tighter maximums; stronger profiles may see a broader
        product set. For operators rebuilding credit,{" "}
        <a href="/factoring/broker-credit">
          factoring focused on broker receivables
        </a>{" "}
        can be an option — the factor underwrites mainly on the broker who owes the invoice and still reviews the carrier. Approval is not guaranteed.
      </>
    ),
  },
  {
    q: "What affects funding timing?",
    aText:
      "Timing depends on the lender and your documents. Soft matches and term sheets arrive after underwriting review; wires settle after the chosen financing partner signs off and banking cutoffs clear. Individual results vary.",
    aJsx: (
      <>
        Timing depends on the lender and your documents. Soft matches and term
        sheets arrive after underwriting review; wires settle after the chosen
        financing partner signs off and banking cutoffs clear. Individual
        results vary.
      </>
    ),
  },
  {
    q: "What happens after I apply?",
    aText:
      "You may receive a soft match range and a shortlist of financing partners. Pick one. The chosen partner runs a hard pull and sends a final term sheet when underwriting is complete. You review it, ask questions, e-sign if you choose to proceed, and funding follows their process. Approval and timing are not guaranteed.",
    aJsx: (
      <>
        You may receive a soft match range and a shortlist of financing
        partners. Pick one. The chosen partner runs a hard pull and sends a
        final term sheet when underwriting is complete. You review it, ask
        questions, e-sign if you choose to proceed, and funding follows their
        process. Approval and timing are not guaranteed.
      </>
    ),
  },
  {
    q: "Will this hurt my credit?",
    aText:
      "Not at the start. The Dispatched application is a soft pull — it does not show on your credit report and does not affect your score. A hard pull only happens once you pick a financing partner and move forward on their term sheet. If you shop around, hard pulls that fall inside a typical rate-shopping window are often treated as one inquiry by scoring models.",
    aJsx: (
      <>
        Not at the start. The Dispatched application is a <code>soft pull</code>
        {" "}— it does not show on your credit report and does not affect your
        score. A hard pull only happens once you pick a financing partner and
        move forward on their term sheet. If you shop around, hard pulls that
        fall inside a typical rate-shopping window are often treated as one
        inquiry by scoring models.
      </>
    ),
  },
];
