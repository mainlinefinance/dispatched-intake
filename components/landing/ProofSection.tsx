import Link from "next/link";

type Scenario = {
  state: string;
  who: string;
  band: string;
  useCase: string;
  type: string;
};

/* Composite illustrative scenarios — built from the categories and amount
   bands our intake commonly sees. Not specific borrowers. The disclosure
   is part of the section header copy and the methodology link below. */
const scenarios: Scenario[] = [
  {
    state: "TX",
    who: "Owner-op, 1 truck",
    band: "$50K–$75K",
    useCase:
      "Engine rebuild on a 2019 Cascadia after a coolant failure outside Amarillo.",
    type: "Repair loan",
  },
  {
    state: "OH",
    who: "Fleet owner, 4 trucks",
    band: "$100K–$150K",
    useCase:
      "Fuel float during a slow January before dedicated lanes kicked back in February.",
    type: "Working capital",
  },
  {
    state: "CA",
    who: "Owner-op, 1 truck",
    band: "$25K–$50K",
    useCase:
      "Down payment on a used reefer trailer to pick up produce lanes out of Salinas.",
    type: "Equipment loan",
  },
  {
    state: "GA",
    who: "Fleet owner, 7 trucks",
    band: "$75K–$100K",
    useCase:
      "Covering payroll after a broker default on a sizable receivable. Bank said no.",
    type: "Bridge capital",
  },
];

export default function ProofSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Composite scenarios</span>
          <h2>What a Dispatched-funded request actually looks like.</h2>
          <p>
            Composite illustrative scenarios — not specific borrowers. Each
            card is built from the kinds of repair, payroll, and equipment
            requests our intake routinely sees.
          </p>
        </div>
        <div className="proof-grid">
          {scenarios.map((s, i) => (
            <div className="proof-card" key={i}>
              <div className="header">
                <span className="badge">Illustrative</span>
                <span className="state-tag">
                  {s.state} · {s.type}
                </span>
              </div>
              <div className="amt">{s.band}</div>
              <h3>{s.who}</h3>
              <p className="use">{s.useCase}</p>
            </div>
          ))}
        </div>
        <p className="proof-foot">
          <Link href="/methodology#composite-scenarios">
            How we label illustrative scenarios →
          </Link>
        </p>
      </div>
    </section>
  );
}
