import { get, post, type ApiResponse, type FormRecord } from '../services/request';
import type { ServerGroupOption, ServerId } from '../types/server';
import type { AdminAction } from '../types/store';

interface ServerGroupModelState {
  groups: ServerGroupOption[];
  switchLoading: Record<string, boolean>;
  saveLoading: boolean;
  fetchLoading: boolean;
}

interface ServerGroupEffectTools {
  put(action: AdminAction): unknown;
}

interface ServerGroupAction {
  id: ServerId;
}

interface SaveServerGroupAction {
  params: FormRecord;
  callback?: () => void;
}

type ServerGroupEffect = Generator<unknown, void, ApiResponse<ServerGroupOption[]>>;

const initialState: ServerGroupModelState = {
  groups: [],
  switchLoading: {},
  saveLoading: false,
  fetchLoading: false,
};

export default {
  name: 'serverGroup',
  state: { ...initialState },
  reducers: {
    setState(state: ServerGroupModelState, { payload }: { payload: Partial<ServerGroupModelState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch(_: AdminAction, { put }: ServerGroupEffectTools): ServerGroupEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get<ServerGroupOption[]>(`/${window.settings.secure_path}/server/group/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { groups: response.data } });
    },
    *drop({ id }: ServerGroupAction, { put }: ServerGroupEffectTools): ServerGroupEffect {
      const response = yield post<ServerGroupOption[]>(`/${window.settings.secure_path}/server/group/drop`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *save(
      { params, callback }: SaveServerGroupAction,
      { put }: ServerGroupEffectTools,
    ): ServerGroupEffect {
      const response = yield post<ServerGroupOption[]>(`/${window.settings.secure_path}/server/group/save`, params);
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
      callback?.();
    },
  },
};
