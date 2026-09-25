import React from 'react';
import Input from 'antd/lib/input';
import type { GiftCardRecord } from '../../../types/promotionContracts';

export interface GiftCardUsageFieldsProps {
    giftCard: GiftCardRecord;
    onChange: (patch: Partial<GiftCardRecord>) => void;
}

export function GiftCardUsageFields({
    giftCard,
    onChange,
}: GiftCardUsageFieldsProps): React.ReactElement {
    return (
        <div className="form-group">
            <label htmlFor="giftcard-limit">最大使用次数</label>
            <Input
                id="giftcard-limit"
                placeholder="限制最大使用次数，用完则无法使用(为空则不限制)"
                value={giftCard.limit_use ?? undefined}
                onChange={(event) => onChange({ limit_use: event.target.value })}
            />
        </div>
    );
}
