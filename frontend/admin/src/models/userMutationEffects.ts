import { post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse, type FormRecord, type FormValue } from '../types/api';
import type { FilterItem } from '../types/filter';
import type { UserModuleState, UserRecord } from '../types/user';
import type { AdminAction, AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

type UserRootState = Pick<AdminRootState, 'user'>;
interface UserTools extends ModelEffectTools<UserRootState> {}
interface CallbackAction { callback?: () => void; complete?: () => void; }
interface UpdateAction extends CallbackAction { params: UserRecord; }
interface SendMailAction extends CallbackAction { params: FormRecord; }
interface UserIdAction extends CallbackAction { id?: string | number; }
type UserYield = UserModuleState | ApiResponse;
type UserEffect = ModelEffect<UserYield>;
const endpoint = (action: string): string => `/${window.settings.secure_path}/user/${action}`;

export function* update({ params, callback }: UpdateAction, { put }: UserTools): UserEffect {
  yield put({ type: 'setState', payload: { updateLoading: true } });
  params.transfer_enable = 1073741824 * (params.transfer_enable as number);
  params.u = Math.round(1073741824 * (params.u as number));
  params.d = Math.round(1073741824 * (params.d as number));
  params.balance = Math.round(100 * (params.balance as number));
  params.commission_balance = Math.round(100 * (params.commission_balance as number));
  if (params.invite_user) delete params.invite_user;
  const updateForm = Object.entries(params).reduce<FormRecord>((form, [field, value]) => {
    form[field] = value as FormValue;
    return form;
  }, {});
  const response = (yield post(endpoint('update'), updateForm)) as ApiResponse;
  yield put({ type: 'setState', payload: { updateLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  yield put({ type: 'fetch' });
  if (typeof callback === 'function') callback();
}

export function* sendMail({ params, callback, complete }: SendMailAction, { put, select }: UserTools): UserEffect {
  const userState = (yield select(state => state.user)) as UserModuleState;
  yield put({ type: 'setState', payload: { sendMailLoading: true } });
  const response = (yield post(endpoint('sendMail'), { filter: userState.filter, ...params })) as ApiResponse;
  yield put({ type: 'setState', payload: { sendMailLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  complete?.();
  if (typeof callback === 'function') callback();
}

function* runBatchAction(action: 'ban' | 'allDel', { put, select }: UserTools): UserEffect {
  const { filter } = (yield select(state => state.user)) as UserModuleState;
  const response = (yield post(endpoint(action), { filter })) as ApiResponse;
  if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}
export function* ban(_: AdminAction, tools: UserTools): UserEffect { yield* runBatchAction('ban', tools); }
export function* allDel(_: AdminAction, tools: UserTools): UserEffect { yield* runBatchAction('allDel', tools); }
export function* resetSecret({ id, complete }: UserIdAction, { put }: UserTools): UserEffect {
  const response = (yield post(endpoint('resetSecret'), { id })) as ApiResponse;
  if (!isSuccessfulResponse(response)) return;
  complete?.(); yield put({ type: 'fetch' });
}
export function* delUser({ id, complete }: UserIdAction, { put }: UserTools): UserEffect {
  const response = (yield post(endpoint('delUser'), { id })) as ApiResponse;
  if (!isSuccessfulResponse(response)) return;
  complete?.(); yield put({ type: 'fetch' });
}
