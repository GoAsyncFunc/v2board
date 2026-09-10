import React from 'react';
import { a as Tooltip } from '../vendor/modules/3353372b.js';
import { a as Icon } from '../vendor/Icon.js';
import { a as Tag } from '../vendor/modules/6d723332.js';

export function createServerRateColumn() {
  return {
    title: <Tooltip placement="top" title="使用的流量将乘以倍率进行扣除">{'倍率 '}<Icon type="question-circle" /></Tooltip>,
    dataIndex: 'rate', key: 'rate', align: 'center',
    render: value => <Tag style={{ minWidth: 60 }}>{value + ' x'}</Tag>,
  };
}
