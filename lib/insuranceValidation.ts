import { z } from "zod";

import { ContactSchema } from "./validation";
import { getProductSlugs } from "./data/products";
import { getDotClassSlugs } from "./data/dotClasses";
import { getInsuranceStateSlugs } from "./data/states";

/* ===========================================================================
   Validators for the insurance lead pipeline. The schema is in place even
   though no live submit endpoint consumes it yet — putting the contract
   here forces the eventual /insurance/quote handler to validate against the
   same shape that the form already conforms to.

   TCPA fields:
     - trustedFormCert: ActiveProspect TrustedForm cert URL. Validated as a
       URL on the cert.trustedform.com domain.
     - jornayaToken: Verisk Jornaya LeadiD UUID. Validated as a UUID v1/v4.
     - oneToOneConsent: must be true. We persist the *moment* consent was
       given (consentTimestamp) and the exact text shown to the operator
       (consentText). Both are required artifacts under the FCC one-to-one
       rule — auditing a consent record means proving what the user saw.
   =========================================================================== */

const TRUSTEDFORM_PATTERN = /^https:\/\/cert\.trustedform\.com\/[A-Fa-f0-9]{40,}$/;
const JORNAYA_LEADID_PATTERN =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const ZIP_PATTERN = /^\d{5}$/;

const productSlugSchema = z.enum(
  getProductSlugs() as [string, ...string[]],
);

const dotClassSlugSchema = z.enum(
  getDotClassSlugs() as [string, ...string[]],
);

const stateSlugSchema = z.enum(
  getInsuranceStateSlugs() as [string, ...string[]],
);

const radiusSchema = z.enum([
  "local-100",
  "regional-500",
  "long-haul-1000+",
]);

const authorityStatusSchema = z.enum([
  "own-authority",
  "leased-on",
  "applying",
  "no-authority",
]);

const claimsHistorySchema = z.enum([
  "clean-36mo",
  "1-claim",
  "2-plus-claims",
  "not-sure",
]);

const coverageLimitSchema = z.enum([
  "fmcsa-minimum",
  "1m-standard",
  "2m-elevated",
  "5m-hazmat",
]);

export const InsuranceIntentSchema = z.object({
  productSlug: productSlugSchema,
  dotClassSlug: dotClassSlugSchema,
  stateSlug: stateSlugSchema,
  zip: z.string().regex(ZIP_PATTERN, "ZIP must be 5 digits"),
  radiusBand: radiusSchema,
  authorityStatus: authorityStatusSchema,
  claimsHistory: claimsHistorySchema,
  coverageLimitBand: coverageLimitSchema,
  hasReeferUnit: z.boolean(),
  carriesHazmat: z.boolean(),
});

export const TcpaArtifactsSchema = z.object({
  trustedFormCert: z
    .string()
    .regex(
      TRUSTEDFORM_PATTERN,
      "TrustedForm cert URL must be on cert.trustedform.com",
    ),
  jornayaToken: z
    .string()
    .regex(JORNAYA_LEADID_PATTERN, "Jornaya LeadiD must be a valid UUID"),
  oneToOneConsent: z.literal(true, {
    message: "Operator must affirmatively check the consent box",
  }),
  consentTimestamp: z
    .string()
    .datetime({ message: "consentTimestamp must be ISO 8601 UTC" }),
  consentText: z
    .string()
    .min(40, "consentText must capture the literal copy the operator saw"),
});

export const InsuranceLeadSubmissionSchema = z.object({
  intent: InsuranceIntentSchema,
  contact: ContactSchema,
  tcpa: TcpaArtifactsSchema,
});

/* ---------------------------------------------------------------------------
   Starter submission — what the hero ZipDotClassForm actually captures.
   The full InsuranceLeadSubmissionSchema represents the eventual qualified
   lead (with claims history, coverage limit, hazmat etc.); a real producer
   step extends from this starter into the full shape.

   TrustedForm / Jornaya fields are optional in the schema's shape because
   dev environments don't load the scripts. In production the route handler
   enforces presence via INSURANCE_LEAD_REQUIRE_TCPA — see
   lib/insuranceLeadStore.ts.
   --------------------------------------------------------------------------- */

const StarterIntentSchema = z.object({
  productSlug: productSlugSchema,
  dotClassSlug: dotClassSlugSchema,
  stateSlug: stateSlugSchema,
  zip: z.string().regex(ZIP_PATTERN, "ZIP must be 5 digits"),
  radiusBand: radiusSchema,
});

const StarterTcpaSchema = z.object({
  trustedFormCert: z
    .string()
    .regex(TRUSTEDFORM_PATTERN)
    .optional(),
  jornayaToken: z.string().regex(JORNAYA_LEADID_PATTERN).optional(),
  oneToOneConsent: z.literal(true, {
    message: "Operator must affirmatively check the consent box",
  }),
  consentVersion: z.string().min(3),
  consentTimestamp: z.string().datetime(),
  consentText: z.string().min(40),
});

export const InsuranceStarterSubmissionSchema = z.object({
  intent: StarterIntentSchema,
  contact: ContactSchema,
  tcpa: StarterTcpaSchema,
});

export type InsuranceIntentInput = z.infer<typeof InsuranceIntentSchema>;
export type TcpaArtifactsInput = z.infer<typeof TcpaArtifactsSchema>;
export type InsuranceLeadSubmission = z.infer<
  typeof InsuranceLeadSubmissionSchema
>;
export type InsuranceStarterSubmission = z.infer<
  typeof InsuranceStarterSubmissionSchema
>;
