import history from '../app/routerHistory';
import { get, post } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { PutEffect, SelectEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type { TicketRecord } from '../types/commerce';
import type { StateUpdate } from '../types/queryModels';
import type {
    TicketConversation,
    TicketId,
    TicketReplyAction,
    TicketState,
    TicketWithdrawAction,
} from '../types/ticket';

type TicketAction = StateUpdate<TicketState> | { type: 'fetch' };
interface TicketEffects {
    put(action: TicketAction): PutEffect<TicketAction>;
    select(selector: (state: { ticket: TicketState }) => TicketState): SelectEffect;
}
type TicketGenerator<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<TicketAction> | SelectEffect,
    void,
    ApiResponse<Data> | TicketState
>;

const initialState: TicketState = {
    tickets: [],
    ticket: { message: [] },
    fetchLoading: false,
    saveLoading: false,
    replyLoading: false,
    newTicketModalVisible: false,
    saveData: {},
    replyData: {},
};

export default {
    name: 'ticket',
    state: { ...initialState },
    reducers: {
        setState(state: TicketState, { payload }: StateUpdate<TicketState>): TicketState {
            return { ...state, ...payload };
        },
        empty(): TicketState {
            return { ...initialState };
        },
    },
    effects: {
        *fetch(
            _action: { type?: string },
            { put }: TicketEffects,
        ): TicketGenerator<TicketRecord[]> {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<TicketRecord[]>('/user/ticket/fetch')) as ApiResponse<
                TicketRecord[]
            >;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { tickets: response.data } });
        },
        *fetchById(
            { id }: { id: TicketId },
            { put }: TicketEffects,
        ): TicketGenerator<TicketConversation> {
            const response = (yield get<TicketConversation>('/user/ticket/fetch', {
                id,
            })) as ApiResponse<TicketConversation>;
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { ticket: response.data } });
        },
        *close({ id }: { id: TicketId }, { put }: TicketEffects): TicketGenerator<boolean> {
            const response = (yield post<boolean>('/user/ticket/close', {
                id,
            })) as ApiResponse<boolean>;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *save(
            _action: { type?: string },
            { put, select }: TicketEffects,
        ): TicketGenerator<boolean> {
            const ticketState = (yield select((state) => state.ticket)) as TicketState;
            const response = (yield post<boolean>('/user/ticket/save', {
                ...ticketState.saveData,
            })) as ApiResponse<boolean>;
            if (!isSuccessfulResponse(response)) return;
            yield put({
                type: 'setState',
                payload: { saveData: {}, newTicketModalVisible: false },
            });
            yield put({ type: 'fetch' });
        },
        *reply(
            { id, start, finish, succeed, complete }: TicketReplyAction,
            { put, select }: TicketEffects,
        ): TicketGenerator<boolean> {
            const ticketState = (yield select((state) => state.ticket)) as TicketState;
            yield put({ type: 'setState', payload: { replyLoading: true } });
            start?.();
            const response = (yield post<boolean>('/user/ticket/reply', {
                id,
                ...ticketState.replyData,
            })) as ApiResponse<boolean>;
            finish?.();
            yield put({ type: 'setState', payload: { replyLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            succeed?.();
            yield put({ type: 'setState', payload: { replyData: {} } });
            complete();
        },
        *withdraw({
            withdrawAccount,
            withdrawMethod,
            callback,
        }: TicketWithdrawAction): TicketGenerator<boolean> {
            const response = (yield post<boolean>('/user/ticket/withdraw', {
                withdraw_account: withdrawAccount,
                withdraw_method: withdrawMethod,
            })) as ApiResponse<boolean>;
            if (!isSuccessfulResponse(response)) return;
            history.push('/ticket');
            if (typeof callback === 'function') callback();
        },
    },
};
