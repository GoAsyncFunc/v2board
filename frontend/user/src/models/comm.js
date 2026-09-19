import { get, post } from '../services/request.js';

export default {
  name: 'comm',
  state: { config: {} },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *config(_, { put }) {
      const response = yield get('/user/comm/config');
      if (response.code === 200) yield put({ type: 'setState', payload: { config: response.data } });
    },
    *getStripePublicKey({ complete, id }) {
      const response = yield post('/user/comm/getStripePublicKey', { id });
      if (response.code === 200) complete(response.data);
    },
  },
};
