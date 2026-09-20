import { get, post, type ApiResponse, type FormRecord } from '../services/request';
import history from '../app/navigation';
import type { AdminLoginData } from '../types/session';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface AuthState {
  loginLoading?: boolean;
}

interface AuthLoginAction {
  action: FormRecord;
}

interface AuthRegisterAction {
  action: FormRecord;
  complete(response: ApiResponse<AdminLoginData>): void;
}

interface AuthEffectTools extends PutEffectTools {}

type AuthEffect = ModelEffect<ApiResponse<AdminLoginData>>;

export default {
  name: 'auth',
  state: {},
  reducers: {
    save(state: AuthState, { payload }: { payload: Partial<AuthState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *login({ action }: AuthLoginAction, { put }: AuthEffectTools): AuthEffect {
      yield put({ type: 'save', payload: { loginLoading: true } });
      const response = yield post<AdminLoginData>('/passport/auth/login', action);
      yield put({ type: 'save', payload: { loginLoading: false } });
      if (response.code !== 200 || !response.data.is_admin) return;
      history.push('/dashboard');
    },
    *register({ action, complete }: AuthRegisterAction): AuthEffect {
      const response = yield get<AdminLoginData>('/passport/auth/register', action);
      if (response) complete(response);
    },
  },
};
