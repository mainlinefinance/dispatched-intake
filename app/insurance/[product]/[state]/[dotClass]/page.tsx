import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, type Product } from "@/lib/data/products";
import {
  getInsuranceState,
  type InsuranceState,
} from "@/lib/data/states";
import {
  getDotClass,
  type DotClass,
} from "@/lib/data/dotClasses";
import {
  getCarrier,
  type Carrier,
} from "@/lib/data/carriers";
import {
  getDeepMoneyPages,
  isDeepMoneyPagePublished,
} from "@/lib/data/moneyPageIndex";
import { getRate, getProfileForObservation } from "@/lib/data/rates";
import {
  JsonLd,
  article,
  breadcrumbList,
  financialProduct,
} from "@/components/seo/JsonLd";
import CarrierTable from "@/components/compare/CarrierTable";
import MethodologyByline from "@/components/trust/MethodologyByline";
import ExpertCallout from "@/components/trust/ExpertCallout";
import ZipDotClassForm from "@/components/quote/ZipDotClassForm";

type Params = { product: string; state: string; dotClass: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getDeepMoneyPages().map((p) => ({
    product: p.productSlug,
    state: p.stateSlug,
    dotClass: p.dotClassSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product, state, dotClass } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  const dc = getDotClass(dotClass);
  if (!p || !s || !dc) return { title: "Insurance — Dispatched" };
  return {
    title: `${p.name} for ${dc.name} in ${s.name} — Dispatched`,
    description: `${p.shortLabel} for ${dc.name.toLowerCase()} operators in ${s.name}. Sampling profile, carriers writing the line, and rate band where sourced.`,
    alternates: {
      canonical: `/insurance/${p.slug}/${s.slug}/${dc.slug}`,
    },
  };
}

export default async function DeepMoneyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product, state, dotClass } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  const dc = getDotClass(dotClass);
  if (!p || !s || !dc) notFound();
  if (!isDeepMoneyPagePublished(p.slug, s.slug, dc.slug)) notFound();

  const observation = getRate(s.abbr, p.slug, dc.slug);
  const profile = observation ? getProfileForObservation(observation) : null;
  const carriers = s.topCarriers
    .map((slug) => getCarrier(slug))
    .filter((c): c is Carrier => c !== null);
  const today = new Date().toISOString().slice(0, 10);
  const url = `https://dispatched.finance/insurance/${p.slug}/${s.slug}/${dc.slug}`;

  return (
    <div className="ins-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Insurance", url: "https://dispatched.finance/insurance" },
          {
            name: p.name,
            url: `https://dispatched.finance/insurance/${p.slug}`,
          },
          {
            name: s.name,
            url: `https://dispatched.finance/insurance/${p.slug}/${s.slug}`,
          },
          { name: dc.shortLabel, url },
        ])}
      />
      <JsonLd
        payload={article({
          headline: `${p.name} for ${dc.name} in ${s.name}`,
          description: `${p.shortLabel} carriers, sampling profile, and rate environment for ${dc.name.toLowerCase()} operators in ${s.name}.`,
          url,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: `${p.name} (${s.name}, ${dc.shortLabel})`,
          description: p.oneLine,
          url,
          category: "Commercial Trucking Insurance",
        })}
      />

      <main id="main-content">
        <Hero product={p} state={s} dotClass={dc} />
        <div className="ins-container">
          <MethodologyByline
            lastUpdated={observation ? `Sampled ${observation.sampledAt}` : undefined}
          />
        </div>
        <section>
          <div className="ins-container">
            <ZipDotClassForm
              productSlug={p.slug}
              stateSlug={s.slug}
              preselectedDotClassSlug={dc.slug}
              sourceUrl={`/insurance/${p.slug}/${s.slug}/${dc.slug}`}
            />
          </div>
        </section>
        {observation && profile ? (
          <SourcedRate
            product={p}
            state={s}
            dotClass={dc}
            premiumLow={observation.premiumLowAnnual}
            premiumHigh={observation.premiumHighAnnual}
            sampledAt={observation.sampledAt}
            proxyType={observation.proxyType}
            sourceLabel={observation.source?.label ?? "Source pending"}
            sourceUrl={observation.source?.url ?? null}
          />
        ) : (
          <RatePending product={p} state={s} dotClass={dc} />
        )}
        {profile ? <SamplingProfileCallout profile={profile} /> : null}
        <ClassDescription dotClass={dc} />
        <CarrierSection product={p} state={s} carriers={carriers} />
        <div className="ins-container">
          <ExpertCallout reviewer={null} />
        </div>
        <ComplianceFooter state={s} />
      </main>
    </div>
  );
}

function Hero({
  product,
  state,
  dotClass,
}: {
  product: Product;
  state: InsuranceState;
  dotClass: DotClass;
}) {
  return (
    <section className="ins-hero">
      <div className="ins-container">
        <span className="ins-eyebrow">
          {product.shortLabel} · {state.abbr} · {dotClass.shortLabel}
        </span>
        <h1 className="ins-hero-title">
          {product.name} for {dotClass.name.toLowerCase()} operators in{" "}
          {state.name}.
        </h1>
        <p className="ins-hero-sub">{product.oneLine}</p>
      </div>
    </section>
  );
}

function proxyEyebrow(proxyType: string): string {
  switch (proxyType) {
    case "state-doi-filing":
      return "Sampled premium band — state DOI filing";
    case "carrier-published-guidance":
      return "Indicative band — carrier-published guidance";
    case "national-average-proxy":
      return "Indicative band — national-average proxy";
    default:
      return "Indicative band";
  }
}

function proxyDisclosure(args: {
  proxyType: string;
  state: InsuranceState;
}): string {
  switch (args.proxyType) {
    case "state-doi-filing":
      return `Sampled directly from a public ${args.state.doi.name} rate filing against the named profile below.`;
    case "carrier-published-guidance":
      return `This band reflects the carrier's own publicly-disclosed guidance, not a state-specific rate filing. We will replace it with a sourced ${args.state.doi.name} filing once extracted.`;
    case "national-average-proxy":
      return `This band reflects national-average industry data, not a ${args.state.name}-specific filing. We will replace it with a sourced ${args.state.doi.name} filing once extracted.`;
    default:
      return "Source pending.";
  }
}

function SourcedRate({
  product,
  state,
  dotClass,
  premiumLow,
  premiumHigh,
  sampledAt,
  proxyType,
  sourceLabel,
  sourceUrl,
}: {
  product: Product;
  state: InsuranceState;
  dotClass: DotClass;
  premiumLow: number;
  premiumHigh: number;
  sampledAt: string;
  proxyType: string;
  sourceLabel: string;
  sourceUrl: string | null;
}) {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">{proxyEyebrow(proxyType)}</span>
        <h2 className="ins-hero-title">
          {fmt.format(premiumLow)}–{fmt.format(premiumHigh)} per year
        </h2>
        <p className="ins-hero-sub">
          For {dotClass.name.toLowerCase()} operators in {state.name} buying{" "}
          {product.shortLabel.toLowerCase()}, against the named profile
          below. {proxyDisclosure({ proxyType, state })} Sampled {sampledAt}.
          Source:{" "}
          {sourceUrl ? (
            <a href={sourceUrl} rel="noopener" target="_blank">
              {sourceLabel}
            </a>
          ) : (
            <span>{sourceLabel}</span>
          )}
          .
        </p>
        <p className="ins-compliance-note">
          A premium band is not a quote. Your actual premium depends on your
          specific operation, MVR, claims history, equipment, and the
          underwriter&apos;s appetite at the moment of submission.
        </p>
      </div>
    </section>
  );
}

function RatePending({
  product,
  state,
  dotClass,
}: {
  product: Product;
  state: InsuranceState;
  dotClass: DotClass;
}) {
  return (
    <div className="ins-container">
      <p className="ins-rate-pending">
        <strong>Rate band pending.</strong> We have not yet extracted a public{" "}
        {state.doi.name} filing for {product.shortLabel.toLowerCase()} on{" "}
        {dotClass.name.toLowerCase()} operators in {state.name}. We will
        publish a sourced premium band here once the filing is reviewed.
      </p>
    </div>
  );
}

function SamplingProfileCallout({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof getProfileForObservation>>;
}) {
  return (
    <section>
      <div className="ins-container">
        <div className="ins-profile">
          <h4>Sampling profile</h4>
          <dl>
            <dt>Driver</dt>
            <dd>{profile.driver}</dd>
            <dt>Vehicle</dt>
            <dd>{profile.vehicle}</dd>
            <dt>Coverage</dt>
            <dd>{profile.coverage}</dd>
            <dt>Operations</dt>
            <dd>{profile.operations}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function ClassDescription({ dotClass }: { dotClass: DotClass }) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">DOT class context</span>
        <h2 className="ins-hero-title">{dotClass.name}</h2>
        <p className="ins-hero-sub">{dotClass.typicalOperation}</p>
        <p className="ins-compliance-note">
          <strong>Weight class:</strong> {dotClass.weightClass}.{" "}
          <strong>GVWR range:</strong> {dotClass.gvwrRange}.{" "}
          <strong>CDL required:</strong>{" "}
          {dotClass.cdlRequired ? "Yes" : "Often not (verify by GVWR)"}.{" "}
          <strong>Example vehicles:</strong>{" "}
          {dotClass.exampleVehicles.join(", ")}.
        </p>
      </div>
    </section>
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
        <span className="ins-eyebrow">Carriers</span>
        <h2 className="ins-hero-title">
          Carriers writing {product.shortLabel.toLowerCase()} in {state.name}
        </h2>
        <CarrierTable carriers={carriers} />
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
