import history from '../app/history';
import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import type { GiftcardRedemptionResponse, UserSetting } from '../types/user';
import type { UserModelEffect, UserModelEffectTools } from '../types/userEffectContracts';

interface CompletionAction {
    complete?: () => void;
}

interface UpdateUserSettingAction {
    key: UserSetting;
    value: 0 | 1;
}

interface ChangePasswordAction extends CompletionAction {
    oldPassword: string;
    newPassword: string;
}

interface RedeemGiftcardAction {
    giftcard: string;
    complete?: (redemption: GiftcardRedemptionResponse) => void;
}

interface TransferCommissionAction {
    transferAmount: number;
    callback?: () => void;
}

export function* update(
    { key, value }: UpdateUserSettingAction,
    { put }: UserModelEffectTools,
): UserModelEffect<boolean> {
    yield put({ type: 'setState', payload: { [`${key}_loading`]: true } });
    const response = yield post<boolean>('/user/update', { [key]: value });
    yield put({ type: 'setState', payload: { [`${key}_loading`]: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'getUserInfo' });
}

export function* changePassword(
    { oldPassword, newPassword, complete }: ChangePasswordAction,
    { put }: UserModelEffectTools,
): UserModelEffect<boolean> {
    yield put({ type: 'setState', payload: { changePasswordLoading: true } });
    const response = yield post<boolean>('/user/changePassword', {
        old_password: oldPassword,
        new_password: newPassword,
    });
    yield put({ type: 'setState', payload: { changePasswordLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    complete?.();
    history.push('/login');
}

export function* newPeriod(
    { complete }: CompletionAction,
    { put }: UserModelEffectTools,
): UserModelEffect<boolean> {
    yield put({ type: 'setState', payload: { newPeriodLoading: true } });
    const response = yield post<boolean>('/user/newPeriod');
    yield put({ type: 'setState', payload: { newPeriodLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'user/getSubscribe' });
    complete?.();
    history.push('/dashboard');
}

export function* redeemGiftcard(
    { giftcard, complete }: RedeemGiftcardAction,
    { put }: UserModelEffectTools,
): UserModelEffect<boolean> {
    yield put({ type: 'setState', payload: { redeemgiftcardLoading: true } });
    const response = (yield post<boolean>('/user/redeemgiftcard', {
        giftcard,
    })) as ApiResponse<boolean> & GiftcardRedemptionResponse;
    yield put({ type: 'setState', payload: { redeemgiftcardLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'user/getUserInfo' });
    complete?.({ type: response.type, value: response.value });
}

export function* resetSecurity(
    { complete }: CompletionAction,
    { put }: UserModelEffectTools,
): UserModelEffect<string> {
    yield put({ type: 'setState', payload: { resetSecurityLoading: true } });
    const response = yield get<string>('/user/resetSecurity');
    yield put({ type: 'setState', payload: { resetSecurityLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    complete?.();
}

export function* transfer(
    { transferAmount, callback }: TransferCommissionAction,
    { put }: UserModelEffectTools,
): UserModelEffect<boolean> {
    const response = yield post<boolean>('/user/transfer', {
        transfer_amount: 100 * transferAmount,
    });
    if (!isSuccessfulResponse(response)) return;
    callback?.();
    yield put({ type: 'user/getUserInfo' });
}
