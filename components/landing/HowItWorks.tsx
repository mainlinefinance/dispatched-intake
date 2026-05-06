import { Fragment } from "react";
import { IconClock, IconDollar, IconFlowArrow, IconTruck } from "./icons";

type FlowStep = {
  n: string;
  label: string;
  sub: string;
  who: string;
  color: string;
};

const flowSteps: FlowStep[] = [
  {
    n: "1",
    label: "Application",
    sub: "Revenue, time in business, DOT number, bank account. 2 min.",
    who: "You",
    color: "var(--color-steel-600)",
  },
  {
    n: "2",
    label: "3–5 matched lenders",
    sub: "Business metrics shared. Name, phone, EIN stay with us.",
    who: "Dispatched",
    color: "var(--color-steel-600)",
  },
  {
    n: "3",
    label: "You see offers",
    sub: "APR, term, total cost — side by side. No pull yet.",
    who: "You",
    color: "var(--color-steel-600)",
  },
  {
    n: "4",
    label: "One hard pull",
    sub: "Only the lender you pick. The moment credit is pulled.",
    who: "Chosen lender",
    color: "var(--color-hiviz-400)",
  },
  {
    n: "5",
    label: "Wire to your account",
    sub: "Wire goes out the same banking day after the lender signs off.",
    who: "You",
    color: "var(--color-ok-600)",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How Dispatched works</span>
          <h2>How the money moves.</h2>
          <p>
            Five steps, in order. One soft check. One hard pull, and only from
            the lender you pick. The mechanism is the reason we&rsquo;re not a
            broker.
          </p>
          <p className="flow-subhead">
            Trucking-friendly lenders on our panel.
          </p>
        </div>

        <div className="flow-diagram">
          {flowSteps.map((s, i) => (
            <Fragment key={s.n}>
              <div className="flow-node">
                <div className="flow-n" style={{ background: s.color }}>
                  {s.n}
                </div>
                <div className="flow-who">{s.who}</div>
                <div className="flow-label">{s.label}</div>
                <div className="flow-sub">{s.sub}</div>
              </div>
              {i < flowSteps.length - 1 && (
                <div className="flow-arrow" aria-hidden="true">
                  <IconFlowArrow />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="feat-grid" style={{ marginTop: 48 }}>
          <div className="feat-card">
            <span className="feat-icon">
              <IconTruck />
            </span>
            <h3>Built for trucking.</h3>
            <p className="lede">
              We only fund freight. Every lender on our panel knows what a DOT
              number, ELD, and factoring agreement are before you start
              typing.
            </p>
            <ul>
              <li>Fuel advances &amp; cash flow — 24-hour turn</li>
              <li>Truck repair loans — paid direct to your shop</li>
              <li>Owner-op and 2–10 truck fleet working capital</li>
              <li>Equipment loans on Class 8 tractors &amp; trailers</li>
            </ul>
          </div>
          <div className="feat-card">
            <span className="feat-icon">
              <IconDollar />
            </span>
            <h3>The lender pays us, not you.</h3>
            <p className="lede">
              When a matched lender funds your loan, they pay Dispatched a
              flat referral fee. It&rsquo;s disclosed on every term sheet. It
              does not change your APR.
            </p>
            <ul>
              <li>No broker points. Zero to you</li>
              <li>Flat fee, disclosed on every term sheet</li>
              <li>Lenders compete on rate and speed, not commission</li>
              <li>One contact. No 7am calls from seven desks</li>
            </ul>
          </div>
          <div className="feat-card median">
            <span
              className="feat-icon"
              style={{ color: "var(--color-hiviz-400)" }}
            >
              <IconClock />
            </span>
            <h3>One hard pull.</h3>
            <p className="lede">
              Only after you pick a lender. Until then it&rsquo;s a soft
              match: lenders see your file, you see their offers, and your
              credit report stays untouched.
            </p>
            <ul>
              <li>Soft-pull match. No impact on your credit score</li>
              <li>One hard pull, only with the lender you choose</li>
              <li>Wire same banking day after lender sign-off</li>
              <li>No in-person closings. E-sign from the cab</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
