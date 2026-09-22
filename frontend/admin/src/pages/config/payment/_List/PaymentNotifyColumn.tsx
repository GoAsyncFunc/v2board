import React from 'react';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { PaymentRecord } from '../../../../types/payment';

export function createPaymentNotifyColumn(): ColumnProps<PaymentRecord> {
    return {
        title: (
            <span>
                {'通知地址 '}
                <Tooltip
                    placement="top"
                    title="支付网关将会把数据通知到本地址，请通过防火墙放行本地址。"
                >
                    <Icon type="question-circle" />
                </Tooltip>
            </span>
        ),
        dataIndex: 'notify_url',
        key: 'notify_url',
    };
}
