import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type { OrderRecord } from '../types/commerce';
import type { CheckoutOrder } from '../types/checkout';
import type { CheckoutPaymentMethod, OrderFilter, OrderModelState } from '../types/payment';
import type { StateUpdate } from '../types/queryModels';

type OrderQueryAction = StateUpdate<OrderModelState>;
interface OrderQueryEffects {
    put(action: OrderQueryAction): PutEffect<OrderQueryAction>;
}
type OrderQueryGenerator<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<OrderQueryAction>,
    void,
    ApiResponse<Data>
>;

export function* detail(
    { tradeNo, callback }: { tradeNo: string; callback?: () => void },
    { put }: OrderQueryEffects,
): OrderQueryGenerator<CheckoutOrder> {
    yield put({ type: 'setState', payload: { detailsLoading: true } });
    const response = yield get<CheckoutOrder>('/user/order/detail', { trade_no: tradeNo });
    yield put({ type: 'setState', payload: { detailsLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { order: response.data } });
    if (typeof callback === 'function') callback();
}

export function* check({
    tradeNo,
    callback,
}: {
    tradeNo: string;
    callback?: (response: ApiResponse<number>) => void;
}): Generator<Promise<ApiResponse<number>>, void, ApiResponse<number>> {
    const response = yield get<number>('/user/order/check', { trade_no: tradeNo });
    if (!isSuccessfulResponse(response)) return;
    if (typeof callback === 'function') callback(response);
}

export function* getPaymentMethod(
    { complete }: { complete: (methods: CheckoutPaymentMethod[]) => void },
    { put }: OrderQueryEffects,
): OrderQueryGenerator<CheckoutPaymentMethod[]> {
    const response = yield get<CheckoutPaymentMethod[]>('/user/order/getPaymentMethod');
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { paymentMethod: response.data } });
    // The callback remains required because the recovered runtime throws when it is absent.
    complete(response.data);
}

export function* fetch(
    { filter }: { filter?: OrderFilter },
    { put }: OrderQueryEffects,
): OrderQueryGenerator<OrderRecord[]> {
    yield put({ type: 'setState', payload: { fetchLoading: true } });
    const response = yield get<OrderRecord[]>('/user/order/fetch', filter);
    yield put({ type: 'setState', payload: { fetchLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { orders: response.data } });
}
