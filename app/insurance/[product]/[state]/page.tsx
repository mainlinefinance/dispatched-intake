import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, type Product } from "@/lib/data/products";
import {
  getInsuranceState,
  type InsuranceState,
} from "@/lib/data/states";
import {
  getAllDotClasses,
  type DotClass,
} from "@/lib/data/dotClasses";
import {
  getCarrier,
  type Carrier,
} from "@/lib/data/carriers";
import {
  getStateMoneyPages,
  isDeepMoneyPagePublished,
  isStateMoneyPagePublished,
} from "@/lib/data/moneyPageIndex";
import { hasAnyRates } from "@/lib/data/rates";
import {
  JsonLd,
  article,
  breadcrumbList,
  financialProduct,
} from "@/components/seo/JsonLd";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import EditorialByline from "@/components/landing/EditorialByline";
import { metaInsuranceProductState } from "@/lib/seo/metadataPatterns";
import CarrierTable from "@/components/compare/CarrierTable";
import MethodologyByline from "@/components/trust/MethodologyByline";
import ExpertCallout from "@/components/trust/ExpertCallout";
import ZipDotClassForm from "@/components/quote/ZipDotClassForm";
import EditorialBody from "@/components/editorial/EditorialBody";
import { getEditorial } from "@/lib/data/editorial";

type Params = { product: string; state: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getStateMoneyPages().map((p) => ({
    product: p.productSlug,
    state: p.stateSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product, state } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  if (!p || !s) return {};
  const { title, description } = metaInsuranceProductState({
    productShortLabel: p.shortLabel,
    productName: p.name,
    productNameLower: p.name.toLowerCase(),
    stateName: s.name,
  });
  const canonical = `/insurance/${p.slug}/${s.slug}`;
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

export default async function StateMoneyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product, state } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  if (!p || !s) notFound();
  if (!isStateMoneyPagePublished(p.slug, s.slug)) notFound();

  const carriers = s.topCarriers
    .map((slug) => getCarrier(slug))
    .filter((c): c is Carrier => c !== null);
  const dotClasses = getAllDotClasses();
  const ratesPresent = hasAnyRates(s.abbr, p.slug);
  const editorial = getEditorial(p.slug, s.slug);
  const today = new Date().toISOString().slice(0, 10);
  const url = `https://dispatched.finance/insurance/${p.slug}/${s.slug}`;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dispatched", url: "https://dispatched.finance/" },
    { name: "Insurance", url: "https://dispatched.finance/insurance" },
    {
      name: p.name,
      url: `https://dispatched.finance/insurance/${p.slug}`,
    },
    { name: s.name, url },
  ];

  return (
    <div className="ins-page">
      <JsonLd payload={breadcrumbList(breadcrumbs)} />
      <JsonLd
        payload={article({
          headline: `${p.name} in ${s.name} for Commercial Trucking`,
          description: `${p.shortLabel} carriers, regulatory context, and rate environment in ${s.name}.`,
          url,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: `${p.name} (${s.name})`,
          description: p.oneLine,
          url,
          category: "Commercial Trucking Insurance",
        })}
      />

      <main id="main-content">
        <div className="ins-container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <Hero product={p} state={s} today={today} />
        <div className="ins-container">
          <MethodologyByline />
        </div>
        <section>
          <div className="ins-container">
            <ZipDotClassForm
              productSlug={p.slug}
              stateSlug={s.slug}
              sourceUrl={`/insurance/${p.slug}/${s.slug}`}
            />
          </div>
        </section>
        {!ratesPresent ? <RatePending product={p} state={s} /> : null}
        <CarrierSection product={p} state={s} carriers={carriers} />
        {editorial ? <EditorialBody body={editorial} /> : null}
        <ExpertSection />
        <RegulatoryContext state={s} />
        <DotClassDirectory
          product={p}
          state={s}
          dotClasses={dotClasses}
        />
        <ComplianceFooter state={s} />
      </main>
    </div>
  );
}

function Hero({
  product,
  state,
  today,
}: {
  product: Product;
  state: InsuranceState;
  today: string;
}) {
  return (
    <section className="ins-hero">
      <div className="ins-container">
        <span className="ins-eyebrow">
          {product.shortLabel} · {state.abbr}
        </span>
        <h1 className="ins-hero-title">
          {product.name} for {state.name} commercial trucking operators.
        </h1>
        <EditorialByline updated={today} />
        <p className="ins-hero-sub">{product.oneLine}</p>
      </div>
    </section>
  );
}

function RatePending({
  product,
  state,
}: {
  product: Product;
  state: InsuranceState;
}) {
  return (
    <div className="ins-container">
      <p className="ins-rate-pending">
        <strong>Rate band pending.</strong> We have not yet extracted a public
        rate filing from {state.doi.name} for {product.shortLabel.toLowerCase()}{" "}
        in {state.name}. We will publish a sourced premium band on this page
        once the filing is reviewed by an expert reviewer. Carrier listings
        below are unaffected; they are sourced from the carriers&apos; own
        appointment and license footprints.
      </p>
    </div>
  );
}

function CarrierSection({
  product,
  state,
  carriers,
}: {
  product: Product;
  state: InsuranceState;
  carriers: Carrier[];
}) {
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">Carriers writing in {state.abbr}</span>
        <h2 className="ins-hero-title">
          Top carriers for {product.shortLabel.toLowerCase()} in {state.name}
        </h2>
        <CarrierTable carriers={carriers} />
      </div>
    </section>
  );
}

function ExpertSection() {
  return (
    <div className="ins-container">
      <ExpertCallout reviewer={null} />
    </div>
  );
}

function RegulatoryContext({ state }: { state: InsuranceState }) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">{state.abbr} regulatory context</span>
        <h2 className="ins-hero-title">
          {state.name}-specific rules that move premium
        </h2>
        {state.tortReformNote ? (
          <p className="ins-hero-sub">{state.tortReformNote}</p>
        ) : null}
        {state.surplusLinesNote ? (
          <p className="ins-hero-sub">{state.surplusLinesNote}</p>
        ) : null}
        {state.fmcsaServiceCenter ? (
          <p className="ins-compliance-note">
            <strong>FMCSA jurisdiction:</strong> {state.fmcsaServiceCenter}.
          </p>
        ) : null}
        <p className="ins-compliance-note">
          State regulator:{" "}
          <a href={state.doi.url} rel="noopener" target="_blank">
            {state.doi.name}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function DotClassDirectory({
  product,
  state,
  dotClasses,
}: {
  product: Product;
  state: InsuranceState;
  dotClasses: DotClass[];
}) {
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">By DOT class</span>
        <h2 className="ins-hero-title">
          {product.shortLabel} for specific DOT classes in {state.name}
        </h2>
        <p className="ins-hero-sub">
          Deep pages cover the operator profile, sampling assumptions, and
          rate band for a single product × state × DOT class. We publish
          deep pages only after the editorial body and reviewer attestation
          are complete.
        </p>
        <div className="ins-state-grid">
          {dotClasses.map((dc) => {
            const published = isDeepMoneyPagePublished(
              product.slug,
              state.slug,
              dc.slug,
            );
            if (published) {
              return (
                <Link
                  key={dc.slug}
                  href={`/insurance/${product.slug}/${state.slug}/${dc.slug}`}
                  className="ins-state-tile"
                >
                  <span>{dc.shortLabel}</span>
                  <span className="ins-state-tile-tag">{dc.weightClass}</span>
                </Link>
              );
            }
            return (
              <span
                key={dc.slug}
                className="ins-state-tile ins-state-tile-pending"
                aria-disabled="true"
              >
                <span>{dc.shortLabel}</span>
                <span className="ins-state-tile-tag">Coming soon</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComplianceFooter({ state }: { state: InsuranceState }) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <p className="ins-compliance-note">
          Dispatched is a comparison and matching platform. In {state.name},
          coverage is placed by licensed producers and bound by carriers
          appointed in {state.abbr}; Dispatched does not bind coverage. Where
          we accept your contact information for a quote, that consent will be
          one-to-one with the named producer partner identified at submission.
        </p>
      </div>
    </section>
  );
}
