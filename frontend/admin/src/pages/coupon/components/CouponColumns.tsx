import React from 'react';
import Tag from 'antd/lib/tag';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { CouponRecord } from '../../../types/promotion';
import { formatDateTime } from '../../../utils/dateTime';

// Read and format the start before accessing the end, as in the original renderer.
// Missing timestamps and null records deliberately keep their existing behavior.
export function formatCouponValidity(coupon: CouponRecord): string {
    const startsAt = formatDateTime(coupon.started_at);
    const endsAt = formatDateTime(coupon.ended_at);
    return `${startsAt} ~ ${endsAt}`;
}

export function formatCouponType(type: CouponRecord['type']): string {
    return type === 1 ? '金额' : '比例';
}
export function renderCouponLimit(limit: CouponRecord['limit_use']) {
    return <Tag>{limit !== null ? limit : '无限'}</Tag>;
}

export function createReadonlyCouponColumns(): Record<
    'id' | 'name' | 'type' | 'limit_use' | 'started_at',
    ColumnProps<CouponRecord>
> {
    return {
        id: { title: '#', dataIndex: 'id', key: 'id' },
        name: { title: '券名称', dataIndex: 'name', key: 'name' },
        type: { title: '类型', dataIndex: 'type', key: 'type', render: formatCouponType },
        limit_use: {
            title: '剩余次数',
            dataIndex: 'limit_use',
            key: 'limit_use',
            render: renderCouponLimit,
        },
        started_at: {
            title: '有效期',
            dataIndex: 'started_at',
            key: 'started_at',
            align: 'left',
            render: (_value: CouponRecord['started_at'], coupon: CouponRecord) =>
                formatCouponValidity(coupon),
        },
    };
}
