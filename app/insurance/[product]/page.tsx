import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProduct,
  type Product,
} from "@/lib/data/products";
import {
  getAllInsuranceStates,
  type InsuranceState,
} from "@/lib/data/states";
import { isStateMoneyPagePublished } from "@/lib/data/moneyPageIndex";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import EditorialByline from "@/components/landing/EditorialByline";
import { metaInsuranceProductHub } from "@/lib/seo/metadataPatterns";

type Params = { product: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllProducts().map((p) => ({ product: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product } = await params;
  const p = getProduct(product);
  if (!p) return {};
  const { title, description } = metaInsuranceProductHub(p.name);
  const canonical = `/insurance/${p.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductHubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product } = await params;
  const p = getProduct(product);
  if (!p) notFound();

  const states = getAllInsuranceStates();
  const today = new Date().toISOString().slice(0, 10);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dispatched", url: "https://dispatched.finance/" },
    { name: "Insurance", url: "https://dispatched.finance/insurance" },
    {
      name: p.name,
      url: `https://dispatched.finance/insurance/${p.slug}`,
    },
  ];

  return (
    <div className="ins-page">
      <JsonLd payload={breadcrumbList(breadcrumbs)} />
      <JsonLd
        payload={article({
          headline: `${p.name} for Commercial Trucking`,
          description: p.oneLine,
          url: `https://dispatched.finance/insurance/${p.slug}`,
          datePublished: today,
          dateModified: today,
        })}
      />

      <main id="main-content">
        <div className="ins-container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <Hero product={p} today={today} />
        <RegulatoryBlock product={p} />
        <StateDirectory product={p} states={states} />
        <ComplianceFooter />
      </main>
    </div>
  );
}

function Hero({ product, today }: { product: Product; today: string }) {
  return (
    <section className="ins-hero">
      <div className="ins-container">
        <span className="ins-eyebrow">
          Insurance · {product.shortLabel}
        </span>
        <h1 className="ins-hero-title">
          {product.name} for commercial trucking.
        </h1>
        <EditorialByline updated={today} />
        <p className="ins-hero-sub">{product.oneLine}</p>
        <p className="ins-hero-sub">{product.whoBuys}</p>
      </div>
    </section>
  );
}

function RegulatoryBlock({ product }: { product: Product }) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">Regulatory</span>
        <h2 className="ins-hero-title">When you need this coverage</h2>
        <p className="ins-hero-sub">{product.regulatoryNote}</p>
        {product.fmcsaMinimum ? (
          <p className="ins-compliance-note">
            <strong>FMCSA minimum limits:</strong> {product.fmcsaMinimum}.
            Source: 49 CFR Part 387. Carriers and brokers commonly require
            limits above the federal minimum; refer to your shipper or broker
            contract for the binding number.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function StateDirectory({
  product,
  states,
}: {
  product: Product;
  states: InsuranceState[];
}) {
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">By state</span>
        <h2 className="ins-hero-title">
          {product.shortLabel} by state
        </h2>
        <p className="ins-hero-sub">
          State-by-state pages cover the local DOI, surplus-lines rules, and
          carriers actively writing the line. We add new states as we extract
          their public rate filings — pages are not generated until the
          editorial body is complete.
        </p>
        <div className="ins-state-grid">
          {states.map((s) => {
            const published = isStateMoneyPagePublished(product.slug, s.slug);
            if (published) {
              return (
                <Link
                  key={s.slug}
                  href={`/insurance/${product.slug}/${s.slug}`}
                  className="ins-state-tile"
                >
                  <span>{s.name}</span>
                  <span className="ins-state-tile-tag">{s.abbr}</span>
                </Link>
              );
            }
            return (
              <span
                key={s.slug}
                className="ins-state-tile ins-state-tile-pending"
                aria-disabled="true"
              >
                <span>{s.name}</span>
                <span className="ins-state-tile-tag">Coming soon</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComplianceFooter() {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <p className="ins-compliance-note">
          Coverage descriptions on this page are general and informational.
          Binding terms come from the carrier policy and any endorsements.
          Dispatched is a comparison and matching platform; we are not a
          licensed insurance producer in every state. Where we accept contact
          information for a quote, that consent is one-to-one with named
          producer partners.
        </p>
      </div>
    </section>
  );
}
