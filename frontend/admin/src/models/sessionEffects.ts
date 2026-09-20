import { get, type ApiResponse } from '../services/request';
import history from '../app/navigation';
import { getToken } from '../utils/siteHelpers';
import type { AdminLoginData, AdminUserInfo } from '../types/session';
import type { AdminAction } from '../types/store';

interface CheckLoginAction {
  redirect?: string;
}

interface SessionEffectTools {
  put(action: AdminAction): unknown;
}

export function* checkLogin(
  { redirect }: CheckLoginAction,
  { put }: SessionEffectTools,
): Generator<unknown, void, ApiResponse<AdminLoginData>> {
  if (!getToken()) return;
  const response = yield get<AdminLoginData>('/user/checkLogin');
  // A logged-in ordinary user must not be redirected into the admin dashboard.
  if (response.code !== 200 || !response.data.is_admin) return;
  yield put({ type: 'user/getUserInfo' });
  history.push(redirect || 'dashboard');
}

export function* getUserInfo(
  _action: AdminAction,
  { put }: SessionEffectTools,
): Generator<unknown, void, ApiResponse<AdminUserInfo>> {
  yield put({ type: 'setState', payload: { getUserInfoLoading: true } });
  const response = yield get<AdminUserInfo>('/user/info');
  yield put({ type: 'setState', payload: { getUserInfoLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'setState', payload: { userInfo: response.data } });
}
