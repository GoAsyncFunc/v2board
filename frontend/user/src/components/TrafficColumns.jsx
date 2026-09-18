import React from 'react';
import moment from '../vendor/modules/77642f52.js';
import { a as Tooltip } from '../vendor/modules/antdTooltip.js';
import { a as Tag } from '../vendor/modules/antdTag.js';
import { a as Icon } from '../vendor/Icon.js';
import { b as formatTraffic } from '../vendor/siteHelpers.js';
import { formatMessage } from '../vendor/i18n.js';
import '../vendor/modules/35446d6f.js';
import '../vendor/modules/2b424a64.js';
import '../vendor/iconStyles.js';

const message = id => formatMessage({ id });
export function createTrafficColumns() {
  return [
    {
      title: message('记录时间'), dataIndex: 'record_at', key: 'record_at',
      render: value => value ? moment(1000 * value).format('YYYY/MM/DD') : '-',
    },
    {
      title: message('实际上行'), dataIndex: 'u', key: 'u', align: 'right',
      render: (value, record) => record.server_rate ? formatTraffic(parseInt(value)) : 0,
    },
    {
      title: message('实际下行'), dataIndex: 'd', key: 'd', align: 'right',
      render: (value, record) => record.server_rate ? formatTraffic(parseInt(value)) : 0,
    },
    {
      title: message('扣费倍率'), dataIndex: 'server_rate', key: 'server_rate', align: 'center',
      render: value => <Tag style={{ minWidth: 60 }}>{parseFloat(value) ? parseFloat(value).toFixed(2) + ' x' : '-'}</Tag>,
    },
    {
      title: <Tooltip placement="topRight" title={message('公式：(实际上行 + 实际下行) x 扣费倍率 = 扣除流量')}>
        {message('合计')}{' '}<Icon type="question-circle" />
      </Tooltip>,
      dataIndex: 'total', key: 'total', align: 'right', fixed: 'right',
      render: (value, record) => formatTraffic((parseInt(record.u) + parseInt(record.d)) * record.server_rate),
    },
  ];
}
