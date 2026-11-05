/* Support phone is optional. The former Cheyenne/TCopyCats (307) number was
   removed for Google Ads entity consistency. Set NEXT_PUBLIC_SUPPORT_PHONE
   (E.164, e.g. +1XXXXXXXXXX) only when Angelo confirms a replacement. */
const RAW = (process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "").trim();

export const SUPPORT_PHONE_E164 = RAW;
export const HAS_SUPPORT_PHONE = RAW.length > 0;
export const PHONE_TEL = HAS_SUPPORT_PHONE ? `tel:${RAW}` : "";
export const PHONE_DISPLAY = HAS_SUPPORT_PHONE ? formatUsPhone(RAW) : "";

function formatUsPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const ten =
    digits.length === 11 && digits.startsWith("1")
      ? digits.slice(1)
      : digits.slice(-10);
  if (ten.length !== 10) return e164;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}
