import { get, isSuccessfulResponse, type ApiResponse } from '../services/request';
import type { FilterItem, FilterValue } from '../types/filter';
import type { OrderPagination, OrderRecord, OrderState } from '../types/order';
import type { ModelEffect, ModelEffectTools } from '../types/effects';
import type { AdminAction, AdminRootState } from '../types/store';

type OrderStoreState = Pick<AdminRootState, 'order'>;
type OrderQueryAction = AdminAction | { filter: FilterItem[] };
interface QueryEffectTools extends ModelEffectTools<OrderStoreState, OrderQueryAction> {}

interface FilterAction { filter: FilterItem[]; }
interface AddFilterAction {
  key: string;
  condition: string;
  value: FilterValue;
  clear?: boolean;
}
interface ChangeTableAction { pagination: Partial<OrderPagination>; }
type OrderQueryYield = ApiResponse<OrderRecord[]> | OrderState;
type OrderQueryEffect = ModelEffect<OrderQueryYield>;

export function* fetch(_action: AdminAction, { put, select }: QueryEffectTools): OrderQueryEffect {
  const orderState = (yield select(state => state.order)) as OrderState;
  yield put({ type: 'setState', payload: { fetchLoading: true } });
  const response = (yield get<OrderRecord[]>(`/${window.settings.secure_path}/order/fetch`, {
    filter: orderState.filter,
    ...orderState.pagination,
  })) as ApiResponse<OrderRecord[]>;
  yield put({ type: 'setState', payload: { fetchLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  yield put({ type: 'setState', payload: { orders: response.data } });
  yield put({ type: 'setState', payload: { pagination: { ...orderState.pagination, total: response.total } } });
}

export function* filter({ filter: nextFilter }: FilterAction, { put, select }: QueryEffectTools): OrderQueryEffect {
  const orderState = (yield select(state => state.order)) as OrderState;
  orderState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter: nextFilter } });
  yield put({ type: 'fetch' });
}

export function* addFilter(
  { key, condition, value, clear }: AddFilterAction,
  { put, select }: QueryEffectTools,
): OrderQueryEffect {
  // Preserve the recovered malformed action until it is fixed as a separate behavior change.
  if (clear) yield put({ filter: [] });
  const orderState = (yield select(state => state.order)) as OrderState;
  const filters = orderState.filter;
  filters.push({ key, condition, value });
  orderState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter: filters, pagination: orderState.pagination } });
  yield put({ type: 'fetch' });
}

export function* changeTable(
  { pagination }: ChangeTableAction,
  { put, select }: QueryEffectTools,
): OrderQueryEffect {
  const orderState = (yield select(state => state.order)) as OrderState;
  yield put({ type: 'setState', payload: { pagination: { ...orderState.pagination, ...pagination } } });
  yield put({ type: 'fetch' });
}
