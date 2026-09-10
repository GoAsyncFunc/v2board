import React from 'react';
import { a as Tag } from '../vendor/modules/6d723332.js';
import moment from '../vendor/modules/77642f52.js';

export function giftcardTypeText(type) {
  switch (type) {
    case 1: return '金额'; case 2: return '时长'; case 3: return '流量';
    case 4: return '重置'; case 5: return '套餐'; default: return '';
  }
}
export function giftcardValueText(value, card) {
  switch (card.type) {
    case 1: return value.toFixed(2) + ' ¥';
    case 2: case 5: return value + ' 天';
    case 3: return value + ' GB';
    case 4: return '-';
    default: return value;
  }
}
export function createReadonlyGiftcardColumns(plans) {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    name: { title: '名称', dataIndex: 'name', key: 'name' },
    type: { title: '类型', dataIndex: 'type', key: 'type', render: giftcardTypeText },
    value: { title: '数值', dataIndex: 'value', key: 'value', render: giftcardValueText },
    plan_id: { title: '套餐', dataIndex: 'plan_id', key: 'plan_id', render: id => { const plan = plans.find(plan => plan.id === id); return plan ? plan.name : '-'; } },
    limit_use: { title: '剩余次数', dataIndex: 'limit_use', key: 'limit_use', render: value => <Tag>{value !== null ? value : '无限'}</Tag> },
    started_at: { title: '有效期', dataIndex: 'started_at', key: 'started_at', align: 'left', render: (value, card) => `${moment(1000 * card.started_at).format('YYYY/MM/DD HH:mm')} ~ ${moment(1000 * card.ended_at).format('YYYY/MM/DD HH:mm')}` },
  };
}
