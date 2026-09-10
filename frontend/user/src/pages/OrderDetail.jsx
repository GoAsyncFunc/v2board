import OrderPaymentSummary from "../components/checkout/OrderPaymentSummary.jsx";
import OrderStatusResult, {
    orderResultProps,
} from "../components/checkout/OrderStatusResult.jsx";
import PaymentMethods from "../components/checkout/PaymentMethods.jsx";
import PaymentQrModal from "../components/checkout/PaymentQrModal.jsx";
import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { c as connect } from "../vendor/reactRedux.js";
import { a as Icon } from "../vendor/Icon.js";
import { a as Modal } from "../vendor/Modal.js";
import { a as message } from "../vendor/modules/74737172.js";
import { a as settings } from "../vendor/localeSettings.js";
import loadable from "../vendor/modules/5642306f.js";
import { formatMessage } from "../vendor/i18n.js";
import moment from "../vendor/modules/77642f52.js";
import { a as Spin } from "../vendor/modules/76333265.js";
import { router } from "../vendor/modules/4172412b.js";
import "../vendor/iconStyles.js";
import "../vendor/modules/374b616b.js";
import "../vendor/modules/32717463.js";
import "../vendor/modules/4a2b2f76.js";
import "../vendor/modules/6d69595a.js";
import "../vendor/modules/79786e6e.js";
const StripeForm = loadable({
    loader: () => import("../vendor/modules/6d623341.js"),
});
let S; // Original shared polling timer; lifecycle behavior is tested before changing it.

export class OrderDetailPage extends React.Component {
    constructor(e) {
        (super(e),
            (this.state = {
                stripe: {},
            }));
    }
    componentDidMount() {
        (this.fetchData(),
            this.props.dispatch({
                type: "user/getUserInfo",
            }),
            this.props.dispatch({
                type: "comm/config",
            }));
    }
    componentWillUnmount() {
        (clearTimeout(S),
            this.props.dispatch({
                type: "order/empty",
            }));
    }
    fetchData() {
        this.props.dispatch({
            type: "order/detail",
            tradeNo: this.props.match.params.trade_no,
            callback: () => {
                (this.check(), this.getPaymentMethod());
            },
        });
    }
    getPaymentMethod() {
        this.props.dispatch({
            type: "order/getPaymentMethod",
            complete: (e) => {
                e.length && this.changePaymentMethod(e[0].id);
            },
        });
    }
    checkout() {
        var orderState = this.props.order,
            methodId = orderState.selectMethod,
            methods = orderState.paymentMethod,
            stripe = this.state.stripe,
            payment = methods.find((e) => e.id === methodId);
        if (payment && "StripeCredit" === payment.payment)
            return stripe.token
                ? void this.props.dispatch({
                      type: "order/checkoutByStripe",
                      tradeNo: this.props.match.params.trade_no,
                      method: methodId,
                      token: stripe.token.id,
                  })
                : message.error(
                      formatMessage({
                          id: "请检查信用卡支付信息",
                      }),
                  );
        this.props.dispatch({
            type: "order/checkout",
            tradeNo: this.props.match.params.trade_no,
            method: methodId,
        });
    }
    check() {
        S = setTimeout(() => {
            this.props.dispatch({
                type: "order/check",
                tradeNo: this.props.match.params.trade_no,
                callback: (e) => {
                    0 !== e.data
                        ? (clearTimeout(S),
                          this.props.dispatch({
                              type: "order/setState",
                              payload: {
                                  qrcodeModalVisible: !1,
                              },
                          }),
                          this.props.dispatch({
                              type: "order/detail",
                              tradeNo: this.props.match.params.trade_no,
                          }))
                        : this.check();
                },
            });
        }, 3e3);
    }
    stripeCallback(e, t) {
        this.setState({
            stripe: {
                token: t,
            },
        });
    }
    getResultText(e) {
        return orderResultProps(e);
    }
    changePaymentMethod(methodId) {
        var orderState = this.props.order,
            methods = orderState.paymentMethod,
            order = orderState.order,
            payment = methods.find((t) => t.id === methodId);
        (payment &&
            "StripeCredit" === payment.payment &&
            !this.state.pk &&
            this.props.dispatch({
                type: "comm/getStripePublicKey",
                id: methodId,
                complete: (e) => {
                    this.setState({
                        pk: e,
                    });
                },
            }),
            order.total_amount > 0 &&
            (payment.handling_fee_fixed || payment.handling_fee_percent)
                ? (order.pre_handling_amount =
                      order.total_amount *
                          (payment.handling_fee_percent / 100) +
                      payment.handling_fee_fixed)
                : (order.pre_handling_amount = 0),
            this.props.dispatch({
                type: "order/setState",
                payload: {
                    selectMethod: methodId,
                    order: order,
                },
            }));
    }
    checkImage(e) {
        var t = new XMLHttpRequest();
        return (t.open("HEAD", e, !1), t.send(), 404 != t.status);
    }
    render() {
        var orderState = this.props.order,
            order = orderState.order,
            selectedMethod = orderState.selectMethod,
            methods = orderState.paymentMethod,
            qrVisible = orderState.qrcodeModalVisible,
            payUrl = orderState.payUrl,
            checkoutLoading = orderState.checkoutLoading,
            detailsLoading = orderState.detailsLoading,
            cancelLoading = orderState.cancelLoading,
            config = this.props.comm.config,
            stripe = this.state.stripe,
            selectedPayment =
                methods.find((e) => e.id === selectedMethod) || {};
        return (
            <MainLayout
                {...Object.assign({}, this.props, {
                    title: formatMessage({
                        id: "订单详情",
                    }),
                })}
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
                                    <div className={"block block-rounded"}>
                                        <div
                                            className={
                                                "block-header block-header-default"
                                            }
                                        >
                                            <h3
                                                className={
                                                    "block-title v2board-trade-no"
                                                }
                                            >
                                                {formatMessage({
                                                    id: "商品信息",
                                                })}
                                            </h3>
                                        </div>
                                        <div className={"block-content pb-4"}>
                                            <div
                                                className={"v2board-order-info"}
                                            >
                                                {order.plan.id == 0 ? (
                                                    <div>
                                                        <span>
                                                            {formatMessage({
                                                                id: "产品名称",
                                                            })}
                                                            {"："}
                                                        </span>
                                                        <span>{"充值"}</span>
                                                    </div>
                                                ) : (
                                                    ((
                                                        <div>
                                                            <span>
                                                                {formatMessage({
                                                                    id: "产品名称",
                                                                })}
                                                                {"："}
                                                            </span>
                                                            <span>
                                                                {
                                                                    order.plan
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                    ),
                                                    (
                                                        <div>
                                                            <span>
                                                                {formatMessage({
                                                                    id: "类型/周期",
                                                                })}
                                                                {"："}
                                                            </span>
                                                            <span>
                                                                {settings
                                                                    .periodText[
                                                                    order.period
                                                                ] &&
                                                                    settings.periodText[
                                                                        order
                                                                            .period
                                                                    ]()}
                                                            </span>
                                                        </div>
                                                    ),
                                                    (
                                                        <div>
                                                            <span>
                                                                {formatMessage({
                                                                    id: "产品流量",
                                                                })}
                                                                {"："}
                                                            </span>
                                                            <span>
                                                                {
                                                                    order.plan
                                                                        .transfer_enable
                                                                }
                                                                {" GB"}
                                                            </span>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"block block-rounded"}>
                                        <div
                                            className={
                                                "block-header block-header-default"
                                            }
                                        >
                                            <h3
                                                className={
                                                    "block-title v2board-trade-no"
                                                }
                                            >
                                                {formatMessage({
                                                    id: "订单信息",
                                                })}
                                            </h3>
                                            {0 === order.status && (
                                                <div
                                                    className={"block-options"}
                                                >
                                                    <button
                                                        disabled={cancelLoading}
                                                        type={"button"}
                                                        className={
                                                            "btn btn-primary btn-sm btn-danger btn-rounded px-3"
                                                        }
                                                        onClick={() => {
                                                            return Modal.confirm(
                                                                {
                                                                    title: formatMessage(
                                                                        {
                                                                            id: "注意",
                                                                        },
                                                                    ),
                                                                    content:
                                                                        formatMessage(
                                                                            {
                                                                                id: "如果你已经付款，取消订单可能会导致支付失败，确定取消订单吗？",
                                                                            },
                                                                        ),
                                                                    onOk: () => {
                                                                        this.props.dispatch(
                                                                            {
                                                                                type: "order/cancel",
                                                                                tradeNo:
                                                                                    order.trade_no,
                                                                            },
                                                                        );
                                                                    },
                                                                    okText: formatMessage(
                                                                        {
                                                                            id: "关闭订单",
                                                                        },
                                                                    ),
                                                                    okButtonProps:
                                                                        {
                                                                            loading:
                                                                                cancelLoading,
                                                                        },
                                                                },
                                                            );
                                                        }}
                                                    >
                                                        {cancelLoading && (
                                                            <Spin
                                                                {...{
                                                                    size: "sm",
                                                                    type: "light",
                                                                }}
                                                            ></Spin>
                                                        )}{" "}
                                                        {formatMessage({
                                                            id: "关闭订单",
                                                        })}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className={"block-content pb-4"}>
                                            <div
                                                className={"v2board-order-info"}
                                            >
                                                <div>
                                                    <span>
                                                        {formatMessage({
                                                            id: "订单号",
                                                        })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {order.trade_no}
                                                    </span>
                                                </div>
                                                {order.discount_amount ? (
                                                    <div>
                                                        <span>
                                                            {formatMessage({
                                                                id: "优惠金额",
                                                            })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {(
                                                                order.discount_amount /
                                                                100
                                                            ).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {order.surplus_amount ? (
                                                    <div>
                                                        <span>
                                                            {formatMessage({
                                                                id: "旧订阅折抵金额",
                                                            })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {(
                                                                order.surplus_amount /
                                                                100
                                                            ).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {order.refund_amount ? (
                                                    <div>
                                                        <span>
                                                            {formatMessage({
                                                                id: "退款金额",
                                                            })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {(
                                                                order.refund_amount /
                                                                100
                                                            ).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {order.balance_amount ? (
                                                    <div>
                                                        <span>
                                                            {formatMessage({
                                                                id: "余额支付",
                                                            })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {(
                                                                order.balance_amount /
                                                                100
                                                            ).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {order.pre_handling_amount ? (
                                                    <div>
                                                        <span>
                                                            {formatMessage({
                                                                id: "支付手续费",
                                                            })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {(
                                                                order.pre_handling_amount /
                                                                100
                                                            ).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div>
                                                    <span>
                                                        {formatMessage({
                                                            id: "创建时间",
                                                        })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {moment(
                                                            1e3 *
                                                                order.created_at,
                                                        ).format(
                                                            "YYYY-MM-DD HH:mm:ss",
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                    callback={(e, t) =>
                                                        this.stripeCallback(
                                                            e,
                                                            t,
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
                    payUrl={payUrl}
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
export default connect(({ order, comm }) => ({
    order,
    comm,
}))(OrderDetailPage);
