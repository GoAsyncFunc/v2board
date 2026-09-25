import React from 'react';
import FilterDrawer from '../../../components/common/FilterDrawer';
import type { FilterField, FilterItem } from '../../../types/filter';
import type { UserPlanOption } from '../../../types/userContracts';

export interface UserFilterDrawerProps {
    children: React.ReactElement;
    value?: FilterItem[];
    plans: UserPlanOption[];
    onOk: (filter: FilterItem[]) => void;
}

export function createUserFilterFields(plans: UserPlanOption[]): FilterField[] {
    return [
        { key: 'email', title: '邮箱', condition: ['模糊'] },
        { key: 'id', title: '用户ID', condition: ['=', '>=', '>', '<', '<='] },
        {
            key: 'plan_id',
            title: '订阅',
            condition: ['='],
            type: 'select',
            options: [
                { key: '无订阅', value: 'null' },
                ...plans.map((plan) => ({ key: plan.name, value: plan.id })),
            ],
        },
        { key: 'transfer_enable', title: '流量', condition: ['>=', '>', '<', '<='] },
        { key: 'd', title: '下行', condition: ['>=', '>', '<', '<='] },
        {
            key: 'expired_at',
            title: '到期时间',
            condition: ['>=', '>', '<', '<='],
            type: 'date',
        },
        { key: 'uuid', title: 'UUID', condition: ['='] },
        { key: 'token', title: 'TOKEN', condition: ['='] },
        {
            key: 'banned',
            title: '账号状态',
            condition: ['='],
            type: 'select',
            options: [
                { key: '正常', value: 0 },
                { key: '封禁', value: 1 },
            ],
        },
        { key: 'invite_by_email', title: '邀请人邮箱', condition: ['模糊'] },
        { key: 'invite_user_id', title: '邀请人ID', condition: ['='] },
        { key: 'remarks', title: '备注', condition: ['模糊'] },
        {
            key: 'is_admin',
            title: '管理员',
            condition: ['='],
            type: 'select',
            options: [
                { key: '是', value: 1 },
                { key: '否', value: 0 },
            ],
        },
    ];
}

export default function UserFilterDrawer({
    children,
    value,
    plans,
    onOk,
}: UserFilterDrawerProps): React.ReactElement {
    return (
        <FilterDrawer value={value} onOk={onOk} keys={createUserFilterFields(plans)}>
            {children}
        </FilterDrawer>
    );
}
