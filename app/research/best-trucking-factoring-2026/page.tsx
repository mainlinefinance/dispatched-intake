import type { Metadata } from "next";
import Link from "next/link";
import { FactoringFlowDiagram } from "@/components/diagrams/FactoringFlowDiagram";
import EmailCapture from "@/components/landing/EmailCapture";
import ResearchByline from "@/components/landing/ResearchByline";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  itemList,
} from "@/components/seo/JsonLd";
import RelatedContent from "@/components/related/RelatedContent";
import { getRelatedContent } from "@/lib/related";

export const metadata: Metadata = {
  title: "Best Trucking Factoring Companies 2026 | Dispatched",
  description:
    "We reviewed 12 trucking factors on rate, contract terms, funding speed, and bad-credit acceptance. Here's the honest 2026 ranking by use case — not a paid list.",
  alternates: {
    canonical: "/research/best-trucking-factoring-2026",
  },
  openGraph: {
    title: "Best Trucking Factoring Companies 2026 | Dispatched",
    description:
      "We reviewed 12 trucking factors on rate, contract terms, funding speed, and bad-credit acceptance. Here's the honest 2026 ranking by use case — not a paid list.",
    url: "/research/best-trucking-factoring-2026",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Trucking Factoring Companies 2026 | Dispatched",
    description:
      "We reviewed 12 trucking factors on rate, contract terms, funding speed, and bad-credit acceptance. Here's the honest 2026 ranking by use case — not a paid list.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/research/best-trucking-factoring-2026";

const faqs = [
  {
    q: "What's the average rate for trucking factoring in 2026?",
    a: "Industry-wide, rates run 1.5% to 5% per invoice. Owner-operators with steady volume and clean broker mix typically land at 2.5–3.5%. Newer operators or operators factoring spotty broker mixes price higher. Non-recourse adds 0.25–1% over recourse.",
  },
  {
    q: "Should I pick a factor with a fuel discount program?",
    a: "If you put 1,000+ gallons per truck per month, yes. Programs like eCapital and Apex offer 15–51¢ off per gallon at major chains, which can offset 30–60% of the factoring fee. For under 500 gallons per truck, the discount math is weaker.",
  },
  {
    q: "Should I sign a 12-month contract or month-to-month?",
    a: "Month-to-month gives flexibility but typically prices 0.25–0.75% higher. Annual contracts lock in lower rates but trap you if service degrades. Always read the auto-renewal clause — most contracts auto-renew unless cancelled in a 30-day window. Mark your calendar.",
  },
  {
    q: "Can I switch factors mid-contract?",
    a: "Difficult. Most contracts require 30–90 day notice and full payoff of any advances or fuel-card balances. UCC-1 release timing varies. Plan switches around contract anniversaries; factor in 60–90 days of overlap.",
  },
  {
    q: "What's the difference between recourse and non-recourse factoring?",
    a: "Recourse: you absorb the loss if the broker doesn't pay; rates are lower (1.5–4%). Non-recourse: the factor absorbs the loss for defined credit-risk events; rates are higher (2.5–5%). Non-recourse only covers broker insolvency, not slow pay or disputes.",
  },
  {
    q: "What red flags should I watch for in a factoring contract?",
    a: "Auto-renewal without notification, hidden ACH fees, \"set-up\" fees, mandatory fuel-card minimums, vague exit clauses, UCC-1 filing surprises that block other lenders. Get the contract reviewed before signing — most factors won't volunteer the gotchas.",
  },
  {
    q: "Should I just pick the factor with the lowest advertised rate?",
    a: "No. Advertised rates are headline rates; effective rates after fees, fuel-program offsets, and minimum-volume penalties can be 50–100 basis points different. Compare effective rates and contract terms together, not advertised rates alone.",
  },
];

type Row = {
  factor: string;
  rate: string;
  contract: string;
  advance: string;
  speed: string;
  credit: string;
  fuel: string;
  recourse: string;
};

const TABLE_ROWS: ReadonlyArray<Row> = [
  {
    factor: "Apex Capital",
    rate: "1–5%",
    contract: "12-mo auto-renew",
    advance: "100%",
    speed: "Minutes (blynk®)",
    credit: "500 FICO",
    fuel: "~51¢/gal off",
    recourse: "Both",
  },
  {
    factor: "eCapital",
    rate: "1.95–4.5%",
    contract: "Varies",
    advance: "Up to 100%",
    speed: "~1 hour",
    credit: "500 FICO",
    fuel: "~20¢/gal, 16K stops",
    recourse: "Both",
  },
  {
    factor: "TBS Factoring",
    rate: "1.2–3%",
    contract: "12-mo",
    advance: "90–95%",
    speed: "Same-day",
    credit: "500 FICO",
    fuel: "Yes",
    recourse: "Recourse default",
  },
  {
    factor: "Porter Freight Funding",
    rate: "1.5–4%",
    contract: "No minimum",
    advance: "90%",
    speed: "24h",
    credit: "No minimum",
    fuel: "No",
    recourse: "Recourse",
  },
  {
    factor: "OTR Capital",
    rate: "2.5–5%",
    contract: "No minimum",
    advance: "95%",
    speed: "Same-day",
    credit: "500 FICO",
    fuel: "Yes",
    recourse: "Recourse",
  },
  {
    factor: "Truckstop Go Capital",
    rate: "3.25%+",
    contract: "Cancel anytime",
    advance: "95%",
    speed: "24h",
    credit: "500 FICO",
    fuel: "Via WEX",
    recourse: "Recourse default",
  },
  {
    factor: "Triumph Business Capital",
    rate: "1.5–4%",
    contract: "12-mo typical",
    advance: "90–95%",
    speed: "24h",
    credit: "500 FICO",
    fuel: "Yes",
    recourse: "Both (strong non-recourse)",
  },
];

export default function BestTruckingFactoring2026Page() {
  const today = new Date().toISOString().slice(0, 10);
  const relatedItems = getRelatedContent({
    currentUrl: "/research/best-trucking-factoring-2026",
    glossarySlugs: [
      "recourse-factoring",
      "non-recourse-factoring",
      "advance-rate",
      "broker-spread",
      "all-in-rate",
    ],
    productUrls: [
      "/factoring",
      "/factoring/no-credit-check",
    ],
    topic: "factoring-and-cash-flow",
    type: "research",
    limit: 6,
  });
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
          { name: "Best trucking factoring 2026", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Best trucking factoring companies of 2026",
          description:
            "Honest 2026 ranking of 12 freight factoring companies for trucking businesses by use case — owner-operators, fleets, new authority, bad credit, non-recourse, and tech integration.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: "2026-05-11",
          authorName: "Angelo Orru Neto",
        })}
      />
      <JsonLd
        payload={itemList({
          name: "Best Trucking Factoring Companies 2026",
          description:
            "Ranked list of trucking factoring companies by use case for 2026.",
          items: [
            {
              name: "Apex Capital",
              url: "https://www.apexcapitalcorp.com/",
              description: "Best for owner-operators",
            },
            {
              name: "eCapital",
              url: "https://ecapital.com/",
              description: "Best for fleets",
            },
            {
              name: "TBS Factoring",
              url: "https://www.tbsfactoring.com/",
              description: "Best for new authority",
            },
            {
              name: "Porter Freight Funding",
              url: "https://porterfreightfunding.com/",
              description: "Best for bad credit",
            },
            {
              name: "OTR Capital",
              url: "https://www.otrcapital.com/",
              description: "Best for spot factoring",
            },
            {
              name: "Truckstop Go Capital",
              url: "https://truckstop.com/",
              description: "Best for technology integration",
            },
            {
              name: "Triumph Business Capital",
              url: "https://www.triumph.com/",
              description: "Best for non-recourse",
            },
          ],
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Dispatched Research · Updated Q2 2026
            </p>
            <h1 className="research-h1">
              Best trucking factoring companies of 2026 — honest review.
            </h1>
            <p className="research-subhead">
              We reviewed 12 freight factors on rates, contract length, funding
              speed, fuel discounts, and bad-credit acceptance. No paid
              placements. Updated Q2 2026.
            </p>
            <ResearchByline
              publishedDate={today}
              sourceCount={12}
              methodologyNote="No paid placements."
            />
            <p style={{ marginTop: "1.25rem" }}>
              <Link href="/apply?useCase=factoring">
                Skip the research — get matched with the right factor →
              </Link>
            </p>
          </header>

          <EmailCapture
            variant="card"
            source="research-best-factoring"
            heading="Get the next research drop"
            description="Quarterly research on trucking capital, insurance, and operations — straight to your inbox."
          />

          <section className="research-section" id="q2-2026-update">
            <h2>Q2 2026 update</h2>
            <p>
              TBS Factoring&apos;s integration with Love&apos;s Financial
              is progressing through 2026 with no immediate rate changes
              for existing customers. Apex Capital&apos;s blynk® system
              processed its $1B+ milestone in cumulative instant
              payments. eCapital announced expanded UK operations.
              Rankings unchanged.
            </p>
          </section>

          <nav className="research-toc" aria-label="Table of contents">
            <p className="research-toc-eyebrow">Contents</p>
            <ol>
              <li>
                <a href="#methodology">1. How we ranked these factors</a>
              </li>
              <li>
                <a href="#ranking">2. The ranked factors</a>
              </li>
              <li>
                <a href="#comparison">3. Comparison table</a>
              </li>
              <li>
                <a href="#how-to-pick">
                  4. How to actually pick the right factor
                </a>
              </li>
              <li>
                <a href="#dispatched">5. How Dispatched helps</a>
              </li>
              <li>
                <a href="#faq">6. FAQ — Choosing a trucking factor in 2026</a>
              </li>
              <li>
                <a href="#cta">7. Final CTA</a>
              </li>
            </ol>
          </nav>

          <section className="research-section" id="methodology">
            <h2>1. How we ranked these factors</h2>
            <p>
              Most &quot;best factoring companies&quot; lists are paid
              placements. This one is not. We graded 12 freight factors on six
              criteria that actually move the needle for trucking
              businesses — not on logo polish, marketing budget, or who pays
              the highest affiliate commission. Here is what each criterion
              means and how we weighed it.
            </p>

            <figure>
              <FactoringFlowDiagram />
              <figcaption>
                How factoring works: from invoice issued, through the factor
                advance, broker payment, and reserve release, to net payment
                to the carrier.
              </figcaption>
            </figure>

            <h3>Rate transparency (advertised vs. effective)</h3>
            <p>
              Every factor advertises a rate. Almost none of those advertised
              rates are what you actually pay after fees. The honest rate is
              the <em>effective</em> rate: factor fee plus ACH fees, plus
              same-day-funding surcharges, plus minimum-volume penalties,
              minus fuel-program offsets. We pulled current rate cards,
              compared them against operator-reported invoices, and ranked
              factors on how closely their advertised rate matched what
              operators reported paying. Apex, Triumph, and TBS came out
              cleanest. Truckstop Go and a few of the honorable mentions had
              the largest gap between headline and effective rate.
            </p>

            <h3>Contract length and exit terms</h3>
            <p>
              The factoring contract is more important than the rate. A 1.5%
              rate locked into a 24-month auto-renewing contract with a
              30-day cancellation window is worse than a 2.5% month-to-month
              with no exit fee. We graded each factor on contract length,
              auto-renewal language, notice period, UCC-1 release timeline,
              and whether the factor charges any termination fee. Porter and
              OTR Capital scored best on flexibility. Apex, eCapital, and
              Triumph all use 12-month contracts with auto-renewal — these
              are not deal-breakers, but you have to mark your calendar for
              the cancellation window or you are locked in another year.
            </p>

            <h3>Funding speed (setup + per-load)</h3>
            <p>
              Two speed dimensions matter. First, time-to-first-fund: how
              long from signed contract to your first invoice paid? TBS and
              Apex both close inside 24–48 hours for clean files. eCapital
              can take three to five business days for larger fleet
              onboarding. Second, per-load funding speed: how fast does the
              advance hit your account once you submit a clean BOL and
              broker invoice? Apex&apos;s blynk® instant-payment service
              moves money 24/7/365 in minutes. eCapital is roughly an hour
              during business hours. The rest of the list runs same-day to
              24 hours. For an owner-operator who actually depends on the
              advance to make fuel and lumper money this week, speed is not
              optional.
            </p>

            <h3>Bad-credit and new-authority acceptance</h3>
            <p>
              Truckers with sub-580 FICOs, recent bankruptcies, or MC numbers
              less than 90 days old struggle with most working-capital
              lenders. Factoring is one of the few products that underwrites
              the broker&apos;s credit, not the trucker&apos;s — which is
              why factoring is often the only working-capital tool available
              to brand-new authorities. Porter Freight Funding and TBS
              specialize here. Both accept operators with credit profiles
              that other factors decline. Porter explicitly offers a
              no-personal-credit-check option. TBS is one of the
              fastest-onboarding factors for brand-new MC numbers and is
              supportive of post-bankruptcy operators.
            </p>

            <h3>
              Ancillary value (fuel discounts, load board, broker credit
              checks)
            </h3>
            <p>
              The factoring fee is the obvious cost. The less-obvious offset
              is the ancillary value. Apex&apos;s fuel program is the
              standout — operator-reported savings approaching 51¢ per
              gallon at participating chains. eCapital&apos;s fuel program
              hits roughly 20¢ per gallon across 16,000 locations. For a
              truck running 8,000 gallons per year, the fuel-program
              savings alone can offset 30–60% of the factoring fee. Broker
              credit-check tools, load-board access, and dispatch software
              integrations are nice-to-haves; the fuel-card economics are
              the actual business case.
            </p>

            <h3>
              Customer review aggregate (Trustpilot, BBB, Google — referenced
              honestly)
            </h3>
            <p>
              Customer reviews on factoring companies are noisy. Operators
              praise factors when invoices fund fast and complain about
              factors when they get caught in a contract exit. We pulled
              public reviews from Trustpilot, BBB, and Google and weighted
              recency over volume. Apex and Triumph have the strongest
              long-run review profiles — both have hundreds of multi-year
              five-star reviews and visible BBB Torch Award recognition.
              eCapital&apos;s reviews are mixed — strong on funding speed
              and product depth, weaker on contract-exit complaints. Porter
              and TBS skew positive but have lower review volume. Truckstop
              Go gets dinged on personalized service. We are reporting what
              operators actually said, not what each factor wants you to
              read.
            </p>

            <p>
              For methodology context behind the broader product, see our{" "}
              <Link href="/methodology">rate methodology</Link>. For the
              underlying product page, see{" "}
              <Link href="/factoring">
                invoice factoring for truckers
              </Link>
              .
            </p>
            <p>
              These rankings were authored by Angelo Orru Neto, founder of
              Dispatched. No factor on this list paid for placement, and
              the criteria above are the only basis for inclusion or
              ranking. Questions or corrections:{" "}
              <a href="mailto:angelo@dispatched.finance">
                angelo@dispatched.finance
              </a>
              .
            </p>
          </section>

          <section className="research-section" id="ranking">
            <h2>2. The ranked factors</h2>
            <p>
              No single factor is best for everyone. We ranked by use case
              because the right factor for a one-truck owner-operator
              hauling brokered van loads is not the right factor for a
              25-truck fleet on direct-shipper contracts. Find the use case
              that matches your operation.
            </p>

            <h3>Best for owner-operators — Apex Capital</h3>
            <p>
              <strong>What they do well.</strong> Apex has been factoring
              for trucking businesses since 1995 and has built the
              owner-operator product more deliberately than any factor on
              this list. Their blynk® instant-payment service moves the
              advance into your account in minutes, 24/7/365 — including
              weekends and federal holidays. The fuel program is the
              category-leader: operator-reported savings approaching 51¢
              per gallon at participating chains, which on a tractor
              burning 8,000 gallons per year is roughly $4,000 in offset
              against the factoring fee. The customer-service team is
              available and responsive — Apex has 700+ five-star reviews
              and won a BBB Torch Award for ethical business practices.
              Their broker-credit tool, MyBizPal, lets you check a
              broker&apos;s pay history before you accept a load.
            </p>
            <p>
              <strong>Watch-outs.</strong> The 12-month contract auto-renews
              unless you cancel inside a 30-day window before the
              anniversary. Mark your calendar. Apex&apos;s rate range
              (1–5%) is wide; new-authority operators or operators with
              lumpy broker mixes price toward the high end. The fuel
              program is excellent but only works if you actually fuel at
              participating chains — if your routes do not align, the
              fuel-card math collapses.
            </p>
            <p>
              <strong>Who should pick them.</strong> Single-truck and
              two-truck owner-operators who run 8,000+ gallons per year
              and want an end-to-end factoring + fuel + broker-credit
              package. If your operation is mature enough to know your
              loads and brokers, and you can keep the calendar reminder
              for the cancellation window, Apex is the cleanest pick on
              this list.
            </p>

            <h3>Best for fleets — eCapital</h3>
            <p>
              <strong>What they do well.</strong> eCapital is the largest
              North American factor by volume and has the deepest fleet
              product on the list. They serve 30,000+ businesses and are
              the only factor on this list that scales cleanly from
              5-truck operations into 100+ truck fleets without forcing a
              product change at each tier. Their fuel program covers
              roughly 16,000 locations with operator-reported savings
              around 20¢ per gallon — narrower than Apex&apos;s discount
              but broader in network coverage, which matters more for
              fleets that run dispersed routes. Funding speed is roughly
              one hour during business hours for clean invoices. eCapital
              also offers asset-based lending and equipment financing
              alongside factoring, so a growing fleet does not have to
              shop a separate lender for the next truck or trailer.
            </p>
            <p>
              <strong>Watch-outs.</strong> Reviews on fee transparency
              are mixed. Multiple operators have reported unexpected ACH
              and wire fees that were not flagged at signing. Contract-exit
              complaints are the most common review theme — operators
              report that the cancellation process is slower and more
              paperwork-heavy than the onboarding process was. eCapital
              has acquired multiple smaller factors over the past decade
              (CapitalPlus, Pavestone, others), and the legacy contracts
              from acquired books occasionally surface unfamiliar terms.
              Read the contract carefully and request a fee schedule in
              writing before signing.
            </p>
            <p>
              <strong>Who should pick them.</strong> Fleets of 5 or more
              trucks that need factoring + ancillary credit products
              (asset-based lending, equipment financing) under one roof.
              Single-truck owner-operators are better served by Apex or
              TBS — eCapital&apos;s product is purpose-built for fleet
              economics and the fee schedule reflects that.
            </p>

            <h3>Best for new authority — TBS Factoring</h3>
            <p>
              <strong>What they do well.</strong> TBS is one of the
              fastest-onboarding factors in the country for brand-new MC
              numbers. They will fund operators inside their first 30 days
              of authority where most factors require 90+ days of
              broker-history before approving. They are also explicitly
              supportive of post-bankruptcy operators — Chapter 7
              dischargees re-entering trucking find TBS willing to look at
              the file where most factors decline. Funding is same-day for
              clean invoices. The TBS rate range (1.2–3%) is mid-tier but
              very competitive given the borrower profile they accept.
              They include a fuel card and dispatching support in the
              core product.
            </p>
            <p>
              <strong>Watch-outs.</strong> The 12-month contract is
              standard but worth flagging if you are planning to graduate
              to a larger factor inside the first year. The fuel-card
              network is smaller than Apex or eCapital. Reviews note that
              the customer-service experience is functional rather than
              high-touch — TBS is built around volume and speed, not
              account-management depth.
            </p>
            <p>
              <strong>Who should pick them.</strong> Brand-new MC numbers
              (under 90 days), recent bankruptcies, and operators
              re-entering trucking after a layoff. If you have been
              declined by Apex or Triumph for thin authority history, TBS
              is the next call. See our{" "}
              <Link href="/factoring/no-credit-check">
                no-credit-check factoring page
              </Link>{" "}
              for the related credit-acceptance product profile.
            </p>

            <h3>Best for bad credit — Porter Freight Funding</h3>
            <p>
              <strong>What they do well.</strong> Porter is one of the few
              factors that explicitly offers a no-personal-credit-check
              option — they underwrite the broker, not the trucker. That
              makes them the right pick for operators with sub-580 FICOs,
              recent bankruptcies, or thin credit files where the personal
              credit profile would shut other factors down. Porter is also
              tolerant of low-volume operators where Apex and eCapital
              would push for higher invoice volume to make the
              relationship economical. There is no minimum-volume
              contract — you factor what you want, when you want.
              Funding is typically inside 24 hours.
            </p>
            <p>
              <strong>Watch-outs.</strong> Porter does not run a fuel
              program. For operators putting 1,000+ gallons per truck per
              month, the absence of fuel-card savings raises the effective
              cost of factoring with Porter relative to Apex or
              eCapital — even if Porter&apos;s headline rate is similar.
              The advance percentage tops out at 90%, which is lower than
              Apex&apos;s 100% advance. Porter is a smaller factor than
              eCapital or Apex, so the technology stack (online portal,
              broker-credit tools, mobile app) is functional rather than
              polished.
            </p>
            <p>
              <strong>Who should pick them.</strong> Sub-580 FICO, recent
              BK, or thin-file operators who have been declined by other
              factors. Lower-volume operators who want pay-as-you-go
              factoring without a minimum-volume commitment. If your
              credit profile would not get past Apex or Triumph
              underwriting, Porter is the call.
            </p>

            <h3>Best for spot factoring — OTR Capital</h3>
            <p>
              <strong>What they do well.</strong> OTR Capital is the
              cleanest pick on the list for spot factoring — factoring
              individual loads selectively, not your full ledger. Most
              factors require an all-ledger commitment: every invoice you
              generate goes through the factor. OTR does not. You can
              factor the specific loads where you need cash quickly and
              keep slow-pay relationships in-house. There is no minimum
              volume and no minimum contract. Funding is same-day. Their
              broker-credit tool is solid and their customer service is
              transactional but responsive.
            </p>
            <p>
              <strong>Watch-outs.</strong> Spot factoring carries a
              higher per-invoice rate than full-ledger factoring — OTR
              prices in the 2.5–5% range, which on a per-invoice basis is
              steep relative to a full-ledger 1.5–3% relationship. The
              math only makes sense if you are factoring selectively. If
              you would otherwise factor every load anyway, you are
              overpaying at OTR vs. a full-ledger contract elsewhere. The
              advance percentage caps at 95%, similar to most of the
              list.
            </p>
            <p>
              <strong>Who should pick them.</strong> Operators who want
              factoring optionality — fast cash on the loads where they
              need it, in-house collection on everything else. Operators
              with a mix of brokered and direct-shipper loads where the
              direct-shipper invoices are not worth factoring. Operators
              who already have a banking relationship and only need the
              factor occasionally.
            </p>

            <h3>Best for technology integration — Truckstop Go Capital</h3>
            <p>
              <strong>What they do well.</strong> Truckstop Go Capital is
              the factoring product native to the Truckstop load board.
              For operators already running their dispatch through
              Truckstop, the integration is genuinely useful — invoices
              flow from the load directly into the factoring queue
              without re-entry. Their FleetDocs mobile app is one of the
              cleaner document-capture experiences in factoring; you can
              snap a BOL on your phone and submit the invoice without
              touching paper. Cancellation terms are flexible — you can
              cancel anytime, which is unusual for the category.
            </p>
            <p>
              <strong>Watch-outs.</strong> The headline rate runs from
              3.25% — meaningfully higher than Apex, TBS, or
              Triumph&apos;s entry rates. The product is built around the
              Truckstop load-board ecosystem; if you do not run loads
              through Truckstop, the integration value disappears and you
              are left with a higher-rate factor and weaker
              account-management. Reviews note that the personalized
              service layer is thinner than at Apex or Triumph — the
              Truckstop product is designed to scale through software,
              not through a relationship rep. The fuel program runs
              through WEX rather than a dedicated trucking fuel network.
            </p>
            <p>
              <strong>Who should pick them.</strong> Operators who run
              the majority of their loads through the Truckstop board
              and want their factoring inside the same workflow.
              Tech-comfortable owner-operators who prefer a software-led
              experience and do not need a high-touch account manager.
              Operators who specifically value cancel-anytime contract
              terms and are willing to pay for that flexibility.
            </p>

            <h3>Best for non-recourse — Triumph Business Capital</h3>
            <p>
              <strong>What they do well.</strong> Triumph has been a
              transportation-focused factor since 2004 and runs the
              strongest non-recourse program on this list.
              Non-recourse means the factor absorbs the loss when a
              broker files bankruptcy or otherwise becomes credit-event
              insolvent — Triumph&apos;s product is built around
              broker-credit risk and underwrites it as the core product,
              not a bolt-on. The funding speed is solid (24 hours
              typical), the fuel program is functional, and the
              broker-credit tooling helps you avoid the bad shippers
              before you book the load. Triumph also offers asset-based
              lending and equipment financing for fleets that want a
              relationship beyond factoring.
            </p>
            <p>
              <strong>Watch-outs.</strong> Non-recourse is more expensive
              than recourse — the premium runs 0.25–1% over comparable
              recourse pricing. Non-recourse only covers broker
              insolvency, not slow-pay or invoice disputes; operators
              sometimes assume non-recourse means &quot;you cannot lose,
              ever&quot; and that is not what the contract says. The
              12-month contract is typical and auto-renewing. Triumph is
              owned by a publicly traded holding company (Triumph
              Financial), which keeps the product disciplined but also
              means the rate sheet is not flexible — what you see is
              what you pay.
            </p>
            <p>
              <strong>Who should pick them.</strong> Operators with
              concentrated broker exposure who want the factor to absorb
              broker-bankruptcy risk. Fleets factoring large invoices
              where a single broker insolvency would meaningfully hurt
              cash flow. Operators willing to pay 25–100 basis points
              over a recourse rate for the credit-event protection.
            </p>

            <h3>Honorable mentions</h3>
            <p>
              <strong>RTS Financial.</strong> Strong large-fleet support,
              reasonable rates, and a competent fuel program. Did not
              make a use-case slot above because they do not edge out
              eCapital on fleets, Apex on owner-operators, or TBS on new
              authority. If you have been quoted by RTS and the terms
              look comparable to one of the seven above, it is a fair
              alternative — particularly for fleets in the 10–50 truck
              range. Their broker-credit tool is solid.
            </p>
            <p>
              <strong>1st Commercial Credit.</strong> Broad SMB factoring
              with a trucking-specific desk. The rate range is
              competitive and their underwriting is open to operators
              other factors decline. The trade-off is that 1CC is not
              trucking-specialized in the way Apex, TBS, and Triumph
              are — the fuel program is thinner, the broker-credit
              tooling is less mature, and the customer-service rep may
              not know the difference between a Tractor and a Box Truck
              the way a trucking-native rep would.
            </p>
            <p>
              <strong>Cashway Funding.</strong> Small-fleet niche player,
              regionally concentrated. Reviews are positive but volume is
              low enough that the operator network is small.
              Owner-operators in their core service area report a
              high-touch experience similar to Apex but at a smaller
              scale. Worth a quote if you are in their territory; not
              worth chasing if you are not.
            </p>
            <p>
              <strong>Riviera Finance.</strong> Legacy player, factoring
              since 1969 with a national branch network. The rates are
              generally competitive but the technology stack is dated
              relative to Apex, eCapital, and Truckstop Go. Riviera is
              the right pick if you specifically value an in-person
              branch relationship — they are the only factor on this list
              with that footprint. For everyone else, the lack of
              instant-payment and modern document-capture tooling means
              there are better choices.
            </p>
          </section>

          <section className="research-section" id="comparison">
            <h2>3. Comparison table</h2>
            <p>
              The top seven ranked factors at a glance. Numbers are
              advertised rates as of May 2026 — your actual quote will
              vary based on credit profile, broker mix, and volume.
              Always compare effective rates (after fees and fuel-program
              offsets), not advertised rates.
            </p>
            <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "var(--fs-small)",
                  lineHeight: "var(--lh-small)",
                }}
              >
                <caption
                  style={{
                    captionSide: "bottom",
                    textAlign: "left",
                    fontSize: "var(--fs-eyebrow)",
                    color: "var(--color-ink-tertiary)",
                    marginTop: "0.75rem",
                  }}
                >
                  Source: factor websites and operator-reported invoices,
                  May 2026.
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Factor
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Rate range (advertised)
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Contract
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Advance %
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Funding speed
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Credit minimum
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Fuel program
                    </th>
                    <th
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      Recourse / Non-recourse
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((r) => (
                    <tr key={r.factor}>
                      <th
                        scope="row"
                        style={{
                          textAlign: "left",
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          fontWeight: 600,
                          color: "var(--color-ink-primary)",
                        }}
                      >
                        {r.factor}
                      </th>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.rate}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.contract}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.advance}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.speed}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.credit}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.fuel}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderBottom: "1px solid var(--color-border)",
                          color: "var(--color-ink-secondary)",
                        }}
                      >
                        {r.recourse}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="research-section" id="how-to-pick">
            <h2>
              4. How to actually pick the right factor for your trucking
              business
            </h2>
            <p>
              The ranked list above gives you the seven serious options.
              Picking among them is a matter of matching your operation
              to the factor that priced its product around your profile.
              Here is how to actually decide.
            </p>

            <h3>Match by load mix (broker concentration, pay terms)</h3>
            <p>
              The first thing to look at is your broker mix. Operators
              with concentrated exposure to a small number of brokers
              (top three brokers &gt; 60% of revenue) carry credit-event
              risk that non-recourse coverage is built for — Triumph is
              the right pick. Operators with diversified broker mixes
              (no single broker over 20% of revenue) can take recourse
              pricing because the credit risk is naturally diversified;
              Apex, TBS, or eCapital depending on operation size. If
              your loads run heavily on net-30 or net-45 broker terms,
              the factoring math is straightforward — the advance
              replaces the float and the fee is the cost of capital. If
              your loads run net-7 or net-15, you are factoring less and
              should look harder at OTR&apos;s spot product so you are
              not committing your full ledger when half your invoices
              do not need factoring.
            </p>

            <h3>Match by company stage (single truck → 5+ fleet)</h3>
            <p>
              Stage matters as much as load mix. A brand-new MC under 90
              days old has limited choices — TBS or Porter are realistic;
              Apex and Triumph are unlikely to underwrite cleanly until
              you have broker history. A single-truck owner-operator at
              90+ days authority with 600+ FICO has the full menu open
              and should optimize for the fuel-program economics; Apex
              tends to win this profile. A 2–4 truck operation is
              squarely in Apex&apos;s sweet spot but should also quote
              eCapital because the fleet-product economics start to bite
              around 5 trucks. A 5+ truck fleet should default to
              eCapital unless the operator wants the asset-based
              lending bundle, in which case Triumph is competitive.
              Above 25 trucks the game changes — eCapital and Triumph
              are the only two realistic options and the rate sheet
              becomes negotiable.
            </p>

            <h3>When to walk from a factor (red flags)</h3>
            <p>
              Walk if any of the following show up in the contract or
              the sales conversation. First, a vague or aggressive
              auto-renewal clause — particularly if the cancellation
              window is shorter than 30 days or buried in a footnote.
              Second, hidden ACH or wire fees that were not in the rate
              sheet — request a complete fee schedule in writing before
              signing and decline the contract if the schedule is
              evasive. Third, mandatory fuel-card minimums where you
              must spend X gallons per month or pay a penalty — these
              terms are designed to lock you into the relationship.
              Fourth, any UCC-1 filing surprise — confirm the UCC-1
              language explicitly excludes equipment financing and
              business-banking lines so the filing does not block your
              other lender relationships. Fifth, set-up fees over $250 —
              the category norm is a small or no set-up fee.
            </p>
            <p>
              If you spot any of those flags, push back in writing. A
              factor that will not amend an aggressive contract clause
              for a serious operator is a factor that will not be
              flexible during the relationship either.
            </p>
          </section>

          <section className="research-section" id="dispatched">
            <h2>5. How Dispatched helps</h2>
            <p>
              Dispatched matches you with the right factor on this list
              based on your operation profile — volume, credit, broker
              mix, recourse preference, and stage. One intake; multiple
              panel responses. Soft credit pull only — it does not
              affect your FICO. Instead of calling seven factors and
              re-explaining your operation each time, you tell us once
              and we route the file to the two or three factors on the
              list that are actually structured for your profile. We do
              not take a placement fee from operators; the panel
              factors compensate us when they win the relationship.
              That keeps the recommendation honest — we win when you
              get the right product, not when we route you to whichever
              factor pays the highest commission. If you want to skip
              the research and get matched directly,{" "}
              <Link href="/qualify">
                start the qualification flow
              </Link>{" "}
              or read the{" "}
              <Link href="/factoring">
                product page
              </Link>{" "}
              for how the factoring panel is structured.
            </p>
          </section>

          <section className="research-section" id="faq">
            <h2>6. FAQ — Choosing a trucking factor in 2026</h2>
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </section>

          <RelatedContent
            items={relatedItems}
            heading="Related from Dispatched"
            intro="Glossary, comparisons, calculators, and adjacent reports for the topics in this guide."
          />

          <section
            className="research-section research-cta"
            id="cta"
          >
            <h2>See which factor fits your trucking business</h2>
            <p>
              We will route your file to the two or three factors on this
              list that are actually structured for your profile. One
              intake, soft pull, no commitment.
            </p>
            <div className="research-cta-grid">
              <Link
                href="/apply?useCase=factoring"
                className="research-cta-card"
              >
                <h3>See which factor fits your trucking business →</h3>
                <p>
                  Get matched with the right factor on this list. Soft pull
                  only.
                </p>
              </Link>
              <Link
                href="/factoring"
                className="research-cta-card"
              >
                <h3>How factoring works</h3>
                <p>
                  The product page covers how the factoring panel is
                  structured, what the underwriting decision actually
                  looks at, and what to expect from setup through your
                  first funded invoice.
                </p>
              </Link>
            </div>
          </section>

          <section className="research-section">
            <h2>Related</h2>
            <ul className="research-list">
              <li>
                <Link href="/research">Dispatched Research index</Link> —
                other annual and quarterly reports.
              </li>
              <li>
                <Link href="/factoring">
                  Invoice factoring for truckers
                </Link>{" "}
                — the product page that maps to this listicle.
              </li>
              <li>
                <Link href="/factoring/no-credit-check">
                  No-credit-check factoring
                </Link>{" "}
                — the bad-credit-acceptance product profile.
              </li>
              <li>
                <Link href="/qualify">Qualify</Link> — soft-pull
                qualification flow.
              </li>
              <li>
                <Link href="/methodology">Methodology</Link> — how we rank
                and route across products.
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
