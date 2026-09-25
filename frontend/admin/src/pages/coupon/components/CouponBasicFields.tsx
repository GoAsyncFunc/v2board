import React from 'react';
import Input from 'antd/lib/input';
import type { CouponRecord } from '../../../types/promotionContracts';

export interface CouponBasicFieldsProps {
    coupon: CouponRecord;
    onChange: (patch: Partial<CouponRecord>) => void;
}

export function CouponBasicFields({
    coupon,
    onChange,
}: CouponBasicFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="coupon-name">名称</label>
                <Input
                    id="coupon-name"
                    placeholder="请输入优惠券名称"
                    value={coupon.name}
                    onChange={(event) => onChange({ name: event.target.value })}
                />
            </div>
            {!coupon.generate_count && (
                <div className="form-group">
                    <label htmlFor="coupon-code">自定义优惠券码</label>
                    <Input
                        id="coupon-code"
                        placeholder="自定义优惠券码(留空随机生成)"
                        value={coupon.code}
                        onChange={(event) =>
                            onChange({ code: event.target.value, generate_count: undefined })
                        }
                    />
                </div>
            )}
        </>
    );
}
