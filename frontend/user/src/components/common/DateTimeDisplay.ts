import moment from 'moment';
import type { NumericValue } from '../../types/commerce';

// Readonly date/time display shared by user pages; no events or requests.
export function formatDateTime(value: NumericValue): string {
    return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function formatDateTimeSeconds(value: NumericValue): string {
    return moment(1000 * (value as number)).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(value: NumericValue): string {
    return moment(1000 * (value as number)).format('YYYY/MM/DD');
}

export function formatDateDash(value: NumericValue): string {
    return moment(1000 * (value as number)).format('YYYY-MM-DD');
}

export function formatDaysRemaining(expiredAt: NumericValue): string {
    return (((expiredAt as number) - Number(moment().format('X'))) / 86400).toFixed(0);
}
