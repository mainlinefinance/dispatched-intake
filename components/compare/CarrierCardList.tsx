import Link from "next/link";

import type { Carrier } from "@/lib/data/carriers";

type Props = {
  carriers: Carrier[];
};

type AmBestTier = "superior" | "excellent" | "not-rated" | "pending";

function classifyAmBest(c: Carrier): { tier: AmBestTier; label: string } {
  if (c.notRated === true) {
    return { tier: "not-rated", label: "Not Rated" };
  }
  if (!c.amBestRating || !c.amBestVerifiedAt) {
    return { tier: "pending", label: "Pending verification" };
  }
  const r = c.amBestRating;
  if (
    r.startsWith("A++") ||
    r.startsWith("A+") ||
    r.startsWith("A ") ||
    r === "A"
  ) {
    return { tier: "superior", label: r };
  }
  if (r.startsWith("A-") || r.startsWith("B+")) {
    return { tier: "excellent", label: r };
  }
  return { tier: "pending", label: r };
}

export default function CarrierCardList({ carriers }: Props) {
  return (
    <div className="carrier-list">
      {carriers.map((c) => {
        const { tier, label } = classifyAmBest(c);
        return (
          <Link
            key={c.slug}
            href={`/carriers/${c.slug}`}
            className="carrier-card"
          >
            <div>
              <h3 className="carrier-name">{c.name}</h3>
              {c.parentGroup ? (
                <p className="carrier-parent">{c.parentGroup}</p>
              ) : null}
            </div>
            {c.notes ? <p className="carrier-summary">{c.notes}</p> : <span />}
            <span className={`am-best am-best--${tier}`}>
              <span className="am-best-dot" />
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
