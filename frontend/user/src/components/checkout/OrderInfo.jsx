import React from "react";
import { formatMessage } from "../../vendor/i18n.js";
import { localeSettings as settings } from "../../vendor/localeSettings.js";
import { formatDateTimeSeconds } from "../../components/DateTimeDisplay.jsx";
import { formatPrice } from "../../components/MoneyDisplay.jsx";
import { Modal } from "../../vendor/Modal.js";
import { LoadingContainer } from "../../vendor/ui.js";
export default function OrderInfo({ order, config, cancelLoading, dispatch }) {
    return (
        <div className={"block block-rounded"}>
            <div className={"block-header block-header-default"}>
                <h3 className={"block-title v2board-trade-no"}>
                    {formatMessage({
                        id: "订单信息",
                    })}
                </h3>
                {0 === order.status && (
                    <div className={"block-options"}>
                        <button
                            disabled={cancelLoading}
                            type={"button"}
                            className={
                                "btn btn-primary btn-sm btn-danger btn-rounded px-3"
                            }
                            onClick={() => {
                                return Modal.confirm({
                                    title: formatMessage({
                                        id: "注意",
                                    }),
                                    content: formatMessage({
                                        id: "如果你已经付款，取消订单可能会导致支付失败，确定取消订单吗？",
                                    }),
                                    onOk: () => {
                                        dispatch({
                                            type: "order/cancel",
                                            tradeNo: order.trade_no,
                                        });
                                    },
                                    okText: formatMessage({
                                        id: "关闭订单",
                                    }),
                                    okButtonProps: {
                                        loading: cancelLoading,
                                    },
                                });
                            }}
                        >
                            {cancelLoading && (
                                <LoadingContainer
                                    {...{
                                        size: "sm",
                                        type: "light",
                                    }}
                                ></LoadingContainer>
                            )}{" "}
                            {formatMessage({
                                id: "关闭订单",
                            })}
                        </button>
                    </div>
                )}
            </div>
            <div className={"block-content pb-4"}>
                <div className={"v2board-order-info"}>
                    <div>
                        <span>
                            {formatMessage({
                                id: "订单号",
                            })}
                            {"："}
                        </span>
                        <span>{order.trade_no}</span>
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
                                {formatPrice(order.discount_amount)}
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
                                {formatPrice(order.surplus_amount)}
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
                                {formatPrice(order.refund_amount)}
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
                                {formatPrice(order.balance_amount)}
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
                                {formatPrice(order.pre_handling_amount)}
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
                            {formatDateTimeSeconds(order.created_at)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
