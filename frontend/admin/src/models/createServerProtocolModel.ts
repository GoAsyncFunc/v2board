import { isSuccessfulResponse, post, type ApiResponse, type FormRecord, type FormValue } from '../services/request';
import type { ServerId, ServerProtocolState } from '../types/server';
import type { ModelEffect, PutEffectTools } from '../types/effects';

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

interface ServerProtocolEffectTools extends PutEffectTools {}

type ServerProtocolEffect = ModelEffect<ApiResponse>;

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
        if (isSuccessfulResponse(response)) yield put({ type: 'serverManage/getNodes' });
      },
      *drop({ id }: ServerIdAction, { put }: ServerProtocolEffectTools): ServerProtocolEffect {
        const response = yield post(`${endpoint}/drop`, { id });
        if (isSuccessfulResponse(response)) yield put({ type: 'serverManage/getNodes' });
      },
      *copy({ id }: ServerIdAction, { put }: ServerProtocolEffectTools): ServerProtocolEffect {
        const response = yield post(`${endpoint}/copy`, { id });
        if (isSuccessfulResponse(response)) yield put({ type: 'serverManage/getNodes' });
      },
      *save(
        { params, callback }: ServerSaveAction,
        { put }: ServerProtocolEffectTools,
      ): ServerProtocolEffect {
        yield put({ type: 'setState', payload: { saveLoading: true } });
        const response = yield post(`${endpoint}/save`, params);
        yield put({ type: 'setState', payload: { saveLoading: false } });
        if (!isSuccessfulResponse(response)) return;
        yield put({ type: 'serverManage/getNodes' });
        callback?.();
      },
    },
  };
}
