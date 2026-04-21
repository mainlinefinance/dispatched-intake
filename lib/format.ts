export function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function formatMoneyDigitsOnly(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}
