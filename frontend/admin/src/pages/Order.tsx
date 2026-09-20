import React from 'react';
import { connect } from 'react-redux';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import AssignOrderEditor from '../components/AssignOrderEditor';
import LoadingContainer from '../components/LoadingContainer';
import history from '../app/navigation';
import { get, isSuccessfulResponse, post } from '../services/request';
import MainLayout from '../layouts/MainLayout';
import FilterDrawer, { type FilterField, type FilterItem } from '../components/FilterDrawer';
import OrderDetailBody, { type OrderDetailPlan, type OrderDetailRecord, type OrderDetailUser } from '../components/OrderDetailBody';
import { createReadonlyOrderColumns } from '../components/OrderDisplayColumns';
import { settings } from '../config/adminSettings';
import type { AdminDispatch, AdminRootState } from '../types/store';
import type { OrderRecord, OrderState } from '../types/order';

interface OrderPageProps { dispatch: AdminDispatch; order: OrderState; }
interface OrderDetailModalProps {
  children: React.ReactNode;
  dispatch: AdminDispatch;
  orderId: number | string;
  plan: { plans: OrderDetailPlan[] };
}
interface OrderDetailModalState {
  order: OrderDetailRecord;
  user: OrderDetailUser;
  inviteUser: OrderDetailUser;
  visible: boolean;
}

const readonlyColumns = createReadonlyOrderColumns<OrderRecord>();
const ORDER_BADGE_STATUS = ['error', 'processing', 'default', 'success', 'default'] as const;
const COMMISSION_BADGE_STATUS = ['default', 'processing', 'success', 'error'] as const;

function emptyOrderDetail(): OrderDetailRecord {
  return {
    trade_no: '', period: '', status: 0, plan_id: '', total_amount: 0,
    balance_amount: 0, discount_amount: 0, refund_amount: 0, surplus_amount: 0,
    created_at: 0, updated_at: 0, commission_balance: 0, commission_status: 0,
  };
}

export class OrderDetailModal extends React.Component<OrderDetailModalProps, OrderDetailModalState> {
  state: OrderDetailModalState = { order: emptyOrderDetail(), user: { email: '' }, inviteUser: { email: '' }, visible: false };

  async getOrderInfo(): Promise<void> {
    this.setState({ visible: true });
    const orderResponse = await post<OrderDetailRecord>(`/${window.settings.secure_path}/order/detail`, { id: this.props.orderId });
    if (!isSuccessfulResponse(orderResponse)) return;
    const userResponse = await get<OrderDetailUser>(`/${window.settings.secure_path}/user/getUserInfoById`, { id: orderResponse.data.user_id });
    if (!isSuccessfulResponse(userResponse)) return;
    let inviteUser = { email: '' };
    if (orderResponse.data.invite_user_id) {
      const inviteResponse = await get<OrderDetailUser>(`/${window.settings.secure_path}/user/getUserInfoById`, { id: orderResponse.data.invite_user_id });
      if (!isSuccessfulResponse(inviteResponse)) return;
      inviteUser = inviteResponse.data;
    }
    this.setState({ order: orderResponse.data, user: userResponse.data, inviteUser });
  }

  jumpUserFilter(key: string, condition: string, value: string): void {
    this.props.dispatch({ type: 'user/addFilter', key, condition, value });
    history.push('/user');
  }

  render(): React.ReactNode {
    return <div>
      <div onClick={() => this.getOrderInfo()}>{this.props.children}</div>
      <Modal visible={this.state.visible} title="订单信息" onCancel={() => this.setState({ visible: false })} footer={false}>
        <OrderDetailBody order={this.state.order} user={this.state.user} inviteUser={this.state.inviteUser} plans={this.props.plan.plans} onUserFilter={(...args) => this.jumpUserFilter(...args)} />
      </Modal>
    </div>;
  }
}

const ConnectedOrderDetailModal = connect((state: AdminRootState) => ({ plan: state.plan }))(OrderDetailModal);

export class OrderPage extends React.Component<OrderPageProps> {
  componentDidMount(): void {
    this.props.dispatch({ type: 'order/fetch' });
    this.props.dispatch({ type: 'plan/fetch' });
  }

  componentWillUnmount(): void {
    this.props.dispatch({ type: 'order/empty' });
    this.props.dispatch({ type: 'order/setState', payload: { filter: [] } });
  }

  update(tradeNo: React.ReactNode, key: string, value: string | number): void {
    this.props.dispatch({ type: 'order/update', tradeNo, key, value });
  }

  renderOrderStatus(status: number, order: OrderRecord): React.ReactElement {
    const menu = <Menu><Menu.Item key="1" onClick={() => this.props.dispatch({ type: 'order/paid', tradeNo: order.trade_no })}>已支付</Menu.Item><Menu.Item key="2" onClick={() => this.props.dispatch({ type: 'order/cancel', tradeNo: order.trade_no })}>取消</Menu.Item></Menu>;
    return <Dropdown disabled={status !== 0} trigger={['click']} overlay={menu}><div><Badge status={ORDER_BADGE_STATUS[status]} /><span>{settings.orderStatusText[status]} </span>{status === 0 && <a href="javascript:void(0);">标记为 <Icon type="caret-down" /></a>}</div></Dropdown>;
  }

  renderCommissionStatus(status: number, order: OrderRecord): React.ReactNode {
    if (order.status === 0 || order.status === 2 || !order.commission_balance) return '-';
    if (order.commission_status === 2) return <div><Badge status={COMMISSION_BADGE_STATUS[status]} /><span>{settings.commissionStatusText[status]} </span></div>;
    const menu = <Menu>{[['0', '待确认'], ['1', '有效'], ['3', '无效']].map(([value, label]) => <Menu.Item key={value} disabled={Number(value) === status} onClick={({ key }) => this.update(order.trade_no, 'commission_status', String(key))}>{label}</Menu.Item>)}</Menu>;
    return <Dropdown trigger={['click']} overlay={menu}><div><Badge status={COMMISSION_BADGE_STATUS[status]} /><span>{settings.commissionStatusText[status]} </span><a href="javascript:void(0);">标记为 <Icon type="caret-down" /></a></div></Dropdown>;
  }

  columns(): ColumnProps<OrderRecord>[] {
    return [
      { title: '# 订单号', dataIndex: 'trade_no', key: 'trade_no', render: (tradeNo: string, order) => <ConnectedOrderDetailModal orderId={order.id}><a href="javascript:void(0);">{tradeNo.substr(0, 3)}...{tradeNo.substr(-3)}</a></ConnectedOrderDetailModal> },
      readonlyColumns.type, { title: '订阅计划', dataIndex: 'plan_name', key: 'plan_name' }, readonlyColumns.period, readonlyColumns.total_amount,
      { title: <span><Tooltip placement="top" title="标记为[已支付]后将会由系统进行开通后并完成">订单状态 <Icon type="question-circle" /></Tooltip></span>, dataIndex: 'status', key: 'status', render: (status: number, order) => this.renderOrderStatus(status, order) },
      readonlyColumns.commission_balance,
      { title: <span>佣金状态 <Tooltip placement="top" title="标记为[有效]后将会由系统处理后发放到用户并完成"><Icon type="question-circle" /></Tooltip></span>, dataIndex: 'commission_status', key: 'commission_status', render: (status: number, order) => this.renderCommissionStatus(status, order) },
      readonlyColumns.created_at,
    ];
  }

  filterFields(): FilterField[] {
    return [
      { key: 'trade_no', title: '订单号', condition: ['模糊', '='] },
      { key: 'status', title: '订单状态', type: 'select', condition: ['='], options: [{ key: '未支付', value: 0 }, { key: '已支付', value: 1 }, { key: '已取消', value: 2 }, { key: '已完成', value: 3 }, { key: '已折抵', value: 4 }] },
      { key: 'commission_status', title: '佣金状态', type: 'select', condition: ['='], options: [{ key: '待确认', value: 0 }, { key: '发放中', value: 1 }, { key: '已发放', value: 2 }, { key: '无效', value: 3 }] },
      { key: 'user_id', title: '用户ID', condition: ['='] }, { key: 'invite_user_id', title: '邀请人ID', condition: ['=', '!='] },
      { key: 'callback_no', title: '回调单号', condition: ['模糊'] }, { key: 'commission_balance', title: '佣金金额', condition: ['>', '<', '=', '!=', '>=', '<='] },
    ];
  }

  render(): React.ReactNode {
    const { orders, fetchLoading, pagination, filter } = this.props.order;
    return <MainLayout {...this.props} title="订单管理"><div className="d-flex justify-content-between align-items-center" /><LoadingContainer loading={fetchLoading}><div className="block block-rounded"><div className="bg-white"><div style={{ padding: 15 }}><Button.Group><FilterDrawer value={filter} onOk={nextFilter => this.props.dispatch({ type: 'order/filter', filter: nextFilter })} keys={this.filterFields()}><Button type={filter.length > 0 ? 'primary' : undefined}><Icon type="filter" /> 过滤器</Button></FilterDrawer></Button.Group><AssignOrderEditor><Button style={{ marginLeft: 10 }}><Icon type="plus" /> 添加订单</Button></AssignOrderEditor></div><Table<OrderRecord> tableLayout="auto" dataSource={orders} pagination={{ ...pagination, size: 'small' }} columns={this.columns()} scroll={{ x: 1050 }} onChange={nextPagination => this.props.dispatch({ type: 'order/changeTable', pagination: nextPagination })} /></div></div></LoadingContainer></MainLayout>;
  }
}

export default connect((state: AdminRootState) => ({ order: state.order }))(OrderPage);
