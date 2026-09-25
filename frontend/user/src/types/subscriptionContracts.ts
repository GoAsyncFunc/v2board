export interface SubscriptionPlan {
    name: string;
    renew?: number | boolean;
    show?: number | boolean;
    reset_price?: number | null;
}

export interface UserSubscription {
    email?: string;
    plan_id?: number | null;
    plan?: SubscriptionPlan | null;
    subscribe_url?: string;
    expired_at?: number | null;
    u: number;
    d: number;
    transfer_enable: number;
    reset_day?: number | null;
    alive_ip?: number;
    device_limit?: number | null;
    allow_new_period?: boolean | number;
}

export interface UserNotice {
    id?: number;
    created_at?: number;
    title?: string;
    content?: string;
    img_url?: string;
    tags: string[];
}
