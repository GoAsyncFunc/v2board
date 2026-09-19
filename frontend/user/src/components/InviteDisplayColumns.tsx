import moment from '../vendor/dateTime.js';
import { formatMessage } from '../vendor/i18n.js';
import type { NumericValue } from '../types/commerce';
const message = (id: string): string => formatMessage({ id });

export function formatInviteCreatedAt(value: NumericValue): string {
  return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}

export function formatCommissionAmount(value: NumericValue): string {
  return (Number(value) / 100).toFixed(2);
}

// The 邀请码 column keeps its copy-link onClick in the page; only its date column is readonly.
export function createInviteCodeDateColumn() {
  return { title: message('创建时间'), dataIndex: 'created_at', key: 'created_at', align: 'right', render: formatInviteCreatedAt };
}

export function createReadonlyCommissionColumns() {
  return [
    { title: message('发放时间'), dataIndex: 'created_at', key: 'created_at', render: formatInviteCreatedAt },
    { title: message('佣金'), dataIndex: 'get_amount', key: 'get_amount', align: 'right', render: formatCommissionAmount },
  ];
}
