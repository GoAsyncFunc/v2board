import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps, PaginationConfig } from 'antd/lib/table/interface';
import moment from 'moment';
import SendMailEditor from '../components/SendMailEditor';
import AssignOrderEditor from '../components/AssignOrderEditor';
import UserGenerator from '../components/UserGenerator';
import LoadingContainer from '../components/LoadingContainer';
import TrafficPanel from '../components/TrafficPanel';
import history from '../vendor/routerHistory.js';
import { copyToClipboard, setPreference } from '../vendor/siteHelpers.js';
import MainLayout from '../layouts/MainLayout';
import UserEditor from '../components/UserEditor';
import FilterDrawer, { type FilterField, type FilterItem } from '../components/FilterDrawer';
import ContextMenuTable from '../components/ContextMenuTable';
import { createReadonlyUserEmailColumn } from '../components/UserDisplayColumns';
import type { AdminDispatch } from '../types/store';
import type { UserGroupOption, UserModuleState, UserPlanOption, UserRecord } from '../types/user';

import '../vendor/iconStyles.js';

interface UserPageProps {
  dispatch: AdminDispatch;
  user: UserModuleState;
  serverGroup: { groups: UserGroupOption[] };
  plan: { plans: UserPlanOption[] };
}
interface UserRootState { user: UserModuleState; serverGroup: UserPageProps['serverGroup']; plan: UserPageProps['plan']; }
interface UserSorter { order?: 'ascend' | 'descend'; columnKey?: React.Key; }

export class UserPage extends React.Component<UserPageProps> {
  inputDelayTimer?: ReturnType<typeof setTimeout>;
  contextUser?: UserRecord;

  componentDidMount(): void {
    this.props.dispatch({ type: 'plan/fetch' });
    this.props.dispatch({ type: 'user/fetch' });
    this.props.dispatch({ type: 'serverGroup/fetch' });
  }

  componentWillUnmount(): void {
    if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
    this.props.dispatch({ type: 'user/empty' });
    this.props.dispatch({ type: 'user/setState', payload: { filter: [] } });
  }

  tableOnChange(pagination: PaginationConfig, sorter: UserSorter): void {
    setPreference('user_manage_page_size', pagination.pageSize);
    this.props.dispatch({
      type: 'user/changeTable',
      pagination,
      sort: { sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC', sort: sorter.columnKey },
    });
  }

  searchOnChange(email: string): void {
    if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
    this.inputDelayTimer = setTimeout(() => {
      this.inputDelayTimer = undefined;
      this.props.dispatch({ type: 'user/filter', filter: { email }, pagination: { current: 1 } });
    }, 400);
  }

  userFilter(key: string, condition: string, value: unknown, clear = false): void {
    this.props.dispatch({ type: 'user/addFilter', key, condition, value, clear });
  }

  orderFilter(key: string, condition: string, value: unknown): void {
    this.props.dispatch({ type: 'order/addFilter', key, condition, value });
    history.push('/order');
  }

  confirmBatch(action: 'ban' | 'allDel', content: string): void {
    Modal.confirm({ title: '提醒', content, onOk: () => this.props.dispatch({ type: `user/${action}` }) });
  }

  resetSecret(user?: UserRecord): void {
    if (!user) return;
    Modal.confirm({
      title: '重置安全信息',
      content: `确定要重置${user.email}的安全信息吗？`,
      onOk: () => this.props.dispatch({ type: 'user/resetSecret', id: user.id }),
      okText: '确定', cancelText: '取消',
    });
  }

  deleteUser(user?: UserRecord): void {
    if (!user) return;
    Modal.confirm({
      title: '删除用户',
      content: `确定要删除${user.email}的用户信息吗？`,
      onOk: () => this.props.dispatch({ type: 'user/delUser', id: user.id }),
      okText: '确定', cancelText: '取消',
    });
  }

  filterFields(): FilterField[] {
    return [
      { key: 'email', title: '邮箱', condition: ['模糊'] },
      { key: 'id', title: '用户ID', condition: ['=', '>=', '>', '<', '<='] },
      { key: 'plan_id', title: '订阅', condition: ['='], type: 'select', options: [{ key: '无订阅', value: 'null' }, ...this.props.plan.plans.map(plan => ({ key: plan.name, value: plan.id }))] },
      { key: 'transfer_enable', title: '流量', condition: ['>=', '>', '<', '<='] },
      { key: 'd', title: '下行', condition: ['>=', '>', '<', '<='] },
      { key: 'expired_at', title: '到期时间', condition: ['>=', '>', '<', '<='], type: 'date' },
      { key: 'uuid', title: 'UUID', condition: ['='] },
      { key: 'token', title: 'TOKEN', condition: ['='] },
      { key: 'banned', title: '账号状态', condition: ['='], type: 'select', options: [{ key: '正常', value: 0 }, { key: '封禁', value: 1 }] },
      { key: 'invite_by_email', title: '邀请人邮箱', condition: ['模糊'] },
      { key: 'invite_user_id', title: '邀请人ID', condition: ['='] },
      { key: 'remarks', title: '备注', condition: ['模糊'] },
      { key: 'is_admin', title: '管理员', condition: ['='], type: 'select', options: [{ key: '是', value: 1 }, { key: '否', value: 0 }] },
    ];
  }

  actionMenu(user: UserRecord): React.ReactElement {
    return <Menu>
      <Menu.Item onContextMenu={event => event.stopPropagation()}><UserEditor userId={user.id} key={user.id}><a><Icon type="edit" /> 编辑</a></UserEditor></Menu.Item>
      <Menu.Item onContextMenu={event => event.stopPropagation()}><AssignOrderEditor email={user.email} key={user.email}><a><Icon type="plus" /> 分配订单</a></AssignOrderEditor></Menu.Item>
      <Menu.Item><a onClick={() => copyToClipboard(user.subscribe_url)}><Icon type="copy" /> 复制订阅URL</a></Menu.Item>
      <Menu.Item><a onClick={() => this.resetSecret(user)}><Icon type="reload" /> 重置UUID及订阅URL</a></Menu.Item>
      <Menu.Item onClick={() => this.orderFilter('user_id', '=', user.id)}><a><Icon type="account-book" /> TA的订单</a></Menu.Item>
      <Menu.Item onClick={() => this.userFilter('invite_user_id', '=', user.id, true)}><a><Icon type="usergroup-add" /> TA的邀请</a></Menu.Item>
      <Menu.Item onContextMenu={event => event.stopPropagation()}><TrafficPanel userId={user.id} key={user.email}><a><Icon type="solution" /> TA的流量记录</a></TrafficPanel></Menu.Item>
      <Menu.Item><a onClick={() => this.deleteUser(user)}><Icon type="delete" /> 删除用户</a></Menu.Item>
    </Menu>;
  }

  columns(): ColumnProps<UserRecord>[] {
    const groups = this.props.serverGroup.groups;
    return [
      { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
      createReadonlyUserEmailColumn<UserRecord>(),
      { title: '状态', dataIndex: 'banned', key: 'banned', sorter: true, render: (banned: UserRecord['banned']) => <Tag color={banned ? 'red' : 'green'}>{banned ? '封禁' : '正常'}</Tag> },
      { title: '订阅', dataIndex: 'plan_name', key: 'plan_id', sorter: true, render: (name: UserRecord['plan_name']) => name || '-' },
      { title: '权限组', dataIndex: 'group_id', key: 'group_id', sorter: true, render: (groupId: UserRecord['group_id']) => groups.find(group => group.id === groupId)?.name || '-' },
      { title: '已用(G)', dataIndex: 'total_used', key: 'total_used', sorter: true, render: (used: UserRecord['total_used'], user) => <Tag color={parseFloat(String(used)) > parseFloat(String(user.transfer_enable)) ? 'red' : 'green'}>{used}</Tag> },
      { title: '流量(G)', dataIndex: 'transfer_enable', key: 'transfer_enable', sorter: true },
      { title: '设备数', dataIndex: 'device_limit', key: 'updated_at', sorter: (left, right) => (left.alive_ip || 0) - (right.alive_ip || 0), render: (_value: unknown, user) => { const text = `${user.alive_ip !== null ? user.alive_ip : 0} / ${user.device_limit !== null ? user.device_limit : '∞'}`; return user.ips ? <Tooltip placement="top" title={user.ips}>{text}</Tooltip> : text; } },
      { title: '到期时间', dataIndex: 'expired_at', key: 'expired_at', sorter: true, render: (expiresAt: UserRecord['expired_at']) => <Tag color={expiresAt !== null && expiresAt !== undefined && expiresAt < Date.now() / 1000 ? 'red' : 'green'}>{expiresAt ? moment(1000 * expiresAt).format('YYYY/MM/DD HH:mm') : expiresAt === null ? '长期有效' : '-'}</Tag> },
      { title: '余额', dataIndex: 'balance', key: 'balance', sorter: true },
      { title: '佣金', dataIndex: 'commission_balance', key: 'commission_balance', sorter: true },
      { title: '加入时间', dataIndex: 'created_at', key: 'created_at', sorter: true, render: (createdAt: number) => moment(1000 * createdAt).format('YYYY/MM/DD HH:mm') },
      { title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right', render: (_value: unknown, user) => <Dropdown trigger={['click']} overlay={this.actionMenu(user)}><a href="javascript:void(0);">操作 <Icon type="caret-down" /></a></Dropdown> },
    ];
  }

  contextMenu(): React.ReactElement {
    const user = this.contextUser;
    return <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
      <li className="ant-dropdown-menu-item"><UserEditor userId={user?.id} key={user?.id}><a><Icon type="edit" /> 编辑</a></UserEditor></li>
      <li className="ant-dropdown-menu-item"><AssignOrderEditor email={user?.email} key={user?.email}><a><Icon type="plus" /> 分配订单</a></AssignOrderEditor></li>
      <li className="ant-dropdown-menu-item"><a onClick={() => copyToClipboard(user?.subscribe_url)}><Icon type="copy" /> 复制订阅URL</a></li>
      <li className="ant-dropdown-menu-item"><a style={{ color: '#ff4d4f' }} onClick={() => this.resetSecret(user)}><Icon type="reload" /> 重置UUID及订阅URL</a></li>
      <li className="ant-dropdown-menu-item" onClick={() => this.orderFilter('user_id', '=', user?.id)}><a><Icon type="account-book" /> TA的订单</a></li>
      <li className="ant-dropdown-menu-item" onClick={() => this.userFilter('invite_user_id', '=', user?.id, true)}><a><Icon type="usergroup-add" /> TA的邀请</a></li>
      {user && <li className="ant-dropdown-menu-item"><TrafficPanel userId={user.id} key={user.email}><a><Icon type="solution" /> TA的流量记录</a></TrafficPanel></li>}
      <li className="ant-dropdown-menu-item"><a onClick={() => this.deleteUser(user)}><Icon type="delete" /> 删除用户</a></li>
    </ul>;
  }

  render(): React.ReactNode {
    const { users, pagination, fetchLoading, filter } = this.props.user;
    return <MainLayout {...this.props} title="用户管理">
      <LoadingContainer loading={fetchLoading}>
        <div className="block border-bottom"><div className="bg-white">
          <div className="v2board-table-action" style={{ padding: 15 }}>
            <Tooltip title="Tips：可以使用过滤器过滤后再使用操作对过滤的用户进行操作。" placement="right">
              <Button.Group>
                <FilterDrawer key={filter.length} value={filter} onOk={(nextFilter: FilterItem[]) => this.props.dispatch({ type: 'user/filter', filter: nextFilter })} keys={this.filterFields()}><Button type={filter.length > 0 ? 'primary' : undefined}><Icon type="filter" /> 过滤器</Button></FilterDrawer>
                <Dropdown overlay={<Menu><Menu.Item><a onClick={() => this.props.dispatch({ type: 'user/dumpCSV' })}><Icon type="file-excel" /> 导出CSV</a></Menu.Item><Menu.Item><SendMailEditor><a><Icon type="mail" /> 发送邮件</a></SendMailEditor></Menu.Item><Menu.Item disabled={!filter.length}><a onClick={() => this.confirmBatch('ban', '确定要进行封禁吗？')}><Icon type="stop" /> 批量封禁</a></Menu.Item><Menu.Item disabled={!filter.length}><a onClick={() => this.confirmBatch('allDel', '确定要进行删除吗？')}><Icon type="delete" /> 批量删除</a></Menu.Item></Menu>}><Button><Icon type="select" />操作</Button></Dropdown>
              </Button.Group>
            </Tooltip>
            <UserGenerator><Button className="ml-2"><Icon type="user-add" /></Button></UserGenerator>
          </div>
          <ContextMenuTable<UserRecord> onContextMenu={user => { this.contextUser = user; this.forceUpdate(); }} className="v2board-table" tableLayout="auto" dataSource={users} pagination={{ ...pagination, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '150'] }} columns={this.columns()} scroll={{ x: 1500 }} onChange={(nextPagination, _filters, sorter) => this.tableOnChange(nextPagination, sorter as UserSorter)}>
            {this.contextMenu()}
          </ContextMenuTable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect((state: UserRootState) => ({ user: state.user, serverGroup: state.serverGroup, plan: state.plan }))(UserPage);
