export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price);
}

export function formatPriceWithCurrency(price: number): string {
  return `₩${formatPrice(price)}`;
}

export function getImageSet(index: number): string {
  const setNum = (index % 10) + 1;
  return `set-${String(setNum).padStart(2, '0')}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getDiscountedPrice(price: number, discountRate?: number): number {
  if (!discountRate) return price;
  return Math.round(price * (1 - discountRate / 100));
}

export function getNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
