import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { CouponRecord } from '../../../types/promotionContracts';

export interface CouponValueFieldsProps {
    coupon: CouponRecord;
    onChange: (patch: Partial<CouponRecord>) => void;
}

export function CouponValueFields({
    coupon,
    onChange,
}: CouponValueFieldsProps): React.ReactElement {
    return (
        <div className="form-group">
            <label htmlFor="coupon-value">优惠信息</label>
            <Input
                id="coupon-value"
                type="number"
                addonBefore={
                    <Select
                        style={{ width: 120 }}
                        value={coupon.type}
                        onChange={(type: 1 | 2) => onChange({ type })}
                    >
                        <Select.Option value={1}>按金额优惠</Select.Option>
                        <Select.Option value={2}>按比例优惠</Select.Option>
                    </Select>
                }
                addonAfter={coupon.type === 1 ? '¥' : '%'}
                placeholder="请输入值"
                value={coupon.value}
                onChange={(event) => onChange({ value: event.target.value })}
            />
        </div>
    );
}
