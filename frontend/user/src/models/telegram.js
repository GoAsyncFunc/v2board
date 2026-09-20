import { get } from '../services/request';

export default {
  name: 'telegram',
  state: { botInfo: {} },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *getBotInfo(_, { put }) {
      const response = yield get('/user/telegram/getBotInfo');
      if (response.code === 200) yield put({ type: 'setState', payload: { botInfo: response.data } });
    },
  },
};
