import React from 'react';
import notification from 'antd/lib/message';
import { get, post } from '../services/request';

const initialState = {
  ticket: {}, deposit: {}, invite: {}, site: {}, subscribe: {}, frontend: {},
  server: {}, email: {}, telegram: {}, app: {}, safe: {}, tabs: 'site',
  fetchLoading: false, emailTemplate: [], themeTemplate: [],
  setTelegramWebhookLoading: false,
};

export default {
  name: 'config',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ key }, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/config/fetch`, { key });
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      const data = response.data;
      if (typeof data.invite?.commission_withdraw_method === 'string') data.invite.commission_withdraw_method = data.invite.commission_withdraw_method.split(',');
      if (typeof data.site?.email_whitelist_suffix === 'string') data.site.email_whitelist_suffix = data.site.email_whitelist_suffix.split(',');
      if (typeof data.deposit?.deposit_bounus === 'string') data.deposit.deposit_bounus = data.deposit.deposit_bounus.split(',');
      yield put({ type: 'setState', payload: { ...data } });
    },
    *save({ parentKey }, { put, select }) {
      const configState = yield select(state => state.config);
      const response = yield post(`/${window.settings.secure_path}/config/save`, { ...configState[parentKey] });
      if (response.code !== 200) return;
      notification.success('保存成功');
      yield put({ type: 'fetch' });
    },
    *getEmailTemplate(_, { put }) {
      const response = yield get(`/${window.settings.secure_path}/config/getEmailTemplate`);
      if (response.code === 200) yield put({ type: 'setState', payload: { emailTemplate: response.data } });
    },
    *getThemeTemplate(_, { put }) {
      const response = yield get(`/${window.settings.secure_path}/config/getThemeTemplate`);
      if (response.code === 200) yield put({ type: 'setState', payload: { themeTemplate: response.data } });
    },
    *setTelegramWebhook({ token }, { put }) {
      yield put({ type: 'setState', payload: { setTelegramWebhookLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/config/setTelegramWebhook`, { telegram_bot_token: token });
      yield put({ type: 'setState', payload: { setTelegramWebhookLoading: false } });
      if (response.code === 200) notification.success('webhook 设置成功');
    },
    *testSendMail(_, { put }) {
      yield put({ type: 'setState', payload: { testSendMailLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/config/testSendMail`);
      yield put({ type: 'setState', payload: { testSendMailLoading: false } });
      if (response.code !== 200) return;
      const log = response.log || {};
      const error = log.error;
      notification[error ? 'error' : 'success']({
        title: error ? '发送失败' : '发送成功',
        content: (
          <div>
            {error && <div><span>失败原因:</span><span>{error}</span></div>}
            <div><span>收信地址:</span><span>{log.email}</span></div>
            <div><span>发信服务器:</span><span>{log.config?.host}</span></div>
            <div><span>发信端口:</span><span>{log.config?.port}</span></div>
            <div><span>发信加密方式:</span><span>{log.config?.encryption}</span></div>
            <div><span>发信用户名:</span><span>{log.config?.username}</span></div>
          </div>
        ),
      });
      console.log(response);
    },
  },
};
