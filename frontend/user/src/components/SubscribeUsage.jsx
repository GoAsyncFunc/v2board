import { calculateUsage } from '../vendor/siteHelpers.js';

// Readonly subscribe usage display shared by user pages; no events or requests.
export function subscribePercent(subscribe) {
  return Math.round(calculateUsage(subscribe.u + subscribe.d, subscribe.transfer_enable) * 100) / 100;
}

export function progressBarColor(percent) {
  return percent >= 100 ? 'danger' : percent >= 80 ? 'warning' : 'success';
}

export function formatDeviceLimit(value) {
  return value == null ? '∞' : value;
}
