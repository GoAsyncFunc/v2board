import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Button } from '../vendor/ui.js';
import { Dropdown } from '../vendor/ui.js';
import { Menu } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Tag } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Modal } from '../vendor/Modal.js';
import SendMailEditor from '../components/SendMailEditor.jsx';
import AssignOrderEditor from '../components/AssignOrderEditor.jsx';
import { ButtonGroup } from '../vendor/ui.js';
import UserGenerator from '../components/UserGenerator.jsx';
import { LoadingContainer } from '../vendor/ui.js';
import TrafficPanel from '../components/TrafficPanel.jsx';
import moment from '../vendor/dateTime.js';
import history from '../vendor/routerHistory.js';
import { copyToClipboard, setPreference } from '../vendor/siteHelpers.js';
import MainLayout from '../layouts/MainLayout.jsx';
import UserEditor from '../components/UserEditor.jsx';
import FilterDrawer from '../components/FilterDrawer.jsx';
import ContextMenuTable from '../components/ContextMenuTable.jsx';
import { createReadonlyUserEmailColumn } from '../components/UserDisplayColumns.jsx';

import '../vendor/iconStyles.js';

export class UserPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'plan/fetch' });
    this.props.dispatch({ type: 'user/fetch' });
    this.props.dispatch({ type: 'serverGroup/fetch' });
  }

  componentWillUnmount() {
    if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
    this.props.dispatch({ type: 'user/empty' });
    this.props.dispatch({ type: 'user/setState', payload: { filter: [] } });
  }

  tableOnChange(pagination, sorter) {
    setPreference('user_manage_page_size', pagination.pageSize);
    this.props.dispatch({
      type: 'user/changeTable',
      pagination,
      sort: { sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC', sort: sorter.columnKey },
    });
  }

  searchOnChange(email) {
    if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
    this.inputDelayTimer = setTimeout(() => {
      this.inputDelayTimer = null;
      this.props.dispatch({ type: 'user/filter', filter: { email }, pagination: { current: 1 } });
    }, 400);
  }

  userFilter(key, condition, value, clear = false) {
    this.props.dispatch({ type: 'user/addFilter', key, condition, value, clear });
  }

  orderFilter(key, condition, value) {
    this.props.dispatch({ type: 'order/addFilter', key, condition, value });
    history.push('/order');
  }

  confirmBatch(action, content) {
    Modal.confirm({ title: '提醒', content, onOk: () => this.props.dispatch({ type: `user/${action}` }) });
  }

  resetSecret(user) {
    Modal.confirm({
      title: '重置安全信息',
      content: `确定要重置${user.email}的安全信息吗？`,
      onOk: () => this.props.dispatch({ type: 'user/resetSecret', id: user.id }),
      okText: '确定', cancelText: '取消',
    });
  }

  deleteUser(user) {
    Modal.confirm({
      title: '删除用户',
      content: `确定要删除${user.email}的用户信息吗？`,
      onOk: () => this.props.dispatch({ type: 'user/delUser', id: user.id }),
      okText: '确定', cancelText: '取消',
    });
  }

  filterFields() {
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

  actionMenu(user) {
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

  columns() {
    const groups = this.props.serverGroup.groups;
    return [
      { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
      createReadonlyUserEmailColumn(),
      { title: '状态', dataIndex: 'banned', key: 'banned', sorter: true, render: banned => <Tag color={banned ? 'red' : 'green'}>{banned ? '封禁' : '正常'}</Tag> },
      { title: '订阅', dataIndex: 'plan_name', key: 'plan_id', sorter: true, render: name => name || '-' },
      { title: '权限组', dataIndex: 'group_id', key: 'group_id', sorter: true, render: groupId => groups.find(group => group.id === groupId)?.name || '-' },
      { title: '已用(G)', dataIndex: 'total_used', key: 'total_used', sorter: true, render: (used, user) => <Tag color={parseFloat(used) > parseFloat(user.transfer_enable) ? 'red' : 'green'}>{used}</Tag> },
      { title: '流量(G)', dataIndex: 'transfer_enable', key: 'transfer_enable', sorter: true },
      { title: '设备数', dataIndex: 'device_limit', key: 'updated_at', sorter: (left, right) => left.alive_ip - right.alive_ip, render: (value, user) => { const text = `${user.alive_ip !== null ? user.alive_ip : 0} / ${user.device_limit !== null ? user.device_limit : '∞'}`; return user.ips ? <Tooltip placement="top" title={user.ips}>{text}</Tooltip> : text; } },
      { title: '到期时间', dataIndex: 'expired_at', key: 'expired_at', sorter: true, render: expiresAt => <Tag color={expiresAt < Date.now() / 1000 && expiresAt !== null ? 'red' : 'green'}>{expiresAt ? moment(1000 * expiresAt).format('YYYY/MM/DD HH:mm') : expiresAt === null ? '长期有效' : '-'}</Tag> },
      { title: '余额', dataIndex: 'balance', key: 'balance', sorter: true },
      { title: '佣金', dataIndex: 'commission_balance', key: 'commission_balance', sorter: true },
      { title: '加入时间', dataIndex: 'created_at', key: 'created_at', sorter: true, render: createdAt => moment(1000 * createdAt).format('YYYY/MM/DD HH:mm') },
      { title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right', render: (value, user) => <Dropdown trigger="click" overlay={this.actionMenu(user)}><a href="javascript:void(0);">操作 <Icon type="caret-down" /></a></Dropdown> },
    ];
  }

  contextMenu() {
    const user = this.contextUser;
    return <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
      <li className="ant-dropdown-menu-item"><UserEditor userId={user?.id} key={user?.id}><a><Icon type="edit" /> 编辑</a></UserEditor></li>
      <li className="ant-dropdown-menu-item"><AssignOrderEditor email={user?.email} key={user?.email}><a><Icon type="plus" /> 分配订单</a></AssignOrderEditor></li>
      <li className="ant-dropdown-menu-item"><a onClick={() => copyToClipboard(user?.subscribe_url)}><Icon type="copy" /> 复制订阅URL</a></li>
      <li className="ant-dropdown-menu-item"><a style={{ color: '#ff4d4f' }} onClick={() => this.resetSecret(user)}><Icon type="reload" /> 重置UUID及订阅URL</a></li>
      <li className="ant-dropdown-menu-item" onClick={() => this.orderFilter('user_id', '=', user?.id)}><a><Icon type="account-book" /> TA的订单</a></li>
      <li className="ant-dropdown-menu-item" onClick={() => this.userFilter('invite_user_id', '=', user?.id, true)}><a><Icon type="usergroup-add" /> TA的邀请</a></li>
      <li className="ant-dropdown-menu-item"><TrafficPanel userId={user?.id} key={user?.email}><a><Icon type="solution" /> TA的流量记录</a></TrafficPanel></li>
      <li className="ant-dropdown-menu-item"><a onClick={() => this.deleteUser(user)}><Icon type="delete" /> 删除用户</a></li>
    </ul>;
  }

  render() {
    const { users, pagination, fetchLoading, filter } = this.props.user;
    return <MainLayout {...this.props} title="用户管理">
      <LoadingContainer loading={fetchLoading}>
        <div className="block border-bottom"><div className="bg-white">
          <div className="v2board-table-action" style={{ padding: 15 }}>
            <Tooltip title="Tips：可以使用过滤器过滤后再使用操作对过滤的用户进行操作。" placement="right">
              <ButtonGroup>
                <FilterDrawer key={filter.length} value={filter} onOk={nextFilter => this.props.dispatch({ type: 'user/filter', filter: nextFilter })} keys={this.filterFields()}><Button type={filter.length > 0 ? 'primary' : ''}><Icon type="filter" /> 过滤器</Button></FilterDrawer>
                <Dropdown overlay={<Menu><Menu.Item><a onClick={() => this.props.dispatch({ type: 'user/dumpCSV' })}><Icon type="file-excel" /> 导出CSV</a></Menu.Item><Menu.Item><SendMailEditor><a><Icon type="mail" /> 发送邮件</a></SendMailEditor></Menu.Item><Menu.Item disabled={!filter.length}><a disabled={!filter.length} onClick={() => this.confirmBatch('ban', '确定要进行封禁吗？')}><Icon type="stop" /> 批量封禁</a></Menu.Item><Menu.Item disabled={!filter.length}><a disabled={!filter.length} onClick={() => this.confirmBatch('allDel', '确定要进行删除吗？')}><Icon type="delete" /> 批量删除</a></Menu.Item></Menu>}><Button><Icon type="select" />操作</Button></Dropdown>
              </ButtonGroup>
            </Tooltip>
            <UserGenerator><Button className="ml-2"><Icon type="user-add" /></Button></UserGenerator>
          </div>
          <ContextMenuTable onContextMenu={user => { this.contextUser = user; this.forceUpdate(); }} className="v2board-table" tableLayout="auto" dataSource={users} pagination={{ ...pagination, size: 'small', showSizeChanger: true, pageSizeOptions: [10, 50, 100, 150] }} columns={this.columns()} scroll={{ x: 1500 }} onChange={(nextPagination, filters, sorter) => this.tableOnChange(nextPagination, sorter)}>
            {this.contextMenu()}
          </ContextMenuTable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect(state => ({ user: state.user, serverGroup: state.serverGroup, plan: state.plan }))(UserPage);
