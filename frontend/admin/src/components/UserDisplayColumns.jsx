import React from 'react';
import { a as Tooltip } from '../vendor/modules/antdTooltip.js';
import { a as Badge } from '../vendor/modules/antdBadge.js';
import moment from '../vendor/modules/77642f52.js';

export function formatUserLastOnline(lastSeen) {
  return lastSeen ? '最后在线'.concat(moment(1000 * lastSeen).format('YYYY-MM-DD HH:mm:ss')) : '从未在线';
}

export function renderUserOnlineStatus(lastSeen) {
  return new Date().getTime() / 1e3 - 600 > lastSeen ? 'default' : 'success';
}

// Readonly email/online column; no sorter, filter or event handlers.
export function createReadonlyUserEmailColumn() {
  return {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    render: (email, record) => <Tooltip placement="top" title={formatUserLastOnline(record.t)}><Badge status={renderUserOnlineStatus(record.t)} />{email}</Tooltip>,
  };
}
