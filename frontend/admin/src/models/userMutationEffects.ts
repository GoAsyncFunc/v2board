import message from 'antd/lib/message';
import { post, type ApiResponse, type FormRecord } from '../services/request';
import type { FilterItem } from '../components/FilterDrawer';
import type { UserModuleState, UserRecord } from '../types/user';
import type { AdminAction } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

interface UserRootState { user: UserModuleState; }
interface UserTools extends ModelEffectTools<UserRootState> {}
interface CallbackAction { callback?: () => void; }
interface UpdateAction extends CallbackAction { params: UserRecord; }
interface SendMailAction extends CallbackAction { params: FormRecord; }
interface UserIdAction { id?: string | number; }
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
  const response = (yield post(endpoint('update'), params as FormRecord)) as ApiResponse;
  yield put({ type: 'setState', payload: { updateLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'fetch' });
  if (typeof callback === 'function') callback();
}

export function* sendMail({ params, callback }: SendMailAction, { put, select }: UserTools): UserEffect {
  const userState = (yield select(state => state.user)) as UserModuleState;
  yield put({ type: 'setState', payload: { sendMailLoading: true } });
  const response = (yield post(endpoint('sendMail'), { filter: userState.filter, ...params })) as ApiResponse;
  yield put({ type: 'setState', payload: { sendMailLoading: false } });
  if (response.code !== 200) return;
  message.success('已加入队列执行');
  if (typeof callback === 'function') callback();
}

function* runBatchAction(action: 'ban' | 'allDel', { put, select }: UserTools): UserEffect {
  const { filter } = (yield select(state => state.user)) as UserModuleState;
  const response = (yield post(endpoint(action), { filter })) as ApiResponse;
  if (response.code === 200) yield put({ type: 'fetch' });
}
export function* ban(_: AdminAction, tools: UserTools): UserEffect { yield* runBatchAction('ban', tools); }
export function* allDel(_: AdminAction, tools: UserTools): UserEffect { yield* runBatchAction('allDel', tools); }
export function* resetSecret({ id }: UserIdAction, { put }: UserTools): UserEffect {
  const response = (yield post(endpoint('resetSecret'), { id })) as ApiResponse;
  if (response.code !== 200) return;
  message.success('重置成功'); yield put({ type: 'fetch' });
}
export function* delUser({ id }: UserIdAction, { put }: UserTools): UserEffect {
  const response = (yield post(endpoint('delUser'), { id })) as ApiResponse;
  if (response.code !== 200) return;
  message.success('删除成功'); yield put({ type: 'fetch' });
}
