import { get } from '../services/request.js';
import { a as settings } from '../vendor/localeSettings.js';
import { router } from '../vendor/modules/4172412b.js';

const initialState = { plans: [], plan: {}, selectPeriod: undefined, fetchLoading: true };

export function choosePeriod(plan, currentPeriod) {
  if (currentPeriod) return currentPeriod;
  let selected = currentPeriod;
  // Match the original reverse scan: the earliest eligible API property wins.
  // Zero is a valid price; only null excludes a known period.
  for (const key of Object.keys(plan).reverse()) {
    if (Object.keys(settings.periodText).includes(key) && plan[key] !== null) selected = key;
  }
  return selected;
}

export default {
  name: 'plan',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
    empty() { return initialState; },
  },
  effects: {
    *fetch(action, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get('/user/plan/fetch');
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { plans: response.data } });
    },
    *fetchById({ id }, { put, select }) {
      const planState = yield select(state => state.plan);
      const currentPeriod = planState.selectPeriod;
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get('/user/plan/fetch', { id });
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) { router.push('/plan'); return; }
      yield put({ type: 'setState', payload: {
        plan: response.data, selectPeriod: choosePeriod(response.data, currentPeriod),
      } });
    },
  },
};
