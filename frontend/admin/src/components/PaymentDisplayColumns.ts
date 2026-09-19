import type { ColumnProps } from 'antd/lib/table/interface';

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

export function createReadonlyPaymentColumns(): Record<'name' | 'payment', ColumnProps<PaymentRecord>> {
  return {
    name: { title: '显示名称', dataIndex: 'name', key: 'name' },
    payment: { title: '支付接口', dataIndex: 'payment', key: 'payment' },
  };
}
