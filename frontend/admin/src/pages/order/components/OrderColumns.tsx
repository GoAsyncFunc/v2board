import React from 'react';
import Tag from 'antd/lib/tag';
import type { ColumnProps } from 'antd/lib/table/interface';
import moment from 'moment';
import { settings } from '../../../config/adminSettings';

export interface OrderDisplayRecord {
    status: number;
    period: PropertyKey;
}

type InheritedObjectMethod = (...args: never[]) => string;
type OrderTypeLabel = string | InheritedObjectMethod | undefined;

// Preserve status short-circuiting and value truthiness. Do not destructure status
// or convert the amount before checking whether the order hides commission.
export function formatOrderCommission(
    value: number | null | undefined,
    order: OrderDisplayRecord,
): string {
    return order.status === 0 || order.status === 2 ? '-' : value ? (value / 100).toFixed(2) : '-';
}

export function formatOrderPaymentAmount(value: number): string {
    return (value / 100).toFixed(2);
}

export function formatOrderCreatedAt(value: number): string {
    return moment(1000 * value).format('YYYY/MM/DD HH:mm');
}

// Keep a fresh ordinary object and direct property lookup (including coercion
// and inherited properties); a Map or strict switch would change semantics.
export function formatOrderType(value: PropertyKey): OrderTypeLabel {
    return (
        { 1: '新购', 2: '续费', 3: '变更', 4: '流量包', 9: '充值' } as Record<
            PropertyKey,
            OrderTypeLabel
        >
    )[value];
}

export function renderOrderPeriod(
    _value: OrderDisplayRecord['period'],
    order: OrderDisplayRecord,
): React.ReactElement {
    return <Tag>{settings.periodText[order.period]}</Tag>;
}

export function createOrderColumns<
    RecordType extends OrderDisplayRecord = OrderDisplayRecord,
>(): Record<string, ColumnProps<RecordType>> {
    return {
        type: { title: '类型', dataIndex: 'type', key: 'type', render: formatOrderType },
        period: {
            title: '周期',
            dataIndex: 'period',
            key: 'period',
            align: 'center',
            render: (value, order) => renderOrderPeriod(value, order),
        },
        total_amount: {
            title: '支付金额',
            dataIndex: 'total_amount',
            key: 'total_amount',
            align: 'right',
            render: formatOrderPaymentAmount,
        },
        commission_balance: {
            title: '佣金金额',
            dataIndex: 'commission_balance',
            key: 'commission_balance',
            align: 'right',
            render: (value, order) => formatOrderCommission(value, order),
        },
        created_at: {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'right',
            render: formatOrderCreatedAt,
        },
    };
}
