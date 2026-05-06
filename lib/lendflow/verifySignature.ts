import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyLendflowSignature(args: {
  secret: string;
  timestamp: string;
  body: string;
  signature: string;
}): boolean {
  const expected = createHmac("sha256", args.secret)
    .update(args.timestamp + args.body)
    .digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(args.signature);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
