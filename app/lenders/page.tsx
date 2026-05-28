import type { Metadata } from "next";
import Link from "next/link";
import OutboundLink from "@/components/OutboundLink";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  itemList,
} from "@/components/seo/JsonLd";
import {
  LENDER_TYPE_LABELS,
  STATE_INFO,
  getAllLenders,
  type LenderEntry,
  type LenderType,
} from "@/lib/data/lenders";

const ORIGIN = "https://dispatched.finance";
const ABS_URL = `${ORIGIN}/lenders`;
const CANONICAL = "/lenders";

const TITLE = "Trucking Lenders Directory 2026 | Dispatched";
const DESCRIPTION =
  "12 curated trucking lenders covering factoring, equipment financing, working capital, and asset-based lending. Filterable by state and use case. Updated May 2026.";

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

const FAQS = [
  {
    q: "How should I pick a trucking lender?",
    a: "Start with use case, not headline rate. An owner-operator with a single truck and 8,000+ gallons of annual fuel needs a different lender than a 25-truck fleet with concentrated broker exposure. Match your authority age, credit profile, broker mix, fuel volume, and capital need to the lender purpose-built for that profile. The contract terms — auto-renewal, cancellation window, UCC-1 release timing — matter more than the advertised rate.",
  },
  {
    q: "What types of trucking lenders are in this directory?",
    a: "Five categories: invoice factoring (cash on broker-paid invoices), equipment financing (truck and trailer loans), working capital (term loans and revolving lines), asset-based lending (revolving lines collateralized by receivables and equipment), and insurance premium financing (monthly-pay structures for annual insurance premiums). Most operators end up with at least two — a factor plus an equipment lender — and the largest fleets layer ABL on top.",
  },
  {
    q: "Why are some lenders listed even though they aren't trucking-specialized?",
    a: "Two reasons. First, generalist SMB lenders (Bluevine, Lendio) sometimes price better than trucking-native lenders for operators with strong personal credit and clean bank statements. Second, marketplaces like Lendio shop a single application across 75+ partner lenders, which is useful for first-pass discovery even if the underwriting that follows is generic. We name the trade-off in every entry so you can decide whether the generalist economics work for your file.",
  },
  {
    q: "Do all 12 lenders serve every state?",
    a: "Yes. All 12 lenders in this directory are nationwide — they serve all 50 states plus DC. State-by-state pages exist because state-specific compliance (IRP base state, IFTA filing, UCR, state DOT and operating authority) changes the practical answer to 'which lender fits my operation'. The lender list is the same; the operational context is local.",
  },
  {
    q: "How often is the directory updated?",
    a: "We refresh editorial copy quarterly and re-validate the lender list every six months. Rates, contract terms, and fuel-program economics move faster than we can publish them, so treat the directory as a structural guide — not a live rate sheet. Always confirm current pricing and contract terms with the lender directly before signing.",
  },
];

function lenderCard(l: LenderEntry) {
  const types = l.types.map((t) => LENDER_TYPE_LABELS[t as LenderType]).join(" · ");
  return (
    <article key={l.slug} className="research-cta-card">
      <h3>{l.name}</h3>
      <p>
        <strong>Best for:</strong> {l.bestFor}
        {l.founded ? ` · Founded ${l.founded}` : ""}
        {l.hqState ? ` · HQ ${l.hqState}` : ""}
      </p>
      <p>{l.blurb}</p>
      <p>
        <strong>Products:</strong> {types}
      </p>
      <p>
        <OutboundLink
          href={l.url}
          partner={l.name}
          eventProps={{ lenderSlug: l.slug, lenderTypes: l.types.join(",") }}
        >
          {l.name} website →
        </OutboundLink>
      </p>
    </article>
  );
}

/* Group lenders by `bestFor` use case bucket. Multiple lenders sharing the
   same `bestFor` would collapse together; in the current 12-lender set each
   bestFor is unique. */
function groupByUseCase(
  lenders: ReadonlyArray<LenderEntry>,
): ReadonlyArray<{ label: string; lenders: ReadonlyArray<LenderEntry> }> {
  const buckets = new Map<string, LenderEntry[]>();
  for (const l of lenders) {
    const k = l.bestFor;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(l);
  }
  return Array.from(buckets.entries()).map(([label, ls]) => ({
    label,
    lenders: ls,
  }));
}

export default function LendersIndexPage() {
  const today = new Date().toISOString().slice(0, 10);
  const lenders = getAllLenders();
  const useCases = groupByUseCase(lenders);

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Lenders", url: ABS_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Trucking Lenders Directory 2026",
          description: DESCRIPTION,
          url: ABS_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: "Trucking Lenders Directory 2026",
          description:
            "Curated trucking lenders covering factoring, equipment, working capital, ABL, and insurance premium financing.",
          items: lenders.map((l) => ({
            name: l.name,
            url: l.url,
            description: l.bestFor,
          })),
        })}
      />
      <JsonLd payload={faqPage(FAQS)} />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched · Lenders directory</p>
            <h1 className="research-h1">Trucking lenders directory.</h1>
            <p className="research-subhead">
              12 curated trucking lenders covering factoring, equipment
              financing, working capital, and asset-based lending. Filterable
              by state and use case. Updated May 2026.
            </p>
            <p className="research-meta">
              {lenders.length} lenders · {STATE_INFO.length} state pages ·
              Updated {today}
            </p>
          </header>

          <section className="research-section" id="by-use-case">
            <h2>By use case</h2>
            <p>
              Lender fit follows operator profile. Pick the use case that
              matches your operation — single-truck owner-operator vs.
              mid-fleet, new authority vs. seasoned, clean credit vs.
              recovering. The rate gap between lenders inside the wrong use
              case is much larger than the rate gap between lenders inside
              the right one.
            </p>
            <ul className="research-list">
              {useCases.map((g) => (
                <li key={g.label}>
                  <strong>{g.label[0].toUpperCase() + g.label.slice(1)}:</strong>{" "}
                  {g.lenders.map((l) => l.name).join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <section className="research-section" id="lenders">
            <h2>The full lender list</h2>
            <p>
              Each card names the lender&apos;s strength and the trade-off
              you accept by choosing them. Links open the lender&apos;s own
              site in a new tab; we do not get paid for these placements.
            </p>
            <div className="research-cta-grid">
              {lenders.map((l) => lenderCard(l))}
            </div>
          </section>

          <section className="research-section" id="states">
            <h2>By state</h2>
            <p>
              Every lender in this directory serves all 50 states plus DC.
              The state pages aggregate the same 12 lenders with
              state-specific operational context — IRP base state, IFTA
              filing, UCR, state DOT, and state-specific commercial-financing
              disclosure rules where they exist (notably California SB
              1235).
            </p>
            <ul className="research-list">
              {STATE_INFO.map((s) => (
                <li key={s.code}>
                  <Link href={`/lenders/${s.slug}`}>
                    <strong>{s.name}</strong>
                  </Link>{" "}
                  — trucking lenders in {s.name}
                </li>
              ))}
            </ul>
          </section>

          <section className="research-section" id="faq">
            <h2>FAQ — choosing a trucking lender</h2>
            {FAQS.map((qa) => (
              <div key={qa.q}>
                <h3>{qa.q}</h3>
                <p>{qa.a}</p>
              </div>
            ))}
          </section>

          <section className="research-section research-cta">
            <h2>Skip the research — get matched.</h2>
            <p>
              The directory is the upper-funnel layer. If you are ready to
              move on financing or factoring, start the matching flow — soft
              pull, no credit impact to begin. We route you to the lender
              panel matching your authority age, credit profile, and capital
              need.
            </p>
            <div className="research-cta-grid">
              <Link href="/qualify" className="research-cta-card">
                <h3>Qualify in 3 minutes</h3>
                <p>
                  Soft pull, no credit impact. Routed to the lender panel
                  matching your authority age, credit profile, and capital
                  need.
                </p>
              </Link>
              <Link
                href="/research/best-trucking-factoring-2026"
                className="research-cta-card"
              >
                <h3>Best trucking factoring 2026</h3>
                <p>
                  Honest ranking of 12 freight factors by use case —
                  owner-operators, fleets, new authority, bad credit,
                  non-recourse, and tech integration.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
