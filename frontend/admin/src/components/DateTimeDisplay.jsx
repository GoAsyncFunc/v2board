import moment from '../vendor/dateTime.js';

// Readonly date/time display shared by admin pages; no events or requests.
export function formatDateTime(value) {
  return moment(1000 * value).format('YYYY/MM/DD HH:mm');
}
