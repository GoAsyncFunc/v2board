import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps, PaginationConfig } from 'antd/lib/table/interface';
import moment from 'moment';
import AssignOrderEditor from '../../../components/commerce/AssignOrderEditor';
import ContextMenuTable from '../../../components/common/ContextMenuTable';
import TrafficPanel from '../../../components/user/TrafficPanel';
import history from '../../../app/navigation';
import { copyToClipboard } from '../../../utils/siteHelpers';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { FilterValue } from '../../../types/filter';
import type { UserGroupOption, UserModuleState, UserRecord } from '../../../types/user';
import UserEditor from '../_Drawer/edit';
import { createReadonlyUserEmailColumn } from './columns';

export interface UserSorter {
    order?: 'ascend' | 'descend';
    columnKey?: React.Key;
}

export interface UserListProps {
    dispatch: AdminDispatch;
    user: UserModuleState;
    serverGroup: { groups: UserGroupOption[] };
    onTableChange: (pagination: PaginationConfig, sorter: UserSorter) => void;
    onUserFilter: (key: string, condition: string, value: FilterValue, clear?: boolean) => void;
    onOrderFilter: (key: string, condition: string, value: FilterValue) => void;
    onResetSecret: (user?: UserRecord) => void;
    onDeleteUser: (user?: UserRecord) => void;
}

export class UserList extends React.Component<UserListProps> {
    contextUser?: UserRecord;

    actionMenu(user: UserRecord): React.ReactElement {
        return (
            <Menu>
                <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                    <UserEditor userId={user.id} key={user.id}>
                        <a>
                            <Icon type="edit" /> 编辑
                        </a>
                    </UserEditor>
                </Menu.Item>
                <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                    <AssignOrderEditor email={user.email} key={user.email}>
                        <a>
                            <Icon type="plus" /> 分配订单
                        </a>
                    </AssignOrderEditor>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => copyToClipboard(user.subscribe_url)}>
                        <Icon type="copy" /> 复制订阅URL
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.props.onResetSecret(user)}>
                        <Icon type="reload" /> 重置UUID及订阅URL
                    </a>
                </Menu.Item>
                <Menu.Item onClick={() => this.props.onOrderFilter('user_id', '=', user.id)}>
                    <a>
                        <Icon type="account-book" /> TA的订单
                    </a>
                </Menu.Item>
                <Menu.Item
                    onClick={() => this.props.onUserFilter('invite_user_id', '=', user.id, true)}
                >
                    <a>
                        <Icon type="usergroup-add" /> TA的邀请
                    </a>
                </Menu.Item>
                <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                    <TrafficPanel userId={user.id} key={user.email}>
                        <a>
                            <Icon type="solution" /> TA的流量记录
                        </a>
                    </TrafficPanel>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.props.onDeleteUser(user)}>
                        <Icon type="delete" /> 删除用户
                    </a>
                </Menu.Item>
            </Menu>
        );
    }

    columns(): ColumnProps<UserRecord>[] {
        const groups = this.props.serverGroup.groups;
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
                render: (_value: undefined, user) => (
                    <Dropdown trigger={['click']} overlay={this.actionMenu(user)}>
                        <a href="javascript:void(0);">
                            操作 <Icon type="caret-down" />
                        </a>
                    </Dropdown>
                ),
            },
        ];
    }

    contextMenu(): React.ReactElement {
        const user = this.contextUser;
        return (
            <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
                <li className="ant-dropdown-menu-item">
                    <UserEditor userId={user?.id} key={user?.id}>
                        <a>
                            <Icon type="edit" /> 编辑
                        </a>
                    </UserEditor>
                </li>
                <li className="ant-dropdown-menu-item">
                    <AssignOrderEditor email={user?.email} key={user?.email}>
                        <a>
                            <Icon type="plus" /> 分配订单
                        </a>
                    </AssignOrderEditor>
                </li>
                <li className="ant-dropdown-menu-item">
                    <a onClick={() => copyToClipboard(user?.subscribe_url)}>
                        <Icon type="copy" /> 复制订阅URL
                    </a>
                </li>
                <li className="ant-dropdown-menu-item">
                    <a style={{ color: '#ff4d4f' }} onClick={() => this.props.onResetSecret(user)}>
                        <Icon type="reload" /> 重置UUID及订阅URL
                    </a>
                </li>
                <li
                    className="ant-dropdown-menu-item"
                    onClick={() => this.props.onOrderFilter('user_id', '=', user?.id)}
                >
                    <a>
                        <Icon type="account-book" /> TA的订单
                    </a>
                </li>
                <li
                    className="ant-dropdown-menu-item"
                    onClick={() => this.props.onUserFilter('invite_user_id', '=', user?.id, true)}
                >
                    <a>
                        <Icon type="usergroup-add" /> TA的邀请
                    </a>
                </li>
                {user && (
                    <li className="ant-dropdown-menu-item">
                        <TrafficPanel userId={user.id} key={user.email}>
                            <a>
                                <Icon type="solution" /> TA的流量记录
                            </a>
                        </TrafficPanel>
                    </li>
                )}
                <li className="ant-dropdown-menu-item">
                    <a onClick={() => this.props.onDeleteUser(user)}>
                        <Icon type="delete" /> 删除用户
                    </a>
                </li>
            </ul>
        );
    }

    render(): React.ReactNode {
        const { users, pagination } = this.props.user;
        return (
            <ContextMenuTable<UserRecord>
                onContextMenu={(user) => {
                    this.contextUser = user;
                    this.forceUpdate();
                }}
                className="v2board-table"
                tableLayout="auto"
                dataSource={users}
                pagination={{
                    ...pagination,
                    size: 'small',
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100', '150'],
                }}
                columns={this.columns()}
                scroll={{ x: 1500 }}
                onChange={(nextPagination, _filters, sorter) =>
                    this.props.onTableChange(nextPagination, sorter as UserSorter)
                }
            >
                {this.contextMenu()}
            </ContextMenuTable>
        );
    }
}

export default connect((state: AdminRootState) => ({
    user: state.user,
    serverGroup: state.serverGroup,
}))(UserList);
