type Props = {
  generatedAt: string;
  cadenceLabel: string;
  nextRefreshLabel?: string;
  /* Caller computes staleness server-side (see lib/data/intel/diesel.ts
     isStale helper) so the badge stays a pure render. */
  isStale?: boolean;
};

function formatGeneratedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DataFreshnessBadge({
  generatedAt,
  cadenceLabel,
  nextRefreshLabel,
  isStale = false,
}: Props) {
  return (
    <div
      className={`pulse-freshness ${isStale ? "pulse-freshness--stale" : ""}`}
      data-fresh={!isStale}
    >
      <span className="pulse-freshness-dot" aria-hidden="true" />
      <span className="pulse-freshness-text">
        Updated {formatGeneratedAt(generatedAt)} · {cadenceLabel}
        {nextRefreshLabel ? ` · next refresh ${nextRefreshLabel}` : ""}
        {isStale ? " · refresh delayed, retrying" : ""}
      </span>
    </div>
  );
}
