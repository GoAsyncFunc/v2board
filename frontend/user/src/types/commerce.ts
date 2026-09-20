export type NumericValue = number | string | null | undefined;

export interface AppliedCoupon {
  name: string;
  type: number;
  value: number;
}

export type CouponData =
  | { name?: undefined; type?: undefined; value?: undefined }
  | AppliedCoupon;

export interface PlanData {
  name: string;
  [period: string]: string | number | null | undefined;
}

export interface PaymentConfig {
  currency?: string;
  currency_symbol?: string;
}

export interface PaymentMethod {
  id: number | string;
  icon?: string;
  name: string;
}

export interface OrderRecord {
  plan?: { name: string } | null;
  created_at?: NumericValue;
  period: string;
  status: number;
  total_amount?: NumericValue;
  trade_no: string;
}

export interface NodeRecord {
  is_online?: NumericValue;
  name?: string;
  rate?: NumericValue;
  tags?: string[] | null;
}

export interface TicketRecord {
  created_at?: NumericValue;
  id?: number;
  level?: PropertyKey;
  reply_status?: NumericValue;
  status?: number | null;
  subject?: string;
  updated_at?: NumericValue;
}

export interface TrafficRecord {
  d: string;
  record_at?: NumericValue;
  server_rate: number | string | null;
  u: string;
}
