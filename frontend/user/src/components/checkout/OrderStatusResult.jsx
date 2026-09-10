import React from "react";
import { a as Result } from "../../vendor/modules/4d6f5257.js";
import { formatMessage } from "../../vendor/i18n.js";
import { router } from "../../vendor/modules/4172412b.js";
export function orderResultProps(e) {
    switch (e) {
        case 1:
            return {
                status: "info",
                title: formatMessage({
                    id: "开通中",
                }),
                subTitle: formatMessage({
                    id: "订单系统正在进行处理，请稍等1-3分钟。",
                }),
            };
        case 2:
            return {
                status: "warning",
                title: formatMessage({
                    id: "已取消",
                }),
                subTitle: formatMessage({
                    id: "订单由于超时支付已被取消。",
                }),
            };
        case 3:
        case 4:
            return {
                status: "success",
                title: formatMessage({
                    id: "已完成",
                }),
                subTitle: formatMessage({
                    id: "订单已支付并开通。",
                }),
                extra: [
                    <button
                        type={"button"}
                        onClick={() => router.push("/knowledge")}
                        className={
                            "btn btn-primary btn-sm btn-danger btn-rounded px-3"
                        }
                    >
                        <i
                            className={
                                "nav-main-link-icon si si-book-open mr-1"
                            }
                        ></i>
                        {formatMessage({
                            id: "查看使用教程",
                        })}
                    </button>,
                ],
            };
    }
}
export default function OrderStatusResult({ status }) {
    return <Result className="py-4" {...orderResultProps(status)} />;
}
