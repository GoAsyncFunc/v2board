import { get, post } from '../services/request';
import * as orderQueries from './orderQueryEffects.js';

const initialState = {
  orders: [],
  fetchLoading: false,
  assignLoading: false,
  pagination: { pageSize: 10, current: 0 },
  filter: [],
};

export default {
  name: 'order',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
    empty() { return { ...initialState }; },
  },
  effects: {
    fetch: orderQueries.fetch,
    filter: orderQueries.filter,
    addFilter: orderQueries.addFilter,
    *update({ tradeNo, key, value }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/order/update`, { trade_no: tradeNo, [key]: value });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *paid({ tradeNo }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/order/paid`, { trade_no: tradeNo });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *cancel({ tradeNo }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/order/cancel`, { trade_no: tradeNo });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *assign({ params, callback }, { put }) {
      yield put({ type: 'setState', payload: { assignLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/order/assign`, {
        ...params,
        total_amount: 100 * params.total_amount,
      });
      yield put({ type: 'setState', payload: { assignLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
    changeTable: orderQueries.changeTable,
  },
};
