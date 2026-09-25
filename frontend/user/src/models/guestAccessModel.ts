import { get } from '../services/apiClient';
import { isSuccessfulResponse } from '../types/apiContracts';
import type { CommunicationConfig } from '../types/authenticationContracts';
import type { GuestState, ModelEffects, ModelGenerator } from '../types/userDomainContracts';
import type { StateUpdate } from '../types/queryStateContracts';

const initialState: GuestState = {
    commConfig: {},
    getCommConfigLoading: false,
    selectEmailSuffix: undefined,
};

export default {
    namespace: 'guest',
    state: initialState,
    reducers: {
        setState(state: GuestState, { payload }: StateUpdate<GuestState>): GuestState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getCommConfig(
            _action: { type?: string },
            { put }: ModelEffects<GuestState>,
        ): ModelGenerator<GuestState, CommunicationConfig> {
            yield put({ type: 'setState', payload: { getCommConfigLoading: true } });
            const response = yield get<CommunicationConfig>('/guest/comm/config');
            yield put({ type: 'setState', payload: { getCommConfigLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({
                type: 'setState',
                payload: {
                    commConfig: response.data,
                    selectEmailSuffix: response.data.email_whitelist_suffix
                        ? response.data.email_whitelist_suffix[0]
                        : '',
                },
            });
        },
    },
};
