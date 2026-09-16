// Readonly money display shared by user pages; no events or requests.
export function formatMoney(value) {
  return void 0 !== value ? (parseInt(value) / 100).toFixed(2) : '--.--';
}

export function formatPrice(value) {
  return (value / 100).toFixed(2);
}
