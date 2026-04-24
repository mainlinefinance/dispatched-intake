const DEFAULT_E164 = "+13073170801";

const RAW = (process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? DEFAULT_E164).trim();

export const SUPPORT_PHONE_E164 = RAW;
export const PHONE_TEL = `tel:${RAW}`;
export const PHONE_DISPLAY = formatUsPhone(RAW);

function formatUsPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits.slice(-10);
  if (ten.length !== 10) return e164;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}
