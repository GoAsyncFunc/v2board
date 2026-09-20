import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import type { KnowledgeRecord, KnowledgeState } from '../types/knowledge';
import type { AdminAction, AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

type KnowledgeRootState = Pick<AdminRootState, 'knowledge'>;
interface KnowledgeTools extends ModelEffectTools<KnowledgeRootState> {}
interface KnowledgeIdAction {
    id?: string | number;
}
interface KnowledgeSaveAction {
    callback?: () => void;
}
interface KnowledgeSortAction {
    fromIndex: number;
    toIndex: number;
}
type KnowledgeYield = KnowledgeState | ApiResponse;
type KnowledgeEffect = ModelEffect<KnowledgeYield>;

const initialState: KnowledgeState = {
    knowledges: [],
    fetchLoading: false,
    categorys: [],
    knowledge: {},
    fetchByIdLoading: false,
    saveLoading: false,
};

export default {
    namespace: 'knowledge',
    state: { ...initialState },
    reducers: {
        setState(state: KnowledgeState, { payload }: { payload: Partial<KnowledgeState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch(_: AdminAction, { put }: KnowledgeTools): KnowledgeEffect {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<KnowledgeRecord[]>(
                `/${window.settings.secure_path}/knowledge/fetch`,
            )) as ApiResponse<KnowledgeRecord[]>;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { knowledges: response.data } });
        },
        *fetchById({ id }: KnowledgeIdAction, { put }: KnowledgeTools): KnowledgeEffect {
            yield put({ type: 'setState', payload: { fetchByIdLoading: true } });
            const response = (yield get<KnowledgeRecord>(
                `/${window.settings.secure_path}/knowledge/fetch`,
                { id },
            )) as ApiResponse<KnowledgeRecord>;
            yield put({ type: 'setState', payload: { fetchByIdLoading: false } });
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { knowledge: response.data } });
        },
        *save({ callback }: KnowledgeSaveAction, { put, select }: KnowledgeTools): KnowledgeEffect {
            const knowledgeState = (yield select((state) => state.knowledge)) as KnowledgeState;
            yield put({ type: 'setState', payload: { saveLoading: true } });
            const response = (yield post(`/${window.settings.secure_path}/knowledge/save`, {
                ...knowledgeState.knowledge,
            })) as ApiResponse;
            yield put({ type: 'setState', payload: { saveLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'fetch' });
            if (typeof callback === 'function') callback();
        },
        *drop({ id }: KnowledgeIdAction, { put }: KnowledgeTools): KnowledgeEffect {
            const response = (yield post(`/${window.settings.secure_path}/knowledge/drop`, {
                id,
            })) as ApiResponse;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *show({ id }: KnowledgeIdAction, { put }: KnowledgeTools): KnowledgeEffect {
            const response = (yield post(`/${window.settings.secure_path}/knowledge/show`, {
                id,
            })) as ApiResponse;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *sort(
            { fromIndex, toIndex }: KnowledgeSortAction,
            { select, put }: KnowledgeTools,
        ): KnowledgeEffect {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const knowledgeState = (yield select((state) => state.knowledge)) as KnowledgeState;
            const knowledges = knowledgeState.knowledges;
            if (fromIndex < toIndex) {
                knowledges.splice(toIndex + 1, 0, knowledges[fromIndex]);
                knowledges.splice(fromIndex, 1);
            } else {
                knowledges.splice(toIndex, 0, knowledges[fromIndex]);
                knowledges.splice(fromIndex + 1, 1);
            }
            yield put({ type: 'setState', payload: { knowledges } });
            const response = (yield post(`/${window.settings.secure_path}/knowledge/sort`, {
                knowledge_ids: knowledges.map((knowledge) => knowledge.id),
            })) as ApiResponse;
            if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
        },
        *getCategory(_: AdminAction, { put }: KnowledgeTools): KnowledgeEffect {
            const response = (yield get<string[]>(
                `/${window.settings.secure_path}/knowledge/getCategory`,
            )) as ApiResponse<string[]>;
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { categorys: response.data } });
        },
    },
};
