import React from 'react';
import { formatMessage } from '@/locales/i18n';
import { couponDiscount, hasCouponDiscount } from './Pricing';
import { formatPrice } from '@/components/common/MoneyDisplay';
import type { CouponData, NumericValue } from '@/types/commerceContracts';

interface CouponInputProps {
    inputRef: React.RefObject<HTMLInputElement>;
    onCheck: React.MouseEventHandler<HTMLButtonElement>;
}

interface CouponDiscountProps {
    coupon: CouponData;
    currencySymbol: string;
    price: NumericValue;
}

export function CouponInput({ inputRef, onCheck }: CouponInputProps) {
    return (
        <div
            className="block block-link-pop block-rounded  px-3 py-3 mb-2 text-light"
            style={{ background: '#35383D' }}
        >
            <input
                type="text"
                className="form-control v2board-input-coupon p-0"
                ref={inputRef}
                placeholder={formatMessage({ id: '有优惠券？' })}
            />
            <button
                onClick={onCheck}
                type="button"
                className="btn btn-primary"
                style={{ position: 'absolute', right: 30, top: 17 }}
            >
                <i className="fa fa-fw fa-ticket-alt mr-2" />
                {formatMessage({ id: '验证' })}
            </button>
        </div>
    );
}
export function CouponDiscount({ coupon, price, currencySymbol }: CouponDiscountProps) {
    if (!hasCouponDiscount(coupon)) return null;
    return (
        <div>
            <div className="pt-3" style={{ color: '#646669' }}>
                {formatMessage({ id: '折扣' })}
            </div>
            <div className="row no-gutters py-3" style={{ borderBottom: '1px solid #646669' }}>
                <div className="col-8">{coupon.name}</div>
                <div className="col-4 text-right">
                    {'-'}
                    {currencySymbol}
                    {formatPrice(couponDiscount(Number(price), coupon.type, coupon.value))}
                </div>
            </div>
        </div>
    );
}
