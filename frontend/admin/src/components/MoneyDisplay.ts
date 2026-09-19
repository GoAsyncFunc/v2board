// Readonly income/count display shared by admin pages; no events or requests.
export function formatIncome(value: unknown): string {
  return value ? ((value as number) / 100).toFixed(2) : '0.00';
}

export function formatLiveCount(value: unknown): unknown {
  return value ? value : '0';
}
