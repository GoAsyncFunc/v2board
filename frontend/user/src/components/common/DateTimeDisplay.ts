import moment from 'moment';
import type { NumericValue } from '@/types/commerceContracts';

// Readonly date/time display shared by user pages; no events or requests.
export function formatDateTime(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}

export function formatDateTimeSeconds(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY/MM/DD');
}

export function formatDateDash(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY-MM-DD');
}

export function formatDaysRemaining(expiredAt: NumericValue): string {
    return ((Number(expiredAt) - Number(moment().format('X'))) / 86400).toFixed(0);
}
