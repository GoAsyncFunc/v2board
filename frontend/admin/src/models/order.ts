import { post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse, type FormValue } from '../types/api';
import * as orderQueries from './orderQueryEffects';
import type { AssignOrderParams, OrderState } from '../types/order';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface OrderEffectTools extends PutEffectTools {}
interface UpdateOrderAction { tradeNo: string | number; key: string; value: FormValue; }
interface TradeNumberAction { tradeNo: string | number; }
interface AssignOrderAction { params: AssignOrderParams; callback?: () => void; }
type OrderEffect = ModelEffect<ApiResponse>;

const initialState: OrderState = {
  orders: [],
  fetchLoading: false,
  assignLoading: false,
  pagination: { pageSize: 10, current: 0 },
  filter: [],
};

export default {
  name: 'order',
  state: { ...initialState },
  reducers: {
    setState(state: OrderState, { payload }: { payload: Partial<OrderState> }) {
      return { ...state, ...payload };
    },
    empty() { return { ...initialState }; },
  },
  effects: {
    fetch: orderQueries.fetch,
    filter: orderQueries.filter,
    addFilter: orderQueries.addFilter,
    *update({ tradeNo, key, value }: UpdateOrderAction, { put }: OrderEffectTools): OrderEffect {
      const response = yield post(`/${window.settings.secure_path}/order/update`, { trade_no: tradeNo, [key]: value });
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *paid({ tradeNo }: TradeNumberAction, { put }: OrderEffectTools): OrderEffect {
      const response = yield post(`/${window.settings.secure_path}/order/paid`, { trade_no: tradeNo });
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *cancel({ tradeNo }: TradeNumberAction, { put }: OrderEffectTools): OrderEffect {
      const response = yield post(`/${window.settings.secure_path}/order/cancel`, { trade_no: tradeNo });
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *assign({ params, callback }: AssignOrderAction, { put }: OrderEffectTools): OrderEffect {
      yield put({ type: 'setState', payload: { assignLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/order/assign`, {
        ...params,
        total_amount: 100 * params.total_amount,
      });
      yield put({ type: 'setState', payload: { assignLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'fetch' });
      callback?.();
    },
    changeTable: orderQueries.changeTable,
  },
};
