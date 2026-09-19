import { post } from '../services/request.js';

const initialState = { coupon: {}, checkLoading: false };
export default {
  name: 'coupon',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
    empty() { return { ...initialState }; },
  },
  effects: {
    *check({ code, planId }, { put }) {
      yield put({ type: 'setState', payload: { checkLoading: true } });
      const response = yield post('/user/coupon/check', { code, plan_id: planId });
      yield put({ type: 'setState', payload: { checkLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { coupon: response.data } });
    },
  },
};
