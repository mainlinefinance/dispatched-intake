import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getProduct } from "@/lib/data/products";
import { getAllDotClasses, getDotClass } from "@/lib/data/dotClasses";
import {
  getAllInsuranceStates,
  getInsuranceState,
} from "@/lib/data/states";
import {
  estimatePremiumBand,
  getEstimatorChoices,
  type EstimatorInput,
  type ClaimsHistoryKey,
  type CoverageLimitKey,
  type RadiusKey,
} from "@/lib/insuranceEstimator";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Commercial Trucking Insurance Premium Estimator — Dispatched",
  description:
    "Indicative annual premium band for commercial trucking primary liability — anchored to a real sampled rate observation, then adjusted for claims history, coverage limits, and operating radius. Each modifier is shown.",
  alternates: { canonical: "/insurance/tools/premium-estimator" },
};

type SP = {
  state?: string;
  product?: string;
  dotClass?: string;
  claims?: string;
  coverage?: string;
  radius?: string;
};

const fmtUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const CLAIMS_LABELS: Record<ClaimsHistoryKey, string> = {
  "clean-36mo": "Clean MVR (36 months)",
  "1-claim": "One chargeable claim",
  "2-plus-claims": "Two or more claims",
  "not-sure": "Not sure",
};

const COVERAGE_LABELS: Record<CoverageLimitKey, string> = {
  "fmcsa-minimum": "FMCSA minimum ($750K)",
  "1m-standard": "$1M (industry standard)",
  "2m-elevated": "$2M (elevated)",
  "5m-hazmat": "$5M (hazmat class)",
};

const RADIUS_LABELS: Record<RadiusKey, string> = {
  "local-100": "Local — within 100 mi",
  "regional-500": "Regional — within 500 mi",
  "long-haul-1000+": "Long-haul — 1,000+ mi",
};

function isClaimsKey(v: string): v is ClaimsHistoryKey {
  return v in CLAIMS_LABELS;
}
function isCoverageKey(v: string): v is CoverageLimitKey {
  return v in COVERAGE_LABELS;
}
function isRadiusKey(v: string): v is RadiusKey {
  return v in RADIUS_LABELS;
}

export default async function PremiumEstimatorPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  const products = getAllProducts();
  const states = getAllInsuranceStates();
  const dotClasses = getAllDotClasses();
  const choices = getEstimatorChoices();

  const stateSlug = sp.state ?? "";
  const productSlug = sp.product ?? "";
  const dotClassSlug = sp.dotClass ?? "";
  const claimsKey = sp.claims ?? "";
  const coverageKey = sp.coverage ?? "";
  const radiusKey = sp.radius ?? "";

  const submitted =
    !!stateSlug && !!productSlug && !!dotClassSlug && !!claimsKey && !!coverageKey && !!radiusKey;

  const product = productSlug ? getProduct(productSlug) : null;
  const state = stateSlug ? getInsuranceState(stateSlug) : null;
  const dotClass = dotClassSlug ? getDotClass(dotClassSlug) : null;

  let result: ReturnType<typeof estimatePremiumBand> | null = null;
  if (
    submitted &&
    product &&
    state &&
    dotClass &&
    isClaimsKey(claimsKey) &&
    isCoverageKey(coverageKey) &&
    isRadiusKey(radiusKey)
  ) {
    const input: EstimatorInput = {
      stateSlug,
      productSlug: product.slug,
      dotClassSlug: dotClass.slug,
      claimsHistory: claimsKey,
      coverageLimitBand: coverageKey,
      radiusBand: radiusKey,
    };
    result = estimatePremiumBand(input);
  }

  const today = new Date().toISOString().slice(0, 10);
  const url = "https://dispatched.finance/insurance/tools/premium-estimator";

  return (
    <div className="estimator-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Insurance", url: "https://dispatched.finance/insurance" },
          { name: "Premium Estimator", url },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Commercial Trucking Insurance Premium Estimator",
          description:
            "Indicative annual premium band, anchored to a sampled rate observation and adjusted for claims history, coverage limits, and operating radius.",
          url,
          datePublished: today,
          dateModified: today,
        })}
      />

      <main id="main-content">
        <div className="container">
          <section className="estimator-hero">
            <span className="estimator-eyebrow">Tool · Indicative</span>
            <h1 className="estimator-h1">
              Commercial trucking insurance premium estimator.
            </h1>
            <p className="estimator-lead">
              An indicative annual band for primary liability, anchored to a
              real sampled rate observation. Pick your operation profile;
              every modifier is shown so you can audit how the band was
              assembled. Not a quote.
            </p>
          </section>

          <section className="estimator-grid">
            <form className="estimator-form" method="get" aria-label="Premium estimator inputs">
              <div className="estimator-field-row">
                <label className="estimator-field" htmlFor="state">
                  <span className="estimator-field-label">State</span>
                  <select id="state" name="state" required defaultValue={stateSlug}>
                    <option value="" disabled>Select state</option>
                    {states.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </label>
                <label className="estimator-field" htmlFor="product">
                  <span className="estimator-field-label">Product</span>
                  <select id="product" name="product" required defaultValue={productSlug}>
                    <option value="" disabled>Select product</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>{p.name}</option>
                    ))}
                  </select>
                </label>
                <label className="estimator-field" htmlFor="dotClass">
                  <span className="estimator-field-label">DOT class</span>
                  <select id="dotClass" name="dotClass" required defaultValue={dotClassSlug}>
                    <option value="" disabled>Select DOT class</option>
                    {dotClasses.map((dc) => (
                      <option key={dc.slug} value={dc.slug}>{dc.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="estimator-field-row">
                <label className="estimator-field" htmlFor="claims">
                  <span className="estimator-field-label">Claims history</span>
                  <select id="claims" name="claims" required defaultValue={claimsKey}>
                    <option value="" disabled>Select claims history</option>
                    {choices.claims.map((c) => (
                      <option key={c.key} value={c.key}>{CLAIMS_LABELS[c.key]}</option>
                    ))}
                  </select>
                </label>
                <label className="estimator-field" htmlFor="coverage">
                  <span className="estimator-field-label">Coverage limits</span>
                  <select id="coverage" name="coverage" required defaultValue={coverageKey}>
                    <option value="" disabled>Select coverage</option>
                    {choices.coverage.map((c) => (
                      <option key={c.key} value={c.key}>{COVERAGE_LABELS[c.key]}</option>
                    ))}
                  </select>
                </label>
                <label className="estimator-field" htmlFor="radius">
                  <span className="estimator-field-label">Radius</span>
                  <select id="radius" name="radius" required defaultValue={radiusKey}>
                    <option value="" disabled>Select radius</option>
                    {choices.radius.map((r) => (
                      <option key={r.key} value={r.key}>{RADIUS_LABELS[r.key]}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="btn btn--primary estimator-submit">
                Estimate band
              </button>
            </form>

            <aside className="estimator-result" aria-live="polite" aria-atomic="true">
              {!submitted ? (
                <EstimatorEmpty />
              ) : result?.ok ? (
                <EstimatorOk
                  result={result}
                  state={state!}
                  product={product!}
                  dotClass={dotClass!}
                  claimsKey={claimsKey as ClaimsHistoryKey}
                  coverageKey={coverageKey as CoverageLimitKey}
                  radiusKey={radiusKey as RadiusKey}
                />
              ) : (
                <EstimatorMiss reason={result?.reason ?? "no-observation"} state={state} />
              )}
            </aside>
          </section>

          <section className="estimator-foot">
            <p className="estimator-compliance">
              Estimates are indicative. Your actual premium depends on MVR,
              equipment, operations specifics, and underwriter appetite at
              the moment of submission. Bind a quote with a licensed
              producer; Dispatched does not bind coverage.
            </p>
            <p className="estimator-foot-links">
              <Link href="/methodology">Read our methodology</Link>
              <span aria-hidden="true"> · </span>
              <Link href="/insurance">Browse all insurance products</Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

function EstimatorEmpty() {
  return (
    <div className="estimator-empty">
      <p className="estimator-eyebrow">Result</p>
      <h2 className="estimator-empty-h2">Pick your operation to see a band.</h2>
      <p className="estimator-lead">
        We start from a sampled rate observation for your state × product ×
        DOT class, then apply transparent multipliers for claims history,
        coverage limits, and radius.
      </p>
    </div>
  );
}

function EstimatorOk({
  result,
  state,
  product,
  dotClass,
  claimsKey,
  coverageKey,
  radiusKey,
}: {
  result: Extract<ReturnType<typeof estimatePremiumBand>, { ok: true }>;
  state: NonNullable<ReturnType<typeof getInsuranceState>>;
  product: NonNullable<ReturnType<typeof getProduct>>;
  dotClass: NonNullable<ReturnType<typeof getDotClass>>;
  claimsKey: ClaimsHistoryKey;
  coverageKey: CoverageLimitKey;
  radiusKey: RadiusKey;
}) {
  const baseLow = result.baseObservation.premiumLowAnnual;
  const baseHigh = result.baseObservation.premiumHighAnnual;
  return (
    <div className="estimator-ok">
      <p className="estimator-eyebrow">Indicative band</p>
      <h2 className="estimator-band">
        {fmtUsd.format(result.premiumLowAnnual)}
        <span className="estimator-band-sep">to</span>
        {fmtUsd.format(result.premiumHighAnnual)}
        <span className="estimator-band-unit">/year</span>
      </h2>
      <p className="estimator-lead">
        For {dotClass.name.toLowerCase()} operators in {state.name} buying{" "}
        {product.shortLabel.toLowerCase()}, with the inputs you selected.
      </p>

      <div className="estimator-breakdown">
        <h3 className="estimator-breakdown-h3">How we got there</h3>
        <ol className="estimator-breakdown-list">
          <li>
            <span className="estimator-bd-key">Base observation</span>
            <span className="estimator-bd-val">
              {fmtUsd.format(baseLow)}–{fmtUsd.format(baseHigh)}
            </span>
            <span className="estimator-bd-reason">
              Sampled {result.baseObservation.sampledAt}.{" "}
              {result.baseObservation.proxyType.replace(/-/g, " ")}.
            </span>
          </li>
          {result.modifiers.map((m, i) => (
            <li key={i}>
              <span className="estimator-bd-key">{m.name}</span>
              <span className="estimator-bd-val">
                ×{m.factor.toFixed(2)}
              </span>
              <span className="estimator-bd-reason">{m.reason}</span>
            </li>
          ))}
          <li className="estimator-bd-total">
            <span className="estimator-bd-key">Combined factor</span>
            <span className="estimator-bd-val">
              ×{result.combinedFactor.toFixed(2)}
            </span>
            <span className="estimator-bd-reason">
              Applied to base low and high.
            </span>
          </li>
        </ol>
      </div>

      <p className="estimator-cta-row">
        <Link
          href={`/insurance/${product.slug}/${state.slug}/${dotClass.slug}`}
          className="btn btn--primary"
        >
          Get a real quote
        </Link>
        <Link
          href={`/insurance/tools/premium-estimator?state=${encodeURIComponent(state.slug)}&product=${encodeURIComponent(product.slug)}&dotClass=${encodeURIComponent(dotClass.slug)}&claims=${encodeURIComponent(claimsKey)}&coverage=${encodeURIComponent(coverageKey)}&radius=${encodeURIComponent(radiusKey)}`}
          className="estimator-permalink"
        >
          Permalink to this estimate
        </Link>
      </p>

      <p className="estimator-meta">
        Source: {result.baseObservation.source?.url ? (
          <a href={result.baseObservation.source.url} target="_blank" rel="noopener">
            {result.baseObservation.source.label}
          </a>
        ) : (
          <span>{result.baseObservation.source?.label ?? "pending"}</span>
        )}
      </p>
    </div>
  );
}

function EstimatorMiss({
  reason,
  state,
}: {
  reason: "no-observation" | "invalid-state";
  state: ReturnType<typeof getInsuranceState> | null;
}) {
  return (
    <div className="estimator-miss">
      <p className="estimator-eyebrow">No band yet</p>
      <h2 className="estimator-miss-h2">
        {reason === "invalid-state"
          ? "That state isn't in our coverage map yet."
          : "We haven't sampled this combination yet."}
      </h2>
      <p className="estimator-lead">
        {reason === "invalid-state"
          ? "We currently publish state coverage for Texas, California, Florida, Illinois, and Georgia. More states roll out as DOI filings are extracted and reviewed."
          : `We have not yet sampled a rate observation for ${state ? `the selected combination in ${state.name}` : "this combination"}. The estimator is anchored to real data only — it will not fabricate a band. Try the published combination (Texas × Class 8 Tractor × Primary Liability) to see a worked example.`}
      </p>
      <p className="estimator-cta-row">
        <Link href="/methodology" className="btn btn--secondary">
          How we sample rates
        </Link>
      </p>
    </div>
  );
}
