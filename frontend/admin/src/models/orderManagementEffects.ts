import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse, type FormValue } from '../types/api';
import type { FilterItem, FilterValue } from '../types/filter';
import type { AssignOrderParams, OrderPagination, OrderRecord, OrderState } from '../types/order';
import type { ModelEffect, ModelEffectTools, PutEffectTools } from '../types/modelEffects';
import type { AdminAction, AdminRootState } from '../types/store';

type OrderStoreState = Pick<AdminRootState, 'order'>;
type OrderQueryAction = AdminAction | { filter: FilterItem[] };
interface QueryEffectTools extends ModelEffectTools<OrderStoreState, OrderQueryAction> {}
interface MutationEffectTools extends PutEffectTools {}

interface FilterAction {
    filter: FilterItem[];
}
interface AddFilterAction {
    key: string;
    condition: string;
    value: FilterValue;
    clear?: boolean;
}
interface ChangeTableAction {
    pagination: Partial<OrderPagination>;
}
interface UpdateOrderAction {
    tradeNo: string | number;
    key: string;
    value: FormValue;
}
interface TradeNumberAction {
    tradeNo: string | number;
}
interface AssignOrderAction {
    params: AssignOrderParams;
    callback?: () => void;
}

type OrderQueryEffect = ModelEffect<ApiResponse<OrderRecord[]> | OrderState>;
type OrderMutationEffect = ModelEffect<ApiResponse>;

const orderEndpoint = (action: string): string => `/${window.settings.secure_path}/order/${action}`;

export function* fetch(_action: AdminAction, { put, select }: QueryEffectTools): OrderQueryEffect {
    const orderState = (yield select((state) => state.order)) as OrderState;
    yield put({ type: 'setState', payload: { fetchLoading: true } });
    const response = (yield get<OrderRecord[]>(orderEndpoint('fetch'), {
        filter: orderState.filter,
        ...orderState.pagination,
    })) as ApiResponse<OrderRecord[]>;
    yield put({ type: 'setState', payload: { fetchLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { orders: response.data } });
    yield put({
        type: 'setState',
        payload: { pagination: { ...orderState.pagination, total: response.total } },
    });
}

export function* filter(
    { filter: nextFilter }: FilterAction,
    { put, select }: QueryEffectTools,
): OrderQueryEffect {
    const orderState = (yield select((state) => state.order)) as OrderState;
    orderState.pagination.current = 1;
    yield put({ type: 'setState', payload: { filter: nextFilter } });
    yield put({ type: 'fetch' });
}

export function* addFilter(
    { key, condition, value, clear }: AddFilterAction,
    { put, select }: QueryEffectTools,
): OrderQueryEffect {
    // Preserve the recovered malformed action until it is fixed as a separate behavior change.
    if (clear) yield put({ filter: [] });
    const orderState = (yield select((state) => state.order)) as OrderState;
    const filters = orderState.filter;
    filters.push({ key, condition, value });
    orderState.pagination.current = 1;
    yield put({
        type: 'setState',
        payload: { filter: filters, pagination: orderState.pagination },
    });
    yield put({ type: 'fetch' });
}

export function* changeTable(
    { pagination }: ChangeTableAction,
    { put, select }: QueryEffectTools,
): OrderQueryEffect {
    const orderState = (yield select((state) => state.order)) as OrderState;
    yield put({
        type: 'setState',
        payload: { pagination: { ...orderState.pagination, ...pagination } },
    });
    yield put({ type: 'fetch' });
}

export function* update(
    { tradeNo, key, value }: UpdateOrderAction,
    { put }: MutationEffectTools,
): OrderMutationEffect {
    const response = yield post(orderEndpoint('update'), {
        trade_no: tradeNo,
        [key]: value,
    });
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* paid(
    { tradeNo }: TradeNumberAction,
    { put }: MutationEffectTools,
): OrderMutationEffect {
    const response = yield post(orderEndpoint('paid'), { trade_no: tradeNo });
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* cancel(
    { tradeNo }: TradeNumberAction,
    { put }: MutationEffectTools,
): OrderMutationEffect {
    const response = yield post(orderEndpoint('cancel'), { trade_no: tradeNo });
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* assign(
    { params, callback }: AssignOrderAction,
    { put }: MutationEffectTools,
): OrderMutationEffect {
    yield put({ type: 'setState', payload: { assignLoading: true } });
    const response = yield post(orderEndpoint('assign'), {
        ...params,
        total_amount: 100 * params.total_amount,
    });
    yield put({ type: 'setState', payload: { assignLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'fetch' });
    callback?.();
}
