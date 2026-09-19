import React from 'react';
import { Icon } from '../../vendor/Icon.js';
import { localeSettings as settings } from '../../vendor/localeSettings.js';
import { formatMessage } from '../../vendor/i18n.js';
import { CouponDiscount } from './Coupon.jsx';
import { totalAmount } from './Pricing.jsx';
import { formatPrice } from '../MoneyDisplay.jsx';

export default function OrderSummary({ plan, period, coupon, config, saving, onOrder }) {
  return <div className="block block-link-pop block-rounded  px-3 py-3 text-light" style={{ background: '#35383D' }}>
    <h5 className="text-light mb-3">{formatMessage({ id: '订单总额' })}</h5>
    <div className="row no-gutters pb-3" style={{ borderBottom: '1px solid #646669' }}>
      <div className="col-8">{plan.name}{' x '}{settings.periodText[period] && settings.periodText[period]()}</div>
      <div className="col-4 text-right">{config.currency_symbol}{formatPrice(plan[period])}</div>
    </div>
    <CouponDiscount coupon={coupon} price={plan[period]} currencySymbol={config.currency_symbol} />
    <div className="pt-3" style={{ color: '#646669' }}>{formatMessage({ id: '总计' })}</div>
    <h1 className="text-light mt-3 mb-3">{config.currency_symbol}{' '}{totalAmount(plan[period], coupon)}{' '}{config.currency}</h1>
    <button type="button" className="btn btn-block btn-primary" disabled={saving} onClick={onOrder}>
      {saving ? <Icon type="loading" /> : <span><i className="far fa-check-circle" />{' '}{formatMessage({ id: '下单' })}</span>}
    </button>
  </div>;
}
