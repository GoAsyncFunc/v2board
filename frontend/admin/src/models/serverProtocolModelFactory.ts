import { post } from '../services/request';
import {
    isSuccessfulResponse,
    type ApiResponse,
    type FormRecord,
    type FormValue,
} from '../types/apiContracts';
import type { ServerId, ServerProtocolState } from '../types/serverContracts';
import type { ModelEffect, PutEffectTools } from '../types/modelEffectContracts';

interface ServerProtocolModelOptions {
    namespace: string;
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

function createServerProtocolModel({ namespace, protocol }: ServerProtocolModelOptions) {
    const endpoint = `/${window.settings.secure_path}/server/${protocol}`;

    return {
        namespace,
        state: { ...initialState },
        reducers: {
            setState(
                state: ServerProtocolState,
                { payload }: { payload: Partial<ServerProtocolState> },
            ) {
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
            *drop(
                { id }: ServerIdAction,
                { put }: ServerProtocolEffectTools,
            ): ServerProtocolEffect {
                const response = yield post(`${endpoint}/drop`, { id });
                if (isSuccessfulResponse(response)) yield put({ type: 'serverManage/getNodes' });
            },
            *copy(
                { id }: ServerIdAction,
                { put }: ServerProtocolEffectTools,
            ): ServerProtocolEffect {
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

export const serverAnyTLS = createServerProtocolModel({
    namespace: 'serverAnyTLS',
    protocol: 'anytls',
});
export const serverHysteria = createServerProtocolModel({
    namespace: 'serverHysteria',
    protocol: 'hysteria',
});
export const serverShadowsocks = createServerProtocolModel({
    namespace: 'serverShadowsocks',
    protocol: 'shadowsocks',
});
export const serverTrojan = createServerProtocolModel({
    namespace: 'serverTrojan',
    protocol: 'trojan',
});
export const serverTuic = createServerProtocolModel({ namespace: 'serverTuic', protocol: 'tuic' });
export const serverV2node = createServerProtocolModel({
    namespace: 'serverV2node',
    protocol: 'v2node',
});
export const serverVless = createServerProtocolModel({
    namespace: 'serverVless',
    protocol: 'vless',
});
export const serverVmess = createServerProtocolModel({
    namespace: 'serverVmess',
    protocol: 'vmess',
});

export const serverProtocolModels = {
    serverAnyTls: serverAnyTLS,
    serverHysteria,
    serverShadowsocks,
    serverTrojan,
    serverTuic,
    serverV2Node: serverV2node,
    serverVless,
    serverVmess,
};
