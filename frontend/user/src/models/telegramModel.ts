import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/apiContracts';
import type {
    QueryEffects,
    QueryGenerator,
    StateUpdate,
    TelegramBot,
    TelegramState,
} from '../types/queryState';

const initialState: TelegramState = { botInfo: {} };

export default {
    namespace: 'telegram',
    state: initialState,
    reducers: {
        setState(state: TelegramState, { payload }: StateUpdate<TelegramState>): TelegramState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getBotInfo(
            _action: { type?: string },
            { put }: QueryEffects<TelegramState>,
        ): QueryGenerator<TelegramState, TelegramBot> {
            const response = yield get<TelegramBot>('/user/telegram/getBotInfo');
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { botInfo: response.data } });
        },
    },
};
