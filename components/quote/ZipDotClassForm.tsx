import "server-only";

import { getAllDotClasses } from "@/lib/data/dotClasses";
import {
  INSURANCE_CONSENT_TEXT,
  INSURANCE_CONSENT_VERSION,
} from "@/lib/insuranceConsent";
import { BROKER_PARTNER_NAME } from "@/lib/insuranceLeadStore";

/* ===========================================================================
   The hero conversion primitive for the insurance funnel. POSTs form-encoded
   fields to /insurance/quote, where the route handler validates against
   InsuranceStarterSubmissionSchema and persists.

   Two modes:
     1. Without stateSlug — the form renders with a state implied by the URL
        path (e.g., on the pillar page); the route handler will reject the
        submission unless the state is set elsewhere. This mode is for
        future use when a state-picker dropdown lands.
     2. With stateSlug (the common case) — the state is hidden-injected so
        only ZIP + DOT class + radius + contact + consent are visible.

   TrustedForm and Jornaya scripts are loaded via app/insurance/layout.tsx
   (gated by NEXT_PUBLIC_TCPA_ENABLED). When loaded, they inject the
   xxTrustedFormCertUrl and leadid_token hidden inputs on submit.
   =========================================================================== */

type Props = {
  productSlug: string;
  stateSlug?: string;
  preselectedDotClassSlug?: string;
  sourceUrl?: string;
};

export default function ZipDotClassForm({
  productSlug,
  stateSlug,
  preselectedDotClassSlug,
  sourceUrl,
}: Props) {
  const dotClasses = getAllDotClasses();
  return (
    <form
      method="post"
      action="/insurance/quote"
      className="ins-quote-form"
      aria-label="Insurance quote intake"
    >
      <input type="hidden" name="productSlug" value={productSlug} />
      {stateSlug ? (
        <input type="hidden" name="stateSlug" value={stateSlug} />
      ) : null}
      {sourceUrl ? (
        <input type="hidden" name="sourceUrl" value={sourceUrl} />
      ) : null}

      <div className="ins-quote-row">
        <label className="ins-quote-field" htmlFor="ins-quote-zip">
          <span className="ins-quote-label">ZIP code</span>
          <input
            id="ins-quote-zip"
            name="zip"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            minLength={5}
            required
            autoComplete="postal-code"
            placeholder="78701"
          />
        </label>
        <label className="ins-quote-field" htmlFor="ins-quote-dotclass">
          <span className="ins-quote-label">DOT class</span>
          <select
            id="ins-quote-dotclass"
            name="dotClass"
            required
            defaultValue={preselectedDotClassSlug ?? ""}
          >
            <option value="" disabled>
              Select your operation
            </option>
            {dotClasses.map((dc) => (
              <option key={dc.slug} value={dc.slug}>
                {dc.name}
              </option>
            ))}
          </select>
        </label>
        <label className="ins-quote-field" htmlFor="ins-quote-radius">
          <span className="ins-quote-label">Radius</span>
          <select id="ins-quote-radius" name="radius" required defaultValue="">
            <option value="" disabled>
              Typical radius
            </option>
            <option value="local-100">Local — within 100 miles</option>
            <option value="regional-500">Regional — within 500 miles</option>
            <option value="long-haul-1000+">Long-haul — 1,000+ miles</option>
          </select>
        </label>
      </div>

      <div className="ins-quote-row ins-quote-row--contact">
        <label className="ins-quote-field" htmlFor="ins-quote-name">
          <span className="ins-quote-label">Full name</span>
          <input
            id="ins-quote-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="First and last"
          />
        </label>
        <label className="ins-quote-field" htmlFor="ins-quote-mobile">
          <span className="ins-quote-label">Mobile</span>
          <input
            id="ins-quote-mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(555) 010-4477"
          />
        </label>
        <label className="ins-quote-field" htmlFor="ins-quote-email">
          <span className="ins-quote-label">Email</span>
          <input
            id="ins-quote-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
        <button type="submit" className="btn btn--primary">
          Send to {BROKER_PARTNER_NAME}
        </button>
      </div>

      <label className="ins-consent-block" htmlFor="ins-consent">
        <input
          id="ins-consent"
          name="oneToOneConsent"
          type="checkbox"
          required
          value="true"
        />
        <span className="ins-consent-text">{INSURANCE_CONSENT_TEXT}</span>
      </label>

      <input
        type="hidden"
        name="consentVersion"
        value={INSURANCE_CONSENT_VERSION}
      />
      <input
        type="hidden"
        name="consentText"
        value={INSURANCE_CONSENT_TEXT}
      />

      <p className="ins-compliance-note">
        Consent is one-to-one with {BROKER_PARTNER_NAME}. We do not share
        your information beyond this named partner. Standard message and data
        rates may apply.
      </p>
    </form>
  );
}
