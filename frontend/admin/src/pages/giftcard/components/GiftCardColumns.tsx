import React from 'react';
import Tag from 'antd/lib/tag';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { GiftCardPlan, GiftCardRecord } from '../../../types/promotionContracts';
import { formatDateTime } from '../../../utils/dateTimeFormatter';

export function giftCardTypeText(type: GiftCardRecord['type']): string {
    switch (type) {
        case 1:
            return '金额';
        case 2:
            return '时长';
        case 3:
            return '流量';
        case 4:
            return '重置';
        case 5:
            return '套餐';
        default:
            return '';
    }
}
export function giftCardValueText(
    value: GiftCardRecord['value'],
    card: GiftCardRecord,
): string | number | undefined {
    switch (card.type) {
        case 1:
            return (value as { toFixed: (digits: number) => string }).toFixed(2) + ' ¥';
        case 2:
        case 5:
            return value + ' 天';
        case 3:
            return value + ' GB';
        case 4:
            return '-';
        default:
            return value;
    }
}
export function findGiftCardPlanName(
    plans: GiftCardPlan[] | null | undefined,
    id: GiftCardRecord['plan_id'],
): string | null | undefined {
    if (!plans) throw new TypeError('GiftCard plans were not provided');
    const plan = plans.find((candidate) => candidate.id === id);
    return plan ? plan.name : '-';
}

export function renderGiftCardLimit(limit: GiftCardRecord['limit_use']) {
    return <Tag>{limit !== null ? limit : '无限'}</Tag>;
}

export function formatGiftCardValidity(card: GiftCardRecord): string {
    const startsAt = formatDateTime(card.started_at);
    const endsAt = formatDateTime(card.ended_at);
    return `${startsAt} ~ ${endsAt}`;
}

export function createGiftCardColumns(
    plans: GiftCardPlan[] | null | undefined,
): Record<
    'id' | 'name' | 'type' | 'value' | 'plan_id' | 'limit_use' | 'started_at',
    ColumnProps<GiftCardRecord>
> {
    return {
        id: { title: '#', dataIndex: 'id', key: 'id' },
        name: { title: '名称', dataIndex: 'name', key: 'name' },
        type: { title: '类型', dataIndex: 'type', key: 'type', render: giftCardTypeText },
        value: { title: '数值', dataIndex: 'value', key: 'value', render: giftCardValueText },
        plan_id: {
            title: '套餐',
            dataIndex: 'plan_id',
            key: 'plan_id',
            render: (id: GiftCardRecord['plan_id']) => findGiftCardPlanName(plans, id),
        },
        limit_use: {
            title: '剩余次数',
            dataIndex: 'limit_use',
            key: 'limit_use',
            render: renderGiftCardLimit,
        },
        started_at: {
            title: '有效期',
            dataIndex: 'started_at',
            key: 'started_at',
            align: 'left',
            render: (_value: GiftCardRecord['started_at'], card: GiftCardRecord) =>
                formatGiftCardValidity(card),
        },
    };
}
