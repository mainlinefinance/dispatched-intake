import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  itemList,
} from "@/components/seo/JsonLd";
import {
  CONTENT_TYPE_LABELS,
  getAllTopicSlugs,
  getContentByTopic,
  getTopicInfo,
  type ContentTopic,
  type TopicContentItem,
  type TopicContentType,
} from "@/lib/topics";

const ABS_BASE = "https://dispatched.finance/topics";

export function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isContentTopic(slug)) {
    return {};
  }
  const info = getTopicInfo(slug);
  const title = `${info.label} — Dispatched Topic`;
  const description = info.description;
  return {
    title,
    description,
    alternates: { canonical: `/topics/${slug}` },
    openGraph: {
      title,
      description,
      url: `/topics/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function isContentTopic(value: string): value is ContentTopic {
  return (getAllTopicSlugs() as ReadonlyArray<string>).includes(value);
}

const CONTENT_TYPE_ORDER: ReadonlyArray<TopicContentType> = [
  "glossary",
  "blog",
  "comparison",
  "research",
  "calculator",
  "vertical",
];

function groupByContentType(
  items: ReadonlyArray<TopicContentItem>,
): ReadonlyArray<{
  type: TopicContentType;
  label: string;
  items: ReadonlyArray<TopicContentItem>;
}> {
  return CONTENT_TYPE_ORDER.map((type) => ({
    type,
    label: CONTENT_TYPE_LABELS[type],
    items: items.filter((it) => it.contentType === type),
  })).filter((g) => g.items.length > 0);
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isContentTopic(slug)) {
    notFound();
  }
  const info = getTopicInfo(slug);
  const items = getContentByTopic(slug);
  const groups = groupByContentType(items);
  const today = new Date().toISOString().slice(0, 10);
  const absUrl = `${ABS_BASE}/${slug}`;

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Topics", url: ABS_BASE },
          { name: info.label, url: absUrl },
        ])}
      />
      <JsonLd
        payload={article({
          headline: info.label,
          description: info.description,
          url: absUrl,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: `${info.label} — Dispatched Topic`,
          description: info.description,
          items: items.map((it) => ({
            name: it.title,
            url: `https://dispatched.finance${it.url}`,
            description: it.description,
          })),
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched · Topic</p>
            <h1 className="research-h1">{info.label}</h1>
            <p className="research-subhead">{info.description}</p>
            <p className="research-meta">
              {items.length} items · Updated {today}
            </p>
          </header>

          {groups.map((g) => (
            <section
              key={g.type}
              className="research-section"
              id={g.type}
            >
              <h2>{g.label}</h2>
              <ul className="research-list">
                {g.items.map((it) => (
                  <li key={it.url}>
                    <Link href={it.url}>
                      <strong>{it.title}</strong>
                    </Link>{" "}
                    — {it.description}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="research-section research-cta">
            <h2>Ready to put it to work?</h2>
            <p>
              This topic page indexes everything Dispatched has published on{" "}
              {info.label.toLowerCase()}. If you are ready to move on
              financing, factoring, or insurance, start the matching flow.
            </p>
            <div className="research-cta-grid">
              <Link href="/qualify" className="research-cta-card">
                <h3>Qualify in 3 minutes</h3>
                <p>
                  Soft pull, no credit impact. We route you to the lender
                  panel matching your authority age, credit profile, and
                  capital need.
                </p>
              </Link>
              <Link href="/topics" className="research-cta-card">
                <h3>Browse other topics</h3>
                <p>
                  Back to the full topic index — 10 subjects covering trucking
                  finance, operations, compliance, and insurance.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
