import React from 'react';
import { a as Radio } from '../../vendor/modules/antdRadio.js';
import { a as settings } from '../../vendor/localeSettings.js';
import { formatMessage } from '../../vendor/i18n.js';
import { formatPrice } from '../MoneyDisplay.jsx';
import '../../vendor/modules/374b616b.js';

export function PeriodSelector({ plan, period, currencySymbol, onSelect }) {
  return <div className="block block-rounded js-appear-enabled">
    <div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '付款周期' })}</h3><div className="block-options" /></div>
    <div className="block-content p-0">{Object.keys(settings.periodText).map(key => {
      if (key === 'reset_price' || plan[key] === null) return undefined;
      return <div key={key} onClick={() => onSelect(key)} className={'v2board-select ' + (period === key && 'active border-primary')}>
        <div style={{ flex: 1 }}><Radio className="v2board-select-radio" checked={period === key} />{settings.periodText[key] && settings.periodText[key]()}</div>
        <div style={{ flex: 1, textAlign: 'right' }}><span className="price">{currencySymbol}{formatPrice(plan[key])}</span></div>
      </div>;
    })}</div>
  </div>;
}

export function couponDiscount(price, type, value) {
  switch (type) {
    case 1: return value.toFixed(2);
    case 2: return (price * (value / 100)).toFixed(2);
  }
}
export function totalAmount(price, coupon) {
  let amount = price;
  if (coupon.name) amount -= couponDiscount(amount, coupon.type, coupon.value);
  if (amount <= 0) amount = 0;
  return formatPrice(amount);
}
