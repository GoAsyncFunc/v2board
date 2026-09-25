import type { UserSubscription } from './subscriptionContracts';

export interface UserInfo {
    email: string;
    balance: number;
    banned: number;
    commission_balance: number;
    commission_rate: number | null;
    created_at: number;
    discount: number | null;
    expired_at: number;
    last_login_at: number | null;
    plan_id: number;
    remind_expire: number;
    remind_traffic: number;
    telegram_id: number | null;
    transfer_enable: number;
    auto_renewal?: number;
}

export interface SessionUserState {
    userInfo: Partial<UserInfo>;
    getUserInfoLoading: boolean;
}

export interface UserState extends SessionUserState {
    subscribe: Partial<UserSubscription>;
    stat: number[];
    changePasswordLoading: boolean;
    resetSecurityLoading: boolean;
    newPeriodLoading: boolean;
    unbindTelegramLoading: boolean;
    redeemgiftcardLoading?: boolean;
    auto_renewal_loading?: boolean;
    remind_expire_loading?: boolean;
    remind_traffic_loading?: boolean;
    events: never[];
}

export type UserSetting = 'auto_renewal' | 'remind_expire' | 'remind_traffic';

export interface GiftcardRedemptionResponse {
    type?: number;
    value?: number;
}
