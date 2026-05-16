import { z } from "zod";

/* HDYHAU = "How did you hear about us." Single-select attribution survey
   on /apply and /qualify. Channel options are ordered with AI engines
   first because the primary purpose is closing the AEO measurement gap
   (D5 in the AEO audit) — they're the channels GA4 referrer attribution
   cannot reliably capture for users who copy-paste an answer from
   ChatGPT/Perplexity/Claude and land as Direct traffic. */

export const HDYHAU_CHANNELS = [
  "chatgpt",
  "perplexity",
  "claude",
  "gemini",
  "google-ai-overviews",
  "google-search",
  "reddit",
  "linkedin",
  "youtube",
  "podcast-or-newsletter",
  "forum",
  "friend-referral",
  "other",
] as const;

export type HdyhauChannel = (typeof HDYHAU_CHANNELS)[number];

export const HDYHAU_SOURCES = ["apply", "qualify"] as const;
export type HdyhauSource = (typeof HDYHAU_SOURCES)[number];

export const HDYHAU_WRITE_IN_MAX = 200;

export const HdyhauSchema = z
  .object({
    channel: z.enum(HDYHAU_CHANNELS),
    writeIn: z.string().trim().max(HDYHAU_WRITE_IN_MAX).optional(),
    source: z.enum(HDYHAU_SOURCES),
  })
  .refine(
    (v) => v.channel !== "other" || (v.writeIn && v.writeIn.length > 0),
    {
      message: "writeIn is required when channel is 'other'",
      path: ["writeIn"],
    },
  );

export type HdyhauPayload = z.infer<typeof HdyhauSchema>;

export const HDYHAU_CHANNEL_LABELS: Record<HdyhauChannel, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  "google-ai-overviews": "Google AI Overviews",
  "google-search": "Google search",
  reddit: "Reddit",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  "podcast-or-newsletter": "Podcast / newsletter",
  forum: "TruckersReport or other forum",
  "friend-referral": "Friend / referral",
  other: "Other",
};
