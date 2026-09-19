// Readonly money display shared by user pages; no events or requests.
export function formatMoney(value: unknown): string {
  return void 0 !== value ? (parseInt(value as string) / 100).toFixed(2) : '--.--';
}

export function formatPrice(value: unknown): string {
  return ((value as number) / 100).toFixed(2);
}
