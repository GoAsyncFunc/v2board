import { get, post } from '../services/request';
import history from '../app/routerHistory';
import moment from 'moment';
import { formatBytes } from '../utils/siteHelpers';
import * as sessionEffects from './sessionEffects';
import { isSuccessfulResponse } from '../types/api';
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
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'setState', payload: { subscribe: response.data } });
      if (window.$crisp) {
        const subscription = response.data;
        window.$crisp.push(['set', 'session:data', [[
          ['Plan', subscription.plan?.name || '-'],
          ['ExpireTime', moment(1000 * Number(subscription.expired_at)).format('YYYY-MM-DD')],
          ['UsedTraffic', formatBytes(subscription.u + subscription.d)],
          ['AllTraffic', formatBytes(subscription.transfer_enable)],
        ]]]);
      }
    },
    *getStat(_action: { type?: string }, { put }: UserEffects): UserGenerator<number[]> {
      const response = yield get<number[]>('/user/getStat');
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'setState', payload: { stat: response.data } });
    },
    *update({ key, value }: { key: UserSetting; value: 0 | 1 }, { put }: UserEffects): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { [`${key}_loading`]: true } });
      const response = yield post<boolean>('/user/update', { [key]: value });
      yield put({ type: 'setState', payload: { [`${key}_loading`]: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'getUserInfo' });
    },
    *changePassword(
      { oldPassword, newPassword, complete }: { oldPassword: string; newPassword: string; complete?: () => void },
      { put }: UserEffects,
    ): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { changePasswordLoading: true } });
      const response = yield post<boolean>('/user/changePassword', { old_password: oldPassword, new_password: newPassword });
      yield put({ type: 'setState', payload: { changePasswordLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      complete?.();
      history.push('/login');
    },
    *newPeriod({ complete }: { complete?: () => void }, { put }: UserEffects): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { newPeriodLoading: true } });
      const response = yield post<boolean>('/user/newPeriod');
      yield put({ type: 'setState', payload: { newPeriodLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'user/getSubscribe' });
      complete?.();
      history.push('/dashboard');
    },
    *redeemgiftcard(
      { giftcard, complete }: { giftcard: string; complete?: (redemption: GiftcardRedemptionResponse) => void },
      { put }: UserEffects,
    ): UserGenerator<boolean> {
      yield put({ type: 'setState', payload: { redeemgiftcardLoading: true } });
      const response = (yield post<boolean>('/user/redeemgiftcard', { giftcard })) as ApiResponse<boolean> & GiftcardRedemptionResponse;
      yield put({ type: 'setState', payload: { redeemgiftcardLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'user/getUserInfo' });
      complete?.({ type: response.type, value: response.value });
    },
    *resetSecurity({ complete }: { complete?: () => void }, { put }: UserEffects): UserGenerator<string> {
      yield put({ type: 'setState', payload: { resetSecurityLoading: true } });
      const response = yield get<string>('/user/resetSecurity');
      yield put({ type: 'setState', payload: { resetSecurityLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      complete?.();
    },
    *transfer(
      { transferAmount, callback }: { transferAmount: number; callback?: () => void },
      { put }: UserEffects,
    ): UserGenerator<boolean> {
      const response = yield post<boolean>('/user/transfer', { transfer_amount: 100 * transferAmount });
      if (!isSuccessfulResponse(response)) return;
      if (typeof callback === 'function') callback();
      yield put({ type: 'user/getUserInfo' });
    },
  },
};
