import moment from 'moment';

// Readonly date/time display shared by user pages; no events or requests.
export function formatDateTime(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function formatDateTimeSeconds(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD');
}

export function formatDateDash(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY-MM-DD');
}

export function formatDaysRemaining(expiredAt: unknown): string {
  return (((expiredAt as number) - Number(moment().format('X'))) / 86400).toFixed(0);
}
