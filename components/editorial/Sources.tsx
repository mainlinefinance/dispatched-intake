import type { Citation } from "@/lib/seo/citations";

/* The primary sources a page rests on, listed where a reader expects them:
   after the content, before the related links. */
export default function Sources({
  citations,
}: {
  citations: ReadonlyArray<Citation>;
}) {
  if (citations.length === 0) return null;
  return (
    <section className="research-section" id="sources">
      <h2>Sources</h2>
      <p>
        Primary references for the regulations, programs and terms this page
        covers. Rules change; the linked source is the authority.
      </p>
      <ol className="research-sources">
        {citations.map((c) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.name}
            </a>{" "}
            — {c.publisher}
          </li>
        ))}
      </ol>
    </section>
  );
}
