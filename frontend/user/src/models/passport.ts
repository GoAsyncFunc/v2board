import { get, post } from '../services/request';
import history from '../app/routerHistory';
import { setToken, notify } from '../utils/siteHelpers';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type {
  AuthTokenData,
  ForgetPasswordAction,
  LoginAction,
  PassportState,
  RegisterAction,
  SendEmailVerificationAction,
  TokenLoginAction,
} from '../types/auth';
import type { StateUpdate } from '../types/queryModels';

type PassportEffectAction = StateUpdate<PassportState> | { type: 'user/getUserInfo' };
interface PassportEffects { put(action: PassportEffectAction): PutEffect<PassportEffectAction>; }
type PassportGenerator<Data> = Generator<
  Promise<ApiResponse<Data>> | PutEffect<PassportEffectAction>,
  void,
  ApiResponse<Data>
>;

const initialState: PassportState = {
  loginLoading: false,
  commConfig: { emailWhitelistSuffix: [], isEmailVerify: undefined, isInviteForce: undefined },
  getCommConfigLoading: false,
  sendEmailVerifyLoading: false,
  registerLoading: false,
  forgetLoading: false,
};

export default {
  name: 'passport',
  state: initialState,
  reducers: {
    setState(state: PassportState, { payload }: StateUpdate<PassportState>): PassportState { return { ...state, ...payload }; },
  },
  effects: {
    *token2Login({ verify, redirect }: TokenLoginAction): PassportGenerator<AuthTokenData> {
      const response = yield get<AuthTokenData>('/passport/auth/token2Login', { verify, redirect });
      if (response.code !== 200 || !response.data) return;
      setToken(response.data.auth_data);
      history.push(redirect || 'dashboard');
    },
    *login({ email, password, redirect }: LoginAction, { put }: PassportEffects): PassportGenerator<AuthTokenData> {
      yield put({ type: 'setState', payload: { loginLoading: true } });
      const response = yield post<AuthTokenData>('/passport/auth/login', { email, password });
      yield put({ type: 'setState', payload: { loginLoading: false } });
      if (response.code !== 200) return;
      setToken(response.data!.auth_data);
      yield put({ type: 'user/getUserInfo' });
      history.push(redirect || 'dashboard');
    },
    *register(
      { email, password, inviteCode, emailCode, recaptchaData }: RegisterAction,
      { put }: PassportEffects,
    ): PassportGenerator<boolean> {
      yield put({ type: 'setState', payload: { registerLoading: true } });
      const data = {
        email,
        password,
        invite_code: inviteCode,
        email_code: emailCode,
        ...(recaptchaData ? { recaptcha_data: recaptchaData } : {}),
      };
      const response = yield post<boolean>('/passport/auth/register', data);
      yield put({ type: 'setState', payload: { registerLoading: false } });
      if (response.code !== 200) return;
      history.push('/login');
    },
    *sendEmailVerify(
      { email, callback, recaptchaData, isforget }: SendEmailVerificationAction,
      { put }: PassportEffects,
    ): PassportGenerator<boolean> {
      yield put({ type: 'setState', payload: { sendEmailVerifyLoading: true } });
      const data = { email, ...(recaptchaData ? { recaptcha_data: recaptchaData } : {}), isforget };
      const response = yield post<boolean>('/passport/comm/sendEmailVerify', data);
      yield put({ type: 'setState', payload: { sendEmailVerifyLoading: false } });
      if (response.code !== 200 || !response.data) return;
      notify('success', '发送成功', '如果没有收到验证码请检查垃圾箱。');
      if (typeof callback === 'function') callback();
    },
    *forget(
      { email, password, emailCode }: ForgetPasswordAction,
      { put }: PassportEffects,
    ): PassportGenerator<boolean> {
      yield put({ type: 'setState', payload: { forgetLoading: true } });
      const response = yield post<boolean>('/passport/auth/forget', { email, password, email_code: emailCode });
      yield put({ type: 'setState', payload: { forgetLoading: false } });
      if (response.code !== 200) return;
      history.push('/login');
    },
  },
};
