import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { GiftCardRecord } from '@/types/promotionContracts';

export interface GiftCardValueFieldsProps {
    giftCard: GiftCardRecord;
    valueSuffix: string;
    onChange: (patch: Partial<GiftCardRecord>) => void;
}

export function GiftCardValueFields({
    giftCard,
    valueSuffix,
    onChange,
}: GiftCardValueFieldsProps): React.ReactElement {
    return (
        <div className="form-group">
            <label htmlFor="giftcard-value">礼品卡类型</label>
            <Input
                id="giftcard-value"
                type="number"
                addonBefore={
                    <Select
                        style={{ width: 140 }}
                        value={giftCard.type}
                        onChange={(type: 1 | 2 | 3 | 4 | 5) => onChange({ type })}
                    >
                        <Select.Option value={1}>增加账户余额</Select.Option>
                        <Select.Option value={2}>增加订阅时长</Select.Option>
                        <Select.Option value={3}>增加套餐流量</Select.Option>
                        <Select.Option value={4}>重置套餐流量</Select.Option>
                        <Select.Option value={5}>兑换订阅套餐</Select.Option>
                    </Select>
                }
                addonAfter={valueSuffix}
                disabled={giftCard.type === 4}
                placeholder={giftCard.type === 5 ? '一次性套餐输入0' : '请输入值'}
                value={giftCard.type === 4 ? 0 : giftCard.value}
                onChange={(event) => onChange({ value: event.target.value })}
            />
        </div>
    );
}
