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
