import { get, post } from '../services/request.js';
import history from '../app/navigation';

// Retained separate from passport: existing callers use the action/complete contract.
export default {
  name: 'auth',
  state: {},
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *login({ action }, { put }) {
      yield put({ type: 'save', payload: { loginLoading: true } });
      const response = yield post('/passport/auth/login', action);
      yield put({ type: 'save', payload: { loginLoading: false } });
      if (response.code !== 200 || !response.data.is_admin) return;
      history.push('/dashboard');
    },
    *register({ action, complete }) {
      const response = yield get('/passport/auth/register', action);
      if (response) complete(response);
    },
  },
};
