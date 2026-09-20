import { post } from '../services/request';
import history from '../app/routerHistory';
import { isSuccessfulResponse } from '../types/api';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type { OrderCheckoutResponse, OrderModelState, OrderSaveParams } from '../types/payment';
import type { StateUpdate } from '../types/queryModels';

type OrderPaymentAction = StateUpdate<OrderModelState> | { type: 'fetch' } | { type: 'details'; tradeNo: string };
interface OrderPaymentEffects { put(action: OrderPaymentAction): PutEffect<OrderPaymentAction>; }
type OrderPaymentGenerator<Data> = Generator<
  Promise<ApiResponse<Data>> | PutEffect<OrderPaymentAction>,
  void,
  ApiResponse<Data>
>;

export function* save(
  { params }: { params: OrderSaveParams },
  { put }: OrderPaymentEffects,
): OrderPaymentGenerator<string> {
  yield put({ type: 'setState', payload: { saveLoading: true } });
  const response = yield post<string>('/user/order/save', params);
  yield put({ type: 'setState', payload: { saveLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  history.push('/order/' + response.data);
}

export function* checkout(
  { tradeNo, method, complete }: { tradeNo: string; method?: number | string | null; complete?: () => void },
  { put }: OrderPaymentEffects,
): Generator<Promise<ApiResponse<string | boolean>> | PutEffect<OrderPaymentAction>, void, OrderCheckoutResponse> {
  yield put({ type: 'setState', payload: { checkoutLoading: true } });
  const response = yield post<string | boolean>('/user/order/checkout', { trade_no: tradeNo, method });
  yield put({ type: 'setState', payload: { checkoutLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  switch (response.type) {
    case 0:
      yield put({ type: 'setState', payload: { qrcodeModalVisible: true, payUrl: response.data } });
      break;
    case 1:
      // The API contract guarantees a URL for redirect payments; assignment preserves legacy coercion.
      window.location.href = response.data as string;
      complete?.();
      break;
  }
}

export function* checkoutByStripe(
  { tradeNo, method, token, complete }: { tradeNo: string; method?: number | string; token?: string; complete?: () => void },
  { put }: OrderPaymentEffects,
): OrderPaymentGenerator<string | boolean> {
  yield put({ type: 'setState', payload: { checkoutLoading: true } });
  const response = yield post<string | boolean>('/user/order/checkout', { trade_no: tradeNo, method, token });
  yield put({ type: 'setState', payload: { checkoutLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  complete?.();
}

export function* cancel(
  { tradeNo, complete }: { tradeNo: string; complete?: () => void },
  { put }: OrderPaymentEffects,
): OrderPaymentGenerator<boolean> {
  yield put({ type: 'setState', payload: { cancelLoading: true } });
  const response = yield post<boolean>('/user/order/cancel', { trade_no: tradeNo });
  yield put({ type: 'setState', payload: { cancelLoading: false } });
  if (!isSuccessfulResponse(response)) return;
  yield put({ type: 'fetch' });
  // Preserve the inherited action spelling; fixing it is a separate behavior change.
  yield put({ type: 'details', tradeNo });
  if (typeof complete === 'function') complete();
}
