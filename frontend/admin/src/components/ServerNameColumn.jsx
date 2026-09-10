import React from 'react';
import { a as Tooltip } from '../vendor/modules/3353372b.js';
import { a as Badge } from '../vendor/modules/4b725473.js';
import { a as Icon } from '../vendor/Icon.js';

export function createServerNameColumn(statuses) {
  return {
    title: <span><Tooltip placement="top" title={<div>
      <Badge status="error" />{' 未运行'}<br />
      <Badge status="warning" />{' 无人使用或服务端上报异常'}<br />
      <Badge status="processing" />{' 运行正常'}<br />
    </div>}>{'节点 '}<Icon type="question-circle" /></Tooltip></span>,
    dataIndex: 'name', key: 'name',
    render: (value, server) => <React.Fragment><Badge status={statuses[server.available_status]} /><span>{value}</span></React.Fragment>,
  };
}
