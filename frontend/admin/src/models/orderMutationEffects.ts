import { post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse, type FormValue } from '../types/api';
import type { ModelEffect, PutEffectTools } from '../types/effects';
import type { AssignOrderParams } from '../types/order';

interface OrderMutationTools extends PutEffectTools {}

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

type OrderMutationEffect = ModelEffect<ApiResponse>;

const orderEndpoint = (action: string): string => `/${window.settings.secure_path}/order/${action}`;

export function* update(
    { tradeNo, key, value }: UpdateOrderAction,
    { put }: OrderMutationTools,
): OrderMutationEffect {
    const response = yield post(orderEndpoint('update'), {
        trade_no: tradeNo,
        [key]: value,
    });
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* paid(
    { tradeNo }: TradeNumberAction,
    { put }: OrderMutationTools,
): OrderMutationEffect {
    const response = yield post(orderEndpoint('paid'), { trade_no: tradeNo });
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* cancel(
    { tradeNo }: TradeNumberAction,
    { put }: OrderMutationTools,
): OrderMutationEffect {
    const response = yield post(orderEndpoint('cancel'), { trade_no: tradeNo });
    if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
}

export function* assign(
    { params, callback }: AssignOrderAction,
    { put }: OrderMutationTools,
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
