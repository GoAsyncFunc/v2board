import React from 'react';
import { Tooltip } from '../vendor/ui.js';
import { Badge } from '../vendor/ui.js';
import { a as Icon } from '../vendor/Icon.js';

// Synchronous construction keeps the original child order and fresh elements.
export function renderServerStatusLegend() {
  return <div>
    <Badge status="error" />{' 未运行'}<br />
    <Badge status="warning" />{' 无人使用或服务端上报异常'}<br />
    <Badge status="processing" />{' 运行正常'}<br />
  </div>;
}

export function renderServerNameTitle() {
  return <span><Tooltip placement="top" title={renderServerStatusLegend()}>{'节点 '}<Icon type="question-circle" /></Tooltip></span>;
}

// Synchronous renderer: preserve raw name children and direct status lookup.
export function renderServerName(statuses, value, server) {
  return <React.Fragment><Badge status={statuses[server.available_status]} /><span>{value}</span></React.Fragment>;
}

export function createServerNameColumn(statuses) {
  return {
    title: renderServerNameTitle(),
    dataIndex: 'name', key: 'name',
    render: (value, server) => renderServerName(statuses, value, server),
  };
}
