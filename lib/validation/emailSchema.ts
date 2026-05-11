import { z } from "zod";

export const EmailSubscribeSchema = z.object({
  email: z.string().email("Invalid email address.").max(254),
  source: z.string().min(1).max(200),
});

export type EmailSubscribe = z.infer<typeof EmailSubscribeSchema>;
