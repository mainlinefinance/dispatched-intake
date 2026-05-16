import type { Metadata } from "next";
import Link from "next/link";
import EditorialByline from "@/components/landing/EditorialByline";
import { getAllProducts } from "@/lib/data/products";
import { getAllInsuranceStates } from "@/lib/data/states";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  insuranceAgency,
} from "@/components/seo/JsonLd";
import CoverdashEmbed from "@/components/insurance/CoverdashEmbed";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

export const metadata: Metadata = {
  title:
    "Commercial Trucking Insurance — Compare Quotes from 30+ Carriers | Dispatched",
  description:
    "Compare commercial trucking insurance — primary liability, motor truck cargo, physical damage, NTL, GL — across 30+ carriers in all 50 states. Quotes placed by our licensed producer partner.",
  alternates: { canonical: "/insurance" },
  openGraph: {
    title:
      "Commercial Trucking Insurance — Compare Quotes from 30+ Carriers | Dispatched",
    description:
      "Compare commercial trucking insurance — primary liability, motor truck cargo, physical damage, NTL, GL — across 30+ carriers in all 50 states. Quotes placed by our licensed producer partner.",
    url: "/insurance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Commercial Trucking Insurance — Compare Quotes from 30+ Carriers | Dispatched",
    description:
      "Compare commercial trucking insurance — primary liability, motor truck cargo, physical damage, NTL, GL — across 30+ carriers in all 50 states.",
  },
};

const QUOTE_ANCHOR = "quote";

const faqs = [
  {
    q: "Just got my MC authority — what trucking insurance do I need on day 1?",
    a: "Day-1 insurance for a new MC authority means three coverages bound before the truck moves a load: primary auto liability ($1M is the industry standard and the FMCSA-mandated minimum for most general freight), motor truck cargo (typically $100K for general freight; higher for specialty), and physical damage if the truck is financed (lender-required, written for stated equipment value). Non-trucking liability (bobtail) is required if the operator is leased on to a carrier. New-authority quotes carry a narrower carrier mix and higher premiums than seasoned operations, but Coverdash holds appointments with the specialty MGAs that write under-12-month authorities — submit DOT, equipment list, and lane footprint through the quote engine on this page and the producer returns side-by-side options within 1 to 3 business days.",
  },
  {
    q: "Does Dispatched sell trucking insurance directly?",
    a: "No. Dispatched is a matching platform. Insurance quotes are placed by our named producer partner — a licensed commercial insurance brokerage that holds the carrier appointments and binds the policies. The producer partner is disclosed at the quote step and is the entity bound to you on the policy. Dispatched is paid a referral fee on bound policies and does not collect premium.",
  },
  {
    q: "Who is the producer partner?",
    a: "Coverdash is the licensed producer partner for our trucking insurance funnel. Coverdash is licensed in all 50 states and is appointed with 40+ commercial carriers including Travelers, The Hartford, Nationwide, Chubb, and CNA, plus the trucking-specialty markets writing primary auto liability, motor truck cargo, and physical damage. The producer name and license appear on every quote and policy document.",
  },
  {
    q: "What types of trucking insurance can I compare here?",
    a: "The full commercial-trucking stack: primary auto liability, motor truck cargo, physical damage (comprehensive and collision), non-trucking liability (bobtail), trailer interchange, general liability, and workers compensation where applicable. Specialty endorsements like reefer breakdown, pollution liability, and umbrella layers are available through the producer on request.",
  },
  {
    q: "How do I get a commercial trucking insurance quote?",
    a: "Submit your DOT number, equipment list, lane footprint, and prior loss runs through the quote engine on this page. The producer pulls quotes from the carriers appointed for your equipment type and operating radius and returns side-by-side options, typically within 1 to 3 business days. You bind directly with the producer once you pick a quote.",
  },
  {
    q: "Which insurance carriers will my quote come from?",
    a: "The producer holds appointments with the major commercial trucking carriers — Progressive Commercial, Great West, Berkshire Hathaway GUARD, Canal, Sentry, Travelers, The Hartford, Nationwide, and the specialty MGAs that write higher-risk classes. The full carrier list, AM Best ratings, and the products each carrier writes are at /carriers. Carriers vary by state and DOT class.",
  },
  {
    q: "Can I get insurance with a new MC authority or accidents on file?",
    a: "Yes. The producer has carriers that specifically write new authorities (under 12 months) and operations with prior accidents or violations on the loss run. Premiums for these classes are higher than for seasoned, clean-loss operations and the carrier mix is narrower, but coverage is available.",
  },
  {
    q: "How much does commercial trucking insurance cost?",
    a: "For a typical owner-operator with active authority running general freight on 100k+ mile lane lengths, total insurance program (primary liability + cargo + physical damage) commonly runs $9,000 to $16,000 per year — but the variance is huge. Premiums move with DOT class, equipment value, lane radius, loss history, and the state's surplus-lines rules. Get a real quote on this page to see your number; we do not publish made-up rates.",
  },
  {
    q: "Does Dispatched help me file claims?",
    a: "No. Claims are handled directly between the operator and the carrier on the policy, with the producer facilitating where the policyholder requests it. Dispatched is not a party to the policy and does not adjust claims.",
  },
  {
    q: "Can I finance the premium?",
    a: "Yes. Premium financing is standard for commercial trucking policies. The producer offers premium-finance options through the major premium-finance companies (typically 25% down and 9 monthly payments). You can also pay annual or use a working-capital line to fund the premium directly — see /trucking-working-capital.",
  },
  {
    q: "How fast can I get a Certificate of Insurance?",
    a: "Once a policy is bound by the producer, COIs are available the same day, often within minutes of binding. The producer can also issue COIs to specific shippers, brokers, or terminal facilities on request.",
  },
];

/* Static product display table — keeps the editorial moat by listing the
   regulatory frame (FMCSA-required vs. lender-required vs. contract-required)
   instead of fabricating premium ranges. Real numbers come back from the
   producer's quote engine. */
type ProductRow = {
  slug: string;
  who: string;
  required: string;
  typicalLimit: string;
};

const PRODUCT_ROW_OVERRIDES: Record<string, Pick<ProductRow, "required" | "typicalLimit">> = {
  "primary-liability": {
    required: "FMCSA-mandated",
    typicalLimit: "$1M (industry standard)",
  },
  "motor-truck-cargo": {
    required: "Broker / shipper required",
    typicalLimit: "$100K (general freight)",
  },
  "physical-damage": {
    required: "Lender-required if financed",
    typicalLimit: "Stated equipment value",
  },
  "general-liability": {
    required: "Contract / facility required",
    typicalLimit: "$1M / $2M",
  },
  "non-trucking-liability": {
    required: "Lease-required if leased on",
    typicalLimit: "$1M",
  },
  "occupational-accident": {
    required: "Often lease-required",
    typicalLimit: "$1M / $1.5M",
  },
  "reefer-breakdown": {
    required: "Endorsement (cargo)",
    typicalLimit: "Per cargo limit",
  },
};

export default function InsurancePillarPage() {
  const products = getAllProducts();
  const states = getAllInsuranceStates();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="ins-page">
      <JsonLd payload={insuranceAgency()} />
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Commercial Trucking Insurance",
            url: "https://dispatched.finance/insurance",
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Commercial Trucking Insurance: Compare Quotes from 30+ Carriers",
          description:
            "Compare primary liability, motor truck cargo, physical damage, NTL, GL, occ-acc, and reefer breakdown across 30+ carriers in all 50 states.",
          url: "https://dispatched.finance/insurance",
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <main id="main-content">
        <Hero quoteAnchorId={QUOTE_ANCHOR} today={today} />

        <ThreeStepRibbon />

        <QuoteSection anchorId={QUOTE_ANCHOR} />

        <ProductTable products={products} />

        <CarrierStrip />

        <StateDirectory states={states} />

        <FaqSection items={faqs} />

        <Methodology />

        <ComplianceFooter />
      </main>
    </div>
  );
}

function Hero({
  quoteAnchorId,
  today,
}: {
  quoteAnchorId: string;
  today: string;
}) {
  return (
    <section className="ins-hero ins-hero--lg">
      <div className="ins-container">
        <span className="ins-eyebrow">Commercial trucking insurance</span>
        <h1 className="ins-hero-title">
          Compare commercial trucking insurance from 30+ carriers.
        </h1>
        <EditorialByline updated={today} />
        <p className="ins-hero-sub">
          Primary liability, cargo, physical damage, and the rest of the
          coverage stack — quoted by our licensed producer partner across the
          carriers writing your DOT class and your state. Quote in minutes,
          bind the same day.
        </p>
        <div className="ins-hero-ctas">
          <a href={`#${quoteAnchorId}`} className="btn btn--primary btn--lg">
            Get my quote
          </a>
          <a href={PHONE_TEL} className="btn btn--secondary btn--lg">
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <ul className="ins-hero-stats" aria-label="Trust indicators">
          <li>
            <strong>30+</strong>
            <span>Carriers compared</span>
          </li>
          <li>
            <strong>50</strong>
            <span>States licensed</span>
          </li>
          <li>
            <strong>1–3 days</strong>
            <span>Quotes returned</span>
          </li>
          <li>
            <strong>Same day</strong>
            <span>Bind &amp; COI</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ThreeStepRibbon() {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">How it works</span>
        <h2 className="ins-hero-title">Three steps to coverage.</h2>
        <ol className="ins-three-step">
          <li>
            <span className="ins-three-step-num">1</span>
            <h3>Tell us about your operation</h3>
            <p>
              DOT or MC number, equipment list, lane radius, and prior loss
              runs. Most quotes pull your authority and equipment automatically
              from FMCSA.
            </p>
          </li>
          <li>
            <span className="ins-three-step-num">2</span>
            <h3>Compare carrier offers</h3>
            <p>
              Our producer partner pulls quotes from the carriers appointed
              for your DOT class and state. You see side-by-side limits,
              deductibles, and premium — typically within 1–3 business days.
            </p>
          </li>
          <li>
            <span className="ins-three-step-num">3</span>
            <h3>Bind and get your COI</h3>
            <p>
              Pick the quote you want, e-sign with the producer, and the COI
              is issued the same day. Premium financing available — 25% down
              with 9 monthly payments is standard.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

function QuoteSection({ anchorId }: { anchorId: string }) {
  return (
    <section id={anchorId} className="ins-quote-section">
      <div className="ins-container">
        <span className="ins-eyebrow">Get a quote</span>
        <h2 className="ins-hero-title">Quote in minutes.</h2>
        <p className="ins-hero-sub">
          Quotes are placed by our licensed producer partner. They pull from
          the carrier panel writing your DOT class in your state and return
          real, bindable numbers. No fee to quote; no commitment.
        </p>
        <CoverdashEmbed anchorId={anchorId} />
        <p className="ins-compliance-note">
          By submitting through the quote engine you agree to the producer
          partner&rsquo;s consent and TCPA terms shown on the form. Dispatched
          is not the producer of record and does not bind coverage.
        </p>
      </div>
    </section>
  );
}

function ProductTable({
  products,
}: {
  products: ReturnType<typeof getAllProducts>;
}) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">Coverage products</span>
        <h2 className="ins-hero-title">
          The seven products operators actually shop for.
        </h2>
        <p className="ins-hero-sub">
          Each product links into a deeper hub explaining FMCSA rules, who
          buys it, and the carriers writing it state by state.
        </p>
        <div className="ins-table-wrap">
          <table className="ins-product-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Who needs it</th>
                <th scope="col">Required by</th>
                <th scope="col">Typical limit</th>
                <th scope="col" aria-label="Action" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const overrides = PRODUCT_ROW_OVERRIDES[p.slug];
                return (
                  <tr key={p.slug}>
                    <td data-label="Product" className="ins-pt-name">
                      <Link href={`/insurance/${p.slug}`}>{p.name}</Link>
                      <span className="ins-pt-sub">{p.shortLabel}</span>
                    </td>
                    <td data-label="Who needs it">{p.whoBuys}</td>
                    <td data-label="Required by">
                      {overrides?.required ?? "Optional"}
                    </td>
                    <td data-label="Typical limit">
                      {overrides?.typicalLimit ?? "—"}
                    </td>
                    <td
                      data-label="Action"
                      className="ins-pt-action"
                    >
                      <Link
                        href={`/insurance/${p.slug}`}
                        className="ins-pt-link"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CarrierStrip() {
  /* Names only, no logos — we ship logos when we have explicit licensing
     authorization for each mark. The producer partner's carrier list is the
     authoritative one and is reproduced in /carriers. */
  const carriers = [
    "Progressive Commercial",
    "Great West",
    "Berkshire Hathaway GUARD",
    "Sentry",
    "Travelers",
    "The Hartford",
    "Nationwide",
    "Chubb",
    "CNA",
    "Canal",
    "Northland",
    "Acuity",
  ];
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">Carrier panel</span>
        <h2 className="ins-hero-title">
          Quotes from the carriers writing trucking.
        </h2>
        <p className="ins-hero-sub">
          The producer partner is appointed with the major commercial-auto
          and trucking-specialty carriers. Carrier mix on your quote depends
          on DOT class, state, and loss history.
        </p>
        <ul className="ins-carrier-strip" aria-label="Carriers compared">
          {carriers.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="ins-carrier-foot">
          See AM Best ratings, parent groups, and product lines per carrier at{" "}
          <Link href="/carriers" className="ins-link">
            /carriers
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function StateDirectory({
  states,
}: {
  states: ReturnType<typeof getAllInsuranceStates>;
}) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">By state</span>
        <h2 className="ins-hero-title">Trucking insurance by state.</h2>
        <p className="ins-hero-sub">
          State pages cover the local DOI, surplus-lines rules, and the
          carriers actively writing your DOT class. We add new states as we
          extract their public rate filings — pages are not generated until
          the editorial body is complete.
        </p>
        <div className="ins-state-grid">
          {states.slice(0, 24).map((s) => (
            <Link
              key={s.slug}
              href={`/insurance/primary-liability/${s.slug}`}
              className="ins-state-tile"
            >
              <span>{s.name}</span>
              <span className="ins-state-tile-tag">{s.abbr}</span>
            </Link>
          ))}
        </div>
        <p className="ins-state-foot">
          <Link href="/insurance/primary-liability" className="ins-link">
            See all states →
          </Link>
        </p>
      </div>
    </section>
  );
}

function FaqSection({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return (
    <section id="faq">
      <div className="ins-container">
        <span className="ins-eyebrow">FAQ</span>
        <h2 className="ins-hero-title">
          Common questions about trucking insurance.
        </h2>
        <dl className="ins-faq">
          {items.map((qa) => (
            <div key={qa.q} className="ins-faq-item">
              <dt>{qa.q}</dt>
              <dd>{qa.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">How we compare</span>
        <h2 className="ins-hero-title">Methodology, not marketing.</h2>
        <p className="ins-hero-sub">
          Premium ranges on this site are sampled from public state DOI
          filings against named operator profiles. We do not invent rates and
          we do not paraphrase regulators. Where we have not yet extracted a
          filing for a given state-product-class combination, the page says
          so plainly. Every carrier listing on /carriers carries the date its
          AM Best rating was last verified.
        </p>
        <p className="ins-compliance-note">
          <Link href="/methodology" className="ins-link">
            Read the full rate methodology →
          </Link>
        </p>
      </div>
    </section>
  );
}

function ComplianceFooter() {
  return (
    <section>
      <div className="ins-container">
        <p className="ins-compliance-note">
          Dispatched is a comparison and matching platform operated by
          TCopyCats LLC dba Dispatched. Coverage is placed by our licensed
          producer partner and bound by carriers. Dispatched is not a carrier,
          is not the producer of record, and does not bind coverage. Quote
          submissions are routed to the producer partner under one-to-one
          consent disclosed at the quote step.
        </p>
      </div>
    </section>
  );
}
