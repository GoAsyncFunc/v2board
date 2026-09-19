import React from 'react';
import { Tag } from '../vendor/ui.js';
import { Badge } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { formatMessage } from '../vendor/i18n.js';
import type { NodeRecord, NumericValue } from '../types/commerce';
import type { ColumnProps } from 'antd/lib/table';

import '../vendor/iconStyles.js';
const message = (id: string): string => formatMessage({ id });

export function createNodeColumns(): ColumnProps<NodeRecord>[] {
  return [
    { title: message('名称'), dataIndex: 'name', key: 'name' },
    {
      title: <span><Tooltip placement="top" title={message('节点五分钟内节点在线情况')}>
        {message('状态')}{' '}<Icon type="question-circle" />
      </Tooltip></span>,
      dataIndex: 'is_online', key: 'is_online', align: 'center',
      render: (value: NumericValue) => <Badge status={parseInt(String(value)) ? 'processing' : 'error'} />,
    },
    {
      title: <span><Tooltip placement="top" title={message('使用的流量将乘以倍率进行扣除')}>
        {message('倍率')}{' '}<Icon type="question-circle" />
      </Tooltip></span>,
      dataIndex: 'rate', key: 'rate', align: 'center',
      render: (value: NumericValue) => <Tag style={{ minWidth: 60 }}>{`${value} x`}</Tag>,
    },
    {
      title: message('标签'), dataIndex: 'tags', key: 'tags',
      render: (tags: NodeRecord['tags']) => tags ? tags.map(tag => <Tag key={Math.random()}>{tag}</Tag>) : '-',
    },
  ];
}
