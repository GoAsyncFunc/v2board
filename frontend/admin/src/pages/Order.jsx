import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Dropdown } from '../vendor/ui.js';
import { Badge } from '../vendor/ui.js';
import { Menu } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Modal } from '../vendor/Modal.js';
import { settings } from '../vendor/adminSettings.js';
import AssignOrderEditor from '../components/AssignOrderEditor.jsx';
import { ButtonGroup } from '../vendor/ui.js';
import LoadingContainer from '../components/LoadingContainer.tsx';
import history from '../vendor/routerHistory.js';
import { get, post } from '../services/request.js';
import MainLayout from '../layouts/MainLayout.jsx';
import FilterDrawer from '../components/FilterDrawer.tsx';
import OrderDetailBody from '../components/OrderDetailBody.tsx';
import { createReadonlyOrderColumns } from '../components/OrderDisplayColumns.tsx';

import '../vendor/iconStyles.js';

const readonlyColumns = createReadonlyOrderColumns();
const ORDER_BADGE_STATUS = ['error', 'processing', 'default', 'success', 'default'];
const COMMISSION_BADGE_STATUS = ['default', 'processing', 'success', 'error'];

export class OrderDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: {}, user: {}, inviteUser: {}, visible: false };
  }

  async getOrderInfo() {
    this.setState({ visible: true });
    const orderResponse = await post(`/${window.settings.secure_path}/order/detail`, { id: this.props.orderId });
    if (orderResponse.code !== 200) return;
    const userResponse = await get(`/${window.settings.secure_path}/user/getUserInfoById`, { id: orderResponse.data.user_id });
    if (userResponse.code !== 200) return;
    let inviteUser = {};
    if (orderResponse.data.invite_user_id) {
      const inviteResponse = await get(`/${window.settings.secure_path}/user/getUserInfoById`, { id: orderResponse.data.invite_user_id });
      if (inviteResponse.code !== 200) return;
      inviteUser = inviteResponse.data;
    }
    this.setState({ order: orderResponse.data, user: userResponse.data, inviteUser });
  }

  jumpUserFilter(key, condition, value) {
    this.props.dispatch({ type: 'user/addFilter', key, condition, value });
    history.push('/user');
  }

  render() {
    return <div>
      <div onClick={() => this.getOrderInfo()}>{this.props.children}</div>
      <Modal visible={this.state.visible} title="订单信息" onCancel={() => this.setState({ visible: false })} footer={false}>
        <OrderDetailBody order={this.state.order} user={this.state.user} inviteUser={this.state.inviteUser} plans={this.props.plan.plans} onUserFilter={(...args) => this.jumpUserFilter(...args)} />
      </Modal>
    </div>;
  }
}

const ConnectedOrderDetailModal = connect(state => ({ plan: state.plan }))(OrderDetailModal);

export class OrderPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'order/fetch' });
    this.props.dispatch({ type: 'plan/fetch' });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'order/empty' });
    this.props.dispatch({ type: 'order/setState', payload: { filter: [] } });
  }

  update(tradeNo, key, value) {
    this.props.dispatch({ type: 'order/update', tradeNo, key, value });
  }

  renderOrderStatus(status, order) {
    const menu = <Menu>
      <Menu.Item key="1" onClick={() => this.props.dispatch({ type: 'order/paid', tradeNo: order.trade_no })}>已支付</Menu.Item>
      <Menu.Item key="2" onClick={() => this.props.dispatch({ type: 'order/cancel', tradeNo: order.trade_no })}>取消</Menu.Item>
    </Menu>;
    return <Dropdown disabled={status !== 0} trigger={['click']} overlay={menu}>
      <div><Badge status={ORDER_BADGE_STATUS[status]} /><span>{settings.orderStatusText[status]} </span>{status === 0 && <a href="javascript:void(0);">标记为 <Icon type="caret-down" /></a>}</div>
    </Dropdown>;
  }

  renderCommissionStatus(status, order) {
    if (order.status === 0 || order.status === 2 || !order.commission_balance) return '-';
    if (order.commission_status === 2) return <div><Badge status={COMMISSION_BADGE_STATUS[status]} /><span>{settings.commissionStatusText[status]} </span></div>;
    const menu = <Menu>
      {[['0', '待确认'], ['1', '有效'], ['3', '无效']].map(([value, label]) => <Menu.Item key={value} disabled={Number(value) === status} onClick={event => this.update(order.trade_no, 'commission_status', event.key)}>{label}</Menu.Item>)}
    </Menu>;
    return <Dropdown trigger={['click']} overlay={menu}><div><Badge status={COMMISSION_BADGE_STATUS[status]} /><span>{settings.commissionStatusText[status]} </span><a href="javascript:void(0);">标记为 <Icon type="caret-down" /></a></div></Dropdown>;
  }

  columns() {
    return [
      { title: '# 订单号', dataIndex: 'trade_no', key: 'trade_no', render: (tradeNo, order) => <ConnectedOrderDetailModal orderId={order.id}><a href="javascript:void(0);">{tradeNo.substr(0, 3)}...{tradeNo.substr(-3)}</a></ConnectedOrderDetailModal> },
      readonlyColumns.type,
      { title: '订阅计划', dataIndex: 'plan_name', key: 'plan_name' },
      readonlyColumns.period,
      readonlyColumns.total_amount,
      { title: <span><Tooltip placement="top" title="标记为[已支付]后将会由系统进行开通后并完成">订单状态 <Icon type="question-circle" /></Tooltip></span>, dataIndex: 'status', key: 'status', render: (status, order) => this.renderOrderStatus(status, order) },
      readonlyColumns.commission_balance,
      { title: <span>佣金状态 <Tooltip placement="top" title="标记为[有效]后将会由系统处理后发放到用户并完成"><Icon type="question-circle" /></Tooltip></span>, dataIndex: 'commission_status', key: 'commission_status', render: (status, order) => this.renderCommissionStatus(status, order) },
      readonlyColumns.created_at,
    ];
  }

  filterFields() {
    return [
      { key: 'trade_no', title: '订单号', condition: ['模糊', '='] },
      { key: 'status', title: '订单状态', type: 'select', condition: ['='], options: [{ key: '未支付', value: 0 }, { key: '已支付', value: 1 }, { key: '已取消', value: 2 }, { key: '已完成', value: 3 }, { key: '已折抵', value: 4 }] },
      { key: 'commission_status', title: '佣金状态', type: 'select', condition: ['='], options: [{ key: '待确认', value: 0 }, { key: '发放中', value: 1 }, { key: '已发放', value: 2 }, { key: '无效', value: 3 }] },
      { key: 'user_id', title: '用户ID', condition: ['='] },
      { key: 'invite_user_id', title: '邀请人ID', condition: ['=', '!='] },
      { key: 'callback_no', title: '回调单号', condition: ['模糊'] },
      { key: 'commission_balance', title: '佣金金额', condition: ['>', '<', '=', '!=', '>=', '<='] },
    ];
  }

  render() {
    const { orders, fetchLoading, pagination, filter } = this.props.order;
    return <MainLayout {...this.props} title="订单管理">
      <div className="d-flex justify-content-between align-items-center" />
      <LoadingContainer loading={fetchLoading}>
        <div className="block block-rounded"><div className="bg-white">
          <div style={{ padding: 15 }}>
            <ButtonGroup><FilterDrawer value={filter} onOk={nextFilter => this.props.dispatch({ type: 'order/filter', filter: nextFilter })} keys={this.filterFields()}><Button type={filter.length > 0 ? 'primary' : ''}><Icon type="filter" /> 过滤器</Button></FilterDrawer></ButtonGroup>
            <AssignOrderEditor><Button style={{ marginLeft: 10 }}><Icon type="plus" /> 添加订单</Button></AssignOrderEditor>
          </div>
          <Table tableLayout="auto" dataSource={orders} pagination={{ ...pagination, size: 'small' }} columns={this.columns()} scroll={{ x: 1050 }} onChange={nextPagination => this.props.dispatch({ type: 'order/changeTable', pagination: nextPagination })} />
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect(state => ({ order: state.order }))(OrderPage);
