import { get, post } from '../services/request';
import type { ApiResponse } from '../types/api';
import type { CommunicationState, ModelEffects, ModelGenerator, UserCommunicationConfig } from '../types/commonModels';
import type { StateUpdate } from '../types/queryModels';

const initialState: CommunicationState = { config: {} };

export default {
  name: 'comm',
  state: initialState,
  reducers: {
    setState(state: CommunicationState, { payload }: StateUpdate<CommunicationState>): CommunicationState {
      return { ...state, ...payload };
    },
  },
  effects: {
    *config(_action: { type?: string }, { put }: ModelEffects<CommunicationState>): ModelGenerator<CommunicationState, UserCommunicationConfig> {
      const response = yield get<UserCommunicationConfig>('/user/comm/config');
      if (response.code === 200) yield put({ type: 'setState', payload: { config: response.data! } });
    },
    *getStripePublicKey(
      { complete, id }: { complete: (publicKey: string) => void; id: number | string },
    ): Generator<Promise<ApiResponse<string>>, void, ApiResponse<string>> {
      const response = yield post<string>('/user/comm/getStripePublicKey', { id });
      if (response.code === 200) complete(response.data!);
    },
  },
};
