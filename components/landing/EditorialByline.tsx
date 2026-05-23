import Link from "next/link";

/* Visible last-updated byline. Renders under the H1, above the lead
   paragraph, on landing and money pages. The same ISO date value is
   passed to Article JSON-LD's dateModified upstream, so what the
   crawler reads and what the human reads never drift.

   Date format: ISO YYYY-MM-DD only. Parsed manually (not via Date()) to
   avoid the UTC-vs-local timezone off-by-one that bites build-time
   formatting in Render's container.

   AEO context: visible recency signals correlate with citation rates
   across nearly every answer engine. Article schema dateModified gets
   parsed by the crawler; the visible byline gets parsed by Google's
   quality raters and end users. Both matter. */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

type Props = {
  updated: string;
  published?: string;
  authorName?: string;
  authorHref?: string;
  /* Visible date format. "long" (default) renders "May 23, 2026"; "iso"
     renders the bare "2026-05-23". The <time dateTime=…> attribute is
     always ISO regardless. Per-page opt-in so we don't disturb the long
     form on the rest of the landing pages. */
  format?: "long" | "iso";
};

export default function EditorialByline({
  updated,
  published,
  authorName,
  authorHref,
  format = "long",
}: Props) {
  const updatedDisplay = format === "iso" ? updated : formatIsoDate(updated);
  const publishedDisplay = published
    ? format === "iso"
      ? published
      : formatIsoDate(published)
    : null;

  return (
    <p className="editorial-byline">
      {authorName && (
        <>
          {authorHref ? (
            <Link href={authorHref}>{authorName}</Link>
          ) : (
            <span>{authorName}</span>
          )}
          {" · "}
        </>
      )}
      {publishedDisplay && (
        <>
          <span>Published {publishedDisplay}</span>
          {" · "}
        </>
      )}
      <time dateTime={updated}>Updated {updatedDisplay}</time>
    </p>
  );
}
