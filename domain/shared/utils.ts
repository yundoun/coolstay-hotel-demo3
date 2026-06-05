export function krw(n: number): string {
  return `₩${new Intl.NumberFormat('ko-KR').format(n)}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatTime(time?: string): string {
  if (!time) return '';
  const cleaned = time.replace(/[^0-9]/g, '');
  if (cleaned.length >= 4) return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
  if (cleaned.length >= 2) return `${cleaned.slice(0, 2)}:00`;
  return time;
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function formatKoDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}(${DAY_NAMES[d.getDay()]})`;
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/[^0-9]/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}
