import "server-only";
import Link from "next/link";
import type { RelatedItem } from "@/lib/related";

type Props = {
  readonly items: ReadonlyArray<RelatedItem>;
  readonly heading?: string;
  readonly intro?: string;
};

const TYPE_LABEL: Record<RelatedItem["type"], string> = {
  glossary: "Glossary",
  blog: "Blog",
  comparison: "Comparison",
  research: "Research",
  calculator: "Calculator",
  vertical: "Vertical",
};

export default function RelatedContent({
  items,
  heading = "Related from Dispatched",
  intro,
}: Props) {
  if (items.length === 0) return null;
  return (
    <section
      className="related-content research-section"
      aria-label={heading}
    >
      <h2 className="related-content-heading">{heading}</h2>
      {intro ? <p className="related-content-intro">{intro}</p> : null}
      <div className="related-content-grid research-cta-grid">
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="related-content-card research-cta-card"
          >
            <span className="related-content-type">{TYPE_LABEL[item.type]}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
