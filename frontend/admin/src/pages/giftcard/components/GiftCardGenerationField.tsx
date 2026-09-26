import React from 'react';
import Input from 'antd/lib/input';
import type { GiftCardRecord } from '@/types/promotionContracts';

export interface GiftCardGenerationFieldProps {
    giftCard: GiftCardRecord;
    onChange: (patch: Partial<GiftCardRecord>) => void;
}

export function GiftCardGenerationField({
    giftCard,
    onChange,
}: GiftCardGenerationFieldProps): React.ReactElement | null {
    if (giftCard.code || giftCard.id) return null;
    return (
        <div className="form-group">
            <label htmlFor="giftcard-count">生成数量</label>
            <Input
                id="giftcard-count"
                placeholder="输入数量批量生成"
                value={giftCard.generate_count}
                onChange={(event) =>
                    onChange({ generate_count: event.target.value, code: undefined })
                }
            />
        </div>
    );
}
