import React from "react";
import { formatMessage } from "../../vendor/i18n.js";
import { a as settings } from "../../vendor/localeSettings.js";
import moment from "../../vendor/modules/77642f52.js";
import { a as Modal } from "../../vendor/Modal.js";
import { a as Spin } from "../../vendor/modules/76333265.js";
export default function ProductInfo({
    order,
    config,
    cancelLoading,
    dispatch,
}) {
    return (
        <div className={"block block-rounded"}>
            <div className={"block-header block-header-default"}>
                <h3 className={"block-title v2board-trade-no"}>
                    {formatMessage({
                        id: "商品信息",
                    })}
                </h3>
            </div>
            <div className={"block-content pb-4"}>
                <div className={"v2board-order-info"}>
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
                                <span>{order.plan.name}</span>
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
                                    {settings.periodText[order.period] &&
                                        settings.periodText[order.period]()}
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
                                    {order.plan.transfer_enable}
                                    {" GB"}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
