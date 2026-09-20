import type { NumericValue } from '../../types/commerce';

// Readonly money display shared by user pages; no events or requests.
export function formatMoney(value: NumericValue): string {
  return void 0 !== value ? (parseInt(value as string) / 100).toFixed(2) : '--.--';
}

export function formatPrice(value: NumericValue): string {
  return ((value as number) / 100).toFixed(2);
}
