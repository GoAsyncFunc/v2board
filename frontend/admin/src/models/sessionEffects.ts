import { get } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import history from '../app/navigation';
import { getToken } from '../utils/siteHelpers';
import type { AdminLoginData, AdminUserInfo } from '../types/session';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface CheckLoginAction {
    redirect?: string;
}

interface SessionEffectTools extends PutEffectTools {}

export function* checkLogin(
    { redirect }: CheckLoginAction,
    { put }: SessionEffectTools,
): ModelEffect<ApiResponse<AdminLoginData>> {
    if (!getToken()) return;
    const response = yield get<AdminLoginData>('/user/checkLogin');
    // A logged-in ordinary user must not be redirected into the admin dashboard.
    if (!isSuccessfulResponse(response) || !response.data.is_admin) return;
    yield put({ type: 'user/getUserInfo' });
    history.push(redirect || 'dashboard');
}

export function* getUserInfo(
    _action: AdminAction,
    { put }: SessionEffectTools,
): ModelEffect<ApiResponse<AdminUserInfo>> {
    yield put({ type: 'setState', payload: { getUserInfoLoading: true } });
    const response = yield get<AdminUserInfo>('/user/info');
    yield put({ type: 'setState', payload: { getUserInfoLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { userInfo: response.data } });
}
