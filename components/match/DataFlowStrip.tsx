import { SCREEN7 } from "@/lib/copy";

/* Three-step soft-check narrative. Lives outside the match card (per
   handoff spec) so it can be reused on the landing page, geo template,
   and eventually outbound emails. */
export default function DataFlowStrip() {
  return (
    <div className="dataflow" aria-label="How your match is protected">
      {SCREEN7.dataFlow.map((step) => (
        <div key={step.n} className="df-row">
          <span className="df-n" aria-hidden="true">
            {step.n}
          </span>
          <span className="df-t">
            <strong>{step.strong}</strong> {step.rest}
          </span>
        </div>
      ))}
    </div>
  );
}
