import { post } from '../services/request.js';
import message from 'antd/lib/message';
const endpoint = action => `/${window.settings.secure_path}/user/${action}`;

export function* update({ params, callback }, { put }) {
  yield put({ type: 'setState', payload: { updateLoading: true } });
  // Preserve original input mutation and rounding rules during source migration.
  params.transfer_enable = 1073741824 * params.transfer_enable;
  params.u = Math.round(1073741824 * params.u);
  params.d = Math.round(1073741824 * params.d);
  params.balance = Math.round(100 * params.balance);
  params.commission_balance = Math.round(100 * params.commission_balance);
  if (params.invite_user) delete params.invite_user;
  const response = yield post(endpoint('update'), params);
  yield put({ type: 'setState', payload: { updateLoading: false } });
  if (response.code !== 200) return;
  yield put({ type: 'fetch' });
  if (typeof callback === 'function') callback();
}

export function* sendMail({ params, callback }, { put, select }) {
  const userState = yield select(state => state.user);
  yield put({ type: 'setState', payload: { sendMailLoading: true } });
  const response = yield post(endpoint('sendMail'), { filter: userState.filter, ...params });
  yield put({ type: 'setState', payload: { sendMailLoading: false } });
  if (response.code !== 200) return;
  message.success('已加入队列执行');
  if (typeof callback === 'function') callback();
}

export function* ban(action, { put, select }) {
  const { filter } = yield select(state => state.user);
  const response = yield post(endpoint('ban'), { filter });
  if (response.code === 200) yield put({ type: 'fetch' });
}
export function* allDel(action, { put, select }) {
  const { filter } = yield select(state => state.user);
  const response = yield post(endpoint('allDel'), { filter });
  if (response.code === 200) yield put({ type: 'fetch' });
}
export function* resetSecret({ id }, { put }) {
  const response = yield post(endpoint('resetSecret'), { id });
  if (response.code !== 200) return;
  message.success('重置成功');
  yield put({ type: 'fetch' });
}
export function* delUser({ id }, { put }) {
  const response = yield post(endpoint('delUser'), { id });
  if (response.code !== 200) return;
  message.success('删除成功');
  yield put({ type: 'fetch' });
}
