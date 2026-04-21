import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

function isUsMobile(v: string): boolean {
  const parsed = parsePhoneNumberFromString(v, "US");
  return !!parsed && parsed.country === "US" && parsed.isValid();
}

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Please enter your full name")
    .refine((v) => v.split(/\s+/).length >= 2, "First and last name"),
  mobile: z
    .string()
    .refine(isUsMobile, "Enter a valid US mobile number"),
  email: z.string().email("Enter a valid email"),
});

export type ContactInput = z.infer<typeof ContactSchema>;

const bandTierSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const IntakePayloadSchema = z.object({
  useCase: z.enum(["repairs", "fuel", "equipment", "bridge", "other"]),
  vertical: z.enum([
    "owner-operator",
    "small-fleet",
    "contractor",
    "other-trade",
  ]),
  amount: z.number().positive(),
  amountBand: z.enum(["preset-low", "preset-mid", "preset-high", "custom"]),
  revenueTier: bandTierSchema,
  timeInBusinessTier: bandTierSchema,
  creditBand: z.enum([
    "under-580",
    "580-650",
    "650-720",
    "720+",
    "not-sure",
  ]),
  contact: ContactSchema,
});

export type IntakePayload = z.infer<typeof IntakePayloadSchema>;
