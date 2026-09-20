import { get } from '../services/request';
import type { QueryEffects, QueryGenerator, StateUpdate, TelegramBot, TelegramState } from '../types/queryModels';

const initialState: TelegramState = { botInfo: {} };

export default {
  name: 'telegram',
  state: initialState,
  reducers: {
    setState(state: TelegramState, { payload }: StateUpdate<TelegramState>): TelegramState { return { ...state, ...payload }; },
  },
  effects: {
    *getBotInfo(_action: { type?: string }, { put }: QueryEffects<TelegramState>): QueryGenerator<TelegramState, TelegramBot> {
      const response = yield get<TelegramBot>('/user/telegram/getBotInfo');
      if (response.code === 200) yield put({ type: 'setState', payload: { botInfo: response.data! } });
    },
  },
};
