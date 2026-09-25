import React from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { formatMessage } from '../../../locales/i18n';
import OrderInfo from '../../../components/commerce/checkout/OrderInfo';
import ProductInfo from '../../../components/commerce/checkout/ProductInfo';
import OrderPaymentSummary from '../../../components/commerce/checkout/OrderPaymentSummary';
import CheckoutPaymentSection from '../../../components/commerce/checkout/CheckoutPaymentSection';
import OrderStatusResult from '../../../components/commerce/checkout/OrderStatusResult';
import PaymentQrModal from '../../../components/commerce/checkout/PaymentQrModal';
import type { PaymentConfig, PaymentMethod } from '../../../types/commerceContracts';
import type {
    CheckoutPaymentMethod,
    OrderModelRecord,
    StripeCheckoutState,
    StripeToken,
} from '../../../types/paymentContracts';
import type { UserDispatch } from '../../../types/storeContracts';

interface OrderDetailViewProps {
    dispatch: UserDispatch;
    order: OrderModelRecord;
    config: PaymentConfig;
    methods: CheckoutPaymentMethod[];
    selectedMethod?: PaymentMethod['id'];
    qrVisible?: boolean;
    payUrl?: string;
    checkoutLoading?: boolean;
    detailsLoading?: boolean;
    cancelLoading?: boolean;
    stripe: StripeCheckoutState;
    stripePublicKey?: string;
    onSelectPayment: (methodId: PaymentMethod['id']) => void;
    onStripeToken: (error: string | null | undefined, token?: StripeToken | null) => void;
    onCheckout: () => void;
    onCancelQr: () => void;
}

export default function OrderDetailView({
    dispatch,
    order,
    config,
    methods,
    selectedMethod,
    qrVisible,
    payUrl,
    checkoutLoading,
    detailsLoading,
    cancelLoading,
    stripe,
    stripePublicKey,
    onSelectPayment,
    onStripeToken,
    onCheckout,
    onCancelQr,
}: OrderDetailViewProps): React.ReactElement {
    const selectedPayment: Partial<CheckoutPaymentMethod> =
        methods.find((method) => method.id === selectedMethod) || {};

    return (
        <MainLayout title={formatMessage({ id: '订单详情' })}>
            <main id="main-container">
                <div className="content content-full">
                    {detailsLoading ? (
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div className="row" id="cashier">
                            <div className={order.status === 0 ? 'col-md-8 col-sm-12' : 'col-12'}>
                                {order.status !== 0 && (
                                    <div className="block block-rounded">
                                        <div className="block-content pt-0">
                                            <OrderStatusResult status={order.status} />
                                        </div>
                                    </div>
                                )}
                                <ProductInfo
                                    order={order}
                                    config={config}
                                    cancelLoading={cancelLoading}
                                    dispatch={dispatch}
                                />
                                <OrderInfo
                                    order={order}
                                    config={config}
                                    cancelLoading={cancelLoading}
                                    dispatch={dispatch}
                                />
                                {order.status === 0 && (
                                    <CheckoutPaymentSection
                                        methods={methods}
                                        selectedMethod={selectedMethod}
                                        stripePublicKey={stripePublicKey}
                                        onSelect={onSelectPayment}
                                        onStripeToken={onStripeToken}
                                    />
                                )}
                            </div>
                            {order.status === 0 && (
                                <OrderPaymentSummary
                                    order={order}
                                    config={config}
                                    checkoutLoading={checkoutLoading}
                                    selectedPayment={selectedPayment}
                                    stripe={stripe}
                                    onCheckout={onCheckout}
                                />
                            )}
                        </div>
                    )}
                </div>
            </main>
            <PaymentQrModal visible={qrVisible} payUrl={payUrl} onCancel={onCancelQr} />
        </MainLayout>
    );
}
