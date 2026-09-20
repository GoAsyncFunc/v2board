import { post } from '../services/request';
import history from '../app/navigation';
import { setToken } from '../utils/siteHelpers';

export default {
  name: 'passport',
  state: { loginLoading: false },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *login({ email, password }, { put }) {
      yield put({ type: 'save', payload: { loginLoading: true } });
      const response = yield post('/passport/auth/login', { email, password });
      yield put({ type: 'save', payload: { loginLoading: false } });
      if (response.code !== 200) return;
      // Preserve original ordering: token storage precedes the admin flag check.
      setToken(response.data.auth_data);
      if (!response.data.is_admin) return;
      history.push('/dashboard');
      yield put({ type: 'user/getUserInfo' });
    },
  },
};
