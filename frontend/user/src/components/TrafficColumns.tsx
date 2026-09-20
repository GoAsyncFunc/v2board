import React from 'react';
import moment from 'moment';
import { Tooltip } from '../vendor/ui.js';
import { Tag } from '../vendor/ui.js';
import Icon from 'antd/lib/icon';
import { formatBytes } from '../vendor/siteHelpers.js';
import { formatMessage } from '../vendor/i18n.js';
import type { NumericValue, TrafficRecord } from '../types/commerce';
import type { ColumnProps } from 'antd/lib/table';


const message = (id: string): string => formatMessage({ id });
export function createTrafficColumns(): ColumnProps<TrafficRecord>[] {
  return [
    {
      title: message('记录时间'), dataIndex: 'record_at', key: 'record_at',
      render: (value: NumericValue) => value ? moment(1000 * Number(value)).format('YYYY/MM/DD') : '-',
    },
    {
      title: message('实际上行'), dataIndex: 'u', key: 'u', align: 'right',
      render: (value: string, record: TrafficRecord) => record.server_rate ? formatBytes(parseInt(value)) : 0,
    },
    {
      title: message('实际下行'), dataIndex: 'd', key: 'd', align: 'right',
      render: (value: string, record: TrafficRecord) => record.server_rate ? formatBytes(parseInt(value)) : 0,
    },
    {
      title: message('扣费倍率'), dataIndex: 'server_rate', key: 'server_rate', align: 'center',
      render: (value: TrafficRecord['server_rate']) => {
        const rate = parseFloat(String(value));
        return <Tag style={{ minWidth: 60 }}>{rate ? rate.toFixed(2) + ' x' : '-'}</Tag>;
      },
    },
    {
      title: <Tooltip placement="topRight" title={message('公式：(实际上行 + 实际下行) x 扣费倍率 = 扣除流量')}>
        {message('合计')}{' '}<Icon type="question-circle" />
      </Tooltip>,
      dataIndex: 'total', key: 'total', align: 'right', fixed: 'right',
      render: (_value: undefined, record: TrafficRecord) => formatBytes((parseInt(record.u) + parseInt(record.d)) * Number(record.server_rate)),
    },
  ];
}
