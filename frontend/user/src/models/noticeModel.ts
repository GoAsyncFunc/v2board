import { get } from '../services/apiClient';
import { isSuccessfulResponse } from '../types/apiContracts';
import type { UserNotice } from '../types/subscriptionContracts';
import type {
    NoticeState,
    QueryEffects,
    QueryGenerator,
    StateUpdate,
} from '../types/queryStateContracts';

const initialState: NoticeState = { notices: [] };

export default {
    namespace: 'notice',
    state: initialState,
    reducers: {
        setState(state: NoticeState, { payload }: StateUpdate<NoticeState>): NoticeState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(
            { complete }: { complete?: () => void },
            { put }: QueryEffects<NoticeState>,
        ): QueryGenerator<NoticeState, UserNotice[]> {
            const response = yield get<UserNotice[]>('/user/notice/fetch');
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'setState', payload: { notices: response.data } });
            if (typeof complete === 'function') complete();
        },
    },
};
