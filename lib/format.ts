export function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function formatMoneyDigitsOnly(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
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
