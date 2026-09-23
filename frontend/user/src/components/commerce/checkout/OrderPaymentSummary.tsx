import React from 'react';
import Icon from 'antd/lib/icon';
import { localeSettings as settings } from '../../../config/localeSettings';
import { formatMessage } from '../../../locales/i18n';
import { formatPrice } from '../../common/MoneyDisplay';
import type { PaymentConfig } from '../../../types/commerce';
import type { OrderModelRecord, StripeCheckoutState } from '../../../types/payment';

interface OrderPaymentSummaryProps {
    order: OrderModelRecord;
    config: PaymentConfig;
    checkoutLoading?: boolean;
    selectedPayment: { payment?: string };
    stripe: StripeCheckoutState;
    onCheckout: () => void;
}

interface PaymentAdjustmentRowProps {
    amount: number;
    currencySymbol?: string;
    label: string;
    prefix?: string;
}

function PaymentAdjustmentRow({
    amount,
    currencySymbol,
    label,
    prefix = '',
}: PaymentAdjustmentRowProps) {
    if (!amount) return null;

    return (
        <div>
            <div className="pt-3" style={{ color: '#646669' }}>
                {formatMessage({ id: label })}
            </div>
            <div className="row no-gutters py-3" style={{ borderBottom: '1px solid #646669' }}>
                <div className="col-8" />
                <div className="col-4 text-right">
                    {prefix}
                    {currencySymbol}
                    {formatPrice(amount)}
                </div>
            </div>
        </div>
    );
}

const periodLabels: Readonly<Partial<Record<string, () => string>>> = settings.periodText;
export default function OrderPaymentSummary({
    order,
    config,
    checkoutLoading,
    selectedPayment,
    stripe,
    onCheckout,
}: OrderPaymentSummaryProps) {
    const period = order.period || '';
    const periodLabel = periodLabels[period];
    return (
        <div className={'col-md-4 col-sm-12'}>
            <div
                className={'block block-link-pop block-rounded  px-3 py-3 text-light'}
                style={{
                    background: '#35383D',
                }}
            >
                <h5 className={'text-light mb-3'}>
                    {formatMessage({
                        id: '订单总额',
                    })}
                </h5>
                {order.plan.id == 0 && (
                    <div>
                        <div className={'pt-3'}>
                            {formatMessage({
                                id: '充值奖励',
                            })}
                            <div className={'text-right'}>
                                {config.currency_symbol}
                                {formatPrice(order.bounus)}
                            </div>
                        </div>
                    </div>
                )}
                {order.plan.id == 0 && (
                    <div>
                        <div className={'pt-3'}>
                            {formatMessage({
                                id: '实际到账',
                            })}
                            <div className={'text-right'}>
                                {config.currency_symbol}
                                {formatPrice(order.get_amount)}
                            </div>
                        </div>
                        <div
                            className={'row no-gutters py-3'}
                            style={{
                                borderBottom: '1px solid #646669',
                            }}
                        ></div>
                    </div>
                )}
                {order.plan.id != 0 && (
                    <div
                        className={'row no-gutters pb-3'}
                        style={{
                            borderBottom: '1px solid #646669',
                        }}
                    >
                        <div className={'col-8'}>
                            {order.plan.name}
                            {' x '}
                            {periodLabel && periodLabel()}
                        </div>
                        <div className={'col-4 text-right'}>
                            {config.currency_symbol}
                            {formatPrice(order.plan[period])}
                        </div>
                    </div>
                )}
                <PaymentAdjustmentRow
                    amount={order.discount_amount || 0}
                    currencySymbol={config.currency_symbol}
                    label="折扣"
                />
                <PaymentAdjustmentRow
                    amount={order.surplus_amount || 0}
                    currencySymbol={config.currency_symbol}
                    label="折抵"
                />
                <PaymentAdjustmentRow
                    amount={order.refund_amount || 0}
                    currencySymbol={config.currency_symbol}
                    label="退款"
                    prefix="- "
                />
                <PaymentAdjustmentRow
                    amount={order.pre_handling_amount || 0}
                    label="支付手续费"
                    prefix="+ "
                />
                <div
                    className={'pt-3'}
                    style={{
                        color: '#646669',
                    }}
                >
                    {formatMessage({
                        id: '总计',
                    })}
                </div>
                <h1 className={'text-light mt-3 mb-3'}>
                    {config.currency_symbol}{' '}
                    {formatPrice(Number(order.total_amount) + (order.pre_handling_amount || 0))}{' '}
                    {config.currency}
                </h1>
                <button
                    type={'button'}
                    className={'btn btn-block btn-primary'}
                    disabled={
                        checkoutLoading ||
                        ('StripeCredit' === selectedPayment.payment && !stripe.token)
                    }
                    onClick={() => onCheckout()}
                >
                    {checkoutLoading ? (
                        <Icon
                            {...{
                                type: 'loading',
                            }}
                        ></Icon>
                    ) : (
                        <span>
                            <i className={'far fa-check-circle'}></i>{' '}
                            {formatMessage({
                                id: '结账',
                            })}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
