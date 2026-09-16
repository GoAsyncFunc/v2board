import moment from '../vendor/modules/77642f52.js';

// Readonly date/time display shared by user pages; no events or requests.
export function formatDateTime(value) {
  return moment(1000 * value).format('YYYY/MM/DD HH:mm');
}

export function formatDate(value) {
  return moment(1000 * value).format('YYYY/MM/DD');
}

export function formatDateDash(value) {
  return moment(1000 * value).format('YYYY-MM-DD');
}

export function formatDaysRemaining(expiredAt) {
  return ((expiredAt - moment().format('X')) / 86400).toFixed(0);
}
