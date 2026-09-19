import { get, post } from '../services/request.js';

const initialState = {
  routes: [],
  saveLoading: false,
  fetchLoading: false,
};

export default {
  name: 'serverRoute',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/server/route/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { routes: response.data } });
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/route/drop`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *save({ params, callback }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/route/save`, params);
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
  },
};
