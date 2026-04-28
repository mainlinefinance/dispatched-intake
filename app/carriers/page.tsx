import type { Metadata } from "next";
import Link from "next/link";
import { getAllCarriers, type Carrier } from "@/lib/data/carriers";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Commercial Trucking Insurance Carriers — Dispatched",
  description:
    "Carrier reviews for the commercial-trucking insurance market — AM Best ratings, products written, and the state money pages where Dispatched lists each carrier.",
  alternates: { canonical: "/carriers" },
};

function amBestLabel(c: Carrier): string {
  if (c.notRated === true) return "Not Rated";
  if (c.amBestRating && c.amBestVerifiedAt) return c.amBestRating;
  return "Pending";
}

export default function CarriersIndexPage() {
  const carriers = getAllCarriers();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="ins-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Insurance", url: "https://dispatched.finance/insurance" },
          { name: "Carriers", url: "https://dispatched.finance/carriers" },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Commercial Trucking Insurance Carriers",
          description:
            "Index of carriers Dispatched lists across its commercial-trucking insurance money pages.",
          url: "https://dispatched.finance/carriers",
          datePublished: today,
          dateModified: today,
        })}
      />
      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Carriers · {carriers.length}</span>
            <h1 className="ins-hero-title">
              Commercial trucking insurance carriers.
            </h1>
            <p className="ins-hero-sub">
              The carriers Dispatched lists across its money pages. Each
              review covers AM Best status (with verification date),
              products written, and the state money pages where the carrier
              appears in our editorial picks.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <div className="ins-state-grid">
              {carriers.map((c) => (
                <Link
                  key={c.slug}
                  href={`/carriers/${c.slug}`}
                  className="ins-state-tile"
                >
                  <span>{c.name}</span>
                  <span className="ins-state-tile-tag">{amBestLabel(c)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <p className="ins-compliance-note">
              AM Best ratings are populated only when verified directly
              against ambest.com and stamped with the verification date in
              our data layer. &ldquo;Not Rated&rdquo; reflects AM Best&apos;s
              own classification; &ldquo;Pending&rdquo; reflects that we
              have not completed verification, not that the carrier&apos;s
              rating is missing or weak.{" "}
              <Link href="/methodology">Read our methodology.</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
