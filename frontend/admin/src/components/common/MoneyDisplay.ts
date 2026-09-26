// Income/count display shared by admin pages; no events, requests, or table actions.
import type { DisplayScalar } from '@/types/monitoringContracts';

export function formatIncome(value: DisplayScalar): string {
    return value ? (Number(value) / 100).toFixed(2) : '0.00';
}

export function formatLiveCount(value: DisplayScalar): string | number | boolean {
    return value ? value : '0';
}
