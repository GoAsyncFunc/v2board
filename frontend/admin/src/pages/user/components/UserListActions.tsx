import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import AssignOrderEditor from '../../../components/order/AssignOrderEditor';
import TrafficPanel from '../../../components/user/TrafficPanel';
import { copyToClipboard } from '../../../utils/siteHelpers';
import UserEditor from './UserEditor';
import type { FilterValue } from '../../../types/filter';
import type { UserRecord } from '../../../types/userContracts';

export interface UserListActions {
    onResetSecret: (user?: UserRecord) => void;
    onDeleteUser: (user?: UserRecord) => void;
    onUserFilter: (key: string, condition: string, value: FilterValue, clear?: boolean) => void;
    onOrderFilter: (key: string, condition: string, value: FilterValue) => void;
}

export function createUserActionMenu(
    user: UserRecord,
    actions: UserListActions,
): React.ReactElement {
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
                <a onClick={() => actions.onResetSecret(user)}>
                    <Icon type="reload" /> 重置UUID及订阅URL
                </a>
            </Menu.Item>
            <Menu.Item onClick={() => actions.onOrderFilter('user_id', '=', user.id)}>
                <a>
                    <Icon type="account-book" /> TA的订单
                </a>
            </Menu.Item>
            <Menu.Item onClick={() => actions.onUserFilter('invite_user_id', '=', user.id, true)}>
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
                <a onClick={() => actions.onDeleteUser(user)}>
                    <Icon type="delete" /> 删除用户
                </a>
            </Menu.Item>
        </Menu>
    );
}

export function UserActionDropdown({
    user,
    actions,
}: {
    user: UserRecord;
    actions: UserListActions;
}): React.ReactElement {
    return (
        <Dropdown trigger={['click']} overlay={createUserActionMenu(user, actions)}>
            <a href="javascript:void(0);">
                操作 <Icon type="caret-down" />
            </a>
        </Dropdown>
    );
}

export function UserContextMenu({
    user,
    actions,
}: {
    user?: UserRecord;
    actions: UserListActions;
}): React.ReactElement {
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
                <a style={{ color: '#ff4d4f' }} onClick={() => actions.onResetSecret(user)}>
                    <Icon type="reload" /> 重置UUID及订阅URL
                </a>
            </li>
            <li
                className="ant-dropdown-menu-item"
                onClick={() => actions.onOrderFilter('user_id', '=', user?.id)}
            >
                <a>
                    <Icon type="account-book" /> TA的订单
                </a>
            </li>
            <li
                className="ant-dropdown-menu-item"
                onClick={() => actions.onUserFilter('invite_user_id', '=', user?.id, true)}
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
                <a onClick={() => actions.onDeleteUser(user)}>
                    <Icon type="delete" /> 删除用户
                </a>
            </li>
        </ul>
    );
}
