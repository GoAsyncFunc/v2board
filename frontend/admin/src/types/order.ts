import type { FilterItem } from '../components/FilterDrawer';
import type { OrderDetailRecord } from '../components/OrderDetailBody';

export interface OrderRecord extends OrderDetailRecord {
  id: number | string;
  type: PropertyKey;
  plan_name?: React.ReactNode;
}

export interface OrderPagination {
  pageSize: number;
  current: number;
  total?: number;
}

export interface OrderState {
  orders: OrderRecord[];
  fetchLoading: boolean;
  assignLoading: boolean;
  pagination: OrderPagination;
  filter: FilterItem[];
}

export interface AssignOrderParams {
  total_amount: number;
  [key: string]: string | number | boolean | null | undefined;
}
