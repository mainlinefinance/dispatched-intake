import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Commercial trucking insurance — compare",
  description:
    "Compare commercial trucking insurance — primary liability, cargo, physical damage, and the full stack — across carriers and states. Get matched fast.",
  alternates: { canonical: "/insurance" },
  openGraph: {
    title: "Commercial trucking insurance — compare",
    description:
      "Compare commercial trucking insurance — primary liability, cargo, physical damage, and the full stack — across carriers and states. Get matched fast.",
    url: "/insurance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial trucking insurance — compare",
    description:
      "Compare commercial trucking insurance — primary liability, cargo, physical damage, and the full stack — across carriers and states. Get matched fast.",
  },
};

const insuranceFaqs = [
  {
    q: "Does Dispatched sell trucking insurance directly?",
    a: "No. Dispatched is a matching platform. Insurance quotes are routed to a named producer partner — a licensed commercial trucking insurance brokerage that holds the appointments and writes the policies. The producer partner is disclosed on the quote step and is the entity bound to you on the policy. Dispatched is paid a referral fee on bound policies.",
  },
  {
    q: "What types of trucking insurance can I compare on Dispatched?",
    a: "The full commercial-trucking stack: primary auto liability, motor truck cargo, physical damage (comprehensive and collision), non-trucking liability (bobtail), trailer interchange, general liability, and workers compensation where applicable. Specialty coverages like reefer breakdown, pollution liability, and umbrella layers are available through the producer partner on request.",
  },
  {
    q: "How do I get a commercial trucking insurance quote?",
    a: "Submit your DOT number, equipment list, lane footprint, and prior loss runs through the insurance intake form. The producer partner pulls quotes from the carriers appointed for your equipment type and operating radius, then returns a side-by-side comparison usually within 1 to 3 business days. You bind directly with the producer partner once you pick a quote.",
  },
  {
    q: "Which insurance carriers does Dispatched compare?",
    a: "The producer partner holds appointments with the major commercial trucking carriers — Progressive, Great West, Berkshire Hathaway GUARD, Canal, Sentry, and the specialty MGAs that write higher-risk classes. The full carrier list, AM Best ratings, and the products each carrier writes are at /carriers.",
  },
  {
    q: "Can I get insurance with a new MC authority or accidents on file?",
    a: "Yes. The producer partner has carriers that specifically write new authorities (under 12 months) and operations with prior accidents or violations on the loss run. Premiums for these classes are higher than for seasoned, clean-loss operations, and the carrier mix is narrower, but coverage is available.",
  },
  {
    q: "Does Dispatched help me file claims?",
    a: "No. Claims are handled directly between the operator and the carrier on the policy, with the producer partner facilitating where the policyholder requests it. Dispatched is not a party to the policy and does not adjust claims.",
  },
  {
    q: "How is insurance funded — can I finance the premium?",
    a: "Yes, premium financing is standard for commercial trucking policies. The producer partner offers premium-finance options through the major premium-finance companies (typically 25% down and 9 monthly payments). You can also pay annual or use the operation's working-capital line to fund the premium directly.",
  },
];

export default function InsurancePillarPage() {
  const products = getAllProducts();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="ins-page">
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
            "Commercial Trucking Insurance: Products, Carriers, and Coverage",
          description:
            "Pillar overview of commercial trucking insurance products — primary liability, cargo, physical damage, GL, NTL, occupational accident, and reefer breakdown.",
          url: "https://dispatched.finance/insurance",
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(insuranceFaqs)} />

      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Insurance · pillar</span>
            <h1 className="ins-hero-title">
              Commercial trucking insurance, by product and by state.
            </h1>
            <p className="ins-hero-sub">
              Seven coverage types operators actually shop for, mapped to the
              carriers writing them and the regulatory rules that vary
              state-to-state. Compare what you need before you call a broker.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Coverage products</span>
            <h2 className="ins-hero-title">All seven products</h2>
            <div className="ins-product-grid">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insurance/${p.slug}`}
                  className="ins-product-card"
                >
                  <h3>{p.name}</h3>
                  <p>{p.oneLine}</p>
                  <span className="ins-product-card-footer">
                    {p.fmcsaMinimum
                      ? `FMCSA minimum: ${p.fmcsaMinimum}`
                      : "Optional / contractually required"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How we compare</span>
            <h2 className="ins-hero-title">Methodology, not marketing.</h2>
            <p className="ins-hero-sub">
              Premium ranges on this site are sampled from public state DOI
              filings against named operator profiles. We do not invent rates
              and we do not paraphrase regulators. Where we have not yet
              extracted a filing for a given state-product-class combination,
              the page says so plainly.
            </p>
            <p className="ins-compliance-note">
              Dispatched is a comparison and matching platform. Coverage is
              placed by licensed producers and bound by carriers. We are not a
              carrier and we do not bind coverage.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
