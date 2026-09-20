import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { UserNotice } from '../types/subscription';
import type { NoticeState, QueryEffects, QueryGenerator, StateUpdate } from '../types/queryModels';

const initialState: NoticeState = { notices: [] };

export default {
    name: 'notice',
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
