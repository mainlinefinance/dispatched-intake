import type {
  AmountBand,
  BandTier,
  CreditBand,
  UseCase,
  Vertical,
} from "./types";

export const BRAND = {
  name: "Dispatched",
  phone: "(555) 555-0100",
  hoursNote: "Mon–Fri, 7am–7pm Central. A real person, not a bot.",
};

export const SCREEN1 = {
  kicker: "AI Capital Advisor",
  heroTitle: "Working capital, matched in minutes",
  question:
    "Hey — tell me what you need the money for and I'll see who can fund it fastest.",
};

export const USE_CASE_OPTIONS: { value: UseCase; label: string }[] = [
  { value: "repairs", label: "Repairs" },
  { value: "fuel", label: "Fuel" },
  { value: "equipment", label: "Equipment" },
  { value: "bridge", label: "Bridge a slow month" },
  { value: "other", label: "Something else" },
];

export const SCREEN2 = {
  question: "Got it. What kind of operation are you running?",
};

export type VerticalIcon = "truck" | "trucks" | "hardhat" | "tools";

export const VERTICAL_OPTIONS: {
  value: Vertical;
  label: string;
  sub: string;
  icon: VerticalIcon;
}[] = [
  {
    value: "owner-operator",
    label: "Owner-operator trucker",
    sub: "1 truck, your own authority",
    icon: "truck",
  },
  {
    value: "small-fleet",
    label: "Small fleet",
    sub: "2–10 trucks",
    icon: "trucks",
  },
  {
    value: "contractor",
    label: "Contractor / GC",
    sub: "Residential or commercial",
    icon: "hardhat",
  },
  {
    value: "other-trade",
    label: "Other trade",
    sub: "Plumbing, HVAC, electrical",
    icon: "tools",
  },
];

export const VERTICAL_TAG: Record<Vertical, string> = {
  "owner-operator": "Trucking",
  "small-fleet": "Trucking",
  contractor: "Construction",
  "other-trade": "Trades",
};

export type AmountPreset = {
  band: Exclude<AmountBand, "custom">;
  label: string;
  midpoint: number;
};

export const AMOUNT_COPY: Record<
  Vertical,
  { question: string; presets: AmountPreset[] }
> = {
  "owner-operator": {
    question: "How much are you trying to get?",
    presets: [
      { band: "preset-low", label: "$25K–$75K", midpoint: 50000 },
      { band: "preset-mid", label: "$75K–$150K", midpoint: 112500 },
      { band: "preset-high", label: "$150K+", midpoint: 200000 },
    ],
  },
  "small-fleet": {
    question: "How much capital does the fleet need?",
    presets: [
      { band: "preset-low", label: "$50K–$150K", midpoint: 100000 },
      { band: "preset-mid", label: "$150K–$300K", midpoint: 225000 },
      { band: "preset-high", label: "$300K+", midpoint: 400000 },
    ],
  },
  contractor: {
    question: "How much are you trying to draw?",
    presets: [
      { band: "preset-low", label: "$50K–$150K", midpoint: 100000 },
      { band: "preset-mid", label: "$150K–$500K", midpoint: 325000 },
      { band: "preset-high", label: "$500K+", midpoint: 650000 },
    ],
  },
  "other-trade": {
    question: "How much are you trying to get?",
    presets: [
      { band: "preset-low", label: "$25K–$75K", midpoint: 50000 },
      { band: "preset-mid", label: "$75K–$150K", midpoint: 112500 },
      { band: "preset-high", label: "$150K+", midpoint: 200000 },
    ],
  },
};

export const REVENUE_COPY: Record<
  Vertical,
  { question: string; options: { tier: BandTier; label: string }[] }
> = {
  "owner-operator": {
    question:
      "What does the truck gross in a typical month? Ballpark is fine — we'll verify later.",
    options: [
      { tier: 1, label: "Under $15K" },
      { tier: 2, label: "$15K–$40K" },
      { tier: 3, label: "$40K–$100K" },
      { tier: 4, label: "$100K+" },
    ],
  },
  "small-fleet": {
    question:
      "What does the fleet gross per month? Ballpark is fine — we'll verify later.",
    options: [
      { tier: 1, label: "$40K–$100K" },
      { tier: 2, label: "$100K–$250K" },
      { tier: 3, label: "$250K–$500K" },
      { tier: 4, label: "$500K+" },
    ],
  },
  contractor: {
    question:
      "Average monthly invoicing? Ballpark is fine — we'll verify later.",
    options: [
      { tier: 1, label: "Under $25K" },
      { tier: 2, label: "$25K–$75K" },
      { tier: 3, label: "$75K–$200K" },
      { tier: 4, label: "$200K+" },
    ],
  },
  "other-trade": {
    question: "Typical monthly revenue? Ballpark is fine — we'll verify later.",
    options: [
      { tier: 1, label: "Under $15K" },
      { tier: 2, label: "$15K–$40K" },
      { tier: 3, label: "$40K–$100K" },
      { tier: 4, label: "$100K+" },
    ],
  },
};

export const TIME_IN_BUSINESS_COPY: Record<
  Vertical,
  { question: string; options: { tier: BandTier; label: string }[] }
> = {
  "owner-operator": {
    question: "How long have you been under your own authority?",
    options: [
      { tier: 1, label: "Under 6 months" },
      { tier: 2, label: "6–12 months" },
      { tier: 3, label: "1–3 years" },
      { tier: 4, label: "3+ years" },
    ],
  },
  "small-fleet": {
    question: "How long has the fleet been operating?",
    options: [
      { tier: 1, label: "Under 1 year" },
      { tier: 2, label: "1–3 years" },
      { tier: 3, label: "3–5 years" },
      { tier: 4, label: "5+ years" },
    ],
  },
  contractor: {
    question: "How long has the GC been licensed?",
    options: [
      { tier: 1, label: "Under 1 year" },
      { tier: 2, label: "1–3 years" },
      { tier: 3, label: "3–5 years" },
      { tier: 4, label: "5+ years" },
    ],
  },
  "other-trade": {
    question: "How long have you been in business?",
    options: [
      { tier: 1, label: "Under 6 months" },
      { tier: 2, label: "6–12 months" },
      { tier: 3, label: "1–3 years" },
      { tier: 4, label: "3+ years" },
    ],
  },
};

export const CREDIT_COPY = {
  question:
    'Last thing before I pull matches — where\u2019s your credit roughly? If you don\u2019t know, pick "not sure" and we\u2019ll check softly.',
  reassurance: "Soft check only. No impact on your score.",
  options: [
    { value: "under-580", label: "Under 580" },
    { value: "580-650", label: "580–650" },
    { value: "650-720", label: "650–720" },
    { value: "720+", label: "720+" },
    { value: "not-sure", label: "Not sure" },
  ] as { value: CreditBand; label: string }[],
};

export const SCREEN7 = {
  leadIn: "Pulled your matches.",
  eyebrow: "Soft match — no credit impact",
  rangeLabel: "Estimated range",
  aprLabel: "Estimated APR",
  timingLabel: "Estimated time to funds",
  lenderPhrase: "matched your profile.",
  timingPrefix: "Typical:",
  timingSuffix: "from signed application.",
  dataFlow: [
    { n: 1, strong: "Soft check.", rest: "No credit impact." },
    {
      n: 2,
      strong: "Redacted profile",
      rest: "sent to 3–5 matched lenders.",
    },
    { n: 3, strong: "You pick one.", rest: "That lender pulls — no one else." },
  ],
  reassure:
    "Your info stays private until you pick a lender. No brokers will cold-call you.",
  primaryCta: "See my matches",
  secondaryCta: "Talk to someone first",
};

export const SCREEN8 = {
  leadInPrevAnswer: "Show me",
  leadIn: "Where should I send them?",
  nameLabel: "Your name",
  nameHelp: "First and last — make sure it matches how you file taxes.",
  mobileLabel: "Mobile",
  mobileHelp: "We text the match list. No robocalls.",
  emailLabel: "Email",
  emailHelp:
    "Where we send the match list after you complete the application.",
  submitCta: "Show my matches",
  microcopyLead: "By continuing you agree to our",
  microcopyLink: "terms",
  microcopyTail: ". This does not affect your credit.",
};

export const SUBMITTED = {
  eyebrow: "Request received",
  title: "We\u2019re pulling matches now.",
  body: (maskedPhone: string) =>
    `You\u2019ll get a text at ${maskedPhone} within 10 minutes with your match list. Keep your phone handy.`,
};

export const PROGRESS_BY_SCREEN: Record<number, number> = {
  1: 0,
  2: 15,
  3: 30,
  4: 45,
  5: 60,
  6: 75,
  7: 100,
  8: 100,
};
