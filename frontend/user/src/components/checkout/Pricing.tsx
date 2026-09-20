import React from 'react';
import Radio from 'antd/lib/radio';
import { localeSettings as settings } from '../../config/localeSettings';
import { formatMessage } from '../../locales/i18n';
import { formatPrice } from '../MoneyDisplay';
import type { CouponData, PlanData } from '../../types/commerce';

interface PeriodSelectorProps {
  currencySymbol: string;
  onSelect: (period: string) => void;
  period: string;
  plan: PlanData;
}

export function PeriodSelector({ plan, period, currencySymbol, onSelect }: PeriodSelectorProps) {
  return <div className="block block-rounded js-appear-enabled">
    <div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '付款周期' })}</h3><div className="block-options" /></div>
    <div className="block-content p-0">{Object.keys(settings.periodText).map(key => {
      if (key === 'reset_price' || plan[key] === null) return undefined;
      const periodText: (() => string) | undefined = Reflect.get(settings.periodText, key);
      return <div key={key} onClick={() => onSelect(key)} className={'v2board-select ' + (period === key && 'active border-primary')}>
        <div style={{ flex: 1 }}><Radio className="v2board-select-radio" checked={period === key} />{periodText?.()}</div>
        <div style={{ flex: 1, textAlign: 'right' }}><span className="price">{currencySymbol}{formatPrice(plan[key])}</span></div>
      </div>;
    })}</div>
  </div>;
}

export function couponDiscount(price: number, type: number, value: number): string | undefined {
  switch (type) {
    case 1: return value.toFixed(2);
    case 2: return (price * (value / 100)).toFixed(2);
  }
}
export function totalAmount(price: number, coupon: CouponData): string {
  let amount = price;
  if (coupon.name) amount -= Number(couponDiscount(amount, coupon.type!, coupon.value!));
  if (amount <= 0) amount = 0;
  return formatPrice(amount);
}
