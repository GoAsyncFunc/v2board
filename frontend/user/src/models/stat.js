import { get } from '../services/request.js';

export default {
  name: 'stat',
  state: { traffics: [], getTrafficLogLoading: false },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *getTrafficLog(_, { put }) {
      yield put({ type: 'setState', payload: { getTrafficLogLoading: true } });
      const response = yield get('/user/stat/getTrafficLog');
      yield put({ type: 'setState', payload: { getTrafficLogLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { traffics: response.data } });
    },
  },
};
