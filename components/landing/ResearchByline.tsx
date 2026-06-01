import Link from "next/link";

/* Visible byline shared across the /research index of long-form reports.
   Renders the human-facing author attribution + published date + inline
   source count between the eyebrow chip and the body. Pairs with the
   article() JSON-LD payload upstream — authorName: "Angelo Orru Neto"
   flows the same identity into schema.org so the crawler and the human
   reader never see different authorship.

   Why this is its own component: the 9 research pages used to ship the
   anonymous "Dispatched Research · Reviewer attestation pending" pattern
   inline. The trust audit ("Trust is the new moat") flagged that
   anonymous research signals are functionally hostile in 2026 — buyers
   default to NO when no real person is named. PR #115 fixed the
   insurance page; this component is the durable fix for the other 8 and
   the guard against regression. */

const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
];

function formatCount(n: number): string {
  return Number.isInteger(n) && n >= 0 && n <= 20 ? NUMBER_WORDS[n] : String(n);
}

type Props = {
  publishedDate: string;
  sourceCount: number;
  /* Trailing sentence appended after "N sources referenced inline."
     Pass the full sentence including terminating punctuation, e.g.
     "Data through April 2026." or "No paid placements." */
  methodologyNote?: string;
};

export default function ResearchByline({
  publishedDate,
  sourceCount,
  methodologyNote,
}: Props) {
  return (
    <p className="research-meta">
      By <Link href="/about">Angelo Orru Neto, Founder</Link>
      {" · "}Published {publishedDate} · {formatCount(sourceCount)} sources
      referenced inline.
      {methodologyNote ? ` ${methodologyNote}` : null}
    </p>
  );
}
