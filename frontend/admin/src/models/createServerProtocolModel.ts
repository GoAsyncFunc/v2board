import { post, type ApiResponse, type FormRecord, type FormValue } from '../services/request';
import type { ServerId } from '../types/server';
import type { AdminAction } from '../types/store';

interface ServerProtocolState {
  switchLoading: Record<string, boolean>;
  saveLoading: boolean;
}

interface ServerProtocolModelOptions {
  name: string;
  protocol: string;
}

interface ServerUpdateAction {
  id: ServerId;
  key: string;
  value: FormValue;
}

interface ServerIdAction {
  id: ServerId;
}

interface ServerSaveAction {
  params: FormRecord;
  callback?: () => void;
}

interface ServerProtocolEffectTools {
  put(action: AdminAction): unknown;
}

type ServerProtocolEffect = Generator<unknown, void, ApiResponse>;

const initialState: ServerProtocolState = {
  switchLoading: {},
  saveLoading: false,
};

export function createServerProtocolModel({ name, protocol }: ServerProtocolModelOptions) {
  const endpoint = `/${window.settings.secure_path}/server/${protocol}`;

  return {
    name,
    state: { ...initialState },
    reducers: {
      setState(state: ServerProtocolState, { payload }: { payload: Partial<ServerProtocolState> }) {
        return { ...state, ...payload };
      },
    },
    effects: {
      *update(
        { id, key, value }: ServerUpdateAction,
        { put }: ServerProtocolEffectTools,
      ): ServerProtocolEffect {
        const response = yield post(`${endpoint}/update`, { id, [key]: value });
        if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
      },
      *drop({ id }: ServerIdAction, { put }: ServerProtocolEffectTools): ServerProtocolEffect {
        const response = yield post(`${endpoint}/drop`, { id });
        if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
      },
      *copy({ id }: ServerIdAction, { put }: ServerProtocolEffectTools): ServerProtocolEffect {
        const response = yield post(`${endpoint}/copy`, { id });
        if (response.code === 200) yield put({ type: 'serverManage/getNodes' });
      },
      *save(
        { params, callback }: ServerSaveAction,
        { put }: ServerProtocolEffectTools,
      ): ServerProtocolEffect {
        yield put({ type: 'setState', payload: { saveLoading: true } });
        const response = yield post(`${endpoint}/save`, params);
        yield put({ type: 'setState', payload: { saveLoading: false } });
        if (response.code !== 200) return;
        yield put({ type: 'serverManage/getNodes' });
        callback?.();
      },
    },
  };
}
