import { get } from '../services/request.js';
import history from '../app/navigation';
import { getToken } from '../utils/siteHelpers';

export function* checkLogin({ redirect }, { put }) {
  if (!getToken()) return;
  const response = yield get('/user/checkLogin');
  // A logged-in ordinary user must not be redirected into the admin dashboard.
  if (response.code !== 200 || !response.data.is_admin) return;
  yield put({ type: 'user/getUserInfo' });
  return history.push(redirect || 'dashboard');
}

export function* getUserInfo(action, { put }) {
  yield put({ type: 'setState', payload: { getUserInfoLoading: true } });
  const response = yield get('/user/info');
  yield put({ type: 'setState', payload: { getUserInfoLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { userInfo: response.data } });
}
