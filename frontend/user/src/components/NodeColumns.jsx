import React from 'react';
import { a as Tag } from '../vendor/modules/6d723332.js';
import { a as Badge } from '../vendor/modules/4b725473.js';
import { a as Tooltip } from '../vendor/modules/3353372b.js';
import { a as Icon } from '../vendor/Icon.js';
import { formatMessage } from '../vendor/i18n.js';
import '../vendor/modules/2b424a64.js';
import '../vendor/modules/41776870.js';
import '../vendor/modules/35446d6f.js';
import '../vendor/iconStyles.js';
const message = id => formatMessage({ id });

export function createNodeColumns() {
  return [
    { title: message('名称'), dataIndex: 'name', key: 'name' },
    {
      title: <span><Tooltip placement="top" title={message('节点五分钟内节点在线情况')}>
        {message('状态')}{' '}<Icon type="question-circle" />
      </Tooltip></span>,
      dataIndex: 'is_online', key: 'is_online', align: 'center',
      render: value => <Badge status={parseInt(value) ? 'processing' : 'error'} />,
    },
    {
      title: <span><Tooltip placement="top" title={message('使用的流量将乘以倍率进行扣除')}>
        {message('倍率')}{' '}<Icon type="question-circle" />
      </Tooltip></span>,
      dataIndex: 'rate', key: 'rate', align: 'center',
      render: value => <Tag style={{ minWidth: 60 }}>{value + ' x'}</Tag>,
    },
    {
      title: message('标签'), dataIndex: 'tags', key: 'tags',
      render: tags => tags ? tags.map(tag => <Tag key={Math.random()}>{tag}</Tag>) : '-',
    },
  ];
}
