import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import MobileList from '../vendor/MobileList.js';
import { a as Table } from '../vendor/modules/7743416a.js';
import { a as Badge } from '../vendor/modules/4b725473.js';
import { a as Modal } from '../vendor/Modal.js';
import { c as connect } from '../vendor/reactRedux.js';
import history from '../vendor/routerHistory.js';
import { formatDateTimeSeconds } from '../components/DateTimeDisplay.jsx';
import { a as settings } from '../vendor/localeSettings.js';
import { l as isMobile } from '../vendor/siteHelpers.js';
import { formatMessage } from '../vendor/i18n.js';
import { createOrderColumns, orderBadgeStatuses } from '../components/OrderColumns.jsx';
import '../vendor/modules/67395956.js';
import '../vendor/modules/32717463.js';

export class OrderPage extends React.Component {
  componentDidMount() { this.fetchData(); }
  fetchData() { this.props.dispatch({ type: 'order/fetch' }); }
  cancel(order) {
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
              <div>{(order.total_amount / 100).toFixed(2)}</div>
              <div><Badge status={orderBadgeStatuses[order.status]} />{settings.orderStatusText[order.status] && settings.orderStatusText[order.status]()}</div>
            </div>}>
              {order.plan?.name}{' '}<MobileList.Item.Brief>{formatDateTimeSeconds(order.created_at)}</MobileList.Item.Brief>
            </MobileList.Item>
          ))}</MobileList> : <Table tableLayout="auto" dataSource={orders} columns={createOrderColumns(order => this.cancel(order))} pagination={false} scroll={{ x: 900 }} />}
        </div></div>
      </div></main>
    </MainLayout>;
  }
}
export default connect(({ order }) => ({ order }))(OrderPage);
