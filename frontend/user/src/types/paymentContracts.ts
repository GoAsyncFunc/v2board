import type { PaymentMethod } from './commerceContracts';
import type { CheckoutOrder, CheckoutPlan } from './checkoutContracts';
import type { FormValue } from './apiContracts';

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

export type OrderModelRecord = Partial<Omit<CheckoutOrder, 'plan'>> & {
    plan: Partial<CheckoutPlan>;
};

export interface OrderModelState {
    fetchLoading: boolean;
    saveLoading: boolean;
    checkoutLoading: boolean;
    order: OrderModelRecord;
    paymentMethod: CheckoutPaymentMethod[];
    selectMethod?: PaymentMethod['id'];
    qrcodeModalVisible: boolean;
    payUrl?: string | boolean;
    orders: import('./commerceContracts').OrderRecord[];
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
