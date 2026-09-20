import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import type { TutorialListResponse, TutorialRecord, TutorialState, TutorialWireRecord } from '../types/contentModels';
import type { QueryEffects, QueryGenerator, StateUpdate } from '../types/queryModels';

const initialState: TutorialState = { tutorials: [], safeAreaVar: {}, steps: [], tutorial: {}, fetchByIdLoading: false };

export default {
  name: 'tutorial',
  state: initialState,
  reducers: {
    setState(state: TutorialState, { payload }: StateUpdate<TutorialState>): TutorialState { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_action: { type?: string }, { put }: QueryEffects<TutorialState>): QueryGenerator<TutorialState, TutorialListResponse> {
      const response = yield get<TutorialListResponse>('/user/tutorial/fetch');
      if (isSuccessfulResponse(response)) {
        yield put({ type: 'setState', payload: {
          tutorials: response.data.tutorials,
          safeAreaVar: response.data.safe_area_var,
        } });
      }
    },
    *fetchById({ id }: { id: number | string }, { put }: QueryEffects<TutorialState>): QueryGenerator<TutorialState, TutorialWireRecord> {
      yield put({ type: 'setState', payload: { fetchByIdLoading: true } });
      const response = yield get<TutorialWireRecord>('/user/tutorial/fetch', { id });
      yield put({ type: 'setState', payload: { fetchByIdLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      const tutorial: TutorialRecord = response.data;
      tutorial.steps = response.data.steps ? JSON.parse(response.data.steps) : [];
      yield put({ type: 'setState', payload: { tutorial } });
    },
  },
};
