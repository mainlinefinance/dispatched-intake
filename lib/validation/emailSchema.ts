import { z } from "zod";

export const PULSE_INTEREST_VALUES = [
  "diesel",
  "freight",
  "regulation",
  "lender-appetite",
  "digest",
] as const;

export const EmailSubscribeSchema = z.object({
  email: z.string().email("Invalid email address.").max(254),
  source: z.string().min(1).max(200),
  interests: z.array(z.enum(PULSE_INTEREST_VALUES)).max(10).optional(),
});

export type EmailSubscribe = z.infer<typeof EmailSubscribeSchema>;
export type PulseInterest = (typeof PULSE_INTEREST_VALUES)[number];
