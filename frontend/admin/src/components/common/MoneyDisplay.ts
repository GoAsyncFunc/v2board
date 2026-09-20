// Readonly income/count display shared by admin pages; no events or requests.
import type { DisplayScalar } from '../../types/monitoring';

export function formatIncome(value: DisplayScalar): string {
    return value ? ((value as number) / 100).toFixed(2) : '0.00';
}

export function formatLiveCount(value: DisplayScalar): string | number | boolean {
    return value ? value : '0';
}
