import { get, post } from '../services/request.js';
import history from '../vendor/routerHistory.js';
import { a as message } from '../vendor/modules/antdMessage.js';
import moment from '../vendor/modules/77642f52.js';
import { b as formatTraffic } from '../vendor/siteHelpers.js';
import * as sessionEffects from './sessionEffects.js';
import '../vendor/modules/6d69595a.js';

export function describeGiftcard(type, value) {
  switch (type) {
    case 1: return '账户余额 ' + (value / 100).toFixed(2);
    case 2: return '订阅时长 ' + value + ' 天';
    case 3: return '套餐流量 ' + value + ' GB';
    case 4: return '流量已重置';
    case 5: return '订阅套餐 ' + value + ' 天';
    default: return '未知类型';
  }
}

export default {
  name: 'user',
  state: {
    subscribe: {}, stat: [], userInfo: {},
    getUserInfoLoading: false, changePasswordLoading: false,
    resetSecurityLoading: false, newPeriodLoading: false,
    unbindTelegramLoading: false, events: [],
  },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    ...sessionEffects,
    *getSubscribe(action, { put }) {
      const response = yield get('/user/getSubscribe');
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { subscribe: response.data } });
      if (window.$crisp) {
        const subscription = response.data;
        window.$crisp.push(['set', 'session:data', [[
          ['Plan', subscription.plan?.name || '-'],
          ['ExpireTime', moment(1000 * subscription.expired_at).format('YYYY-MM-DD')],
          ['UsedTraffic', formatTraffic(subscription.u + subscription.d)],
          ['AllTraffic', formatTraffic(subscription.transfer_enable)],
        ]]]);
      }
    },
    *getStat(action, { put }) {
      const response = yield get('/user/getStat');
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { stat: response.data } });
    },
    *update({ key, value }, { put }) {
      yield put({ type: 'setState', payload: { [key + '_loading']: true } });
      const response = yield post('/user/update', { [key]: value });
      yield put({ type: 'setState', payload: { [key + '_loading']: false } });
      if (response.code !== 200) return;
      yield put({ type: 'getUserInfo' });
    },
    *changePassword({ oldPassword, newPassword }, { put }) {
      yield put({ type: 'setState', payload: { changePasswordLoading: true } });
      const response = yield post('/user/changePassword', { old_password: oldPassword, new_password: newPassword });
      yield put({ type: 'setState', payload: { changePasswordLoading: false } });
      if (response.code !== 200) return;
      message.success('修改成功，请重新登陆');
      history.push('/login');
    },
    *newPeriod(action, { put }) {
      yield put({ type: 'setState', payload: { newPeriodLoading: true } });
      const response = yield post('/user/newPeriod');
      yield put({ type: 'setState', payload: { newPeriodLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'user/getSubscribe' });
      message.success('提前开启流量周期成功');
      history.push('/dashboard');
    },
    *redeemgiftcard({ giftcard }, { put }) {
      yield put({ type: 'setState', payload: { redeemgiftcardLoading: true } });
      const response = yield post('/user/redeemgiftcard', { giftcard });
      yield put({ type: 'setState', payload: { redeemgiftcardLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'user/getUserInfo' });
      message.success('兑换成功: ' + describeGiftcard(response.type, response.value));
    },
    *resetSecurity(action, { put }) {
      yield put({ type: 'setState', payload: { resetSecurityLoading: true } });
      const response = yield get('/user/resetSecurity');
      yield put({ type: 'setState', payload: { resetSecurityLoading: false } });
      if (response.code !== 200) return;
      message.success('重置成功');
    },
    *transfer({ transferAmount, callback }, { put }) {
      const response = yield post('/user/transfer', { transfer_amount: 100 * transferAmount });
      if (response.code !== 200) return;
      if (typeof callback === 'function') callback();
      yield put({ type: 'user/getUserInfo' });
    },
  },
};
