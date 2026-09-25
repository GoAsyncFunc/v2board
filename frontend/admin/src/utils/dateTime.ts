import moment from 'moment';
import type { UnixTimestamp } from '../types/dateTimeContracts';

export function formatDateTime(value: UnixTimestamp, format = 'YYYY/MM/DD HH:mm'): string {
    return moment(1000 * Number(value)).format(format);
}
