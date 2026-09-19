import React from 'react';
import { Row } from '../vendor/ui.js';
import { Col } from '../vendor/ui.js';
import { settings } from '../vendor/adminSettings.js';
import moment from '../vendor/dateTime.js';
import { a as Divider } from '../vendor/Divider.js';
import { Tooltip } from '../vendor/ui.js';
import { a as Icon } from '../vendor/Icon.js';

// Keep JavaScript coercion: null becomes 0.00, undefined becomes NaN.
export function formatOrderAmount(amount) {
  return (amount / 100).toFixed(2);
}
export function formatOrderTime(timestamp) {
  return moment(1000 * timestamp).format('YYYY-MM-DD HH:mm:ss');
}

// A synchronous render helper preserves the original Row/Col tree and evaluation
// order without introducing another component lifecycle or DOM wrapper.
function detailRow(label, value, rowStyle) {
  return <Row gutter={[16, 16]} style={rowStyle}>
    <Col span={6}>{label}</Col><Col span={18}>{value}</Col>
  </Row>;
}

export default function OrderDetailBody({ order, user, inviteUser, plans, onUserFilter }) {
  const rowStyle = { marginBottom: 0 };
  // Deliberately no optional chaining/default objects: retain the original null
  // errors and avoid reading order/plans while the email-gated loader is shown.
  if (!user.email) {
    return <Icon type="loading" style={{ fontSize: 24, color: '#415A94' }} />;
  }
  return <div>
    {detailRow('邮箱', <a onClick={() => onUserFilter('email', '模糊', user.email)} href="javascript:void(0);">{user.email}</a>, rowStyle)}
    {detailRow('订单号', order.trade_no, rowStyle)}
    {detailRow('订单周期', settings.periodText[order.period], rowStyle)}
    {detailRow('订单状态', settings.orderStatusText[order.status], rowStyle)}
    {detailRow('订阅计划', plans.find(plan => plan.id === order.plan_id)?.name, rowStyle)}
    {detailRow('回调单号', order.callback_no ? order.callback_no : '-', rowStyle)}
    <Divider />
    {detailRow('支付金额', formatOrderAmount(order.total_amount), rowStyle)}
    {detailRow('余额支付', formatOrderAmount(order.balance_amount), rowStyle)}
    {detailRow('优惠金额', formatOrderAmount(order.discount_amount), rowStyle)}
    {detailRow('退回金额', formatOrderAmount(order.refund_amount), rowStyle)}
    {detailRow('折抵金额', formatOrderAmount(order.surplus_amount), rowStyle)}
    <Divider />
    {detailRow('创建时间', formatOrderTime(order.created_at), rowStyle)}
    {detailRow('更新时间', formatOrderTime(order.updated_at), rowStyle)}
    {order.invite_user_id && order.status === 3 ? <div>
      <Divider />
      {detailRow('邀请人', <Tooltip title="查看TA邀请的人"><a onClick={() => onUserFilter('invite_by_email', '模糊', inviteUser.email)} href="javascript:void(0);">{inviteUser.email}</a></Tooltip>, rowStyle)}
      {detailRow('佣金金额', formatOrderAmount(order.commission_balance), rowStyle)}
      {order.actual_commission_balance && detailRow('实际发放', formatOrderAmount(order.actual_commission_balance), rowStyle)}
      {detailRow('佣金状态', settings.commissionStatusText[order.commission_status], rowStyle)}
    </div> : ''}
  </div>;
}
