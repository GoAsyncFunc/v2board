import React from 'react';
import Input from 'antd/lib/input';
import type { CouponRecord } from '@/types/promotionContracts';

export interface CouponUsageFieldsProps {
    coupon: CouponRecord;
    onChange: (patch: Partial<CouponRecord>) => void;
}

export function CouponUsageFields({
    coupon,
    onChange,
}: CouponUsageFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="coupon-limit">最大使用次数</label>
                <Input
                    id="coupon-limit"
                    placeholder="限制最大使用次数，用完则无法使用(为空则不限制)"
                    value={coupon.limit_use ?? undefined}
                    onChange={(event) => onChange({ limit_use: event.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="coupon-user-limit">每个用户可使用次数</label>
                <Input
                    id="coupon-user-limit"
                    placeholder="限制每个用户可使用次数(为空则不限制)"
                    value={coupon.limit_use_with_user ?? undefined}
                    onChange={(event) => onChange({ limit_use_with_user: event.target.value })}
                />
            </div>
        </>
    );
}
