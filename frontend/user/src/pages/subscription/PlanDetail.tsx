import React from 'react';
import Result from 'antd/lib/result';
import MainLayout from '../../layouts/MainLayout';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import { formatMessage } from '../../locales/i18n';
import { isExpired, parseJson } from '../../utils/siteHelpers';
import { router } from '../../app/navigation';
import { PeriodSelector, couponDiscount, totalAmount } from '../../components/checkout/Pricing';
import { CouponInput, CouponDiscount } from '../../components/checkout/Coupon';
import OrderSummary from '../../components/checkout/OrderSummary';
import type { PlanFeature, PlanPeriod } from '../../types/plan';
import type { UserDispatch, UserRootState } from '../../types/store';

const message = (id: string): string => formatMessage({ id });

type PlanDetailStateProps = Pick<UserRootState, 'plan' | 'coupon' | 'order' | 'user' | 'comm'>;
type PlanDetailProps = PlanDetailStateProps & {
  dispatch: UserDispatch;
  match: { params: { plan_id: string } };
};

export class PlanDetailPage extends React.Component<PlanDetailProps> {
  couponInput = React.createRef<HTMLInputElement>();
  componentDidMount() {
    this.props.dispatch({ type: 'plan/fetchById', id: this.props.match.params.plan_id });
    this.props.dispatch({ type: 'comm/config' });
    this.props.dispatch({ type: 'order/fetch' });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'coupon/empty' });
    this.props.dispatch({ type: 'plan/empty' });
  }
  preOrder() {
    const plan = this.props.plan.plan;
    const { orders, cancelLoading } = this.props.order;
    const { userInfo, subscribe } = this.props.user;
    if (userInfo.plan_id && userInfo.plan_id !== plan.id && !isExpired(subscribe.expired_at)) {
      return Modal.confirm({ title: message('注意'), content: message('变更订阅会导致当前订阅被新订阅覆盖，请注意。'), onOk: () => this.order() });
    }
    if (!orders.length || (orders[0].status !== 1 && orders[0].status !== 0)) {
      this.order();
      return;
    }
    return Modal.confirm({
      title: message('注意'),
      content: message('你还有未完成的订单，购买前需要先进行取消，确定取消先前的订单吗？'),
      onOk: () => this.props.dispatch({ type: 'order/cancel', tradeNo: orders[0].trade_no, complete: () => this.order() }),
      okText: message('确定取消'), okButtonProps: { loading: cancelLoading },
      cancelText: message('返回我的订单'), onCancel: () => router.push('/order'),
    });
  }
  order() {
    const { plan, selectPeriod } = this.props.plan;
    const coupon = this.props.coupon.coupon;
    const params: { period?: PlanPeriod; plan_id?: number; coupon_code?: string } = { period: selectPeriod, plan_id: plan.id };
    if (coupon.name) params.coupon_code = coupon.code;
    this.props.dispatch({ type: 'order/save', params });
  }
  couponCheck() {
    this.props.dispatch({ type: 'coupon/check', code: this.couponInput.current?.value ?? '', planId: this.props.match.params.plan_id });
  }
  couponProcess(price: number, type: number, value: number) { return couponDiscount(price, type, value); }
  getTotalAmount() {
    const period = this.props.plan.selectPeriod || '';
    return totalAmount(Number(this.props.plan.plan[period]), this.props.coupon.coupon);
  }
  getCouponJSX() {
    if (!this.props.coupon.coupon.name) return undefined;
    const period = this.props.plan.selectPeriod || '';
    return <CouponDiscount coupon={this.props.coupon.coupon} price={this.props.plan.plan[period]} currencySymbol={this.props.comm.config.currency_symbol || ''} />;
  }
  render() {
    const { plan, selectPeriod: period, fetchLoading: loading } = this.props.plan;
    const { config } = this.props.comm;
    const content = parseJson<PlanFeature[]>(plan.content || '');
    return <MainLayout {...this.props} title={message('配置订阅')}>
      <main id="main-container"><div className="content content-full">
        {loading ? <div className="spinner-grow text-primary" role="status"><span className="sr-only">Loading...</span></div>
          : plan.renew || this.props.user.userInfo.plan_id !== plan.id ? (
            <div className="row" id="cashier">
              <div className="col-md-8 col-sm-12">
                <div className="block block-link-pop block-rounded py-3" style={{ backgroundColor: '#fff' }}>
                  <h4 className="mb-0 px-3">{plan.name}</h4>
                  {content && typeof content === 'object' ? <div className="v2board-plan-content px-3">{content.map((feature, index) => (
                    <div key={index} style={{ textAlign: 'left', marginBottom: 8, opacity: feature.support ? 1 : 0.3 }}>
                      <i className={feature.support ? 'si si-check text-primary' : 'si si-close text-primary'} style={{ fontSize: 21, verticalAlign: 'sub' }} />
                      <span style={{ paddingLeft: 8 }}>{feature.feature}</span>
                    </div>
                  ))}</div> : <div dangerouslySetInnerHTML={{ __html: plan.content || '' }} className="v2board-plan-content" />}
                </div>
                <PeriodSelector plan={plan} period={period} currencySymbol={config.currency_symbol} onSelect={selectPeriod => this.props.dispatch({ type: 'plan/setState', payload: { selectPeriod } })} />
              </div>
              <div className="col-md-4 col-sm-12">
                <CouponInput inputRef={this.couponInput} onCheck={() => this.couponCheck()} />
                <OrderSummary plan={plan} period={period} coupon={this.props.coupon.coupon} config={config} saving={this.props.order.saveLoading} onOrder={() => this.preOrder()} />
              </div>
            </div>
          ) : <div className="row"><div className="col-12"><div className="block block-rounded"><div className="block-content">
            <Result status="info" title={message('该订阅无法续费，仅允许新用户购买')} subTitle={<Button className="mt-3" type="primary" onClick={() => router.push('/plan')}>{message('选择其他订阅')}</Button>} />
          </div></div></div></div>}
      </div></main>
    </MainLayout>;
  }
}
export default connect(({ plan, coupon, order, user, comm }: UserRootState) => ({ plan, coupon, order, user, comm }))(PlanDetailPage);
