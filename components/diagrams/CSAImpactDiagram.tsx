/* CSAImpactDiagram — vertical flow showing how the 7 CSA BASICs roll up into
   a percentile and then cascade into insurance, broker, and lender decisions.
   Server-rendered inline SVG. */

type Basic = {
  name: string;
  severity: "high" | "mid" | "low";
};

const BASICS: ReadonlyArray<Basic> = [
  { name: "Unsafe Driving", severity: "high" },
  { name: "HOS Compliance", severity: "high" },
  { name: "Driver Fitness", severity: "low" },
  { name: "Controlled Subst./Alcohol", severity: "mid" },
  { name: "Vehicle Maintenance", severity: "high" },
  { name: "Hazmat Compliance", severity: "low" },
  { name: "Crash Indicator", severity: "mid" },
];

const SEVERITY_COLOR: Record<Basic["severity"], string> = {
  high: "#A8241D",
  mid: "#8B6510",
  low: "#1E6642",
};

const SEVERITY_BG: Record<Basic["severity"], string> = {
  high: "#F3D2CE",
  mid: "#F5E3B8",
  low: "#D6E8D8",
};

type Outcome = {
  title: string;
  detail: ReadonlyArray<string>;
};

const OUTCOMES: ReadonlyArray<Outcome> = [
  {
    title: "Insurance pricing",
    detail: ["50–100% premium swing between", "top and bottom CSA deciles"],
  },
  {
    title: "Broker access",
    detail: ["Risk-screen brokers cap or block", "elevated-BASIC carriers"],
  },
  {
    title: "Lender risk score",
    detail: ["Equipment + working-capital", "pricing reflects CSA tier"],
  },
];

export function CSAImpactDiagram() {
  return (
    <svg
      viewBox="0 0 900 540"
      role="img"
      aria-label="Flow diagram showing the seven CSA BASICs feeding into a single percentile score, which then drives insurance pricing, broker access, and lender risk decisions"
      style={{ width: "100%", height: "auto", maxWidth: "900px", display: "block", fontFamily: "var(--font-body, system-ui, sans-serif)" }}
    >
      <title>CSA impact: 7 BASICs to percentile to downstream consequences</title>

      <defs>
        <marker
          id="csa-arrowhead"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B4750" />
        </marker>
      </defs>

      <text
        x="450"
        y="28"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="#0E1A22"
      >
        How the 7 CSA BASICs cascade into a carrier&apos;s pricing and access
      </text>
      <text x="450" y="48" textAnchor="middle" fontSize="11" fill="#5A6369">
        Behavior Analysis &amp; Safety Improvement Categories (24-month rolling window)
      </text>

      {/* Row 1: BASICs */}
      <g data-layer="basics">
        {BASICS.map((basic, idx) => {
          const cols = BASICS.length;
          const colWidth = 820 / cols;
          const x = 40 + idx * colWidth;
          const w = colWidth - 10;
          return (
            <g key={`basic-${basic.name}`}>
              <rect
                x={x}
                y={70}
                width={w}
                height={70}
                rx="8"
                ry="8"
                fill={SEVERITY_BG[basic.severity]}
                stroke={SEVERITY_COLOR[basic.severity]}
                strokeWidth="1.5"
              />
              <text
                x={x + w / 2}
                y={100}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#0E1A22"
              >
                {basic.name.length > 18 ? basic.name.slice(0, 18) : basic.name}
              </text>
              {basic.name.length > 18 && (
                <text
                  x={x + w / 2}
                  y={114}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#0E1A22"
                >
                  {basic.name.slice(18)}
                </text>
              )}
              <text
                x={x + w / 2}
                y={130}
                textAnchor="middle"
                fontSize="10"
                fill={SEVERITY_COLOR[basic.severity]}
                fontWeight="500"
              >
                {`weight: ${basic.severity}`}
              </text>
            </g>
          );
        })}
      </g>

      {/* Arrows from BASICs to percentile box */}
      <g data-layer="basic-to-percentile">
        {BASICS.map((_, idx) => {
          const cols = BASICS.length;
          const colWidth = 820 / cols;
          const x = 40 + idx * colWidth + (colWidth - 10) / 2;
          return (
            <line
              key={`a-${idx}`}
              x1={x}
              y1={142}
              x2={450}
              y2={210}
              stroke="#3B4750"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}
      </g>

      {/* Percentile box */}
      <g data-layer="percentile">
        <rect
          x="280"
          y="220"
          width="340"
          height="90"
          rx="10"
          ry="10"
          fill="#1F4561"
        />
        <text x="450" y="252" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFFFFF">
          CSA percentile
        </text>
        <text x="450" y="274" textAnchor="middle" fontSize="12" fill="#FFFFFF" opacity="0.85">
          Weighted roll-up across BASICs
        </text>
        <text x="450" y="294" textAnchor="middle" fontSize="11" fill="#FFFFFF" opacity="0.75">
          0 = best · 100 = worst-quartile
        </text>
      </g>

      {/* Arrow down to outcomes */}
      <line
        x1="450"
        y1="312"
        x2="450"
        y2="360"
        stroke="#3B4750"
        strokeWidth="2"
        markerEnd="url(#csa-arrowhead)"
      />

      {/* Outcomes row */}
      <g data-layer="outcomes">
        {OUTCOMES.map((outcome, idx) => {
          const x = 60 + idx * 280;
          return (
            <g key={`outcome-${outcome.title}`}>
              <rect
                x={x}
                y={380}
                width="240"
                height="110"
                rx="10"
                ry="10"
                fill="#FAF7F2"
                stroke="#1F4561"
                strokeWidth="1.5"
              />
              <text x={x + 120} y={410} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0E1A22">
                {outcome.title}
              </text>
              {outcome.detail.map((line, i) => (
                <text
                  key={`outcome-line-${outcome.title}-${i}`}
                  x={x + 120}
                  y={434 + i * 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#3B4750"
                >
                  {line}
                </text>
              ))}
              {/* Connector from percentile arrow to this box */}
              <line
                x1="450"
                y1="362"
                x2={x + 120}
                y2={380}
                stroke="#3B4750"
                strokeWidth="1"
                opacity="0.4"
              />
            </g>
          );
        })}
      </g>

      {/* Severity legend */}
      <g data-layer="severity-legend" transform="translate(60, 510)">
        <text x="0" y="10" fontSize="11" fill="#5A6369" fontWeight="500">
          Underwriting weight:
        </text>
        <g transform="translate(140, 0)">
          <rect width="14" height="14" rx="3" fill={SEVERITY_BG.high} stroke={SEVERITY_COLOR.high} strokeWidth="1.5" />
          <text x="20" y="11" fontSize="11" fill="#0E1A22">high</text>
        </g>
        <g transform="translate(210, 0)">
          <rect width="14" height="14" rx="3" fill={SEVERITY_BG.mid} stroke={SEVERITY_COLOR.mid} strokeWidth="1.5" />
          <text x="20" y="11" fontSize="11" fill="#0E1A22">mid</text>
        </g>
        <g transform="translate(270, 0)">
          <rect width="14" height="14" rx="3" fill={SEVERITY_BG.low} stroke={SEVERITY_COLOR.low} strokeWidth="1.5" />
          <text x="20" y="11" fontSize="11" fill="#0E1A22">low</text>
        </g>
      </g>
    </svg>
  );
}
