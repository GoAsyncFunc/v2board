import moment from 'moment';
import { get, post } from '../services/apiClient';
import { downloadCsv } from '../services/csvDownloadService';
import {
    isSuccessfulResponse,
    type ApiResponse,
    type FormRecord,
    type FormValue,
} from '../types/apiContracts';
import type { FilterItem } from '../types/filterContracts';
import type { AdminLoginData, AdminUserInfo } from '../types/authenticationContracts';
import type { AdminAction, AdminRootState } from '../types/storeContracts';
import type { ModelEffect, ModelEffectTools, PutEffectTools } from '../types/modelEffectContracts';
import type { UserModuleState, UserPagination, UserRecord, UserSort } from '../types/userContracts';
import history from '../app/navigation';
import { getToken } from '../utils/siteHelpers';

type UserRootState = Pick<AdminRootState, 'user'>;
interface UserTools extends ModelEffectTools<UserRootState> {}
interface SessionTools extends PutEffectTools {}

interface UserIdAction {
    id?: string | number;
}
interface UserFilterAction {
    filter: FilterItem[];
}
interface UserTableAction {
    pagination: Partial<UserPagination>;
    sort: UserSort;
}
interface AddFilterAction {
    key: string;
    condition: string;
    value: FilterItem['value'];
    clear?: boolean;
}
interface CallbackAction {
    callback?: () => void;
    complete?: () => void;
}
interface UpdateAction extends CallbackAction {
    params: UserRecord;
}
interface SendMailAction extends CallbackAction {
    params: FormRecord;
}
interface GenerateAction {
    params: FormRecord;
    callback?: () => void;
}
interface DumpCsvAction {
    start?: () => void;
    finish?: () => void;
}
interface CheckLoginAction {
    redirect?: string;
}

type UserYield =
    UserModuleState | ApiResponse | ApiResponse<UserRecord> | ApiResponse<UserRecord[]>;
type UserEffect = ModelEffect<UserYield>;
type ExportResponse = ApiResponse & { buffer?: BlobPart };

const userEndpoint = (action: string): string => `/${window.settings.secure_path}/user/${action}`;

// Mutates the API result, matching existing form/table expectations.
export function formatUser(user: UserRecord, includeTotal = false): UserRecord {
    user.password = '';
    for (const field of ['transfer_enable', 'u', 'd'] as const)
        user[field] = (Number(user[field]) / 1073741824).toFixed(2);
    if (includeTotal) user.total_used = (Number(user.total_used) / 1073741824).toFixed(2);
    user.commission_balance = (Number(user.commission_balance) / 100).toFixed(2);
    user.balance = (Number(user.balance) / 100).toFixed(2);
    return user;
}

export function* getUserInfoById({ id }: UserIdAction, { put }: UserTools): UserEffect {
    const response = (yield get<UserRecord>(userEndpoint('getUserInfoById'), {
        id,
    })) as ApiResponse<UserRecord>;
    if (!isSuccessfulResponse(response)) return;
    const user = formatUser(response.data);
    if (user.invite_user) user.invite_user_email = user.invite_user.email;
    yield put({ type: 'setState', payload: { user } });
}

export function* fetch(_: AdminAction, { put, select }: UserTools): UserEffect {
    const userState = (yield select((state) => state.user)) as UserModuleState;
    yield put({ type: 'setState', payload: { fetchLoading: true } });
    const response = (yield get<UserRecord[]>(userEndpoint('fetch'), {
        filter: userState.filter,
        ...userState.pagination,
        ...userState.sort,
    })) as ApiResponse<UserRecord[]>;
    yield put({ type: 'setState', payload: { fetchLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    response.data.forEach((user) => formatUser(user, true));
    yield put({
        type: 'setState',
        payload: {
            users: response.data,
            pagination: { ...userState.pagination, total: response.total },
        },
    });
}

export function* filter({ filter }: UserFilterAction, { put, select }: UserTools): UserEffect {
    const userState = (yield select((state) => state.user)) as UserModuleState;
    userState.pagination.current = 1;
    yield put({ type: 'setState', payload: { filter } });
    yield put({ type: 'fetch' });
}

export function* changeTable(
    { pagination, sort }: UserTableAction,
    { put, select }: UserTools,
): UserEffect {
    const userState = (yield select((state) => state.user)) as UserModuleState;
    yield put({
        type: 'setState',
        payload: { pagination: { ...userState.pagination, ...pagination }, sort },
    });
    yield put({ type: 'fetch' });
}

export function* addFilter(
    { key, condition, value, clear }: AddFilterAction,
    { put, select }: UserTools,
): UserEffect {
    const userState = (yield select((state) => state.user)) as UserModuleState;
    const filters = clear ? [] : userState.filter;
    filters.push({ key, condition, value });
    userState.pagination.current = 1;
    yield put({ type: 'setState', payload: { filter: filters, pagination: userState.pagination } });
    yield put({ type: 'fetch' });
}

export function* update({ params, callback }: UpdateAction, { put }: UserTools): UserEffect {
    yield put({ type: 'setState', payload: { updateLoading: true } });
    params.transfer_enable = 1073741824 * Number(params.transfer_enable);
    params.u = Math.round(1073741824 * Number(params.u));
    params.d = Math.round(1073741824 * Number(params.d));
    params.balance = Math.round(100 * Number(params.balance));
    params.commission_balance = Math.round(100 * Number(params.commission_balance));
    if (params.invite_user) delete params.invite_user;
    const updateForm = Object.entries(params).reduce<FormRecord>((form, [field, value]) => {
        form[field] = value as FormValue;
        return form;
    }, {});
    const response = (yield post(userEndpoint('update'), updateForm)) as ApiResponse;
    yield put({ type: 'setState', payload: { updateLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'fetch' });
    if (typeof callback === 'function') callback();
}

export function* sendMail(
    { params, callback, complete }: SendMailAction,
    { put, select }: UserTools,
): UserEffect {
    const userState = (yield select((state) => state.user)) as UserModuleState;
    yield put({ type: 'setState', payload: { sendMailLoading: true } });
    const response = (yield post(userEndpoint('sendMail'), {
        filter: userState.filter,
        ...params,
    })) as ApiResponse;
    yield put({ type: 'setState', payload: { sendMailLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    complete?.();
    if (typeof callback === 'function') callback();
}

function* runBatchAction(action: 'ban' | 'allDel', { put, select }: UserTools): UserEffect {
    const { filter } = (yield select((state) => state.user)) as UserModuleState;
    const response = (yield post(userEndpoint(action), { filter })) as ApiResponse;
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* ban(_: AdminAction, tools: UserTools): UserEffect {
    yield* runBatchAction('ban', tools);
}

export function* allDel(_: AdminAction, tools: UserTools): UserEffect {
    yield* runBatchAction('allDel', tools);
}

export function* resetSecret(
    { id, complete }: UserIdAction & CallbackAction,
    { put }: UserTools,
): UserEffect {
    const response = (yield post(userEndpoint('resetSecret'), { id })) as ApiResponse;
    if (!isSuccessfulResponse(response)) return;
    complete?.();
    yield put({ type: 'fetch' });
}

export function* delUser(
    { id, complete }: UserIdAction & CallbackAction,
    { put }: UserTools,
): UserEffect {
    const response = (yield post(userEndpoint('delUser'), { id })) as ApiResponse;
    if (!isSuccessfulResponse(response)) return;
    complete?.();
    yield put({ type: 'fetch' });
}

export function* generate({ params, callback }: GenerateAction, { put }: UserTools): UserEffect {
    yield put({ type: 'setState', payload: { generateLoading: true } });
    const response = (yield post(userEndpoint('generate'), params)) as ExportResponse;
    yield put({ type: 'setState', payload: { generateLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    if (params.generate_count)
        downloadCsv(
            response.buffer as BlobPart,
            `USER ${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`,
        );
    yield put({ type: 'fetch' });
    if (typeof callback === 'function') callback();
}

export function* dumpCSV({ start, finish }: DumpCsvAction, { select }: UserTools): UserEffect {
    const { filter } = (yield select((state) => state.user)) as UserModuleState;
    start?.();
    const response = (yield post(userEndpoint('dumpCSV'), { filter })) as ExportResponse;
    finish?.();
    if (!isSuccessfulResponse(response)) return;
    downloadCsv(response.buffer as BlobPart, moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
}

export function* checkLogin(
    { redirect }: CheckLoginAction,
    { put }: SessionTools,
): ModelEffect<ApiResponse<AdminLoginData>> {
    if (!getToken()) return;
    const response = yield get<AdminLoginData>('/user/checkLogin');
    if (!isSuccessfulResponse(response) || !response.data.is_admin) return;
    yield put({ type: 'user/getUserInfo' });
    history.push(redirect || 'dashboard');
}

export function* getUserInfo(
    _action: AdminAction,
    { put }: SessionTools,
): ModelEffect<ApiResponse<AdminUserInfo>> {
    yield put({ type: 'setState', payload: { getUserInfoLoading: true } });
    const response = yield get<AdminUserInfo>('/user/info');
    yield put({ type: 'setState', payload: { getUserInfoLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { userInfo: response.data } });
}
