import { get } from '../services/request.js';

export default {
  name: 'server',
  state: { servers: [], fetchLoading: false },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get('/user/server/fetch');
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { servers: response.data } });
    },
  },
};
