import { post } from '../services/request';
import type { CouponState } from '../types/contentModels';
import type { QueryEffects, QueryGenerator, StateUpdate } from '../types/queryModels';

const initialState: CouponState = { coupon: {}, checkLoading: false };
export default {
  name: 'coupon',
  state: { ...initialState },
  reducers: {
    setState(state: CouponState, { payload }: StateUpdate<CouponState>): CouponState { return { ...state, ...payload }; },
    empty() { return { ...initialState }; },
  },
  effects: {
    *check({ code, planId }: { code: string; planId: number | string }, { put }: QueryEffects<CouponState>): QueryGenerator<CouponState, CouponState['coupon']> {
      yield put({ type: 'setState', payload: { checkLoading: true } });
      const response = yield post<CouponState['coupon']>('/user/coupon/check', { code, plan_id: planId });
      yield put({ type: 'setState', payload: { checkLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { coupon: response.data } });
    },
  },
};
