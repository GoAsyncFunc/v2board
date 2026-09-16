import React from "react";
import { a as Icon } from "../../vendor/Icon.js";
import { a as settings } from "../../vendor/localeSettings.js";
import { formatMessage } from "../../vendor/i18n.js";
import { formatPrice } from "../MoneyDisplay.jsx";
export default function OrderPaymentSummary({
    order,
    config,
    checkoutLoading,
    selectedPayment,
    stripe,
    onCheckout,
}) {
    return (
        <div className={"col-md-4 col-sm-12"}>
            <div
                className={
                    "block block-link-pop block-rounded  px-3 py-3 text-light"
                }
                style={{
                    background: "#35383D",
                }}
            >
                <h5 className={"text-light mb-3"}>
                    {formatMessage({
                        id: "订单总额",
                    })}
                </h5>
                {order.plan.id == 0 && (
                    <div>
                        <div className={"pt-3"}>
                            {formatMessage({
                                id: "充值奖励",
                            })}
                            <div className={"text-right"}>
                                {config.currency_symbol}
                                {formatPrice(order.bounus)}
                            </div>
                        </div>
                    </div>
                )}
                {order.plan.id == 0 && (
                    <div>
                        <div className={"pt-3"}>
                            {formatMessage({
                                id: "实际到账",
                            })}
                            <div className={"text-right"}>
                                {config.currency_symbol}
                                {formatPrice(order.get_amount)}
                            </div>
                        </div>
                        <div
                            className={"row no-gutters py-3"}
                            style={{
                                borderBottom: "1px solid #646669",
                            }}
                        ></div>
                    </div>
                )}
                {order.plan.id != 0 && (
                    <div
                        className={"row no-gutters pb-3"}
                        style={{
                            borderBottom: "1px solid #646669",
                        }}
                    >
                        <div className={"col-8"}>
                            {order.plan.name}
                            {" x "}
                            {settings.periodText[order.period] &&
                                settings.periodText[order.period]()}
                        </div>
                        <div className={"col-4 text-right"}>
                            {config.currency_symbol}
                            {formatPrice(order.plan[order.period])}
                        </div>
                    </div>
                )}
                {order.discount_amount ? (
                    <div>
                        <div
                            className={"pt-3"}
                            style={{
                                color: "#646669",
                            }}
                        >
                            {formatMessage({
                                id: "折扣",
                            })}
                        </div>
                        <div
                            className={"row no-gutters py-3"}
                            style={{
                                borderBottom: "1px solid #646669",
                            }}
                        >
                            <div className={"col-8"}></div>
                            <div className={"col-4 text-right"}>
                                {config.currency_symbol}
                                {formatPrice(order.discount_amount)}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {order.surplus_amount ? (
                    <div>
                        <div
                            className={"pt-3"}
                            style={{
                                color: "#646669",
                            }}
                        >
                            {formatMessage({
                                id: "折抵",
                            })}
                        </div>
                        <div
                            className={"row no-gutters py-3"}
                            style={{
                                borderBottom: "1px solid #646669",
                            }}
                        >
                            <div className={"col-8"}></div>
                            <div className={"col-4 text-right"}>
                                {config.currency_symbol}
                                {formatPrice(order.surplus_amount)}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {order.refund_amount ? (
                    <div>
                        <div
                            className={"pt-3"}
                            style={{
                                color: "#646669",
                            }}
                        >
                            {formatMessage({
                                id: "退款",
                            })}
                        </div>
                        <div
                            className={"row no-gutters py-3"}
                            style={{
                                borderBottom: "1px solid #646669",
                            }}
                        >
                            <div className={"col-8"}></div>
                            <div className={"col-4 text-right"}>
                                {"- "}
                                {config.currency_symbol}
                                {formatPrice(order.refund_amount)}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {order.pre_handling_amount ? (
                    <div>
                        <div
                            className={"pt-3"}
                            style={{
                                color: "#646669",
                            }}
                        >
                            {formatMessage({
                                id: "支付手续费",
                            })}
                        </div>
                        <div
                            className={"row no-gutters py-3"}
                            style={{
                                borderBottom: "1px solid #646669",
                            }}
                        >
                            <div className={"col-8"}></div>
                            <div className={"col-4 text-right"}>
                                {"+ "}
                                {formatPrice(order.pre_handling_amount)}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div
                    className={"pt-3"}
                    style={{
                        color: "#646669",
                    }}
                >
                    {formatMessage({
                        id: "总计",
                    })}
                </div>
                <h1 className={"text-light mt-3 mb-3"}>
                    {config.currency_symbol}{" "}
                    {formatPrice(order.total_amount +
                            (order.pre_handling_amount || 0))}{" "}
                    {config.currency}
                </h1>
                <button
                    type={"button"}
                    className={"btn btn-block btn-primary"}
                    disabled={
                        checkoutLoading ||
                        ("StripeCredit" === selectedPayment.payment &&
                            !stripe.token)
                    }
                    onClick={() => onCheckout()}
                >
                    {checkoutLoading ? (
                        <Icon
                            {...{
                                type: "loading",
                            }}
                        ></Icon>
                    ) : (
                        <span>
                            <i className={"far fa-check-circle"}></i>{" "}
                            {formatMessage({
                                id: "结账",
                            })}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
