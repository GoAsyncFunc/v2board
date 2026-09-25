import OrderStatusResult, {
    orderResultProps,
} from '../../components/commerce/checkout/OrderStatusResult';
import React from 'react';
import { connect } from 'react-redux';
import message from 'antd/lib/message';
import { formatMessage } from '../../locales/i18n';
import OrderDetailView from './components/OrderDetailView';
import type {
    CheckoutPaymentMethod,
    StripeCheckoutState,
    StripeToken,
} from '../../types/paymentContracts';
import type { PaymentMethod } from '../../types/commerceContracts';
import type { UserDispatch, UserRootState } from '../../types/storeContracts';

let orderPollingTimer: ReturnType<typeof setTimeout> | undefined; // Shared timer behavior is preserved by lifecycle regression tests.

type OrderDetailStateProps = Pick<UserRootState, 'order' | 'comm'>;
type OrderDetailProps = OrderDetailStateProps & {
    dispatch: UserDispatch;
    match: { params: { trade_no: string } };
};
interface PaymentState {
    stripe: StripeCheckoutState;
    pk?: string;
}

function requirePaymentMethod(payment: CheckoutPaymentMethod | undefined): CheckoutPaymentMethod {
    if (!payment) throw new TypeError('Selected payment method was not found');
    return payment;
}

export class OrderDetailPage extends React.Component<OrderDetailProps, PaymentState> {
    state: PaymentState = { stripe: {} };

    componentDidMount() {
        this.fetchData();
        this.props.dispatch({ type: 'user/getUserInfo' });
        this.props.dispatch({ type: 'comm/config' });
    }
    componentWillUnmount() {
        clearTimeout(orderPollingTimer);
        this.props.dispatch({ type: 'order/empty' });
    }
    fetchData() {
        this.props.dispatch({
            type: 'order/detail',
            tradeNo: this.props.match.params.trade_no,
            callback: () => {
                this.check();
                this.getPaymentMethod();
            },
        });
    }
    getPaymentMethod() {
        this.props.dispatch({
            type: 'order/getPaymentMethod',
            complete: (methods: CheckoutPaymentMethod[]) => {
                if (methods.length) this.changePaymentMethod(methods[0].id);
            },
        });
    }
    checkout() {
        const { selectMethod: methodId, paymentMethod: methods } = this.props.order;
        const { stripe } = this.state;
        const payment = methods.find((method) => method.id === methodId);
        if (payment && payment.payment === 'StripeCredit') {
            if (!stripe.token) {
                return message.error(formatMessage({ id: '请检查信用卡支付信息' }));
            }
            this.props.dispatch({
                type: 'order/checkoutByStripe',
                tradeNo: this.props.match.params.trade_no,
                method: methodId,
                token: stripe.token.id,
                complete: () =>
                    message.loading(formatMessage({ id: '请稍等，我们正在验证该笔支付' }), 5),
            });
            return;
        }
        this.props.dispatch({
            type: 'order/checkout',
            tradeNo: this.props.match.params.trade_no,
            method: methodId,
            complete: () => message.info(formatMessage({ id: '正在前往收银台' })),
        });
    }
    check() {
        orderPollingTimer = setTimeout(() => {
            this.props.dispatch({
                type: 'order/check',
                tradeNo: this.props.match.params.trade_no,
                callback: (response: { data?: number | string | null }) => {
                    if (response.data === 0) {
                        this.check();
                        return;
                    }
                    clearTimeout(orderPollingTimer);
                    this.props.dispatch({
                        type: 'order/setState',
                        payload: { qrcodeModalVisible: false },
                    });
                    this.props.dispatch({
                        type: 'order/detail',
                        tradeNo: this.props.match.params.trade_no,
                    });
                },
            });
        }, 3000);
    }
    stripeCallback(_error: string | null | undefined, token?: StripeToken | null) {
        this.setState({ stripe: { token } });
    }
    getResultText(status: number) {
        return orderResultProps(status);
    }
    changePaymentMethod(methodId: PaymentMethod['id']) {
        const { paymentMethod: methods, order } = this.props.order;
        const payment = methods.find((method) => method.id === methodId);
        if (payment && payment.payment === 'StripeCredit' && !this.state.pk) {
            this.props.dispatch({
                type: 'comm/getStripePublicKey',
                id: methodId,
                complete: (publicKey: string) => {
                    this.setState({ pk: publicKey });
                },
            });
        }
        const selectedPayment =
            Number(order.total_amount) > 0 ? requirePaymentMethod(payment) : payment;
        if (
            selectedPayment &&
            (selectedPayment.handling_fee_fixed || selectedPayment.handling_fee_percent)
        ) {
            order.pre_handling_amount =
                Number(order.total_amount) * (selectedPayment.handling_fee_percent / 100) +
                selectedPayment.handling_fee_fixed;
        } else {
            order.pre_handling_amount = 0;
        }
        this.props.dispatch({
            type: 'order/setState',
            payload: { selectMethod: methodId, order },
        });
    }
    checkImage(url: string) {
        const request = new XMLHttpRequest();
        request.open('HEAD', url, false);
        request.send();
        return request.status !== 404;
    }
    render() {
        const {
            order,
            selectMethod: selectedMethod,
            paymentMethod: methods,
            qrcodeModalVisible: qrVisible,
            payUrl,
            checkoutLoading,
            detailsLoading,
            cancelLoading,
        } = this.props.order;
        return (
            <OrderDetailView
                dispatch={this.props.dispatch}
                order={order}
                config={this.props.comm.config}
                methods={methods}
                selectedMethod={selectedMethod}
                qrVisible={qrVisible}
                payUrl={typeof payUrl === 'string' ? payUrl : undefined}
                checkoutLoading={checkoutLoading}
                detailsLoading={detailsLoading}
                cancelLoading={cancelLoading}
                stripe={this.state.stripe}
                stripePublicKey={this.state.pk}
                onSelectPayment={(id) => this.changePaymentMethod(id)}
                onStripeToken={(error, token) => this.stripeCallback(error, token)}
                onCheckout={() => this.checkout()}
                onCancelQr={() =>
                    this.props.dispatch({
                        type: 'order/setState',
                        payload: { qrcodeModalVisible: false, payUrl: undefined },
                    })
                }
            />
        );
    }
}
export default connect(({ order, comm }: UserRootState) => ({
    order,
    comm,
}))(OrderDetailPage);
