import React from 'react';
import Select from 'antd/lib/select';
import type { PlanSummary } from '@/types/systemConfigurationContracts';
import type { GiftCardRecord } from '@/types/promotionContracts';

export interface GiftCardPlanFieldProps {
    giftCard: GiftCardRecord;
    plans: PlanSummary[];
    onChange: (patch: Partial<GiftCardRecord>) => void;
}

export function GiftCardPlanField({
    giftCard,
    plans,
    onChange,
}: GiftCardPlanFieldProps): React.ReactElement | null {
    if (giftCard.type !== 5) return null;
    return (
        <div className="form-group">
            <label htmlFor="giftcard-plan">指定订阅</label>
            <Select
                id="giftcard-plan"
                value={
                    giftCard.plan_id === null || giftCard.plan_id === undefined
                        ? undefined
                        : String(giftCard.plan_id)
                }
                onChange={(planId: string) =>
                    onChange({ plan_id: planId && planId.length ? planId : null })
                }
                placeholder="指定订阅"
                style={{ width: '100%' }}
            >
                {plans.map((item) => (
                    <Select.Option key={item.id} value={`${item.id}`}>
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
}
