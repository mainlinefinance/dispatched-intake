/* Outbound email kits — shared types.
   Kept free of runtime imports so both the Next.js app and the Node
   scripts under scripts/outreach/ can load it. */

export type Segment = "new-authority" | "owner-operator" | "small-fleet";

export type Lead = {
  /** USDOT number, digits only. */
  dot: string;
  email: string;
  /** Display-cased legal or DBA name. */
  company: string;
  /** Two-letter US state. */
  state: string;
  powerUnits: number;
  /** ISO date (YYYY-MM-DD) the carrier was added to the FMCSA census. */
  addDate?: string;
  segment: Segment;
};

export type Cta = {
  label: string;
  /** Site-relative path. UTM parameters are appended at render time. */
  path: string;
};

export type Step = {
  /** 1-based position in the sequence. */
  step: number;
  /** Days after step 1 that this step becomes due. */
  dayOffset: number;
  /** Step 1 only. Follow-ups are sent as replies and reuse the thread
      subject. More than one entry means an A/B split, picked per lead. */
  subjects?: string[];
  /** Paragraphs. Supports {{company}}, {{dot}}, {{state}}, {{units}},
      {{sender}} tokens. */
  body: string[];
  cta: Cta;
};

export type Kit = {
  segment: Segment;
  /** Short operator-facing description of who this kit targets. */
  audience: string;
  steps: Step[];
};

export type Layout = "plain" | "branded";

export type RenderOptions = {
  /** Site origin, no trailing slash. */
  siteUrl: string;
  /** Name that signs the email. Must be a real person or team name. */
  senderName: string;
  unsubscribeUrl: string;
  layout?: Layout;
};

export type RenderedEmail = {
  /** Undefined for follow-ups (they inherit the thread subject). */
  subject?: string;
  text: string;
  html: string;
};
