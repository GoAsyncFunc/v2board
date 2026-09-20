import { get, post, type ApiResponse, type FormRecord } from '../services/request';
import type { ManagedServerRecord, ServerManageState } from '../types/server';
import type { AdminAction, AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/effects';

type ServerManageStoreState = Pick<AdminRootState, 'serverManage'>;

interface ServerManageEffectTools extends ModelEffectTools<ServerManageStoreState> {}

interface SortServerAction {
  fromIndex: number;
  toIndex: number;
}

type ServerManageEffectResult = ApiResponse<ManagedServerRecord[]> | ServerManageState;
type ServerManageEffect = ModelEffect<ServerManageEffectResult>;

const initialState: ServerManageState = {
  servers: [],
  fetchLoading: false,
  sortMode: false,
};

export default {
  name: 'serverManage',
  state: { ...initialState },
  reducers: {
    setState(state: ServerManageState, { payload }: { payload: Partial<ServerManageState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getNodes(_: AdminAction, { put }: ServerManageEffectTools): ServerManageEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = (yield get<ManagedServerRecord[]>(
        `/${window.settings.secure_path}/server/manage/getNodes`,
      )) as ApiResponse<ManagedServerRecord[]>;
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { servers: response.data, sortMode: false } });
    },
    *sort(
      { fromIndex, toIndex }: SortServerAction,
      { put, select }: ServerManageEffectTools,
    ): ServerManageEffect {
      const serverState = (yield select(state => state.serverManage)) as ServerManageState;
      const servers = serverState.servers;
      if (fromIndex < toIndex) {
        servers.splice(toIndex + 1, 0, servers[fromIndex]);
        servers.splice(fromIndex, 1);
      } else {
        servers.splice(toIndex, 0, servers[fromIndex]);
        servers.splice(fromIndex + 1, 1);
      }
      yield put({ type: 'setState', payload: { servers } });
    },
    *saveSort(_: AdminAction, { select, put }: ServerManageEffectTools): ServerManageEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const serverState = (yield select(state => state.serverManage)) as ServerManageState;
      const sort: FormRecord = {};
      serverState.servers.forEach((server, index) => {
        const protocolSort = (sort[server.type] || {}) as FormRecord;
        protocolSort[String(server.id)] = index;
        sort[server.type] = protocolSort;
      });
      const response = (yield post<ManagedServerRecord[]>(
        `/${window.settings.secure_path}/server/manage/sort`,
        sort,
      )) as ApiResponse<ManagedServerRecord[]>;
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'getNodes' });
    },
  },
};
