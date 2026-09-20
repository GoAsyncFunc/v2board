import { get } from '../services/request';

const userEndpoint = action => `/${window.settings.secure_path}/user/${action}`;

// Mutates the API result, matching existing form/table expectations.
export function formatUser(user, includeTotal = false) {
  user.password = '';
  for (const field of ['transfer_enable', 'u', 'd']) {
    user[field] = (user[field] / 1073741824).toFixed(2);
  }
  if (includeTotal) user.total_used = (user.total_used / 1073741824).toFixed(2);
  user.commission_balance = (user.commission_balance / 100).toFixed(2);
  user.balance = (user.balance / 100).toFixed(2);
  return user;
}

export function* getUserInfoById({ id }, { put }) {
  const response = yield get(userEndpoint('getUserInfoById'), { id });
  if (response.code !== 200) return;
  const user = formatUser(response.data);
  if (user.invite_user) user.invite_user_email = user.invite_user.email;
  yield put({ type: 'setState', payload: { user } });
}

export function* fetch(action, { put, select }) {
  const userState = yield select(state => state.user);
  yield put({ type: 'setState', payload: { fetchLoading: true } });
  const response = yield get(userEndpoint('fetch'), {
    filter: userState.filter, ...userState.pagination, ...userState.sort,
  });
  yield put({ type: 'setState', payload: { fetchLoading: false } });
  if (response.code !== 200) return;
  response.data.forEach(user => formatUser(user, true));
  yield put({
    type: 'setState',
    payload: { users: response.data, pagination: { ...userState.pagination, total: response.total } },
  });
}

export function* filter({ filter }, { put, select }) {
  const userState = yield select(state => state.user);
  // Preserve the original in-place pagination reset; immutability is a separate change.
  userState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter } });
  yield put({ type: 'fetch' });
}

export function* changeTable({ pagination, sort }, { put, select }) {
  const userState = yield select(state => state.user);
  yield put({ type: 'setState', payload: { pagination: { ...userState.pagination, ...pagination }, sort } });
  yield put({ type: 'fetch' });
}

export function* addFilter({ key, condition, value, clear }, { put, select }) {
  const userState = yield select(state => state.user);
  const filters = clear ? [] : userState.filter;
  filters.push({ key, condition, value });
  userState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter: filters, pagination: userState.pagination } });
  yield put({ type: 'fetch' });
}
