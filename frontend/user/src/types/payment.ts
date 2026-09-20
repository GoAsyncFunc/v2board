import type { PaymentMethod, PaymentConfig } from './commerce';
import type { CheckoutOrder, CheckoutPlan } from './checkout';
import type { FormValue } from './api';

export interface CheckoutPaymentMethod extends PaymentMethod {
  payment: string;
  handling_fee_fixed: number;
  handling_fee_percent: number;
}

export interface StripeToken {
  id: string;
}

export interface StripeCheckoutState {
  token?: StripeToken | null;
}

export interface OrderDetailState {
  order: CheckoutOrder;
  selectMethod?: PaymentMethod['id'];
  paymentMethod: CheckoutPaymentMethod[];
  qrcodeModalVisible?: boolean;
  payUrl?: string;
  checkoutLoading?: boolean;
  detailsLoading?: boolean;
  cancelLoading?: boolean;
}

export interface OrderDetailRootState {
  order: OrderDetailState;
  comm: { config: PaymentConfig };
}

export interface UnloadedOrder {
  plan: Partial<CheckoutPlan>;
}

export type OrderModelRecord = CheckoutOrder | UnloadedOrder;

export interface OrderModelState {
  fetchLoading: boolean;
  saveLoading: boolean;
  checkoutLoading: boolean;
  order: OrderModelRecord;
  paymentMethod: CheckoutPaymentMethod[];
  selectMethod?: PaymentMethod['id'];
  qrcodeModalVisible: boolean;
  payUrl?: string | boolean;
  orders: import('./commerce').OrderRecord[];
  cancelLoading: boolean;
  detailsLoading: boolean;
}

export type OrderFilter = Record<string, FormValue>;
export type OrderSaveParams = Record<string, FormValue>;

export interface OrderCheckoutResponse {
  code: number;
  data?: string | boolean;
  type?: number;
}
