import { get } from '../services/request';

export default {
  name: 'guest',
  state: { commConfig: {}, getCommConfigLoading: false, selectEmailSuffix: undefined },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *getCommConfig(action, { put }) {
      yield put({ type: 'setState', payload: { getCommConfigLoading: true } });
      const response = yield get('/guest/comm/config');
      yield put({ type: 'setState', payload: { getCommConfigLoading: false } });
      if (response.code !== 200) return;
      yield put({
        type: 'setState',
        payload: {
          commConfig: response.data,
          selectEmailSuffix: response.data.email_whitelist_suffix ? response.data.email_whitelist_suffix[0] : '',
        },
      });
    },
  },
};
