import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { TrafficRecord } from '../types/commerce';
import type { QueryEffects, QueryGenerator, StateUpdate, TrafficState } from '../types/queryModels';

const initialState: TrafficState = { traffics: [], getTrafficLogLoading: false };

export default {
    name: 'stat',
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
