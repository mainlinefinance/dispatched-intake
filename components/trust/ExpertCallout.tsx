/* ===========================================================================
   Renders nothing when reviewer is null — the slot exists in money-page
   templates so future reviewer attributions drop in without a template
   change. Per the Phase 1 decision, reviewer recruitment is deferred; pages
   ship with the slot present and the component a no-op.
   =========================================================================== */

export type Reviewer = {
  name: string;
  credential: string;
  quote?: string;
};

type Props = {
  reviewer: Reviewer | null;
};

export default function ExpertCallout({ reviewer }: Props) {
  if (!reviewer) return null;
  return (
    <aside className="ins-profile" aria-label="Expert reviewer">
      <h4>Reviewed by {reviewer.name}</h4>
      <p>
        <strong>{reviewer.credential}</strong>
      </p>
      {reviewer.quote ? <p>&ldquo;{reviewer.quote}&rdquo;</p> : null}
    </aside>
  );
}
