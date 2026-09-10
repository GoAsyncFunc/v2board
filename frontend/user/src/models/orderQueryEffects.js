import { get } from '../services/request.js';

export function* detail({ tradeNo, callback }, { put }) {
  yield put({ type: 'setState', payload: { detailsLoading: true } });
  const response = yield get('/user/order/detail', { trade_no: tradeNo });
  yield put({ type: 'setState', payload: { detailsLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { order: response.data } });
  if (typeof callback === 'function') callback();
}
export function* check({ tradeNo, callback }) {
  const response = yield get('/user/order/check', { trade_no: tradeNo });
  if (response.code !== 200) return;
  if (typeof callback === 'function') callback(response);
}
export function* getPaymentMethod({ complete }, { put }) {
  const response = yield get('/user/order/getPaymentMethod');
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { paymentMethod: response.data } });
  // Required callback contract retained; missing complete still throws as before.
  complete(response.data);
}
export function* fetch({ filter }, { put }) {
  yield put({ type: 'setState', payload: { fetchLoading: true } });
  const response = yield get('/user/order/fetch', filter);
  yield put({ type: 'setState', payload: { fetchLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { orders: response.data } });
}
