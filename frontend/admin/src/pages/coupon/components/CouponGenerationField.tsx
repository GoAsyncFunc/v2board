import React from 'react';
import Input from 'antd/lib/input';
import type { CouponRecord } from '../../../types/promotion';

export interface CouponGenerationFieldProps {
    coupon: CouponRecord;
    onChange: (patch: Partial<CouponRecord>) => void;
}

export function CouponGenerationField({
    coupon,
    onChange,
}: CouponGenerationFieldProps): React.ReactElement | null {
    if (coupon.code || coupon.id) return null;
    return (
        <div className="form-group">
            <label htmlFor="coupon-count">生成数量</label>
            <Input
                id="coupon-count"
                placeholder="输入数量批量生成"
                value={coupon.generate_count}
                onChange={(event) =>
                    onChange({ generate_count: event.target.value, code: undefined })
                }
            />
        </div>
    );
}
