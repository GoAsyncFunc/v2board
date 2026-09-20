import { post } from '../services/request';

const initialState = { switchLoading: {}, saveLoading: false };

export default {
  name: 'serverShadowsocks',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *update({ id, key, value }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/shadowsocks/update`, { id, [key]: value });
      if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/shadowsocks/drop`, { id });
      if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
    },
    *copy({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/server/shadowsocks/copy`, { id });
      if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
    },
    *save({ params, callback }, { put }) {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/server/shadowsocks/save`, params);
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'serverManage/getNodes' });
      if (typeof callback === 'function') callback();
    },
  },
};
