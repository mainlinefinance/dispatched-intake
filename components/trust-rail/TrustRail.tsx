import { IconPhone } from "@/components/icons";
import { BRAND, TRUST_RAIL } from "@/lib/copy";

export default function TrustRail() {
  return (
    <aside className="trust-rail" aria-label="Why you can trust Dispatched">
      <section className="tr-section">
        <div className="tr-eyebrow">{TRUST_RAIL.whySafeLabel}</div>
        <p className="tr-body">{TRUST_RAIL.whySafeBody}</p>
      </section>

      <section className="tr-stats">
        {TRUST_RAIL.stats.map((stat) => (
          <div key={stat.footnote} className="tr-stat">
            <div className="tr-stat-value">
              {stat.value}
              <a
                href={`/disclosures#fn-${stat.footnote}`}
                className="tr-footnote"
                aria-label={`Methodology for ${stat.label}`}
              >
                <sup>{stat.footnote}</sup>
              </a>
            </div>
            <div className="tr-stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="tr-section">
        <div className="tr-eyebrow">{TRUST_RAIL.preferLabel}</div>
        <a
          href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
          className="tr-phone"
          aria-label={`Call ${BRAND.phone}`}
        >
          <IconPhone size={16} />
          <span className="num">{BRAND.phone}</span>
        </a>
        <p className="tr-hours">{BRAND.hoursNote}</p>
      </section>
    </aside>
  );
}
