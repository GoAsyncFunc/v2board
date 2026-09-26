import React from 'react';
import Icon from 'antd/lib/icon';
import { localeSettings as settings } from '@/config/localeSettings';
import { formatMessage } from '@/locales/i18n';
import { CouponDiscount } from './Coupon';
import { totalAmount } from './Pricing';
import { formatPrice } from '@/components/common/MoneyDisplay';
import type { CouponData, PaymentConfig } from '@/types/commerceContracts';
import type { PlanRecord } from '@/types/userDomainContracts';
import type { PlanPeriod } from '@/types/planContracts';

interface OrderSummaryProps {
    config: PaymentConfig;
    coupon: CouponData;
    onOrder: React.MouseEventHandler<HTMLButtonElement>;
    period?: PlanPeriod;
    plan: PlanRecord;
    saving?: boolean;
}

export default function OrderSummary({
    plan,
    period,
    coupon,
    config,
    saving,
    onOrder,
}: OrderSummaryProps) {
    const selectedPeriod = period || '';
    const periodText: (() => string) | undefined = Reflect.get(settings.periodText, selectedPeriod);
    return (
        <div
            className="block block-link-pop block-rounded  px-3 py-3 text-light"
            style={{ background: '#35383D' }}
        >
            <h5 className="text-light mb-3">{formatMessage({ id: '订单总额' })}</h5>
            <div className="row no-gutters pb-3" style={{ borderBottom: '1px solid #646669' }}>
                <div className="col-8">
                    {plan.name}
                    {' x '}
                    {periodText?.()}
                </div>
                <div className="col-4 text-right">
                    {config.currency_symbol}
                    {formatPrice(plan[selectedPeriod])}
                </div>
            </div>
            <CouponDiscount
                coupon={coupon}
                price={plan[selectedPeriod]}
                currencySymbol={config.currency_symbol || ''}
            />
            <div className="pt-3" style={{ color: '#646669' }}>
                {formatMessage({ id: '总计' })}
            </div>
            <h1 className="text-light mt-3 mb-3">
                {config.currency_symbol} {totalAmount(Number(plan[selectedPeriod]), coupon)}{' '}
                {config.currency}
            </h1>
            <button
                type="button"
                className="btn btn-block btn-primary"
                disabled={saving}
                onClick={onOrder}
            >
                {saving ? (
                    <Icon type="loading" />
                ) : (
                    <span>
                        <i className="far fa-check-circle" /> {formatMessage({ id: '下单' })}
                    </span>
                )}
            </button>
        </div>
    );
}
