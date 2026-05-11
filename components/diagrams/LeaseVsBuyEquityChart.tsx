/* LeaseVsBuyEquityChart — line chart over 60 months comparing equity build
   for an equipment loan (linear-amortizing) vs lease-purchase (flat at $0).
   Server-rendered inline SVG. */

const CHART_LEFT = 70;
const CHART_RIGHT = 720;
const CHART_TOP = 60;
const CHART_BOTTOM = 320;
const X_MIN = 0;
const X_MAX = 60;
const Y_MIN = 0;
const Y_MAX = 130; // thousands of dollars
const PURCHASE_VALUE = 130; // equity at month 60 (loan paid off)

function xToPx(month: number): number {
  return CHART_LEFT + ((month - X_MIN) / (X_MAX - X_MIN)) * (CHART_RIGHT - CHART_LEFT);
}

function yToPx(k: number): number {
  return CHART_BOTTOM - ((k - Y_MIN) / (Y_MAX - Y_MIN)) * (CHART_BOTTOM - CHART_TOP);
}

// Equipment-loan equity build: roughly linear amortization to PURCHASE_VALUE
// at month 60. Real amortization is convex (slower at first) — we keep it
// near-linear so the visual stays legible.
function loanEquityAt(month: number): number {
  const t = month / X_MAX;
  // mild concave-up to mimic amortization (more principal late)
  return PURCHASE_VALUE * (t * 0.85 + t * t * 0.15);
}

const LOAN_POINTS: Array<{ x: number; y: number }> = [];
for (let m = 0; m <= X_MAX; m += 2) {
  LOAN_POINTS.push({ x: xToPx(m), y: yToPx(loanEquityAt(m)) });
}

const X_TICKS = [0, 12, 24, 36, 48, 60];
const Y_TICKS = [0, 25, 50, 75, 100, 130];

export function LeaseVsBuyEquityChart() {
  const loanPath = LOAN_POINTS.map(
    (p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`,
  ).join(" ");

  return (
    <svg
      viewBox="0 0 800 420"
      role="img"
      aria-label="Line chart comparing equity build over 60 months for equipment loan versus lease-purchase. Equipment loan rises to about $130K. Lease-purchase stays flat at $0 with 80 percent of operators exiting before completion."
      style={{ width: "100%", height: "auto", maxWidth: "800px", display: "block", fontFamily: "var(--font-body, system-ui, sans-serif)" }}
    >
      <title>Equity build: equipment loan vs lease-purchase, 60 months</title>

      <text
        x="400"
        y="28"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="#0E1A22"
      >
        Equity build over 60 months: equipment loan vs lease-purchase
      </text>

      {/* Y axis grid + ticks */}
      <g data-layer="grid">
        {Y_TICKS.map((tick) => {
          const y = yToPx(tick);
          return (
            <g key={`ygrid-${tick}`}>
              <line
                x1={CHART_LEFT}
                y1={y}
                x2={CHART_RIGHT}
                y2={y}
                stroke="#E0D8CA"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={CHART_LEFT - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#5A6369"
              >
                {`$${tick}K`}
              </text>
            </g>
          );
        })}
      </g>

      {/* Axes */}
      <g data-layer="axes">
        <line
          x1={CHART_LEFT}
          y1={CHART_TOP}
          x2={CHART_LEFT}
          y2={CHART_BOTTOM}
          stroke="#0E1A22"
          strokeWidth="1.5"
        />
        <line
          x1={CHART_LEFT}
          y1={CHART_BOTTOM}
          x2={CHART_RIGHT}
          y2={CHART_BOTTOM}
          stroke="#0E1A22"
          strokeWidth="1.5"
        />
        {X_TICKS.map((tick) => {
          const x = xToPx(tick);
          return (
            <g key={`xtick-${tick}`}>
              <line x1={x} y1={CHART_BOTTOM} x2={x} y2={CHART_BOTTOM + 5} stroke="#0E1A22" strokeWidth="1.5" />
              <text x={x} y={CHART_BOTTOM + 20} textAnchor="middle" fontSize="11" fill="#5A6369">
                {tick}
              </text>
            </g>
          );
        })}
        <text
          x={(CHART_LEFT + CHART_RIGHT) / 2}
          y={CHART_BOTTOM + 42}
          textAnchor="middle"
          fontSize="12"
          fill="#3B4750"
          fontWeight="500"
        >
          Months
        </text>
        <text
          x={20}
          y={(CHART_TOP + CHART_BOTTOM) / 2}
          textAnchor="middle"
          fontSize="12"
          fill="#3B4750"
          fontWeight="500"
          transform={`rotate(-90, 20, ${(CHART_TOP + CHART_BOTTOM) / 2})`}
        >
          Equity ($K)
        </text>
      </g>

      {/* Lease-purchase line: flat at $0, then jump to $5K at month 60 if completed */}
      <g data-layer="lease-line">
        <line
          x1={xToPx(0)}
          y1={yToPx(0)}
          x2={xToPx(60)}
          y2={yToPx(0)}
          stroke="#A8241D"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        {/* Optimistic completion bonus at month 60 */}
        <line
          x1={xToPx(60)}
          y1={yToPx(0)}
          x2={xToPx(60)}
          y2={yToPx(5)}
          stroke="#A8241D"
          strokeWidth="3"
        />
        <circle cx={xToPx(60)} cy={yToPx(5)} r="4" fill="#A8241D" />
        {/* "Typical exit" marker around month 30 */}
        <circle cx={xToPx(30)} cy={yToPx(0)} r="5" fill="#A8241D" stroke="#FAF7F2" strokeWidth="2" />
        <line
          x1={xToPx(30)}
          y1={yToPx(0)}
          x2={xToPx(30) + 30}
          y2={yToPx(0) - 35}
          stroke="#5A6369"
          strokeWidth="1"
        />
        <text
          x={xToPx(30) + 34}
          y={yToPx(0) - 38}
          fontSize="11"
          fill="#A8241D"
          fontWeight="600"
        >
          80% exit by month ~30
        </text>
        <text
          x={xToPx(30) + 34}
          y={yToPx(0) - 24}
          fontSize="11"
          fill="#5A6369"
        >
          $0 equity recovered
        </text>
      </g>

      {/* Equipment loan line */}
      <g data-layer="loan-line">
        <path
          d={loanPath}
          fill="none"
          stroke="#1E6642"
          strokeWidth="3"
        />
        <circle cx={xToPx(60)} cy={yToPx(PURCHASE_VALUE)} r="5" fill="#1E6642" />
        <text
          x={xToPx(60) - 6}
          y={yToPx(PURCHASE_VALUE) - 12}
          textAnchor="end"
          fontSize="11"
          fill="#1E6642"
          fontWeight="600"
        >
          {`~$${PURCHASE_VALUE}K equity at payoff`}
        </text>
      </g>

      {/* Legend */}
      <g data-layer="legend" transform="translate(90, 380)">
        <g>
          <line x1="0" y1="6" x2="28" y2="6" stroke="#1E6642" strokeWidth="3" />
          <text x="36" y="10" fontSize="12" fill="#0E1A22" fontWeight="500">
            Equipment loan — builds equity from day one
          </text>
        </g>
        <g transform="translate(380, 0)">
          <line x1="0" y1="6" x2="28" y2="6" stroke="#A8241D" strokeWidth="3" strokeDasharray="6 4" />
          <text x="36" y="10" fontSize="12" fill="#0E1A22" fontWeight="500">
            Lease-purchase — $0 equity unless completed
          </text>
        </g>
      </g>
    </svg>
  );
}
