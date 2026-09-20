import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { NodeRecord } from '../types/commerce';
import type { QueryEffects, QueryGenerator, ServerState, StateUpdate } from '../types/queryModels';

const initialState: ServerState = { servers: [], fetchLoading: false };

export default {
    namespace: 'server',
    state: initialState,
    reducers: {
        setState(state: ServerState, { payload }: StateUpdate<ServerState>): ServerState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(
            _action: { type?: string },
            { put }: QueryEffects<ServerState>,
        ): QueryGenerator<ServerState, NodeRecord[]> {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = yield get<NodeRecord[]>('/user/server/fetch');
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { servers: response.data } });
        },
    },
};
