import React from 'react';
import { a as Tooltip } from '../vendor/modules/antdTooltip.js';
import { a as Icon } from '../vendor/Icon.js';
import { a as Tag } from '../vendor/modules/antdTag.js';

// Preserve addition's default-hint coercion. String(value), interpolation or
// numeric formatting can invoke a different conversion or suppress exceptions.
export function renderServerRate(value) {
  return <Tag style={{ minWidth: 60 }}>{value + ' x'}</Tag>;
}

// Construct a fresh element on each column creation, just like the original.
export function renderServerRateTitle() {
  return <Tooltip placement="top" title="使用的流量将乘以倍率进行扣除">{'倍率 '}<Icon type="question-circle" /></Tooltip>;
}

export function createServerRateColumn() {
  return {
    title: renderServerRateTitle(),
    dataIndex: 'rate', key: 'rate', align: 'center',
    render: renderServerRate,
  };
}
