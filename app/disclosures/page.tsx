import type { Metadata } from "next";
import Link from "next/link";
import { DISCLOSURES } from "@/lib/copy";

export const metadata: Metadata = {
  title: `${DISCLOSURES.title} — Dispatched`,
  description: DISCLOSURES.subtitle,
};

export default function DisclosuresPage() {
  return (
    <div className="disclosures">
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
    </div>
  );
}
