import { calculateUsage } from '../../utils/subscription';
import type { UserSubscription } from '../../types/subscriptionContracts';

// Readonly subscribe usage display shared by user pages; no events or requests.
export type SubscriptionUsage = Pick<UserSubscription, 'u' | 'd' | 'transfer_enable'>;

export function hasSubscriptionUsage(
    subscription: Partial<UserSubscription>,
): subscription is Partial<UserSubscription> & SubscriptionUsage {
    return (
        typeof subscription.u === 'number' &&
        typeof subscription.d === 'number' &&
        typeof subscription.transfer_enable === 'number'
    );
}

export function subscribePercent(subscribe: SubscriptionUsage): number {
    const used = subscribe.u + subscribe.d;
    return Math.round(calculateUsage(used, subscribe.transfer_enable) * 100) / 100;
}

export function progressBarColor(percent: number): 'danger' | 'warning' | 'success' {
    return percent >= 100 ? 'danger' : percent >= 80 ? 'warning' : 'success';
}

export function formatDeviceLimit(value: string | number | null | undefined): string | number {
    return value == null ? '∞' : value;
}
