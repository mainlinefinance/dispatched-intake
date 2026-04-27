export type UseCase = "repairs" | "fuel" | "equipment" | "bridge" | "other";

export type Vertical =
  | "owner-operator"
  | "small-fleet"
  | "contractor"
  | "other-trade";

export type AmountBand = "preset-low" | "preset-mid" | "preset-high" | "custom";

export type BandTier = 1 | 2 | 3 | 4;

export type CreditBand =
  | "under-580"
  | "580-650"
  | "650-720"
  | "720+"
  | "not-sure";

export type MatchTier = "A" | "B" | "C";

export type MatchResult = {
  lenderCount: number;
  rangeLow: number;
  rangeHigh: number;
  aprLow: number;
  aprHigh: number;
  timingLow: number;
  timingHigh: number;
  tier: MatchTier;
};

export type Contact = {
  name: string;
  mobile: string;
  email: string;
};

export type IntakeContext = {
  useCase: UseCase | null;
  vertical: Vertical | null;
  amount: number | null;
  amountBand: AmountBand | null;
  revenueTier: BandTier | null;
  timeInBusinessTier: BandTier | null;
  creditBand: CreditBand | null;
  matchEstimate: MatchResult | null;
  contact: Contact | null;
  hasSeenMatch: boolean;
};

export const INITIAL_CONTEXT: IntakeContext = {
  useCase: null,
  vertical: null,
  amount: null,
  amountBand: null,
  revenueTier: null,
  timeInBusinessTier: null,
  creditBand: null,
  matchEstimate: null,
  contact: null,
  hasSeenMatch: false,
};

/* ===========================================================================
   Insurance-side intake types. The insurance flow is a parallel track to the
   financing intake above and does not share IntakeContext — operator profile,
   coverage limits, and TCPA consent artifacts are insurance-specific.

   The financing intake stays exactly as-is; insurance gets its own context,
   own state machine, and own validators. The only shared atom is Contact.
   =========================================================================== */

export type RadiusBand = "local-100" | "regional-500" | "long-haul-1000+";

export type AuthorityStatus =
  | "own-authority"
  | "leased-on"
  | "applying"
  | "no-authority";

export type ClaimsHistoryBand =
  | "clean-36mo"
  | "1-claim"
  | "2-plus-claims"
  | "not-sure";

export type CoverageLimitBand =
  | "fmcsa-minimum"
  | "1m-standard"
  | "2m-elevated"
  | "5m-hazmat";

export type InsuranceIntent = {
  productSlug: string | null;
  dotClassSlug: string | null;
  stateAbbr: string | null;
  zip: string | null;
  radiusBand: RadiusBand | null;
  authorityStatus: AuthorityStatus | null;
  claimsHistory: ClaimsHistoryBand | null;
  coverageLimitBand: CoverageLimitBand | null;
  hasReeferUnit: boolean | null;
  carriesHazmat: boolean | null;
  trustedFormCert: string | null;
  jornayaToken: string | null;
};

export type InsuranceContext = {
  intent: InsuranceIntent;
  contact: Contact | null;
  hasSeenMatch: boolean;
};

export const INITIAL_INSURANCE_INTENT: InsuranceIntent = {
  productSlug: null,
  dotClassSlug: null,
  stateAbbr: null,
  zip: null,
  radiusBand: null,
  authorityStatus: null,
  claimsHistory: null,
  coverageLimitBand: null,
  hasReeferUnit: null,
  carriesHazmat: null,
  trustedFormCert: null,
  jornayaToken: null,
};

export const INITIAL_INSURANCE_CONTEXT: InsuranceContext = {
  intent: INITIAL_INSURANCE_INTENT,
  contact: null,
  hasSeenMatch: false,
};
