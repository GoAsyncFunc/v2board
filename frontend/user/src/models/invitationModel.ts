import { get, post } from '../services/apiClient';
import { isSuccessfulResponse } from '../types/apiContracts';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/apiContracts';
import type { CommissionRecord, InviteState } from '../types/invitationContracts';
import type { StateUpdate } from '../types/queryStateContracts';

type InviteAction = StateUpdate<InviteState> | { type: 'fetch' };
interface InviteEffects {
    put(action: InviteAction): PutEffect<InviteAction>;
}
type InviteGenerator<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<InviteAction>,
    void,
    ApiResponse<Data>
>;

const initialState: InviteState = {
    invites: [],
    codes: [],
    stat: [],
    detailsLoading: false,
    fetchLoading: true,
    saveLoading: false,
    detailsPagination: { total: 0, current: 1, page_size: 10 },
};

export default {
    namespace: 'invite',
    state: initialState,
    reducers: {
        setState(state: InviteState, { payload }: StateUpdate<InviteState>): InviteState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *details(
            { current, pageSize }: { current?: number; pageSize?: number },
            { put }: InviteEffects,
        ): InviteGenerator<CommissionRecord[]> {
            yield put({ type: 'setState', payload: { detailsLoading: true } });
            const response = yield get<CommissionRecord[]>('/user/invite/details', {
                current,
                page_size: pageSize,
            });
            yield put({ type: 'setState', payload: { detailsLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({
                    type: 'setState',
                    payload: {
                        invites: response.data,
                        detailsPagination: { current, page_size: pageSize, total: response.total },
                    },
                });
        },
        *fetch(
            _action: { type?: string },
            { put }: InviteEffects,
        ): InviteGenerator<Pick<InviteState, 'codes' | 'stat'>> {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = yield get<Pick<InviteState, 'codes' | 'stat'>>('/user/invite/fetch');
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { ...response.data } });
        },
        *save(
            { complete }: { complete?: () => void },
            { put }: InviteEffects,
        ): InviteGenerator<boolean> {
            yield put({ type: 'setState', payload: { saveLoading: true } });
            const response = yield post<boolean>('/user/invite/save');
            yield put({ type: 'setState', payload: { saveLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            complete?.();
            yield put({ type: 'fetch' });
        },
    },
};
