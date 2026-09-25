import React from 'react';
import Input from 'antd/lib/input';
import type { GiftcardRecord } from '../../../types/promotionContracts';

export interface GiftcardGenerationFieldProps {
    giftcard: GiftcardRecord;
    onChange: (patch: Partial<GiftcardRecord>) => void;
}

export function GiftcardGenerationField({
    giftcard,
    onChange,
}: GiftcardGenerationFieldProps): React.ReactElement | null {
    if (giftcard.code || giftcard.id) return null;
    return (
        <div className="form-group">
            <label htmlFor="giftcard-count">生成数量</label>
            <Input
                id="giftcard-count"
                placeholder="输入数量批量生成"
                value={giftcard.generate_count}
                onChange={(event) =>
                    onChange({ generate_count: event.target.value, code: undefined })
                }
            />
        </div>
    );
}
