import moment from 'moment';
import type { UnixTimestamp } from '../types/date';

export function formatDateTime(value: UnixTimestamp): string {
    return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}
