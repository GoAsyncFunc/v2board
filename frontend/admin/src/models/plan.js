import { get, post } from '../services/request';
import { settings } from '../config/adminSettings';

const endpoint = action => `/${window.settings.secure_path}/plan/${action}`;
const initialState = { plans: [], fetchLoading: false };

// Preserve mutation, null handling and rounding used by the existing edit form.
export function convertPrices(plan, toMinorUnits) {
  for (const period of Object.keys(settings.periodText)) {
    if (plan[period] !== null) {
      plan[period] = toMinorUnits ? Math.round(100 * plan[period]) : plan[period] / 100;
    }
  }
  return plan;
}

export default {
  name: 'plan',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(action, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(endpoint('fetch'));
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      response.data.forEach(plan => convertPrices(plan, false));
      yield put({ type: 'setState', payload: { plans: response.data } });
    },
    *save({ params, callback }, { put }) {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      convertPrices(params, true);
      const response = yield post(endpoint('save'), params);
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
    *drop({ id }, { put }) {
      const response = yield post(endpoint('drop'), { id });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
    },
    *update({ id, key, value }, { put }) {
      const response = yield post(endpoint('update'), { id, [key]: value });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
    },
    *sort({ fromIndex, toIndex }, { select, put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const { plans } = yield select(state => state.plan);
      // Original UI applies its reorder before submitting. Failure rollback is not
      // introduced here, so this source migration does not change existing behavior.
      if (fromIndex < toIndex) {
        plans.splice(toIndex + 1, 0, plans[fromIndex]);
        plans.splice(fromIndex, 1);
      } else {
        plans.splice(toIndex, 0, plans[fromIndex]);
        plans.splice(fromIndex + 1, 1);
      }
      yield put({ type: 'setState', payload: { plans } });
      const response = yield post(endpoint('sort'), { plan_ids: plans.map(plan => plan.id) });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
    },
  },
};
