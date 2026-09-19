import { get, post } from '../services/request.js';
import '../vendor/adminSettings.js';

const initialState = { payments: [], fetchLoading: false };

export default {
  name: 'payment',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/payment/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { payments: response.data } });
    },
    *getPaymentMethods({ complete }) {
      const response = yield get(`/${window.settings.secure_path}/payment/getPaymentMethods`);
      if (response.code === 200) complete(response.data);
    },
    *getPaymentForm({ complete, payment, id }) {
      const response = yield post(`/${window.settings.secure_path}/payment/getPaymentForm`, { payment, id });
      if (response.code === 200) complete(response.data);
    },
    *save({ params, complete }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/payment/save`, { ...params });
      if (response.code !== 200) return;
      if (typeof complete === 'function') complete(response.data);
      yield put({ type: 'fetch' });
    },
    *show({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/payment/show`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/payment/drop`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *sort({ fromIndex, toIndex }, { select, put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const paymentState = yield select(state => state.payment);
      const payments = paymentState.payments;
      if (fromIndex < toIndex) {
        payments.splice(toIndex + 1, 0, payments[fromIndex]);
        payments.splice(fromIndex, 1);
      } else {
        payments.splice(toIndex, 0, payments[fromIndex]);
        payments.splice(fromIndex + 1, 1);
      }
      yield put({ type: 'setState', payload: { payments } });
      const response = yield post(`/${window.settings.secure_path}/payment/sort`, { ids: payments.map(payment => payment.id) });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
  },
};
