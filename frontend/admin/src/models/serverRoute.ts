import { get, isSuccessfulResponse, post, type ApiResponse, type FormRecord } from '../services/request';
import type { ServerId, ServerRouteOption, ServerRouteState } from '../types/server';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface ServerRouteEffectTools extends PutEffectTools {}

interface ServerRouteAction {
  id: ServerId;
}

interface SaveServerRouteAction {
  params: FormRecord;
  callback?: () => void;
}

type ServerRouteEffect = ModelEffect<ApiResponse<ServerRouteOption[]>>;

const initialState: ServerRouteState = {
  routes: [],
  saveLoading: false,
  fetchLoading: false,
};

export default {
  name: 'serverRoute',
  state: { ...initialState },
  reducers: {
    setState(state: ServerRouteState, { payload }: { payload: Partial<ServerRouteState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch(_: AdminAction, { put }: ServerRouteEffectTools): ServerRouteEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get<ServerRouteOption[]>(`/${window.settings.secure_path}/server/route/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'setState', payload: { routes: response.data } });
    },
    *drop({ id }: ServerRouteAction, { put }: ServerRouteEffectTools): ServerRouteEffect {
      const response = yield post<ServerRouteOption[]>(`/${window.settings.secure_path}/server/route/drop`, { id });
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *save(
      { params, callback }: SaveServerRouteAction,
      { put }: ServerRouteEffectTools,
    ): ServerRouteEffect {
      const response = yield post<ServerRouteOption[]>(`/${window.settings.secure_path}/server/route/save`, params);
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'fetch' });
      callback?.();
    },
  },
};
