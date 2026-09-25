import type { GiftCardRedemptionResponse } from '../types/userContracts';

export function describeGiftCardRedemption({ type, value }: GiftCardRedemptionResponse): string {
    switch (type) {
        case 1:
            return `账户余额 ${(Number(value) / 100).toFixed(2)}`;
        case 2:
            return `订阅时长 ${value} 天`;
        case 3:
            return `套餐流量 ${value} GB`;
        case 4:
            return '流量已重置';
        case 5:
            return `订阅套餐 ${value} 天`;
        default:
            return '未知类型';
    }
}
