import { get, post } from '../services/request.js';
import history from '../vendor/routerHistory.js';
import { p as saveToken, r as notify } from '../vendor/siteHelpers.js';

export default {
  name: 'passport',
  state: {
    loginLoading: false,
    commConfig: { emailWhitelistSuffix: [], isEmailVerify: undefined, isInviteForce: undefined },
    getCommConfigLoading: false,
    sendEmailVerifyLoading: false,
    registerLoading: false,
    forgetLoading: false,
  },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *token2Login({ verify, redirect }) {
      const response = yield get('/passport/auth/token2Login', { verify, redirect });
      if (response.code !== 200 || !response.data) return;
      saveToken(response.data.auth_data);
      return history.push(redirect || 'dashboard');
    },
    *login({ email, password, redirect }, { put }) {
      yield put({ type: 'setState', payload: { loginLoading: true } });
      const response = yield post('/passport/auth/login', { email, password });
      yield put({ type: 'setState', payload: { loginLoading: false } });
      if (response.code !== 200) return;
      saveToken(response.data.auth_data);
      yield put({ type: 'user/getUserInfo' });
      history.push(redirect || 'dashboard');
    },
    *register({ email, password, inviteCode, emailCode, recaptchaData }, { put }) {
      yield put({ type: 'setState', payload: { registerLoading: true } });
      const data = { email, password, invite_code: inviteCode, email_code: emailCode };
      if (recaptchaData) data.recaptcha_data = recaptchaData;
      const response = yield post('/passport/auth/register', data);
      yield put({ type: 'setState', payload: { registerLoading: false } });
      if (response.code !== 200) return;
      history.push('/login');
    },
    *sendEmailVerify({ email, callback, recaptchaData, isforget }, { put }) {
      yield put({ type: 'setState', payload: { sendEmailVerifyLoading: true } });
      const data = { email };
      if (recaptchaData) data.recaptcha_data = recaptchaData;
      data.isforget = isforget;
      const response = yield post('/passport/comm/sendEmailVerify', data);
      yield put({ type: 'setState', payload: { sendEmailVerifyLoading: false } });
      if (response.code !== 200 || !response.data) return;
      notify('success', '发送成功', '如果没有收到验证码请检查垃圾箱。');
      if (typeof callback === 'function') callback();
    },
    *forget({ email, password, emailCode }, { put }) {
      yield put({ type: 'setState', payload: { forgetLoading: true } });
      const response = yield post('/passport/auth/forget', { email, password, email_code: emailCode });
      yield put({ type: 'setState', payload: { forgetLoading: false } });
      if (response.code !== 200) return;
      history.push('/login');
    },
  },
};
