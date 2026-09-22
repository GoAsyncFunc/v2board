import React from 'react';
import Badge from 'antd/lib/badge';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import { settings } from '../../../config/adminSettings';
import type { AdminDispatch } from '../../../types/store';
import type { OrderRecord } from '../../../types/order';
import { ConnectedOrderDetailModal } from '../_Modal/detail';
import { createReadonlyOrderColumns } from './columns';

const readonlyColumns = createReadonlyOrderColumns<OrderRecord>();
const ORDER_BADGE_STATUS = ['error', 'processing', 'default', 'success', 'default'] as const;
const COMMISSION_BADGE_STATUS = ['default', 'processing', 'success', 'error'] as const;

export function renderOrderStatus(
    dispatch: AdminDispatch,
    status: number,
    order: OrderRecord,
): React.ReactElement {
    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => dispatch({ type: 'order/paid', tradeNo: order.trade_no })}
            >
                已支付
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={() => dispatch({ type: 'order/cancel', tradeNo: order.trade_no })}
            >
                取消
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown disabled={status !== 0} trigger={['click']} overlay={menu}>
            <div>
                <Badge status={ORDER_BADGE_STATUS[status]} />
                <span>{settings.orderStatusText[status]} </span>
                {status === 0 && (
                    <a href="javascript:void(0);">
                        标记为 <Icon type="caret-down" />
                    </a>
                )}
            </div>
        </Dropdown>
    );
}

export function renderCommissionStatus(
    dispatch: AdminDispatch,
    status: number,
    order: OrderRecord,
): React.ReactNode {
    if (order.status === 0 || order.status === 2 || !order.commission_balance) return '-';
    if (order.commission_status === 2)
        return (
            <div>
                <Badge status={COMMISSION_BADGE_STATUS[status]} />
                <span>{settings.commissionStatusText[status]} </span>
            </div>
        );
    const menu = (
        <Menu>
            {[
                ['0', '待确认'],
                ['1', '有效'],
                ['3', '无效'],
            ].map(([value, label]) => (
                <Menu.Item
                    key={value}
                    disabled={Number(value) === status}
                    onClick={({ key }) =>
                        dispatch({
                            type: 'order/update',
                            tradeNo: order.trade_no,
                            key: 'commission_status',
                            value: String(key),
                        })
                    }
                >
                    {label}
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <Dropdown trigger={['click']} overlay={menu}>
            <div>
                <Badge status={COMMISSION_BADGE_STATUS[status]} />
                <span>{settings.commissionStatusText[status]} </span>
                <a href="javascript:void(0);">
                    标记为 <Icon type="caret-down" />
                </a>
            </div>
        </Dropdown>
    );
}

export function createOrderListColumns(dispatch: AdminDispatch): ColumnProps<OrderRecord>[] {
    return [
        {
            title: '# 订单号',
            dataIndex: 'trade_no',
            key: 'trade_no',
            render: (tradeNo: string, order) => (
                <ConnectedOrderDetailModal orderId={order.id}>
                    <a href="javascript:void(0);">
                        {tradeNo.substr(0, 3)}...{tradeNo.substr(-3)}
                    </a>
                </ConnectedOrderDetailModal>
            ),
        },
        readonlyColumns.type,
        { title: '订阅计划', dataIndex: 'plan_name', key: 'plan_name' },
        readonlyColumns.period,
        readonlyColumns.total_amount,
        {
            title: (
                <span>
                    <Tooltip placement="top" title="标记为[已支付]后将会由系统进行开通后并完成">
                        订单状态 <Icon type="question-circle" />
                    </Tooltip>
                </span>
            ),
            dataIndex: 'status',
            key: 'status',
            render: (status: number, order) => renderOrderStatus(dispatch, status, order),
        },
        readonlyColumns.commission_balance,
        {
            title: (
                <span>
                    佣金状态{' '}
                    <Tooltip placement="top" title="标记为[有效]后将会由系统处理后发放到用户并完成">
                        <Icon type="question-circle" />
                    </Tooltip>
                </span>
            ),
            dataIndex: 'commission_status',
            key: 'commission_status',
            render: (status: number, order) => renderCommissionStatus(dispatch, status, order),
        },
        readonlyColumns.created_at,
    ];
}
