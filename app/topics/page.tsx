import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  itemList,
} from "@/components/seo/JsonLd";
import {
  getAllTopicSlugs,
  getContentByTopic,
  getTopicInfo,
} from "@/lib/topics";

const CANONICAL = "/topics";
const ABS_URL = "https://dispatched.finance/topics";

const TITLE = "Topics — Browse Dispatched by subject";
const DESCRIPTION =
  "10 topics covering trucking finance, operations, compliance, and insurance. Each topic aggregates relevant glossary terms, blog posts, comparisons, research reports, and calculators.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TopicsIndexPage() {
  const today = new Date().toISOString().slice(0, 10);
  const topicSlugs = getAllTopicSlugs();
  const topics = topicSlugs.map((slug) => {
    const info = getTopicInfo(slug);
    const items = getContentByTopic(slug);
    return { info, count: items.length };
  });

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Topics", url: ABS_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Browse Dispatched by topic",
          description: DESCRIPTION,
          url: ABS_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: "Dispatched Topics",
          description: DESCRIPTION,
          items: topics.map((t) => ({
            name: t.info.label,
            url: `${ABS_URL}/${t.info.slug}`,
            description: t.info.description,
          })),
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched · Topics</p>
            <h1 className="research-h1">Browse Dispatched by topic.</h1>
            <p className="research-subhead">
              10 topics covering trucking finance, operations, compliance, and
              insurance. Each topic aggregates relevant glossary terms, blog
              posts, comparisons, research reports, and calculators.
            </p>
            <p className="research-meta">
              {topics.length} topics · Updated {today}
            </p>
          </header>

          <section className="research-section" id="topics">
            <h2>All topics</h2>
            <ul className="research-list">
              {topics.map((t) => (
                <li key={t.info.slug}>
                  <Link href={`/topics/${t.info.slug}`}>
                    <strong>{t.info.label}</strong>
                  </Link>{" "}
                  — {t.info.description}{" "}
                  <em>({t.count} items)</em>
                </li>
              ))}
            </ul>
          </section>

          <section className="research-section research-cta">
            <h2>Ready to put the playbook to work?</h2>
            <p>
              Topics are the cross-cut browse layer underneath the money pages.
              If you are an owner-operator or small fleet ready to move on
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
              <Link
                href="/invoice-factoring-for-truckers"
                className="research-cta-card"
              >
                <h3>Compare factoring</h3>
                <p>
                  Recourse vs. non-recourse, fuel-card programs, and
                  broker-credit infrastructure across the major
                  trucking-factoring desks.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
