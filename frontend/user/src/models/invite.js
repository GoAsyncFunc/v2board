import { notification } from '../vendor/ui.js';
import { get, post } from '../services/request';

export default {
  name: 'invite',
  state: {
    invites: [],
    codes: [],
    stat: [],
    detailsLoading: false,
    fetchLoading: true,
    saveLoading: false,
    detailsPagination: { total: 0, current: 1, page_size: 10 },
  },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *details({ current, pageSize }, { put }) {
      yield put({ type: 'setState', payload: { detailsLoading: true } });
      const response = yield get('/user/invite/details', { current, page_size: pageSize });
      yield put({ type: 'setState', payload: { detailsLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: {
        invites: response.data,
        detailsPagination: { current, page_size: pageSize, total: response.total },
      } });
    },
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get('/user/invite/fetch');
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { ...response.data } });
    },
    *save(_, { put }) {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post('/user/invite/save');
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      notification.success('已生成');
      yield put({ type: 'fetch' });
    },
  },
};
