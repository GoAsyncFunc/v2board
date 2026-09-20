import { get } from '../services/request';
import type { CommunicationConfig } from '../types/auth';
import type { GuestState, ModelEffects, ModelGenerator } from '../types/commonModels';
import type { StateUpdate } from '../types/queryModels';

const initialState: GuestState = {
  commConfig: {},
  getCommConfigLoading: false,
  selectEmailSuffix: undefined,
};

export default {
  name: 'guest',
  state: initialState,
  reducers: {
    setState(state: GuestState, { payload }: StateUpdate<GuestState>): GuestState { return { ...state, ...payload }; },
  },
  effects: {
    *getCommConfig(_action: { type?: string }, { put }: ModelEffects<GuestState>): ModelGenerator<GuestState, CommunicationConfig> {
      yield put({ type: 'setState', payload: { getCommConfigLoading: true } });
      const response = yield get<CommunicationConfig>('/guest/comm/config');
      yield put({ type: 'setState', payload: { getCommConfigLoading: false } });
      if (response.code !== 200) return;
      yield put({
        type: 'setState',
        payload: {
          commConfig: response.data!,
          selectEmailSuffix: response.data!.email_whitelist_suffix ? response.data!.email_whitelist_suffix[0] : '',
        },
      });
    },
  },
};
