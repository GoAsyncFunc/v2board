import { get } from '../services/request';
import { localeSettings } from '../config/localeSettings';
import { router } from '../app/navigation';
import { isSuccessfulResponse } from '../types/api';
import type { ApiResponse } from '../types/api';
import type { PlanEffects, PlanGenerator, PlanRecord, PlanState } from '../types/commonModels';
import type { PlanPeriod } from '../types/plan';
import type { StateUpdate } from '../types/queryModels';

const initialState: PlanState = { plans: [], plan: {}, selectPeriod: undefined, fetchLoading: true };
const planPeriods = Object.keys(localeSettings.periodText) as PlanPeriod[];

export function choosePeriod(plan: PlanRecord, currentPeriod?: PlanPeriod): PlanPeriod | undefined {
  if (currentPeriod) return currentPeriod;
  let selected: PlanPeriod | undefined;
  // The original reverse scan leaves the earliest eligible API property selected.
  for (const key of Object.keys(plan).reverse()) {
    if (planPeriods.includes(key as PlanPeriod) && plan[key] !== null) selected = key as PlanPeriod;
  }
  return selected;
}

export default {
  name: 'plan',
  state: { ...initialState },
  reducers: {
    setState(state: PlanState, { payload }: StateUpdate<PlanState>): PlanState { return { ...state, ...payload }; },
    empty(): PlanState { return initialState; },
  },
  effects: {
    *fetch(_action: { type?: string }, { put }: PlanEffects): PlanGenerator<PlanState['plans']> {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = (yield get<PlanState['plans']>('/user/plan/fetch')) as ApiResponse<PlanState['plans']>;
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'setState', payload: { plans: response.data } });
    },
    *fetchById({ id }: { id: number }, { put, select }: PlanEffects): PlanGenerator<PlanRecord> {
      const planState = (yield select(state => state.plan)) as PlanState;
      const currentPeriod = planState.selectPeriod;
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = (yield get<PlanRecord>('/user/plan/fetch', { id })) as ApiResponse<PlanRecord>;
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (!isSuccessfulResponse(response)) { router.push('/plan'); return; }
      yield put({ type: 'setState', payload: {
        plan: response.data, selectPeriod: choosePeriod(response.data, currentPeriod),
      } });
    },
  },
};
