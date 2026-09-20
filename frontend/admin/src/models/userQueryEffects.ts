import { get, type ApiResponse } from '../services/request';
import type { FilterItem } from '../components/FilterDrawer';
import type { UserModuleState, UserPagination, UserRecord, UserSort } from '../types/user';
import type { AdminAction } from '../types/store';

interface UserTools { put(action: AdminAction): unknown; select(selector: (state: { user: UserModuleState }) => UserModuleState): unknown; }
interface UserIdAction { id?: string | number; }
interface UserFilterAction { filter: FilterItem[]; }
interface UserTableAction { pagination: Partial<UserPagination>; sort: UserSort; }
interface AddFilterAction { key: string; condition: string; value: FilterItem['value']; clear?: boolean; }
type UserYield = UserModuleState | ApiResponse<unknown>;
type UserEffect = Generator<unknown, void, UserYield>;

const userEndpoint = (action: string): string => `/${window.settings.secure_path}/user/${action}`;

// Mutates the API result, matching existing form/table expectations.
export function formatUser(user: UserRecord, includeTotal = false): UserRecord {
  user.password = '';
  for (const field of ['transfer_enable', 'u', 'd'] as const) user[field] = ((user[field] as number) / 1073741824).toFixed(2);
  if (includeTotal) user.total_used = ((user.total_used as number) / 1073741824).toFixed(2);
  user.commission_balance = ((user.commission_balance as number) / 100).toFixed(2);
  user.balance = ((user.balance as number) / 100).toFixed(2);
  return user;
}

export function* getUserInfoById({ id }: UserIdAction, { put }: UserTools): UserEffect {
  const response = (yield get<UserRecord>(userEndpoint('getUserInfoById'), { id })) as ApiResponse<UserRecord>;
  if (response.code !== 200) return;
  const user = formatUser(response.data);
  if (user.invite_user) user.invite_user_email = (user.invite_user as { email?: string }).email;
  yield put({ type: 'setState', payload: { user } });
}

export function* fetch(_: AdminAction, { put, select }: UserTools): UserEffect {
  const userState = (yield select(state => state.user)) as UserModuleState;
  yield put({ type: 'setState', payload: { fetchLoading: true } });
  const response = (yield get<UserRecord[]>(userEndpoint('fetch'), { filter: userState.filter, ...userState.pagination, ...userState.sort })) as ApiResponse<UserRecord[]>;
  yield put({ type: 'setState', payload: { fetchLoading: false } });
  if (response.code !== 200) return;
  response.data.forEach(user => formatUser(user, true));
  yield put({ type: 'setState', payload: { users: response.data, pagination: { ...userState.pagination, total: response.total } } });
}

export function* filter({ filter }: UserFilterAction, { put, select }: UserTools): UserEffect {
  const userState = (yield select(state => state.user)) as UserModuleState;
  userState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter } });
  yield put({ type: 'fetch' });
}

export function* changeTable({ pagination, sort }: UserTableAction, { put, select }: UserTools): UserEffect {
  const userState = (yield select(state => state.user)) as UserModuleState;
  yield put({ type: 'setState', payload: { pagination: { ...userState.pagination, ...pagination }, sort } });
  yield put({ type: 'fetch' });
}

export function* addFilter({ key, condition, value, clear }: AddFilterAction, { put, select }: UserTools): UserEffect {
  const userState = (yield select(state => state.user)) as UserModuleState;
  const filters = clear ? [] : userState.filter;
  filters.push({ key, condition, value });
  userState.pagination.current = 1;
  yield put({ type: 'setState', payload: { filter: filters, pagination: userState.pagination } });
  yield put({ type: 'fetch' });
}
