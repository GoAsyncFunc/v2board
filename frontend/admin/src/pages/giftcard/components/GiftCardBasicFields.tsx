import React from 'react';
import Input from 'antd/lib/input';
import type { GiftCardRecord } from '../../../types/promotionContracts';

export interface GiftCardBasicFieldsProps {
    giftcard: GiftCardRecord;
    onChange: (patch: Partial<GiftCardRecord>) => void;
}

export function GiftCardBasicFields({
    giftcard,
    onChange,
}: GiftCardBasicFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="giftcard-name">名称</label>
                <Input
                    id="giftcard-name"
                    placeholder="请输入礼品卡名称"
                    value={giftcard.name}
                    onChange={(event) => onChange({ name: event.target.value })}
                />
            </div>
            {!giftcard.generate_count && (
                <div className="form-group">
                    <label htmlFor="giftcard-code">自定义礼品卡卡密</label>
                    <Input
                        id="giftcard-code"
                        placeholder="自定义礼品卡卡密(留空随机生成)"
                        value={giftcard.code}
                        onChange={(event) =>
                            onChange({ code: event.target.value, generate_count: undefined })
                        }
                    />
                </div>
            )}
        </>
    );
}
