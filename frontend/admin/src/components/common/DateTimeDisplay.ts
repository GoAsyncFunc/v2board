import moment from 'moment';

export type TimestampValue = string | number | null | undefined;

// Readonly date/time display shared by admin pages; no events or requests.
export function formatDateTime(value: TimestampValue): string {
  return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}
