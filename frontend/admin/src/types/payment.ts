export type PaymentId = string | number;
export type PaymentConfigValue = string | number | boolean | null | undefined;

export interface PaymentRecord {
  id?: PaymentId;
  name?: string;
  icon?: string;
  notify_domain?: string;
  notify_url?: string;
  handling_fee_percent?: string | number;
  handling_fee_fixed?: number;
  payment?: string;
  enable?: string | number | boolean;
  config?: Record<string, PaymentConfigValue>;
}

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
