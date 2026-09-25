import { get, post } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { ApiResponse } from '../types/api';
import type {
    CommunicationState,
    ModelEffects,
    ModelGenerator,
    UserCommunicationConfig,
} from '../types/userDomainContracts';
import type { StateUpdate } from '../types/queryState';

const initialState: CommunicationState = { config: {} };

export default {
    namespace: 'comm',
    state: initialState,
    reducers: {
        setState(
            state: CommunicationState,
            { payload }: StateUpdate<CommunicationState>,
        ): CommunicationState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *config(
            _action: { type?: string },
            { put }: ModelEffects<CommunicationState>,
        ): ModelGenerator<CommunicationState, UserCommunicationConfig> {
            const response = yield get<UserCommunicationConfig>('/user/comm/config');
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { config: response.data } });
        },
        *getStripePublicKey({
            complete,
            id,
        }: {
            complete: (publicKey: string) => void;
            id: number | string;
        }): Generator<Promise<ApiResponse<string>>, void, ApiResponse<string>> {
            const response = yield post<string>('/user/comm/getStripePublicKey', { id });
            if (isSuccessfulResponse(response)) complete(response.data);
        },
    },
};
