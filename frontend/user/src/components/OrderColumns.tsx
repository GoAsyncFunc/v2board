import React from 'react';
import { Divider } from '../vendor/Divider.js';
import { Badge } from '../vendor/ui.js';
import { Tag } from '../vendor/ui.js';
import history from '../vendor/routerHistory.js';
import { formatDateTime } from './DateTimeDisplay';
import { formatPrice } from './MoneyDisplay';
import { localeSettings as settings } from '../vendor/localeSettings.js';
import { formatMessage } from '../vendor/i18n.js';
import type { NumericValue, OrderRecord } from '../types/commerce';
import type { ColumnProps } from 'antd/lib/table';

export const orderBadgeStatuses: Array<'error' | 'processing' | 'default' | 'success'> = ['error', 'processing', 'default', 'success', 'default'];
const message = (id: string): string => formatMessage({ id });
export function createOrderColumns(onCancel: (order: OrderRecord) => void): ColumnProps<OrderRecord>[] {
  return [
    { title: message('# 订单号'), dataIndex: 'trade_no', key: 'trade_no', render: (tradeNo: string) => <a href="javascript:void(0);" onClick={() => history.push('/order/' + tradeNo)}>{tradeNo}</a> },
    { title: message('周期'), dataIndex: 'period', key: 'period', align: 'center', render: (_value: string, order: OrderRecord) => {
      const periodText: (() => string) | undefined = Reflect.get(settings.periodText, order.period);
      return <Tag>{periodText?.()}</Tag>;
    } },
    { title: message('订单金额'), dataIndex: 'total_amount', key: 'total_amount', align: 'right', render: (value: NumericValue) => formatPrice(value) },
    { title: message('订单状态'), dataIndex: 'status', key: 'status', render: (status: number) => {
      const statusText: (() => string) | undefined = Reflect.get(settings.orderStatusText, status);
      return <div><Badge status={orderBadgeStatuses[status]} />{statusText?.()}</div>;
    } },
    { title: message('创建时间'), dataIndex: 'created_at', key: 'created_at', render: (value: NumericValue) => formatDateTime(value) },
    { title: message('操作'), dataIndex: 'action', key: 'action', align: 'right', fixed: 'right', render: (_value: undefined, order: OrderRecord) => <div>
      <a {...{ disabled: order.status === 2 }} href="javascript:void(0);" onClick={() => history.push('/order/' + order.trade_no)}>{message('查看详情')}</a>
      <Divider type="vertical" />
      <a {...{ disabled: order.status !== 0 }} href="javascript:void(0);" onClick={() => onCancel(order)}>{message('取消')}</a>
    </div> },
  ];
}
