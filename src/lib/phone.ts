export function normalizePhone(phone: string): string {
  let p = phone.replace(/\D/g, "");
  if (p.startsWith("880")) return `+${p}`;
  if (p.startsWith("0")) return `+880${p.slice(1)}`;
  if (p.length === 10) return `+880${p}`;
  return phone.startsWith("+") ? phone : `+${p}`;
}

export function phoneToEmail(phone: string): string {
  const digits = normalizePhone(phone).replace(/\D/g, "");
  return `${digits}@patients.drjarinsdental.local`;
}
