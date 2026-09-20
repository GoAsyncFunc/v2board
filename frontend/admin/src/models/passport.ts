import { post, type ApiResponse } from '../services/request';
import history from '../app/navigation';
import { setToken } from '../utils/siteHelpers';
import type { AdminLoginData, PassportState } from '../types/session';
import type { AdminAction } from '../types/store';

interface PassportLoginAction {
  email: string;
  password: string;
}

interface PassportEffectTools {
  put(action: AdminAction): unknown;
}

type PassportEffect = Generator<unknown, void, ApiResponse<AdminLoginData>>;

const initialState: PassportState = { loginLoading: false };

export default {
  name: 'passport',
  state: initialState,
  reducers: {
    save(state: PassportState, { payload }: { payload: Partial<PassportState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *login(
      { email, password }: PassportLoginAction,
      { put }: PassportEffectTools,
    ): PassportEffect {
      yield put({ type: 'save', payload: { loginLoading: true } });
      const response = yield post<AdminLoginData>('/passport/auth/login', { email, password });
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
