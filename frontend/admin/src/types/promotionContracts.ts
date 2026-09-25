import type { UnixTimestamp } from './dateTimeContracts';

export interface CouponRecord {
    [field: string]: string | number | boolean | string[] | null | undefined;
    id?: string | number;
    name?: string;
    show?: boolean | number;
    type?: 1 | 2;
    code?: string;
    value?: string | number;
    limit_use?: string | number | null;
    limit_use_with_user?: string | number | null;
    limit_plan_ids?: string[] | null;
    limit_period?: string[] | null;
    generate_count?: string | number;
    started_at?: UnixTimestamp;
    ended_at?: UnixTimestamp;
}

export interface GiftCardPlan {
    id: number | string;
    name?: string | null;
}

export interface GiftCardRecord {
    [field: string]: string | number | string[] | null | undefined;
    id?: string | number;
    name?: string;
    type?: 1 | 2 | 3 | 4 | 5;
    value?: string | number;
    code?: string;
    plan_id?: string | number | null;
    limit_use?: string | number | null;
    generate_count?: string | number;
    started_at?: UnixTimestamp;
    ended_at?: UnixTimestamp;
}

export interface PromotionPagination {
    pageSize: number;
    current: number;
    total?: number;
    [field: string]: string | number | boolean | undefined;
}

export interface PromotionSort {
    sort_type?: 'ASC' | 'DESC';
    sort?: string | number;
    [field: string]: string | number | undefined;
}

interface PromotionState {
    fetchLoading: boolean;
    saveLoading: boolean;
    pagination: PromotionPagination;
    sort: PromotionSort;
}

export interface CouponState extends PromotionState {
    coupons: CouponRecord[];
}

export interface GiftCardState extends PromotionState {
    giftcards: GiftCardRecord[];
}
