import moment from 'moment';
import type React from 'react';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { TicketLevel, TicketRecord, TicketTimestamp } from '../../types/ticket';

export function renderTicketLevel(
    levels: readonly React.ReactNode[],
    value: TicketLevel,
): React.ReactNode {
    return Reflect.get(levels, value as PropertyKey) as React.ReactNode;
}

export function formatTicketCreatedAt(value: TicketTimestamp): string {
    return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function formatTicketUpdatedAt(value: TicketTimestamp): string {
    return moment(1000 * (value as number)).format('YYYY/MM/DD HH:mm');
}

export function createReadonlyTicketColumns(
    levels: readonly React.ReactNode[],
): Record<'id' | 'subject' | 'level' | 'created_at' | 'updated_at', ColumnProps<TicketRecord>> {
    return {
        id: { title: '#', dataIndex: 'id', key: 'id' },
        subject: { title: '主题', dataIndex: 'subject', key: 'subject' },
        level: {
            title: '工单级别',
            dataIndex: 'level',
            key: 'level',
            render: (value: TicketLevel) => renderTicketLevel(levels, value),
        },
        created_at: {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            render: formatTicketCreatedAt,
        },
        updated_at: {
            title: '最后回复',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: formatTicketUpdatedAt,
        },
    };
}
