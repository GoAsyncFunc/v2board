import React from 'react';
import Badge from 'antd/lib/badge';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';

export type ServerStatus = React.ComponentProps<typeof Badge>['status'];
export type ServerStatusMap = Record<PropertyKey, ServerStatus>;

export interface ServerAvailability {
  available_status: PropertyKey;
}

// Synchronous construction keeps the original child order and fresh elements.
export function renderServerStatusLegend(): React.ReactElement {
  return <div>
    <Badge status="error" />{' 未运行'}<br />
    <Badge status="warning" />{' 无人使用或服务端上报异常'}<br />
    <Badge status="processing" />{' 运行正常'}<br />
  </div>;
}

export function renderServerNameTitle(): React.ReactElement {
  return <span><Tooltip placement="top" title={renderServerStatusLegend()}>{'节点 '}<Icon type="question-circle" /></Tooltip></span>;
}

// Synchronous renderer: preserve raw name children and direct status lookup.
export function renderServerName(statuses: ServerStatusMap, value: React.ReactNode, server: ServerAvailability): React.ReactElement {
  return <React.Fragment><Badge status={statuses[server.available_status]} /><span>{value}</span></React.Fragment>;
}

export function createServerNameColumn(statuses: ServerStatusMap) {
  return {
    title: renderServerNameTitle(),
    dataIndex: 'name', key: 'name',
    render: (value: React.ReactNode, server: ServerAvailability) => renderServerName(statuses, value, server),
  };
}
