import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import { settings } from '../config/adminSettings';
import type {
    PlanFieldValue,
    PlanListRecord,
    PlanPriceField,
    PlanRecord,
    PlanState,
} from '../types/plan';
import type { AdminAction, AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/modelEffects';

type PlanRootState = Pick<AdminRootState, 'plan'>;
interface PlanTools extends ModelEffectTools<PlanRootState> {}
interface PlanSaveAction {
    params: PlanRecord;
    callback?: () => void;
}
interface PlanIdAction {
    id?: string | number;
}
interface PlanUpdateAction extends PlanIdAction {
    key: string;
    value: PlanFieldValue;
}
interface PlanSortAction {
    fromIndex: number;
    toIndex: number;
}
type PlanYield = PlanState | ApiResponse;
type PlanEffect = ModelEffect<PlanYield>;

const endpoint = (action: string): string => `/${window.settings.secure_path}/plan/${action}`;
const initialState: PlanState = { plans: [], fetchLoading: false };

// Preserve mutation, null handling and JavaScript numeric coercion used by the edit form.
export function convertPrices(plan: PlanRecord, toMinorUnits: boolean): PlanRecord {
    for (const period of Object.keys(settings.periodText) as PlanPriceField[]) {
        if (plan[period] !== null) {
            plan[period] = toMinorUnits
                ? Math.round(100 * (plan[period] as number))
                : (plan[period] as number) / 100;
        }
    }
    return plan;
}

export default {
    namespace: 'plan',
    state: { ...initialState },
    reducers: {
        setState(state: PlanState, { payload }: { payload: Partial<PlanState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(_: AdminAction, { put }: PlanTools): PlanEffect {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<PlanListRecord[]>(endpoint('fetch'))) as ApiResponse<
                PlanListRecord[]
            >;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            response.data.forEach((plan) => convertPrices(plan, false));
            yield put({ type: 'setState', payload: { plans: response.data } });
        },
        *save({ params, callback }: PlanSaveAction, { put }: PlanTools): PlanEffect {
            yield put({ type: 'setState', payload: { saveLoading: true } });
            convertPrices(params, true);
            const response = (yield post(endpoint('save'), params)) as ApiResponse;
            yield put({ type: 'setState', payload: { saveLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetch' });
            if (typeof callback === 'function') callback();
        },
        *drop({ id }: PlanIdAction, { put }: PlanTools): PlanEffect {
            const response = (yield post(endpoint('drop'), { id })) as ApiResponse;
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetch' });
        },
        *update({ id, key, value }: PlanUpdateAction, { put }: PlanTools): PlanEffect {
            const response = (yield post(endpoint('update'), { id, [key]: value })) as ApiResponse;
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetch' });
        },
        *sort({ fromIndex, toIndex }: PlanSortAction, { select, put }: PlanTools): PlanEffect {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const { plans } = (yield select((state) => state.plan)) as PlanState;
            if (fromIndex < toIndex) {
                plans.splice(toIndex + 1, 0, plans[fromIndex]);
                plans.splice(fromIndex, 1);
            } else {
                plans.splice(toIndex, 0, plans[fromIndex]);
                plans.splice(fromIndex + 1, 1);
            }
            yield put({ type: 'setState', payload: { plans } });
            const response = (yield post(endpoint('sort'), {
                plan_ids: plans.map((plan) => plan.id),
            })) as ApiResponse;
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetch' });
        },
    },
};
