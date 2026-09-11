import React from 'react';
import { a as Tag } from '../vendor/modules/6d723332.js';
import { a as settings } from '../vendor/modules/7449346c.js';
import moment from '../vendor/modules/77642f52.js';

// Preserve status short-circuiting and value truthiness. Do not destructure status
// or convert the amount before checking whether the order hides commission.
export function formatOrderCommission(value, order) {
  return order.status === 0 || order.status === 2
    ? '-'
    : value ? (value / 100).toFixed(2) : '-';
}

export function formatOrderPaymentAmount(value) {
  return (value / 100).toFixed(2);
}

export function formatOrderCreatedAt(value) {
  return moment(1000 * value).format('YYYY/MM/DD HH:mm');
}

// Keep a fresh ordinary object and direct property lookup (including coercion
// and inherited properties); a Map or strict switch would change semantics.
export function formatOrderType(value) {
  return ({1:'新购',2:'续费',3:'变更',4:'流量包',9:'充值'})[value];
}

export function renderOrderPeriod(value, order) {
  return <Tag>{settings.periodText[order.period]}</Tag>;
}

export function createReadonlyOrderColumns() {
  return {
    type: { title: '类型', dataIndex: 'type', key: 'type', render: formatOrderType },
    period: { title: '周期', dataIndex: 'period', key: 'period', align: 'center', render: renderOrderPeriod },
    total_amount: { title: '支付金额', dataIndex: 'total_amount', key: 'total_amount', align: 'right', render: formatOrderPaymentAmount },
    commission_balance: { title: '佣金金额', dataIndex: 'commission_balance', key: 'commission_balance', align: 'right', render: formatOrderCommission },
    created_at: { title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'right', render: formatOrderCreatedAt },
  };
}
