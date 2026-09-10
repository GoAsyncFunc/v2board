import React from 'react';
import { a as Divider } from '../vendor/Divider.js';
import { a as Badge } from '../vendor/modules/4b725473.js';
import { a as Tag } from '../vendor/modules/6d723332.js';
import history from '../vendor/routerHistory.js';
import moment from '../vendor/modules/77642f52.js';
import { a as settings } from '../vendor/localeSettings.js';
import { formatMessage } from '../vendor/i18n.js';
import '../vendor/modules/2f7a7346.js';
import '../vendor/modules/41776870.js';
import '../vendor/modules/2b424a64.js';
export const orderBadgeStatuses = ['error', 'processing', 'default', 'success', 'default'];
const message = id => formatMessage({ id });
export function createOrderColumns(onCancel) {
  return [
    { title: message('# 订单号'), dataIndex: 'trade_no', key: 'trade_no', render: tradeNo => <a href="javascript:void(0);" onClick={() => history.push('/order/' + tradeNo)}>{tradeNo}</a> },
    { title: message('周期'), dataIndex: 'period', key: 'period', align: 'center', render: (value, order) => <Tag>{settings.periodText[order.period] && settings.periodText[order.period]()}</Tag> },
    { title: message('订单金额'), dataIndex: 'total_amount', key: 'total_amount', align: 'right', render: value => (value / 100).toFixed(2) },
    { title: message('订单状态'), dataIndex: 'status', key: 'status', render: status => <div><Badge status={orderBadgeStatuses[status]} />{settings.orderStatusText[status] && settings.orderStatusText[status]()}</div> },
    { title: message('创建时间'), dataIndex: 'created_at', key: 'created_at', render: value => moment(1000 * value).format('YYYY/MM/DD HH:mm') },
    { title: message('操作'), dataIndex: 'action', key: 'action', align: 'right', fixed: 'right', render: (value, order) => <div>
      <a disabled={order.status === 2} href="javascript:void(0);" onClick={() => history.push('/order/' + order.trade_no)}>{message('查看详情')}</a>
      <Divider type="vertical" />
      <a disabled={order.status !== 0} href="javascript:void(0);" onClick={() => onCancel(order)}>{message('取消')}</a>
    </div> },
  ];
}
