import React from 'react';
import { a as Icon } from '../vendor/Icon.js';

export function createReadonlyPlanResourceColumns() {
  return {
    name: { title: '名称', dataIndex: 'name', key: 'name' },
    count: { title: '统计', dataIndex: 'count', key: 'count', render: value => <React.Fragment><Icon type="user" style={{ cursor: 'move' }} />{' '}{value}</React.Fragment> },
    transfer_enable: { title: '流量', dataIndex: 'transfer_enable', key: 'transfer_enable', render: value => <React.Fragment>{value}{' GB'}</React.Fragment> },
    device_limit: { title: '设备数限制', dataIndex: 'device_limit', key: 'device_limit', render: value => value !== null ? value : '-' },
  };
}
