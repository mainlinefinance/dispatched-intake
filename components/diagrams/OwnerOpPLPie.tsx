/* OwnerOpPLPie — donut chart breakdown of typical owner-operator weekly P&L
   categories. Server-rendered inline SVG, no client state.

   Percentages are representative, not derived from a specific dataset — they
   illustrate the structural cost mix used in the calculator methodology. */

type Segment = {
  label: string;
  percent: number;
  color: string;
};

const SEGMENTS: ReadonlyArray<Segment> = [
  { label: "Fuel", percent: 30, color: "#1F4561" },
  { label: "Truck payment", percent: 12, color: "#3F6685" },
  { label: "Insurance", percent: 8, color: "#95ABBA" },
  { label: "Maintenance", percent: 8, color: "#E67A1F" },
  { label: "Factoring fee", percent: 3, color: "#FACB94" },
  { label: "Fixed costs (IFTA/IRP/ELD)", percent: 4, color: "#8B6510" },
  { label: "Taxes (SE + income est.)", percent: 10, color: "#A8241D" },
  { label: "Net to owner", percent: 25, color: "#1E6642" },
];

const CENTER_X = 200;
const CENTER_Y = 200;
const OUTER_RADIUS = 140;
const INNER_RADIUS = 80;

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number,
): string {
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const outerStart = polarToCartesian(cx, cy, rOuter, startAngle);
  const outerEnd = polarToCartesian(cx, cy, rOuter, endAngle);
  const innerEnd = polarToCartesian(cx, cy, rInner, endAngle);
  const innerStart = polarToCartesian(cx, cy, rInner, startAngle);
  return [
    `M ${outerStart.x.toFixed(3)} ${outerStart.y.toFixed(3)}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${outerEnd.x.toFixed(3)} ${outerEnd.y.toFixed(3)}`,
    `L ${innerEnd.x.toFixed(3)} ${innerEnd.y.toFixed(3)}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerStart.x.toFixed(3)} ${innerStart.y.toFixed(3)}`,
    "Z",
  ].join(" ");
}

export function OwnerOpPLPie() {
  const total = SEGMENTS.reduce((s, seg) => s + seg.percent, 0);
  const startOffset = -Math.PI / 2; // start at 12 o'clock

  // Compute cumulative start angles without mutating an outer accumulator;
  // ESLint react-hooks/immutability bans post-render reassignment.
  const cumulative = SEGMENTS.reduce<ReadonlyArray<number>>(
    (acc, seg) => {
      const prev = acc[acc.length - 1] ?? 0;
      return [...acc, prev + (seg.percent / total) * Math.PI * 2];
    },
    [0],
  );

  const arcs = SEGMENTS.map((seg, idx) => {
    const start = startOffset + cumulative[idx];
    const end = startOffset + cumulative[idx + 1];
    return {
      ...seg,
      d: arcPath(CENTER_X, CENTER_Y, OUTER_RADIUS, INNER_RADIUS, start, end),
    };
  });

  return (
    <svg
      viewBox="0 0 720 400"
      role="img"
      aria-label="Donut chart showing typical owner-operator weekly P&L breakdown: fuel 30 percent, truck payment 12 percent, insurance 8 percent, maintenance 8 percent, factoring fee 3 percent, fixed costs 4 percent, taxes 10 percent, net to owner 25 percent"
      style={{ width: "100%", height: "auto", maxWidth: "720px", display: "block", fontFamily: "var(--font-body, system-ui, sans-serif)" }}
    >
      <title>Owner-operator weekly P&amp;L: cost mix breakdown</title>

      <g data-layer="donut">
        {arcs.map((arc) => (
          <path
            key={`arc-${arc.label}`}
            d={arc.d}
            fill={arc.color}
            stroke="#FAF7F2"
            strokeWidth="2"
          />
        ))}
        <text
          x={CENTER_X}
          y={CENTER_Y - 8}
          textAnchor="middle"
          fontSize="14"
          fill="#5A6369"
          fontWeight="500"
        >
          Revenue
        </text>
        <text
          x={CENTER_X}
          y={CENTER_Y + 14}
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="#0E1A22"
        >
          100%
        </text>
      </g>

      <g data-layer="legend" transform="translate(420, 60)">
        {SEGMENTS.map((seg, idx) => (
          <g key={`legend-${seg.label}`} transform={`translate(0, ${idx * 32})`}>
            <rect width="18" height="18" rx="3" fill={seg.color} />
            <text x="28" y="10" fontSize="13" fill="#0E1A22" fontWeight="500">
              {seg.label}
            </text>
            <text x="28" y="26" fontSize="12" fill="#5A6369">
              {`${seg.percent}% of revenue`}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
