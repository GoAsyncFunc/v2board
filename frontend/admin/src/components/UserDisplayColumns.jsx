import React from 'react';
import { Tooltip } from '../vendor/ui.js';
import { Badge } from '../vendor/ui.js';
import moment from '../vendor/dateTime.js';

export function formatUserLastOnline(lastSeen) {
  return lastSeen ? `最后在线${moment(1000 * lastSeen).format('YYYY-MM-DD HH:mm:ss')}` : '从未在线';
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
