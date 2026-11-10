import Link from "next/link";

/* Who wrote the page and when it was last reviewed. The author is the
   founder entity that /about and the Article JSON-LD already describe; the
   link carries rel="author" so crawlers tie the two together. */
export const EDITORIAL_AUTHOR = "Angelo Orru Neto";

function longDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Byline({
  published,
  updated,
}: {
  published?: string;
  updated: string;
}) {
  return (
    <p className="research-meta research-byline">
      By{" "}
      <Link href="/about" rel="author">
        {EDITORIAL_AUTHOR}
      </Link>
      , founder of Dispatched
      {published && published !== updated ? (
        <>
          {" "}
          · Published <time dateTime={published}>{longDate(published)}</time>
        </>
      ) : null}{" "}
      · Updated <time dateTime={updated}>{longDate(updated)}</time>
    </p>
  );
}
