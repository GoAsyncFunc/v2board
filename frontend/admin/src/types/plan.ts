export type PlanFieldValue = string | number | boolean | null | undefined;

export type PlanPriceField =
  | 'month_price'
  | 'quarter_price'
  | 'half_year_price'
  | 'year_price'
  | 'two_year_price'
  | 'three_year_price'
  | 'onetime_price'
  | 'reset_price';

export interface PlanRecord {
  id?: number | string;
  sort?: number | string;
  show?: number | string;
  renew?: number | string;
  name?: string | null;
  content?: string | null;
  transfer_enable?: string | number | null;
  device_limit?: string | number | null;
  group_id?: number | string | null;
  reset_traffic_method?: number | null;
  capacity_limit?: string | number | null;
  speed_limit?: string | number | null;
  force_update?: boolean;
  count?: number | string;
  month_price?: string | number | null;
  quarter_price?: string | number | null;
  half_year_price?: string | number | null;
  year_price?: string | number | null;
  two_year_price?: string | number | null;
  three_year_price?: string | number | null;
  onetime_price?: string | number | null;
  reset_price?: string | number | null;
  [field: string]: PlanFieldValue;
}

export interface PlanState {
  plans: PlanRecord[];
  fetchLoading: boolean;
  saveLoading?: boolean;
}
