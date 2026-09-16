// Readonly income/count display shared by admin pages; no events or requests.
export function formatIncome(value) {
  return value ? (value / 100).toFixed(2) : '0.00';
}

export function formatLiveCount(value) {
  return value ? value : '0';
}
