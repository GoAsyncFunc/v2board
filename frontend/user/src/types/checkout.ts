import type { PlanData, CouponData, PaymentConfig } from './commerce';

export interface CheckoutPlan extends PlanData {
  id: number;
  content: string;
  renew?: number;
  transfer_enable?: number;
}

export interface CheckoutOrder {
  plan: CheckoutPlan;
  period: string;
  status: number;
  trade_no: string;
  created_at?: number;
  total_amount: number;
  discount_amount?: number;
  surplus_amount?: number;
  refund_amount?: number;
  balance_amount?: number;
  pre_handling_amount?: number;
  bounus?: number;
  get_amount?: number;
}

export interface PlanCheckoutState {
  plan: { plan: CheckoutPlan; selectPeriod: string; fetchLoading: boolean };
  coupon: { coupon: CouponData & { code?: string } };
  order: { orders: Array<{ status: number; trade_no: string }>; cancelLoading: boolean; saveLoading: boolean };
  comm: { config: PaymentConfig };
  user: { userInfo: { plan_id?: number | null }; subscribe: { expired_at?: number | null } };
}
