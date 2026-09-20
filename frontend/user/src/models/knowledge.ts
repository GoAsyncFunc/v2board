import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { KnowledgeId, KnowledgeState } from '../types/knowledge';
import type { QueryEffects, QueryGenerator, StateUpdate } from '../types/queryModels';

const initialState: KnowledgeState = {
    knowledges: {},
    knowledge: {},
    fetchByIdLoading: false,
    categorys: [],
    fetchLoading: false,
};

export default {
    name: '使用文档',
    state: initialState,
    reducers: {
        setState(state: KnowledgeState, { payload }: StateUpdate<KnowledgeState>): KnowledgeState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(
            { language, keyword }: { language?: string; keyword?: string },
            { put }: QueryEffects<KnowledgeState>,
        ): QueryGenerator<KnowledgeState, KnowledgeState['knowledges']> {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = yield get<KnowledgeState['knowledges']>('/user/knowledge/fetch', {
                language,
                keyword,
            });
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { knowledges: response.data } });
        },
        *fetchById(
            { id, language }: { id: KnowledgeId; language?: string },
            { put }: QueryEffects<KnowledgeState>,
        ): QueryGenerator<KnowledgeState, KnowledgeState['knowledge']> {
            yield put({ type: 'setState', payload: { fetchByIdLoading: true } });
            const response = yield get<KnowledgeState['knowledge']>('/user/knowledge/fetch', {
                id,
                language,
            });
            yield put({ type: 'setState', payload: { fetchByIdLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { knowledge: response.data } });
        },
    },
};
