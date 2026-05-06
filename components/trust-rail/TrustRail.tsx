import { IconPhone } from "@/components/icons";
import { BRAND, TRUST_RAIL } from "@/lib/copy";

export default function TrustRail() {
  return (
    <aside className="trust-rail" aria-label="Why you can trust Dispatched">
      <section className="tr-section">
        <div className="tr-eyebrow">{TRUST_RAIL.whySafeLabel}</div>
        <p className="tr-body">{TRUST_RAIL.whySafeBody}</p>
      </section>

      <ul className="tr-promises">
        {TRUST_RAIL.promises.map((p) => (
          <li key={p.footnote} className="tr-promise">
            <span className="tr-promise-bullet" aria-hidden="true" />
            <span className="tr-promise-label">{p.label}</span>
            <a
              href={`/disclosures#fn-${p.footnote}`}
              className="tr-footnote"
              aria-label={`Methodology for ${p.label}`}
            >
              <sup>{p.footnote}</sup>
            </a>
          </li>
        ))}
      </ul>

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
