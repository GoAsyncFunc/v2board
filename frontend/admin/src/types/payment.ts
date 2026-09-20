import type { PaymentConfigValue, PaymentRecord } from '../components/config/PaymentDisplayColumns';

export interface PaymentFormField {
  label: string;
  type?: string;
  description?: string;
  value?: PaymentConfigValue;
}

export type PaymentForm = Record<string, PaymentFormField>;

export interface PaymentState {
  payments: PaymentRecord[];
  fetchLoading: boolean;
}
