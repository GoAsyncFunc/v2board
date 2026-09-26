import React from 'react';
import Badge from 'antd/lib/badge';
import moment from 'moment';
import { formatMessage } from '@/locales/i18n';
import type { NumericValue, TicketRecord } from '@/types/commerceContracts';
import type { ColumnProps } from 'antd/lib/table';
const message = (id: string): string => formatMessage({ id });

export function renderTicketLevel(
    levels: readonly string[],
    value: PropertyKey | null | undefined,
): string | undefined {
    const propertyKey = typeof value === 'symbol' ? value : String(value);
    return Reflect.get(levels, propertyKey);
}

export function renderTicketReplyStatus(
    status: number | null | undefined,
    value: NumericValue,
): React.ReactNode {
    const hasReply = Boolean(parseInt(String(value)));
    return 1 === status ? (
        <span>
            <Badge status="success" />
            {message('已关闭')}
        </span>
    ) : (
        <span>
            <Badge status={hasReply ? 'processing' : 'error'} />
            {hasReply ? message('已答复') : message('待处理')}
        </span>
    );
}

export function formatTicketCreatedAt(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}

export function formatTicketUpdatedAt(value: NumericValue): string {
    return moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm');
}

// The 操作 column (view/close events) stays in the page because it owns the page actions.
export function createTicketColumns(levels: readonly string[]): ColumnProps<TicketRecord>[] {
    return [
        { title: '#', dataIndex: 'id', key: 'id' },
        { title: message('主题'), dataIndex: 'subject', key: 'subject' },
        {
            title: message('工单级别'),
            dataIndex: 'level',
            key: 'level',
            render: (value: TicketRecord['level']) => renderTicketLevel(levels, value),
        },
        {
            title: message('工单状态'),
            dataIndex: 'reply_status',
            key: 'reply_status',
            render: (value: NumericValue, record: TicketRecord) =>
                renderTicketReplyStatus(record.status, value),
        },
        {
            title: message('创建时间'),
            dataIndex: 'created_at',
            key: 'created_at',
            render: formatTicketCreatedAt,
        },
        {
            title: message('最后回复'),
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: formatTicketUpdatedAt,
        },
    ];
}
