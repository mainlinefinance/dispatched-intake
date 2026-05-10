export function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function formatMoneyDigitsOnly(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

/* Parse a money-shaped string to integer dollars. Splits the decimal
   portion off FIRST, then strips non-digits — so "$80,000.50" returns
   80000, not 8000050 (which would be a 100x bug under naive non-digit
   stripping with formatMoneyDigitsOnly). Cents are intentionally
   discarded; calculator inputs model integer-dollar prices only. */
export function parseDollars(raw: string): number {
  const integerPart = raw.split(".")[0] ?? "";
  const digits = integerPart.replace(/[^0-9]/g, "");
  if (!digits) return 0;
  return Number(digits);
}

/* Replace every digit except the last four with • so submitted-screen
   shows "(•••) •••-2740" and we never echo the full mobile back. */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  let masked = "";
  let digitsSeen = 0;
  const total = digits.length;
  for (const ch of phone) {
    if (/\d/.test(ch)) {
      digitsSeen += 1;
      masked += digitsSeen > total - 4 ? ch : "\u2022";
    } else {
      masked += ch;
    }
  }
  return masked;
}
