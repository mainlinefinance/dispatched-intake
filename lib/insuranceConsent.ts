import "server-only";

/* ===========================================================================
   Single source of truth for the FCC one-to-one TCPA consent disclosure on
   the insurance funnel.

   Discipline: this string is what gets persisted on every lead as
   tcpa.consentText. Auditing a consent record means showing exactly what the
   operator agreed to. Editing this string mid-flight breaks audit trails for
   leads collected before the change — version it (CONSENT_VERSION) and
   persist the version with each lead so reads are unambiguous.
   =========================================================================== */

export const INSURANCE_CONSENT_VERSION = "v1-2026-04-27";

export const INSURANCE_CONSENT_TEXT =
  "I authorize Dispatched Finance and the named broker partner identified at submission to contact me by phone, text, and email — including via automated technology and pre-recorded messages — using the contact information I provide, even if I am on a Do Not Call list. My consent is one-to-one with that named partner. I understand my consent is not a condition of any purchase and I may opt out at any time.";
