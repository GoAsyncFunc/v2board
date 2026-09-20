import React from 'react';
import Tag from 'antd/lib/tag';
import type { ColumnProps } from 'antd/lib/table/interface';
import moment from 'moment';

export interface GiftcardPlan { id: number | string; name?: string | null; }
export interface GiftcardRecord {
  [field: string]: string | number | string[] | null | undefined;
  id?: string | number;
  name?: string;
  type?: 1 | 2 | 3 | 4 | 5;
  value?: string | number;
  code?: string;
  plan_id?: string | number | null;
  limit_use?: string | number | null;
  generate_count?: string | number;
  started_at?: number | string | null;
  ended_at?: number | string | null;
}

export function giftcardTypeText(type: GiftcardRecord['type']): string {
  switch (type) {
    case 1: return '金额'; case 2: return '时长'; case 3: return '流量';
    case 4: return '重置'; case 5: return '套餐'; default: return '';
  }
}
export function giftcardValueText(value: GiftcardRecord['value'], card: GiftcardRecord): string | number | undefined {
  switch (card.type) {
    case 1: return (value as { toFixed: (digits: number) => string }).toFixed(2) + ' ¥';
    case 2: case 5: return value + ' 天';
    case 3: return value + ' GB';
    case 4: return '-';
    default: return value;
  }
}
export function findGiftcardPlanName(plans: GiftcardPlan[] | null | undefined, id: GiftcardRecord['plan_id']): string | null | undefined {
  const plan = (plans as GiftcardPlan[]).find(candidate => (candidate as GiftcardPlan).id === id);
  return plan ? plan.name : '-';
}

export function renderGiftcardLimit(limit: GiftcardRecord['limit_use']) {
  return <Tag>{limit !== null ? limit : '无限'}</Tag>;
}

export function formatGiftcardValidity(card: GiftcardRecord): string {
  const startsAt = moment(1000 * (card.started_at as number)).format('YYYY/MM/DD HH:mm');
  const endsAt = moment(1000 * (card.ended_at as number)).format('YYYY/MM/DD HH:mm');
  return `${startsAt} ~ ${endsAt}`;
}

export function createReadonlyGiftcardColumns(plans: GiftcardPlan[] | null | undefined): Record<'id' | 'name' | 'type' | 'value' | 'plan_id' | 'limit_use' | 'started_at', ColumnProps<GiftcardRecord>> {
  return {
    id: { title: '#', dataIndex: 'id', key: 'id' },
    name: { title: '名称', dataIndex: 'name', key: 'name' },
    type: { title: '类型', dataIndex: 'type', key: 'type', render: giftcardTypeText },
    value: { title: '数值', dataIndex: 'value', key: 'value', render: giftcardValueText },
    plan_id: { title: '套餐', dataIndex: 'plan_id', key: 'plan_id', render: (id: GiftcardRecord['plan_id']) => findGiftcardPlanName(plans, id) },
    limit_use: { title: '剩余次数', dataIndex: 'limit_use', key: 'limit_use', render: renderGiftcardLimit },
    started_at: { title: '有效期', dataIndex: 'started_at', key: 'started_at', align: 'left', render: (_value: GiftcardRecord['started_at'], card: GiftcardRecord) => formatGiftcardValidity(card) },
  };
}
