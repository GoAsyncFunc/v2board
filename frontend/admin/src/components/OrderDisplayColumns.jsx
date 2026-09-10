import React from 'react';
import { a as Tag } from '../vendor/modules/6d723332.js';
import { a as settings } from '../vendor/modules/7449346c.js';
import moment from '../vendor/modules/77642f52.js';

export function createReadonlyOrderColumns() {
  return {
    type: { title: '类型', dataIndex: 'type', key: 'type', render: value => ({1:'新购',2:'续费',3:'变更',4:'流量包',9:'充值'})[value] },
    period: { title: '周期', dataIndex: 'period', key: 'period', align: 'center', render: (value, order) => <Tag>{settings.periodText[order.period]}</Tag> },
    total_amount: { title: '支付金额', dataIndex: 'total_amount', key: 'total_amount', align: 'right', render: value => (value / 100).toFixed(2) },
    commission_balance: { title: '佣金金额', dataIndex: 'commission_balance', key: 'commission_balance', align: 'right', render: (value, order) => order.status === 0 || order.status === 2 ? '-' : value ? (value / 100).toFixed(2) : '-' },
    created_at: { title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'right', render: value => moment(1000 * value).format('YYYY/MM/DD HH:mm') },
  };
}
