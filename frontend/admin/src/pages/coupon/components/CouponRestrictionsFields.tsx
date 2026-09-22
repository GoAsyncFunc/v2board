import React from 'react';
import Select from 'antd/lib/select';
import { settings } from '../../../config/adminSettings';
import type { PlanSummary } from '../../../types/config';
import type { CouponRecord } from '../../../types/promotion';

export interface CouponRestrictionsFieldsProps {
    coupon: CouponRecord;
    plans: PlanSummary[];
    onChange: (patch: Partial<CouponRecord>) => void;
}

export function CouponRestrictionsFields({
    coupon,
    plans,
    onChange,
}: CouponRestrictionsFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="coupon-plans">指定订阅</label>
                <Select
                    id="coupon-plans"
                    value={coupon.limit_plan_ids || []}
                    onChange={(ids: string[]) =>
                        onChange({ limit_plan_ids: ids.length ? ids : null })
                    }
                    mode="multiple"
                    placeholder="限制指定订阅可以使用优惠(为空则不限制)"
                    style={{ width: '100%' }}
                >
                    {plans.map((item) => (
                        <Select.Option key={item.id} value={`${item.id}`}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="form-group">
                <label htmlFor="coupon-periods">指定周期</label>
                <Select
                    id="coupon-periods"
                    value={coupon.limit_period || []}
                    onChange={(periods: string[]) =>
                        onChange({ limit_period: periods.length ? periods : null })
                    }
                    mode="multiple"
                    placeholder="限制指定周期可以使用优惠(为空则不限制)"
                    style={{ width: '100%' }}
                >
                    {Object.keys(settings.periodText).map((period) => (
                        <Select.Option key={period} value={period}>
                            {settings.periodText[period]}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </>
    );
}
