import * as queries from './orderQueryEffects';
import * as payments from './orderPaymentEffects';
import type { OrderModelState } from '../types/payment';
import type { StateUpdate } from '../types/queryModels';

const initialState: OrderModelState = {
  fetchLoading: true,
  saveLoading: false,
  checkoutLoading: false,
  order: { plan: {} },
  paymentMethod: [],
  selectMethod: undefined,
  qrcodeModalVisible: false,
  payUrl: undefined,
  orders: [],
  cancelLoading: false,
  detailsLoading: false,
};

export default {
  name: 'order',
  state: { ...initialState },
  reducers: {
    setState(state: OrderModelState, { payload }: StateUpdate<OrderModelState>): OrderModelState {
      return { ...state, ...payload };
    },
    empty(state: OrderModelState): OrderModelState { return { ...state, ...initialState }; },
  },
  effects: {
    save: payments.save,
    detail: queries.detail,
    check: queries.check,
    getPaymentMethod: queries.getPaymentMethod,
    checkout: payments.checkout,
    checkoutByStripe: payments.checkoutByStripe,
    fetch: queries.fetch,
    cancel: payments.cancel,
  },
};
