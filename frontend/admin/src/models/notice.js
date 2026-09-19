import { get, post } from '../services/request.js';

const initialState = { notices: [], fetchLoading: false };

export default {
  name: 'notice',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/notice/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { notices: response.data } });
    },
    *save({ params, callback }, { put }) {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/notice/save`, params);
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/notice/drop`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *show({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/notice/show`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
  },
};
