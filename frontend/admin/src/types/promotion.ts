import type { CouponRecord } from '../components/CouponDisplayColumns';
import type { GiftcardRecord } from '../components/GiftcardDisplayColumns';

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

export interface GiftcardState extends PromotionState {
  giftcards: GiftcardRecord[];
}
