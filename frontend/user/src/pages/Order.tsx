import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MobileList from '../components/MobileList';
import Badge from 'antd/lib/badge';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import { connect } from 'react-redux';
import history from '../app/routerHistory';
import { formatDateTimeSeconds } from '../components/DateTimeDisplay';
import { formatPrice } from '../components/MoneyDisplay';
import { localeSettings as settings } from '../config/localeSettings';
import { isMobile } from '../utils/siteHelpers';
import { formatMessage } from '../locales/i18n';
import { createOrderColumns, orderBadgeStatuses } from '../components/OrderColumns';
import type { OrderRecord } from '../types/commerce';
import type { UserDispatch, UserRootState } from '../types/store';

interface OrderStateProps {
  order: { orders: OrderRecord[]; fetchLoading: boolean; cancelLoading: boolean };
}

const orderStatusText: Readonly<Partial<Record<number, () => string>>> = settings.orderStatusText;

export class OrderPage extends React.Component<OrderStateProps & { dispatch: UserDispatch }> {
  componentDidMount() { this.fetchData(); }
  fetchData() { this.props.dispatch({ type: 'order/fetch' }); }
  cancel(order: OrderRecord) {
    return Modal.confirm({
      title: formatMessage({ id: '注意' }),
      content: formatMessage({ id: '如果你已经付款，取消订单可能会导致支付失败，确定取消订单吗？' }),
      onOk: () => this.props.dispatch({ type: 'order/cancel', tradeNo: order.trade_no }),
      okText: formatMessage({ id: '关闭订单' }),
      okButtonProps: { loading: this.props.order.cancelLoading },
    });
  }
  render() {
    const { orders, fetchLoading } = this.props.order;
    return <MainLayout {...this.props} title={formatMessage({ id: '我的订单' })}>
      <main id="main-container"><div className="content content-full">
        <div className={'block block-rounded  ' + (fetchLoading ? 'block-mode-loading' : '')}><div className="bg-white">
          {isMobile() ? <MobileList>{orders.map(order => (
            <MobileList.Item key={order.trade_no} arrow="horizontal" multipleLine onClick={() => history.push('/order/' + order.trade_no)} extra={<div>
              <div>{formatPrice(order.total_amount)}</div>
              <div><Badge status={orderBadgeStatuses[order.status]} />{orderStatusText[order.status]?.()}</div>
            </div>}>
              {order.plan?.name}{' '}<MobileList.Item.Brief>{formatDateTimeSeconds(order.created_at)}</MobileList.Item.Brief>
            </MobileList.Item>
          ))}</MobileList> : <Table tableLayout="auto" dataSource={orders} columns={createOrderColumns(order => this.cancel(order))} pagination={false} scroll={{ x: 900 }} />}
        </div></div>
      </div></main>
    </MainLayout>;
  }
}
export default connect(({ order }: UserRootState) => ({ order }))(OrderPage);
