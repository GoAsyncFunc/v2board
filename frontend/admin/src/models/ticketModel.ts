import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/apiContracts';
import type {
    TicketFilterState,
    TicketId,
    TicketPagination,
    TicketRecord,
    TicketState,
} from '../types/ticketContracts';
import type { AdminAction, AdminRootState } from '../types/storeContracts';
import type { ModelEffect, ModelEffectTools } from '../types/modelEffects';

type TicketRootState = Pick<AdminRootState, 'ticket' | 'user'>;
interface TicketTools extends ModelEffectTools<TicketRootState> {}
interface TicketIdAction {
    id?: TicketId;
}
interface TicketReplyAction extends TicketIdAction {
    msg?: string;
    start?: () => void;
    finish?: () => void;
    callback?: () => void;
}
interface TicketFilterAction {
    pagination?: Partial<TicketPagination>;
    filter?: Partial<TicketFilterState>;
}
type TicketYield = TicketState | TicketRootState['user'] | ApiResponse;
type TicketEffect = ModelEffect<TicketYield>;

const initialState: TicketState = {
    tickets: [],
    fetchLoading: false,
    ticket: { message: [] },
    pagination: { pageSize: 10, current: 1 },
    filter: { status: 0 },
    replyLoading: false,
};

export default {
    namespace: 'ticket',
    state: { ...initialState },
    reducers: {
        setState(state: TicketState, { payload }: { payload: Partial<TicketState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(_: AdminAction, { put, select }: TicketTools): TicketEffect {
            const ticketState = (yield select((state) => state.ticket)) as TicketState;
            const { pagination, filter } = ticketState;
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<TicketRecord[]>(
                `/${window.settings.secure_path}/ticket/fetch`,
                { ...pagination, ...filter },
            )) as ApiResponse<TicketRecord[]>;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({
                type: 'setState',
                payload: {
                    tickets: response.data,
                    pagination: { ...pagination, total: response.total },
                },
            });
        },
        *fetchById({ id }: TicketIdAction, { put, select }: TicketTools): TicketEffect {
            const response = (yield get<TicketRecord>(
                `/${window.settings.secure_path}/ticket/fetch`,
                { id },
            )) as ApiResponse<TicketRecord>;
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'setState', payload: { ticket: response.data } });
            const userState = (yield select((state) => state.user)) as TicketRootState['user'];
            if (!userState.user.id)
                yield put({ type: 'user/getUserInfoById', id: response.data.user_id });
        },
        *close({ id }: TicketIdAction, { put }: TicketTools): TicketEffect {
            const response = (yield post(`/${window.settings.secure_path}/ticket/close`, {
                id,
            })) as ApiResponse;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *reply(
            { id, msg, start, finish, callback }: TicketReplyAction,
            { put }: TicketTools,
        ): TicketEffect {
            start?.();
            yield put({ type: 'setState', payload: { replyLoading: true } });
            const response = (yield post(`/${window.settings.secure_path}/ticket/reply`, {
                id,
                message: msg,
            })) as ApiResponse;
            yield put({ type: 'setState', payload: { replyLoading: false } });
            finish?.();
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetchById', id });
            if (typeof callback === 'function') callback();
        },
        *filter(
            { pagination, filter }: TicketFilterAction,
            { put, select }: TicketTools,
        ): TicketEffect {
            const ticketState = (yield select((state) => state.ticket)) as TicketState;
            yield put({
                type: 'setState',
                payload: {
                    pagination: { ...ticketState.pagination, ...pagination },
                    filter: { ...ticketState.filter, ...filter },
                },
            });
            yield put({ type: 'fetch' });
        },
    },
};
