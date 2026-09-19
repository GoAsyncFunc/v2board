import { calculateUsage } from '../utils/subscription';

// Readonly subscribe usage display shared by user pages; no events or requests.
export interface SubscriptionUsage {
  u: unknown;
  d: unknown;
  transfer_enable: unknown;
}

export function subscribePercent(subscribe: SubscriptionUsage): number {
  const used = (subscribe.u as number) + (subscribe.d as number);
  return Math.round(calculateUsage(used, subscribe.transfer_enable) * 100) / 100;
}

export function progressBarColor(percent: number): 'danger' | 'warning' | 'success' {
  return percent >= 100 ? 'danger' : percent >= 80 ? 'warning' : 'success';
}

export function formatDeviceLimit(value: string | number | null | undefined): string | number {
  return value == null ? '∞' : value;
}
