import React from 'react';
import { formatMessage } from '../../vendor/i18n.js';
import type { CheckoutOrder } from '../../types/checkout';
import type { PaymentConfig } from '../../types/commerce';
import type { UserDispatch } from '../../types/store';

interface ProductInfoProps {
  order: CheckoutOrder;
  config?: PaymentConfig;
  cancelLoading?: boolean;
  dispatch?: UserDispatch;
}

export default function ProductInfo({ order }: ProductInfoProps) {
  // The original comma expression rendered only traffic for non-deposit orders.
  return (
    <div className="block block-rounded">
      <div className="block-header block-header-default">
        <h3 className="block-title v2board-trade-no">{formatMessage({ id: '商品信息' })}</h3>
      </div>
      <div className="block-content pb-4">
        <div className="v2board-order-info">
          {order.plan.id == 0 ? (
            <div><span>{formatMessage({ id: '产品名称' })}{'：'}</span><span>充值</span></div>
          ) : (
            <div><span>{formatMessage({ id: '产品流量' })}{'：'}</span><span>{order.plan.transfer_enable}{' GB'}</span></div>
          )}
        </div>
      </div>
    </div>
  );
}
