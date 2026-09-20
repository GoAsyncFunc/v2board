import OrderInfo from "../components/checkout/OrderInfo";
import ProductInfo from "../components/checkout/ProductInfo";
import OrderPaymentSummary from "../components/checkout/OrderPaymentSummary";
import OrderStatusResult, {
    orderResultProps,
} from "../components/checkout/OrderStatusResult";
import PaymentMethods from "../components/checkout/PaymentMethods";
import PaymentQrModal from "../components/checkout/PaymentQrModal";
import React from "react";
import MainLayout from "../layouts/MainLayout";
import { connect } from "react-redux";
import message from 'antd/lib/message';
import loadable from 'react-loadable';
import { formatMessage } from '../locales/i18n';
import type { CheckoutPaymentMethod, StripeCheckoutState, StripeToken } from "../types/payment";
import type { PaymentMethod } from "../types/commerce";
import type { UserDispatch, UserRootState } from "../types/store";

const StripeForm = loadable({
    loader: () => import("../components/checkout/StripePaymentForm"),
    loading: () => null,
});
let orderPollingTimer: ReturnType<typeof setTimeout> | undefined; // Shared timer behavior is preserved by lifecycle regression tests.

type OrderDetailStateProps = Pick<UserRootState, 'order' | 'comm'>;
type OrderDetailProps = OrderDetailStateProps & {
    dispatch: UserDispatch;
    match: { params: { trade_no: string } };
};
interface PaymentState { stripe: StripeCheckoutState; pk?: string; }

export class OrderDetailPage extends React.Component<OrderDetailProps, PaymentState> {
    state: PaymentState = { stripe: {} };

    componentDidMount() {
        this.fetchData();
        this.props.dispatch({ type: "user/getUserInfo" });
        this.props.dispatch({ type: "comm/config" });
    }
    componentWillUnmount() {
        clearTimeout(orderPollingTimer);
        this.props.dispatch({ type: "order/empty" });
    }
    fetchData() {
        this.props.dispatch({
            type: "order/detail",
            tradeNo: this.props.match.params.trade_no,
            callback: () => {
                this.check();
                this.getPaymentMethod();
            },
        });
    }
    getPaymentMethod() {
        this.props.dispatch({
            type: "order/getPaymentMethod",
            complete: (methods: CheckoutPaymentMethod[]) => {
                if (methods.length) this.changePaymentMethod(methods[0].id);
            },
        });
    }
    checkout() {
        const { selectMethod: methodId, paymentMethod: methods } = this.props.order;
        const { stripe } = this.state;
        const payment = methods.find(method => method.id === methodId);
        if (payment && payment.payment === "StripeCredit") {
            if (!stripe.token) {
                return message.error(formatMessage({ id: "请检查信用卡支付信息" }));
            }
            this.props.dispatch({
                type: "order/checkoutByStripe",
                tradeNo: this.props.match.params.trade_no,
                method: methodId,
                token: stripe.token.id,
            });
            return;
        }
        this.props.dispatch({
            type: "order/checkout",
            tradeNo: this.props.match.params.trade_no,
            method: methodId,
        });
    }
    check() {
        orderPollingTimer = setTimeout(() => {
            this.props.dispatch({
                type: "order/check",
                tradeNo: this.props.match.params.trade_no,
                callback: (response: { data?: number | string | null }) => {
                    if (response.data === 0) {
                        this.check();
                        return;
                    }
                    clearTimeout(orderPollingTimer);
                    this.props.dispatch({
                        type: "order/setState",
                        payload: { qrcodeModalVisible: false },
                    });
                    this.props.dispatch({
                        type: "order/detail",
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
        const payment = methods.find(method => method.id === methodId);
        if (payment && payment.payment === "StripeCredit" && !this.state.pk) {
            this.props.dispatch({
                type: "comm/getStripePublicKey",
                id: methodId,
                complete: (publicKey: string) => {
                    this.setState({ pk: publicKey });
                },
            });
        }
        if (Number(order.total_amount) > 0 && (payment!.handling_fee_fixed || payment!.handling_fee_percent)) {
            order.pre_handling_amount =
                Number(order.total_amount) * (payment!.handling_fee_percent / 100) + payment!.handling_fee_fixed;
        } else {
            order.pre_handling_amount = 0;
        }
        this.props.dispatch({
            type: "order/setState",
            payload: { selectMethod: methodId, order },
        });
    }
    checkImage(url: string) {
        const request = new XMLHttpRequest();
        request.open("HEAD", url, false);
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
        const { config } = this.props.comm;
        const { stripe } = this.state;
        const selectedPayment: Partial<CheckoutPaymentMethod> = methods.find(method => method.id === selectedMethod) || {};
        return (
            <MainLayout
                {...this.props}
                title={formatMessage({ id: "订单详情" })}
            >
                <main id={"main-container"}>
                    <div className={"content content-full"}>
                        {detailsLoading ? (
                            <div
                                className={"spinner-grow text-primary"}
                                role={"status"}
                            >
                                <span className={"sr-only"}>
                                    {"Loading..."}
                                </span>
                            </div>
                        ) : (
                            <div className={"row"} id={"cashier"}>
                                <div
                                    className={
                                        0 === order.status
                                            ? "col-md-8 col-sm-12"
                                            : "col-12"
                                    }
                                >
                                    {0 !== order.status && (
                                        <div className={"block block-rounded"}>
                                            <div
                                                className={"block-content pt-0"}
                                            >
                                                {
                                                    <OrderStatusResult
                                                        status={order.status}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    )}
                                    <ProductInfo
                                        order={order}
                                        config={config}
                                        cancelLoading={cancelLoading}
                                        dispatch={this.props.dispatch}
                                    />
                                    <OrderInfo
                                        order={order}
                                        config={config}
                                        cancelLoading={cancelLoading}
                                        dispatch={this.props.dispatch}
                                    />
                                    {0 === order.status && (
                                        <React.Fragment>
                                            <div
                                                className={
                                                    "block block-rounded js-appear-enabled"
                                                }
                                            >
                                                <div
                                                    className={
                                                        "block-header block-header-default"
                                                    }
                                                >
                                                    <h3
                                                        className={
                                                            "block-title"
                                                        }
                                                    >
                                                        {formatMessage({
                                                            id: "支付方式",
                                                        })}
                                                    </h3>
                                                    <div
                                                        className={
                                                            "block-options"
                                                        }
                                                    ></div>
                                                </div>
                                                <PaymentMethods
                                                    methods={methods}
                                                    selectedMethod={
                                                        selectedMethod
                                                    }
                                                    onSelect={(id) =>
                                                        this.changePaymentMethod(
                                                            id,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {0 === order.status &&
                                        "StripeCredit" ===
                                            selectedPayment.payment &&
                                        this.state.pk && (
                                            <React.Fragment>
                                                <h3
                                                    className={
                                                        "font-w300 mt-5 mb-3"
                                                    }
                                                >
                                                    {formatMessage({
                                                        id: "填写信用卡支付信息",
                                                    })}
                                                </h3>
                                                <StripeForm
                                                    key={this.state.pk}
                                                    pk={this.state.pk}
                                                    callback={(error: string | null | undefined, token?: StripeToken | null) =>
                                                        this.stripeCallback(
                                                            error,
                                                            token,
                                                        )
                                                    }
                                                ></StripeForm>
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                    }}
                                                    className={"mt-3 mb-5"}
                                                >
                                                    <i
                                                        className={
                                                            "fa fa-user-shield"
                                                        }
                                                        style={{
                                                            marginRight: 5,
                                                            color: "#7cb305",
                                                        }}
                                                    ></i>
                                                    {formatMessage({
                                                        id: "您的信用卡信息只会被用作当次扣款，系统并不会保存，这是我们认为最安全的。",
                                                    })}
                                                </div>
                                            </React.Fragment>
                                        )}
                                </div>
                                {0 === order.status && (
                                    <OrderPaymentSummary
                                        order={order}
                                        config={config}
                                        checkoutLoading={checkoutLoading}
                                        selectedPayment={selectedPayment}
                                        stripe={stripe}
                                        onCheckout={() => this.checkout()}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </main>
                <PaymentQrModal
                    visible={qrVisible}
                    payUrl={typeof payUrl === 'string' ? payUrl : undefined}
                    onCancel={() =>
                        this.props.dispatch({
                            type: "order/setState",
                            payload: {
                                qrcodeModalVisible: false,
                                payUrl: undefined,
                            },
                        })
                    }
                />
            </MainLayout>
        );
    }
}
export default connect(({ order, comm }: UserRootState) => ({
    order,
    comm,
}))(OrderDetailPage);
