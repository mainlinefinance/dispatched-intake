/* Support phone, shown site-wide (nav, hero, footer, FAQ, sticky CTA) and in
   the Organization JSON-LD. NEXT_PUBLIC_SUPPORT_PHONE (E.164, e.g.
   +1XXXXXXXXXX) overrides the default; unset or blank uses it. */
const DEFAULT_E164 = "+13073170801";

const RAW = (process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "").trim() || DEFAULT_E164;

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
