/* FactoringFlowDiagram — horizontal flow showing how a factoring deal moves
   from invoice issued to net carrier payment. Server-rendered inline SVG.
   No client state, no JS required at runtime. */

type NodeSpec = {
  x: number;
  label1: string;
  label2: string;
};

type ArrowSpec = {
  from: number;
  to: number;
  annotation: string;
};

const NODE_WIDTH = 150;
const NODE_HEIGHT = 70;
const NODE_Y = 80;
const NODES: ReadonlyArray<NodeSpec> = [
  { x: 20, label1: "Invoice", label2: "issued" },
  { x: 200, label1: "Factor", label2: "advances" },
  { x: 380, label1: "Broker pays", label2: "factor" },
  { x: 560, label1: "Reserve", label2: "released" },
  { x: 730, label1: "Net to", label2: "carrier" },
];

const ARROWS: ReadonlyArray<ArrowSpec> = [
  { from: 0, to: 1, annotation: "advance 85–97%" },
  { from: 1, to: 2, annotation: "Net 30" },
  { from: 2, to: 3, annotation: "less factor fee" },
  { from: 3, to: 4, annotation: "remaining %" },
];

export function FactoringFlowDiagram() {
  return (
    <svg
      viewBox="0 0 900 240"
      role="img"
      aria-label="Factoring flow from invoice issued, to factor advance, to broker payment, to reserve release, to net carrier payment"
      style={{ width: "100%", height: "auto", maxWidth: "900px", display: "block", fontFamily: "var(--font-body, system-ui, sans-serif)" }}
    >
      <title>How factoring flows: invoice to net payment</title>
      <defs>
        <marker
          id="factoring-arrowhead"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5A6369" />
        </marker>
      </defs>

      <g data-layer="arrows">
        {ARROWS.map((arrow, idx) => {
          const fromNode = NODES[arrow.from];
          const toNode = NODES[arrow.to];
          const x1 = fromNode.x + NODE_WIDTH;
          const x2 = toNode.x;
          const y = NODE_Y + NODE_HEIGHT / 2;
          const midX = (x1 + x2) / 2;
          return (
            <g key={`arrow-${idx}`}>
              <line
                x1={x1 + 2}
                y1={y}
                x2={x2 - 4}
                y2={y}
                stroke="#5A6369"
                strokeWidth="2"
                markerEnd="url(#factoring-arrowhead)"
              />
              <text
                x={midX}
                y={y - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#5A6369"
                fontWeight="500"
              >
                {arrow.annotation}
              </text>
            </g>
          );
        })}
      </g>

      <g data-layer="nodes">
        {NODES.map((node, idx) => (
          <g key={`node-${idx}`}>
            <rect
              x={node.x}
              y={NODE_Y}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx="10"
              ry="10"
              fill="#1F4561"
            />
            <text
              x={node.x + NODE_WIDTH / 2}
              y={NODE_Y + 30}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#FFFFFF"
            >
              {node.label1}
            </text>
            <text
              x={node.x + NODE_WIDTH / 2}
              y={NODE_Y + 50}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#FFFFFF"
            >
              {node.label2}
            </text>
            <text
              x={node.x + NODE_WIDTH / 2}
              y={NODE_Y + NODE_HEIGHT + 22}
              textAnchor="middle"
              fontSize="11"
              fill="#5A6369"
            >
              {`Step ${idx + 1}`}
            </text>
          </g>
        ))}
      </g>

      <text
        x="450"
        y="30"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="#0E1A22"
      >
        How factoring flows: invoice issued to net carrier payment
      </text>
    </svg>
  );
}
