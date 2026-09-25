import React from 'react';
import loadable from 'react-loadable';
import { formatMessage } from '../../../locales/i18n';
import type { PaymentMethod } from '../../../types/commerce';
import type { CheckoutPaymentMethod, StripeToken } from '../../../types/paymentContracts';
import PaymentMethods from './PaymentMethods';

const StripePaymentForm = loadable({
    loader: () => import('./StripePaymentForm'),
    loading: () => null,
});

interface CheckoutPaymentSectionProps {
    methods: CheckoutPaymentMethod[];
    onSelect: (methodId: PaymentMethod['id']) => void;
    onStripeToken: (error: string | null | undefined, token?: StripeToken | null) => void;
    selectedMethod?: PaymentMethod['id'];
    stripePublicKey?: string;
}

export default function CheckoutPaymentSection({
    methods,
    onSelect,
    onStripeToken,
    selectedMethod,
    stripePublicKey,
}: CheckoutPaymentSectionProps) {
    const selectedPayment = methods.find((method) => method.id === selectedMethod);
    const showStripeForm = selectedPayment?.payment === 'StripeCredit' && stripePublicKey;

    return (
        <>
            <div className="block block-rounded js-appear-enabled">
                <div className="block-header block-header-default">
                    <h3 className="block-title">{formatMessage({ id: '支付方式' })}</h3>
                    <div className="block-options" />
                </div>
                <PaymentMethods
                    methods={methods}
                    selectedMethod={selectedMethod}
                    onSelect={onSelect}
                />
            </div>
            {showStripeForm && (
                <>
                    <h3 className="font-w300 mt-5 mb-3">
                        {formatMessage({ id: '填写信用卡支付信息' })}
                    </h3>
                    <StripePaymentForm
                        key={stripePublicKey}
                        pk={stripePublicKey}
                        callback={onStripeToken}
                    />
                    <div className="mt-3 mb-5" style={{ fontSize: 12 }}>
                        <i
                            className="fa fa-user-shield"
                            style={{ marginRight: 5, color: '#7cb305' }}
                        />
                        {formatMessage({
                            id: '您的信用卡信息只会被用作当次扣款，系统并不会保存，这是我们认为最安全的。',
                        })}
                    </div>
                </>
            )}
        </>
    );
}
