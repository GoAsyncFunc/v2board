import React from 'react';
import { a as Icon } from '../vendor/Icon.js';

// Counts are rendered directly: no coercion, fallback or added interaction.
export function createReadonlyServerGroupColumns() {
  return {
    id: { title: '组ID', dataIndex: 'id', key: 'id' },
    name: { title: '组名称', dataIndex: 'name', key: 'name' },
    user_count: {
      title: '用户数量', dataIndex: 'user_count', key: 'user_count',
      render: value => <React.Fragment><Icon type="user" style={{ cursor: 'move' }} />{' '}{value}</React.Fragment>,
    },
    server_count: {
      title: '节点数量', dataIndex: 'server_count', key: 'server_count',
      render: value => <React.Fragment><Icon type="database" style={{ cursor: 'move' }} />{' '}{value}</React.Fragment>,
    },
  };
}
