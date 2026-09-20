import { get } from '../services/request';

export default {
  name: 'tutorial',
  state: { tutorials: [], safeAreaVar: {}, steps: [], tutorial: {}, fetchByIdLoading: false },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put }) {
      const response = yield get('/user/tutorial/fetch');
      if (response.code === 200) {
        yield put({ type: 'setState', payload: {
          tutorials: response.data.tutorials,
          safeAreaVar: response.data.safe_area_var,
        } });
      }
    },
    *fetchById({ id }, { put }) {
      yield put({ type: 'setState', payload: { fetchByIdLoading: true } });
      const response = yield get('/user/tutorial/fetch', { id });
      yield put({ type: 'setState', payload: { fetchByIdLoading: false } });
      if (response.code !== 200) return;
      response.data.steps = response.data.steps ? JSON.parse(response.data.steps) : [];
      yield put({ type: 'setState', payload: { tutorial: response.data } });
    },
  },
};
