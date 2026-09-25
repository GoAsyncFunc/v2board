import { get } from '../services/apiClient';
import { isSuccessfulResponse } from '../types/apiContracts';
import type { TrafficRecord } from '../types/commerce';
import type { QueryEffects, QueryGenerator, StateUpdate, TrafficState } from '../types/queryState';

const initialState: TrafficState = { traffics: [], getTrafficLogLoading: false };

export default {
    namespace: 'stat',
    state: initialState,
    reducers: {
        setState(state: TrafficState, { payload }: StateUpdate<TrafficState>): TrafficState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getTrafficLog(
            _action: { type?: string },
            { put }: QueryEffects<TrafficState>,
        ): QueryGenerator<TrafficState, TrafficRecord[]> {
            yield put({ type: 'setState', payload: { getTrafficLogLoading: true } });
            const response = yield get<TrafficRecord[]>('/user/stat/getTrafficLog');
            yield put({ type: 'setState', payload: { getTrafficLogLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { traffics: response.data } });
        },
    },
};
