import { get, post } from '../services/request';
import history from '../app/history';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import type { PutEffect } from 'redux-saga/effects';
import type { OrderRecord } from '../types/commerce';
import type { CheckoutOrder } from '../types/checkout';
import type {
    CheckoutPaymentMethod,
    OrderCheckoutResponse,
    OrderFilter,
    OrderModelState,
    OrderSaveParams,
} from '../types/payment';
import type { StateUpdate } from '../types/queryState';

type OrderAction =
    StateUpdate<OrderModelState> | { type: 'fetch' } | { type: 'details'; tradeNo: string };

interface OrderEffects {
    put(action: OrderAction): PutEffect<OrderAction>;
}

type OrderEffectGenerator<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<OrderAction>,
    void,
    ApiResponse<Data>
>;

export function* detail(
    { tradeNo, callback }: { tradeNo: string; callback?: () => void },
    { put }: OrderEffects,
): OrderEffectGenerator<CheckoutOrder> {
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
    { put }: OrderEffects,
): OrderEffectGenerator<CheckoutPaymentMethod[]> {
    const response = yield get<CheckoutPaymentMethod[]>('/user/order/getPaymentMethod');
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { paymentMethod: response.data } });
    // The callback remains required because the recovered runtime throws when it is absent.
    complete(response.data);
}

export function* fetch(
    { filter }: { filter?: OrderFilter },
    { put }: OrderEffects,
): OrderEffectGenerator<OrderRecord[]> {
    yield put({ type: 'setState', payload: { fetchLoading: true } });
    const response = yield get<OrderRecord[]>('/user/order/fetch', filter);
    yield put({ type: 'setState', payload: { fetchLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { orders: response.data } });
}

export function* save(
    { params }: { params: OrderSaveParams },
    { put }: OrderEffects,
): OrderEffectGenerator<string> {
    yield put({ type: 'setState', payload: { saveLoading: true } });
    const response = yield post<string>('/user/order/save', params);
    yield put({ type: 'setState', payload: { saveLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    history.push('/order/' + response.data);
}

export function* checkout(
    {
        tradeNo,
        method,
        complete,
    }: { tradeNo: string; method?: number | string | null; complete?: () => void },
    { put }: OrderEffects,
): Generator<
    Promise<ApiResponse<string | boolean>> | PutEffect<OrderAction>,
    void,
    OrderCheckoutResponse
> {
    yield put({ type: 'setState', payload: { checkoutLoading: true } });
    const response = yield post<string | boolean>('/user/order/checkout', {
        trade_no: tradeNo,
        method,
    });
    yield put({ type: 'setState', payload: { checkoutLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    switch (response.type) {
        case 0:
            yield put({
                type: 'setState',
                payload: { qrcodeModalVisible: true, payUrl: response.data },
            });
            break;
        case 1:
            // The API contract guarantees a URL for redirect payments; assignment preserves legacy coercion.
            window.location.href = response.data as string;
            complete?.();
            break;
    }
}

export function* checkoutByStripe(
    {
        tradeNo,
        method,
        token,
        complete,
    }: { tradeNo: string; method?: number | string; token?: string; complete?: () => void },
    { put }: OrderEffects,
): OrderEffectGenerator<string | boolean> {
    yield put({ type: 'setState', payload: { checkoutLoading: true } });
    const response = yield post<string | boolean>('/user/order/checkout', {
        trade_no: tradeNo,
        method,
        token,
    });
    yield put({ type: 'setState', payload: { checkoutLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    complete?.();
}

export function* cancel(
    { tradeNo, complete }: { tradeNo: string; complete?: () => void },
    { put }: OrderEffects,
): OrderEffectGenerator<boolean> {
    yield put({ type: 'setState', payload: { cancelLoading: true } });
    const response = yield post<boolean>('/user/order/cancel', { trade_no: tradeNo });
    yield put({ type: 'setState', payload: { cancelLoading: false } });
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'fetch' });
    // Preserve the inherited action spelling; fixing it is a separate behavior change.
    yield put({ type: 'details', tradeNo });
    if (typeof complete === 'function') complete();
}
