import { get } from '../services/request';

export function* fetch(action, { put, select }) {
  const orderState = yield select(state => state.order);
  yield put({ type: 'setState', payload: { fetchLoading: true } });
  const response = yield get(`/${window.settings.secure_path}/order/fetch`, {
    filter: orderState.filter, ...orderState.pagination,
  });
  yield put({ type: 'setState', payload: { fetchLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { orders: response.data } });
  yield put({ type: 'setState', payload: { pagination: { ...orderState.pagination, total: response.total } } });
}
export function* filter({ filter }, { put, select }) {
  const orderState = yield select(state => state.order);
  orderState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter } });
  yield put({ type: 'fetch' });
}
export function* addFilter({ key, condition, value, clear }, { put, select }) {
  // Intentionally retained malformed action: the original clear branch omits type.
  // A real effect runner may reject it; this migration is not a semantic fix.
  if (clear) yield put({ filter: [] });
  const orderState = yield select(state => state.order);
  const filters = orderState.filter;
  filters.push({ key, condition, value });
  orderState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter: filters, pagination: orderState.pagination } });
  yield put({ type: 'fetch' });
}
export function* changeTable({ pagination }, { put, select }) {
  const orderState = yield select(state => state.order);
  yield put({ type: 'setState', payload: { pagination: { ...orderState.pagination, ...pagination } } });
  yield put({ type: 'fetch' });
}
