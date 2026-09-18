import React from 'react';
import { a as Badge } from '../vendor/modules/antdBadge.js';
import moment from '../vendor/modules/77642f52.js';
import { formatMessage } from '../vendor/i18n.js';
const message = id => formatMessage({ id });

export function renderTicketLevel(levels, value) {
  return levels[value];
}

export function renderTicketReplyStatus(status, value) {
  return 1 === status
    ? <span><Badge status="success" />{message('已关闭')}</span>
    : <span><Badge status={parseInt(value) ? 'processing' : 'error'} />{parseInt(value) ? message('已答复') : message('待处理')}</span>;
}

export function formatTicketCreatedAt(value) {
  return moment(1000 * value).format('YYYY/MM/DD HH:mm');
}

export function formatTicketUpdatedAt(value) {
  return moment(1000 * value).format('YYYY/MM/DD HH:mm');
}

// Readonly columns only; the 操作 column (view/close events) stays in the page.
export function createReadonlyTicketColumns(levels) {
  return [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: message('主题'), dataIndex: 'subject', key: 'subject' },
    { title: message('工单级别'), dataIndex: 'level', key: 'level', render: value => renderTicketLevel(levels, value) },
    { title: message('工单状态'), dataIndex: 'reply_status', key: 'reply_status', render: (value, record) => renderTicketReplyStatus(record.status, value) },
    { title: message('创建时间'), dataIndex: 'created_at', key: 'created_at', render: formatTicketCreatedAt },
    { title: message('最后回复'), dataIndex: 'updated_at', key: 'updated_at', render: formatTicketUpdatedAt },
  ];
}
