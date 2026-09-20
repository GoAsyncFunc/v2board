import { get } from '../services/request';

export default {
  name: 'notice',
  state: { notices: [] },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ complete }, { put }) {
      const response = yield get('/user/notice/fetch');
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { notices: response.data } });
      if (typeof complete === 'function') complete();
    },
  },
};
