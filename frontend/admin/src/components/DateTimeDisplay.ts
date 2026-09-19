import moment from 'moment';

// Readonly date/time display shared by admin pages; no events or requests.
export function formatDateTime(value: unknown): string {
  return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}
