import React from 'react';
import { a as Tag } from '../vendor/modules/6d723332.js';
import moment from '../vendor/modules/77642f52.js';

// Read and format the start before accessing the end, as in the original renderer.
// Missing timestamps and null records deliberately keep their existing behavior.
export function formatCouponValidity(coupon) {
  const startsAt = moment(1000 * coupon.started_at).format('YYYY/MM/DD HH:mm');
  const endsAt = moment(1000 * coupon.ended_at).format('YYYY/MM/DD HH:mm');
  return `${startsAt} ~ ${endsAt}`;
}

export function formatCouponType(type) {
  return type === 1 ? '金额' : '比例';
}
export function renderCouponLimit(limit) {
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
      render: (value, coupon) => formatCouponValidity(coupon),
    },
  };
}
