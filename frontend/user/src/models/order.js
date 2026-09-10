import * as queries from './orderQueryEffects.js';
import * as payments from './orderPaymentEffects.js';
import '../vendor/modules/6d69595a.js';

const initialState = {
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
    setState(state, { payload }) { return { ...state, ...payload }; },
    empty(state) { return { ...state, ...initialState }; },
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
