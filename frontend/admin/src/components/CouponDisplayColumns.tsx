import React from 'react';
import Tag from 'antd/lib/tag';
import moment from 'moment';

export interface CouponRecord {
  started_at?: number | string | null;
  ended_at?: number | string | null;
}

// Read and format the start before accessing the end, as in the original renderer.
// Missing timestamps and null records deliberately keep their existing behavior.
export function formatCouponValidity(coupon: CouponRecord): string {
  const startsAt = moment(1000 * (coupon.started_at as number)).format('YYYY/MM/DD HH:mm');
  const endsAt = moment(1000 * (coupon.ended_at as number)).format('YYYY/MM/DD HH:mm');
  return `${startsAt} ~ ${endsAt}`;
}

export function formatCouponType(type: unknown): string {
  return type === 1 ? '金额' : '比例';
}
export function renderCouponLimit(limit: unknown) {
  return <Tag>{limit !== null ? limit : '无限'}</Tag>;
}

export function createReadonlyCouponColumns() {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    name: { title: '券名称', dataIndex: 'name', key: 'name' },
    type: { title: '类型', dataIndex: 'type', key: 'type', render: formatCouponType },
    limit_use: { title: '剩余次数', dataIndex: 'limit_use', key: 'limit_use', render: renderCouponLimit },
    started_at: {
      title: '有效期', dataIndex: 'started_at', key: 'started_at', align: 'left',
      render: (_value: unknown, coupon: CouponRecord) => formatCouponValidity(coupon),
    },
  };
}
