import { get } from '../services/request';
import history from '../app/history';
import { getToken, clearToken } from '../utils/siteHelpers';
import { isSuccessfulResponse } from '../types/api';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type { LoginSessionData } from '../types/auth';
import type { StateUpdate } from '../types/queryModels';
import type { SessionUserState, UserInfo } from '../types/user';

type SessionAction = StateUpdate<SessionUserState> | { type: 'user/getUserInfo' };
interface SessionEffects {
    put(action: SessionAction): PutEffect<SessionAction>;
}
type SessionGenerator<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<SessionAction>,
    void,
    ApiResponse<Data>
>;

export function* checkLogin(
    { redirect }: { redirect?: string },
    { put }: SessionEffects,
): SessionGenerator<LoginSessionData> {
    if (!getToken()) return;
    const response = yield get<LoginSessionData>('/user/checkLogin');
    if (!isSuccessfulResponse(response) || !response.data.is_login) return;
    yield put({ type: 'user/getUserInfo' });
    history.push(redirect || 'dashboard');
}

export function* getUserInfo(
    _action: { type?: string },
    { put }: SessionEffects,
): SessionGenerator<UserInfo> {
    yield put({ type: 'setState', payload: { getUserInfoLoading: true } });
    const response = yield get<UserInfo>('/user/info');
    yield put({ type: 'setState', payload: { getUserInfoLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { userInfo: response.data } });
    if (window.Tawk_API) {
        window.Tawk_API.visitor = { name: response.data.email, email: response.data.email };
    }
    if (window.$crisp) {
        window.$crisp.push(['set', 'user:email', response.data.email]);
        window.$crisp.push(['set', 'session:data', [[['Balance', response.data.balance / 100]]]]);
    }
}

export function* logout(): Generator<never, void, never> {
    clearToken();
    history.push('/login');
}
