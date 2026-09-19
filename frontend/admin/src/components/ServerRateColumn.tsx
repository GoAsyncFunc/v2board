import React from 'react';
import Icon from 'antd/lib/icon';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';

// Preserve addition's default-hint coercion. String(value), interpolation or
// numeric formatting can invoke a different conversion or suppress exceptions.
export function renderServerRate(value: unknown): React.ReactElement {
  return <Tag style={{ minWidth: 60 }}>{(value as string) + ' x'}</Tag>;
}

// Construct a fresh element on each column creation, just like the original.
export function renderServerRateTitle(): React.ReactElement {
  return <Tooltip placement="top" title="使用的流量将乘以倍率进行扣除">{'倍率 '}<Icon type="question-circle" /></Tooltip>;
}

export function createServerRateColumn() {
  return {
    title: renderServerRateTitle(),
    dataIndex: 'rate', key: 'rate', align: 'center',
    render: renderServerRate,
  };
}
