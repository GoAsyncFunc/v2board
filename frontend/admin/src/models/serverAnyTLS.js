import { post } from '../services/request.js';

const initialState = { switchLoading: {}, saveLoading: false };

export default {
  name: 'serverAnyTLS',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *update({ id, key, value }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/anytls/update`, { id, [key]: value });
      if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/anytls/drop`, { id });
      if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
    },
    *copy({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/anytls/copy`, { id });
      if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
    },
    *save({ params, callback }, { put }) {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/server/anytls/save`, params);
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'serverManage/getNodes' });
      if (typeof callback === 'function') callback();
    },
  },
};
