import message from 'antd/lib/message';
import { get, post } from '../services/request';
import history from '../vendor/routerHistory.js';
import moment from '../vendor/dateTime.js';
import { formatBytes } from '../vendor/siteHelpers.js';
import * as sessionEffects from './sessionEffects';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type { StateUpdate } from '../types/queryModels';
import type { UserSubscription } from '../types/subscription';
import type { GiftcardRedemptionResponse, UserSetting, UserState } from '../types/user';

type UserEffectAction = StateUpdate<UserState> | { type: 'getUserInfo' | 'user/getUserInfo' | 'user/getSubscribe' };
interface UserEffects { put(action: UserEffectAction): PutEffect<UserEffectAction>; }
type UserGenerator<Data> = Generator<
  Promise<ApiResponse<Data>> | PutEffect<UserEffectAction>,
  void,
  ApiResponse<Data>
>;

export function describeGiftcard(type: number | undefined, value: number | undefined): string {
  switch (type) {
    case 1: return '账户余额 ' + (value! / 100).toFixed(2);
    case 2: return '订阅时长 ' + value + ' 天';
    case 3: return '套餐流量 ' + value + ' GB';
    case 4: return '流量已重置';
    case 5: return '订阅套餐 ' + value + ' 天';
    default: return '未知类型';
  }
}

const initialState: UserState = {
  subscribe: {},
  stat: [],
  userInfo: {},
  getUserInfoLoading: false,
  changePasswordLoading: false,
  resetSecurityLoading: false,
  newPeriodLoading: false,
  unbindTelegramLoading: false,
  events: [],
};

export default {
  name: 'user',
  state: initialState,
  reducers: {
    setState(state: UserState, { payload }: StateUpdate<UserState>): UserState { return { ...state, ...payload }; },
  },
  effects: {
    ...sessionEffects,
    *getSubscribe(_action: { type?: string }, { put }: UserEffects): UserGenerator<UserSubscription> {
      const response = yield get<UserSubscription>('/user/getSubscribe');
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { subscribe: response.data! } });
      if (window.$crisp) {
        const subscription = response.data!;
        window.$crisp.push(['set', 'session:data', [[
          ['Plan', subscription.plan?.name || '-'],
          ['ExpireTime', moment(1000 * subscription.expired_at!).format('YYYY-MM-DD')],
          ['UsedTraffic', formatBytes(subscription.u + subscription.d)],
          ['AllTraffic', formatBytes(subscription.transfer_enable)],
        ]]]);
      }
    },
    *getStat(_action: { type?: string }, { put }: UserEffects): UserGenerator<number[]> {
      const response = yield get<number[]>('/user/getStat');
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { stat: response.data! } });
    },
    *update({ key, value }: { key: UserSetting; value: 0 | 1 }, { put }: UserEffects): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { [`${key}_loading`]: true } });
      const response = yield post<boolean>('/user/update', { [key]: value });
      yield put({ type: 'setState', payload: { [`${key}_loading`]: false } });
      if (response.code !== 200) return;
      yield put({ type: 'getUserInfo' });
    },
    *changePassword(
      { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
      { put }: UserEffects,
    ): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { changePasswordLoading: true } });
      const response = yield post<boolean>('/user/changePassword', { old_password: oldPassword, new_password: newPassword });
      yield put({ type: 'setState', payload: { changePasswordLoading: false } });
      if (response.code !== 200) return;
      message.success('修改成功，请重新登陆');
      history.push('/login');
    },
    *newPeriod(_action: { type?: string }, { put }: UserEffects): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { newPeriodLoading: true } });
      const response = yield post<boolean>('/user/newPeriod');
      yield put({ type: 'setState', payload: { newPeriodLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'user/getSubscribe' });
      message.success('提前开启流量周期成功');
      history.push('/dashboard');
    },
    *redeemgiftcard({ giftcard }: { giftcard: string }, { put }: UserEffects): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { redeemgiftcardLoading: true } });
      const response = (yield post<boolean>('/user/redeemgiftcard', { giftcard })) as ApiResponse<boolean> & GiftcardRedemptionResponse;
      yield put({ type: 'setState', payload: { redeemgiftcardLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'user/getUserInfo' });
      message.success('兑换成功: ' + describeGiftcard(response.type, response.value));
    },
    *resetSecurity(_action: { type?: string }, { put }: UserEffects): UserGenerator<string> {
      yield put({ type: 'setState', payload: { resetSecurityLoading: true } });
      const response = yield get<string>('/user/resetSecurity');
      yield put({ type: 'setState', payload: { resetSecurityLoading: false } });
      if (response.code !== 200) return;
      message.success('重置成功');
    },
    *transfer(
      { transferAmount, callback }: { transferAmount: number; callback?: () => void },
      { put }: UserEffects,
    ): UserGenerator<boolean> {
      const response = yield post<boolean>('/user/transfer', { transfer_amount: 100 * transferAmount });
      if (response.code !== 200) return;
      if (typeof callback === 'function') callback();
      yield put({ type: 'user/getUserInfo' });
    },
  },
};
