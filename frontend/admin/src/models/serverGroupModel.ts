import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse, type FormRecord } from '../types/apiContracts';
import type { ServerGroupOption, ServerGroupState, ServerId } from '../types/serverContracts';
import type { AdminAction } from '../types/storeContracts';
import type { ModelEffect, PutEffectTools } from '../types/modelEffects';

interface ServerGroupEffectTools extends PutEffectTools {}

interface ServerGroupAction {
    id: ServerId;
}

interface SaveServerGroupAction {
    params: FormRecord;
    callback?: () => void;
}

type ServerGroupEffect = ModelEffect<ApiResponse<ServerGroupOption[]>>;

const initialState: ServerGroupState = {
    groups: [],
    switchLoading: {},
    saveLoading: false,
    fetchLoading: false,
};

export default {
    namespace: 'serverGroup',
    state: { ...initialState },
    reducers: {
        setState(state: ServerGroupState, { payload }: { payload: Partial<ServerGroupState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(_: AdminAction, { put }: ServerGroupEffectTools): ServerGroupEffect {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = yield get<ServerGroupOption[]>(
                `/${window.settings.secure_path}/server/group/fetch`,
            );
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'setState', payload: { groups: response.data } });
        },
        *drop({ id }: ServerGroupAction, { put }: ServerGroupEffectTools): ServerGroupEffect {
            const response = yield post<ServerGroupOption[]>(
                `/${window.settings.secure_path}/server/group/drop`,
                { id },
            );
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *save(
            { params, callback }: SaveServerGroupAction,
            { put }: ServerGroupEffectTools,
        ): ServerGroupEffect {
            const response = yield post<ServerGroupOption[]>(
                `/${window.settings.secure_path}/server/group/save`,
                params,
            );
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetch' });
            callback?.();
        },
    },
};
