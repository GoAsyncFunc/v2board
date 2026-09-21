import React from 'react';
import FilterDrawer from '../../../components/common/FilterDrawer';
import type { FilterField, FilterItem } from '../../../types/filter';

export interface OrderFilterDrawerProps {
    children: React.ReactElement;
    value?: FilterItem[];
    onOk: (filter: FilterItem[]) => void;
}

export const orderFilterFields: FilterField[] = [
    { key: 'trade_no', title: '订单号', condition: ['模糊', '='] },
    {
        key: 'status',
        title: '订单状态',
        type: 'select',
        condition: ['='],
        options: [
            { key: '未支付', value: 0 },
            { key: '已支付', value: 1 },
            { key: '已取消', value: 2 },
            { key: '已完成', value: 3 },
            { key: '已折抵', value: 4 },
        ],
    },
    {
        key: 'commission_status',
        title: '佣金状态',
        type: 'select',
        condition: ['='],
        options: [
            { key: '待确认', value: 0 },
            { key: '发放中', value: 1 },
            { key: '已发放', value: 2 },
            { key: '无效', value: 3 },
        ],
    },
    { key: 'user_id', title: '用户ID', condition: ['='] },
    { key: 'invite_user_id', title: '邀请人ID', condition: ['=', '!='] },
    { key: 'callback_no', title: '回调单号', condition: ['模糊'] },
    {
        key: 'commission_balance',
        title: '佣金金额',
        condition: ['>', '<', '=', '!=', '>=', '<='],
    },
];

export default function OrderFilterDrawer({
    children,
    value,
    onOk,
}: OrderFilterDrawerProps): React.ReactElement {
    return (
        <FilterDrawer value={value} onOk={onOk} keys={orderFilterFields}>
            {children}
        </FilterDrawer>
    );
}
