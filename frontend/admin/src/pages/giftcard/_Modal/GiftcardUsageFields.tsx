import React from 'react';
import Input from 'antd/lib/input';
import type { GiftcardRecord } from '../../../types/promotion';

export interface GiftcardUsageFieldsProps {
    giftcard: GiftcardRecord;
    onChange: (patch: Partial<GiftcardRecord>) => void;
}

export function GiftcardUsageFields({
    giftcard,
    onChange,
}: GiftcardUsageFieldsProps): React.ReactElement {
    return (
        <div className="form-group">
            <label htmlFor="giftcard-limit">最大使用次数</label>
            <Input
                id="giftcard-limit"
                placeholder="限制最大使用次数，用完则无法使用(为空则不限制)"
                value={giftcard.limit_use ?? undefined}
                onChange={(event) => onChange({ limit_use: event.target.value })}
            />
        </div>
    );
}
