import type { Metadata } from "next";
import Link from "next/link";
import { SAMPLING_PROFILES } from "@/lib/data/profiles";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Methodology — Dispatched",
  description:
    "How Dispatched sources, samples, and publishes commercial trucking insurance rate context. State DOI public filings, named operator profiles, no paid feeds.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="ins-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Methodology", url: "https://dispatched.finance/methodology" },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Dispatched Insurance Rate Methodology",
          description:
            "Sourcing, sampling profiles, refresh cadence, and publication discipline for commercial trucking insurance rate context on Dispatched.",
          url: "https://dispatched.finance/methodology",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Methodology</span>
            <h1 className="ins-hero-title">
              How we source and publish commercial trucking insurance rates.
            </h1>
            <p className="ins-hero-sub">
              Every premium band on this site is anchored to a named operator
              profile and a public state Department of Insurance filing. We do
              not invent rates, we do not paraphrase regulators, and we do not
              ship a programmatic page until the editorial body and reviewer
              attestation are in place.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Sourcing</span>
            <h2 className="ins-hero-title">
              Where the rate observations come from
            </h2>
            <p className="ins-hero-sub">
              Phase 1 ships with three source classes. Each is labelled
              distinctly on every page that uses it; the eyebrow on the rate
              band and the disclosure paragraph beneath it tell you which one
              you are reading.
            </p>
            <ul className="ins-sources-typed">
              <li>
                <strong>State DOI filing.</strong> Sampled directly from a
                public Department of Insurance rate filing for the named
                state. The strongest source class. The eyebrow reads
                &ldquo;Sampled premium band — state DOI filing&rdquo;.
              </li>
              <li>
                <strong>Carrier-published guidance.</strong> Sourced from a
                carrier&apos;s own publicly-disclosed rate ranges
                (commercial-marketing pages, owner-operator FAQs). Used as a
                transitional proxy when we have not yet extracted a
                state-specific filing. The eyebrow reads &ldquo;Indicative
                band — carrier-published guidance&rdquo;.
              </li>
              <li>
                <strong>National-average proxy.</strong> Sourced from
                industry surveys (e.g., ATRI operating-cost reports). Used
                when no state or carrier source is available. The eyebrow
                reads &ldquo;Indicative band — national-average proxy&rdquo;.
              </li>
            </ul>
            <p className="ins-compliance-note">
              We are not licensing a paid wholesale broker rate feed in Phase
              1. That decision keeps every number on the site auditable
              against a regulator-published or carrier-published source and
              avoids the temptation to paper over coverage gaps with
              vendor-proprietary numbers we cannot show. Proxy bands
              (carrier-published, national-average) carry an explicit note
              that a state-specific filing is pending and will replace the
              proxy when extracted.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Sampling profiles</span>
            <h2 className="ins-hero-title">
              The operator scenarios our premiums are anchored to
            </h2>
            <p className="ins-hero-sub">
              A premium band is meaningless without the operator profile it
              was sampled against. Below are the named profiles. Every
              premium band on the site references one of them by id, and the
              profile is reproduced verbatim on the page that uses it.
            </p>
            {Object.values(SAMPLING_PROFILES).map((p) => (
              <article key={p.id} className="ins-profile">
                <h4>{p.label}</h4>
                <dl>
                  <dt>Driver</dt>
                  <dd>{p.driver}</dd>
                  <dt>Vehicle</dt>
                  <dd>{p.vehicle}</dd>
                  <dt>Coverage</dt>
                  <dd>{p.coverage}</dd>
                  <dt>Operations</dt>
                  <dd>{p.operations}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Refresh cadence</span>
            <h2 className="ins-hero-title">
              When numbers on the site update
            </h2>
            <p className="ins-hero-sub">
              Each rate observation carries a <code>sampledAt</code> date.
              When the underlying DOI filing changes, the observation is
              re-sampled and the date advances. Pages display the sampling
              date in the byline, and any page whose latest observation is
              older than 12 months is flagged for re-sampling before any
              monetization decisions are made on it.
            </p>
            <p className="ins-compliance-note">
              FMCSA rule and federal-minimum-limit changes are tracked
              separately. Any change to 49 CFR Part 387 minimums is reflected
              in the product hub on or before the rule&apos;s effective date.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Publication discipline</span>
            <h2 className="ins-hero-title">
              When a programmatic page is allowed to ship
            </h2>
            <p className="ins-hero-sub">
              A state-by-DOT-class money page is only generated when its
              entry exists in our internal money-page index. The index is
              not auto-populated by the data layer; an entry is added by a
              human after the editorial body is written, the data is sourced,
              and an expert reviewer has signed off on the page. Until that
              entry is added, the URL returns a 404 — not a thin or
              placeholder page.
            </p>
            <p className="ins-compliance-note">
              When a product&times;state&times;DOT-class combination has not
              yet been sampled, the corresponding money page renders an
              explicit &ldquo;rate band pending&rdquo; notice rather than a
              fabricated number. Carrier listings on those pages are sourced
              from the carriers&apos; own appointment and license footprints,
              and they are unaffected by a pending rate band.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Carrier ratings</span>
            <h2 className="ins-hero-title">
              How we display AM Best ratings
            </h2>
            <p className="ins-hero-sub">
              An AM Best rating is shown on a carrier row only when a
              specific human has verified it on{" "}
              <a href="https://web.ambest.com/" rel="noopener" target="_blank">
                ambest.com
              </a>{" "}
              and stamped the verification date in the data layer. Where the
              row reads &ldquo;Pending verification&rdquo;, we have not
              completed that step — it is not a statement that the
              carrier&apos;s rating is missing or weak. Carriers that AM Best
              has classified as Not Rated will be displayed as such once the
              data layer distinguishes &ldquo;not rated&rdquo; from &ldquo;not
              yet verified by us&rdquo;.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <p>
              <Link href="/insurance/tools/premium-estimator">
                → Try the premium estimator
              </Link>
            </p>
            <p>
              <Link href="/insurance">← Back to commercial trucking insurance</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
