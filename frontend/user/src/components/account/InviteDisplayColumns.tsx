import moment from 'moment';
import { formatMessage } from '../../locales/i18n';
import type { NumericValue } from '../../types/commerce';
import type { ColumnProps } from 'antd/lib/table';
import type { CommissionRecord, InviteCode } from '../../types/invite';
const message = (id: string): string => formatMessage({ id });

export function formatInviteCreatedAt(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}

export function formatCommissionAmount(value: NumericValue): string {
    return (Number(value) / 100).toFixed(2);
}

// The 邀请码 column keeps its copy-link onClick in the page; only its date column is readonly.
export function createInviteCodeDateColumn(): ColumnProps<InviteCode> {
    return {
        title: message('创建时间'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'right',
        render: formatInviteCreatedAt,
    };
}

export function createReadonlyCommissionColumns(): ColumnProps<CommissionRecord>[] {
    return [
        {
            title: message('发放时间'),
            dataIndex: 'created_at',
            key: 'created_at',
            render: formatInviteCreatedAt,
        },
        {
            title: message('佣金'),
            dataIndex: 'get_amount',
            key: 'get_amount',
            align: 'right',
            render: formatCommissionAmount,
        },
    ];
}
