import { get } from '../services/request.js';
import history from '../vendor/routerHistory.js';
import { d as getToken, o as clearToken } from '../vendor/siteHelpers.js';

export function* checkLogin({ redirect }, { put }) {
  if (!getToken()) return;
  const response = yield get('/user/checkLogin');
  if (response.code !== 200 || !response.data.is_login) return;
  yield put({ type: 'user/getUserInfo' });
  return history.push(redirect || 'dashboard');
}

export function* getUserInfo(action, { put }) {
  yield put({ type: 'setState', payload: { getUserInfoLoading: true } });
  const response = yield get('/user/info');
  yield put({ type: 'setState', payload: { getUserInfoLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { userInfo: response.data } });
  if (window.Tawk_API) {
    window.Tawk_API.visitor = { name: response.data.email, email: response.data.email };
  }
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:email', response.data.email]);
    window.$crisp.push(['set', 'session:data', [[['Balance', response.data.balance / 100]]]]);
  }
}

export function* logout() {
  clearToken();
  history.push('/login');
}
