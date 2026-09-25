import React from 'react';
import { CouponInput } from '../../commerce/checkout/Coupon';
import OrderSummary from '../../commerce/checkout/OrderSummary';
import type { CouponData, PaymentConfig } from '../../../types/commerce';
import type { PlanRecord } from '../../../types/userDomainContracts';
import type { PlanPeriod } from '../../../types/plan';

interface PlanOrderSidebarProps {
    config: PaymentConfig;
    coupon: CouponData;
    couponInput: React.RefObject<HTMLInputElement>;
    onCheckCoupon: React.MouseEventHandler<HTMLButtonElement>;
    onOrder: React.MouseEventHandler<HTMLButtonElement>;
    period?: PlanPeriod;
    plan: PlanRecord;
    saving?: boolean;
}

export default function PlanOrderSidebar({
    config,
    coupon,
    couponInput,
    onCheckCoupon,
    onOrder,
    period,
    plan,
    saving,
}: PlanOrderSidebarProps) {
    return (
        <div className="col-md-4 col-sm-12">
            <CouponInput inputRef={couponInput} onCheck={onCheckCoupon} />
            <OrderSummary
                plan={plan}
                period={period}
                coupon={coupon}
                config={config}
                saving={saving}
                onOrder={onOrder}
            />
        </div>
    );
}
