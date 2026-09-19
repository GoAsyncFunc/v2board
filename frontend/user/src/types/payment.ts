import type { PaymentMethod, PaymentConfig } from './commerce';
import type { CheckoutOrder } from './checkout';

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
