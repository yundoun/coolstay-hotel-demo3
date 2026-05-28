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
