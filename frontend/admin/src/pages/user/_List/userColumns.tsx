import React from 'react';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import moment from 'moment';
import type { UserGroupOption, UserRecord } from '../../../types/user';
import { createReadonlyUserEmailColumn } from './UserDisplayColumns';

export function createUserListColumns(
    groups: UserGroupOption[],
    renderActions: (user: UserRecord) => React.ReactElement,
): ColumnProps<UserRecord>[] {
    return [
        { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
        createReadonlyUserEmailColumn<UserRecord>(),
        {
            title: '状态',
            dataIndex: 'banned',
            key: 'banned',
            sorter: true,
            render: (banned: UserRecord['banned']) => (
                <Tag color={banned ? 'red' : 'green'}>{banned ? '封禁' : '正常'}</Tag>
            ),
        },
        {
            title: '订阅',
            dataIndex: 'plan_name',
            key: 'plan_id',
            sorter: true,
            render: (name: UserRecord['plan_name']) => name || '-',
        },
        {
            title: '权限组',
            dataIndex: 'group_id',
            key: 'group_id',
            sorter: true,
            render: (groupId: UserRecord['group_id']) =>
                groups.find((group) => group.id === groupId)?.name || '-',
        },
        {
            title: '已用(G)',
            dataIndex: 'total_used',
            key: 'total_used',
            sorter: true,
            render: (used: UserRecord['total_used'], user) => (
                <Tag
                    color={
                        parseFloat(String(used)) > parseFloat(String(user.transfer_enable))
                            ? 'red'
                            : 'green'
                    }
                >
                    {used}
                </Tag>
            ),
        },
        {
            title: '流量(G)',
            dataIndex: 'transfer_enable',
            key: 'transfer_enable',
            sorter: true,
        },
        {
            title: '设备数',
            dataIndex: 'device_limit',
            key: 'updated_at',
            sorter: (left, right) => (left.alive_ip || 0) - (right.alive_ip || 0),
            render: (_value: UserRecord['device_limit'], user) => {
                const text = `${user.alive_ip !== null ? user.alive_ip : 0} / ${user.device_limit !== null ? user.device_limit : '∞'}`;
                return user.ips ? (
                    <Tooltip placement="top" title={user.ips}>
                        {text}
                    </Tooltip>
                ) : (
                    text
                );
            },
        },
        {
            title: '到期时间',
            dataIndex: 'expired_at',
            key: 'expired_at',
            sorter: true,
            render: (expiresAt: UserRecord['expired_at']) => (
                <Tag
                    color={
                        expiresAt !== null &&
                        expiresAt !== undefined &&
                        Number(expiresAt) < Date.now() / 1000
                            ? 'red'
                            : 'green'
                    }
                >
                    {expiresAt
                        ? moment(1000 * Number(expiresAt)).format('YYYY/MM/DD HH:mm')
                        : expiresAt === null
                          ? '长期有效'
                          : '-'}
                </Tag>
            ),
        },
        { title: '余额', dataIndex: 'balance', key: 'balance', sorter: true },
        {
            title: '佣金',
            dataIndex: 'commission_balance',
            key: 'commission_balance',
            sorter: true,
        },
        {
            title: '加入时间',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            render: (createdAt: number) => moment(1000 * createdAt).format('YYYY/MM/DD HH:mm'),
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            fixed: 'right',
            render: (_value: undefined, user) => renderActions(user),
        },
    ];
}
