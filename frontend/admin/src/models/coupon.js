import dayjs from '../vendor/dateTime.js';
import { get, post } from '../services/request.js';

const initialState = { coupons: [], fetchLoading: false, saveLoading: false, pagination: { pageSize: 10, current: 1 }, sort: {} };

function downloadCSV(buffer, prefix) {
  const blob = new Blob([buffer], { type: 'text/plain,charset=UTF-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.style.display = 'none';
  link.download = `${prefix} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export default {
  name: 'coupon',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put, select }) {
      const couponState = yield select(state => state.coupon);
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/coupon/fetch`, { ...couponState.pagination, ...couponState.sort });
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      response.data.forEach(coupon => { if (coupon.type === 1) coupon.value /= 100; });
      yield put({ type: 'setState', payload: { coupons: response.data, pagination: { ...couponState.pagination, total: response.total } } });
    },
    *generate({ params, callback }, { put }) {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      if (params.type === 1) params.value *= 100;
      const response = yield post(`/${window.settings.secure_path}/coupon/generate`, params);
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      if (params.generate_count) downloadCSV(response.buffer, 'COUPON');
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/coupon/drop`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *show({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/coupon/show`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *changeTable({ pagination, sort }, { put, select }) {
      const couponState = yield select(state => state.coupon);
      yield put({ type: 'setState', payload: { pagination: { ...couponState.pagination, ...pagination }, sort } });
      yield put({ type: 'fetch' });
    },
  },
};
