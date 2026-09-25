import React from 'react';
import { formatMessage } from '../../../locales/i18n';
import type { PaymentConfig } from '../../../types/commerce';
import type { OrderModelRecord } from '../../../types/paymentContracts';
import type { UserDispatch } from '../../../types/storeContracts';

interface ProductInfoProps {
    order: OrderModelRecord;
    config?: PaymentConfig;
    cancelLoading?: boolean;
    dispatch?: UserDispatch;
}

export default function ProductInfo({ order }: ProductInfoProps) {
    // The original comma expression rendered only traffic for non-deposit orders.
    return (
        <div className="block block-rounded">
            <div className="block-header block-header-default">
                <h3 className="block-title v2board-trade-no">
                    {formatMessage({ id: '商品信息' })}
                </h3>
            </div>
            <div className="block-content pb-4">
                <div className="v2board-order-info">
                    {order.plan.id == 0 ? (
                        <div>
                            <span>
                                {formatMessage({ id: '产品名称' })}
                                {'：'}
                            </span>
                            <span>充值</span>
                        </div>
                    ) : (
                        <div>
                            <span>
                                {formatMessage({ id: '产品流量' })}
                                {'：'}
                            </span>
                            <span>
                                {order.plan.transfer_enable}
                                {' GB'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
