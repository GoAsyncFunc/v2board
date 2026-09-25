import type { PutEffect } from 'redux-saga/effects';
import type {
    DvaEffect,
    DvaEffectArgument,
    DvaEffectIterator,
    DvaPlugin,
    DvaSagaEffects,
} from '../types/dvaRuntimeContracts';
import type { AdminAction } from '../types/storeContracts';

const SHOW_LOADING = '@@DVA_LOADING/SHOW';
const HIDE_LOADING = '@@DVA_LOADING/HIDE';

export interface LoadingPluginOptions {
    namespace?: string;
    only?: string[];
    except?: string[];
}
export interface LoadingState {
    global: boolean;
    models: Record<string, boolean>;
    effects: Record<string, boolean>;
}
interface LoadingAction extends AdminAction {
    type: string;
    payload?: { namespace?: string; actionType?: string };
}
type LoadingEffectResult = Generator<PutEffect<LoadingAction> | DvaEffectIterator, void, void>;

export default function createLoadingPlugin(options: LoadingPluginOptions = {}): DvaPlugin & {
    extraReducers: Record<string, typeof loadingReducer>;
    onEffect(
        effect: DvaEffect,
        helpers: DvaSagaEffects,
        model: { namespace: string },
        effectName: string,
    ): DvaEffect;
} {
    const namespace = options.namespace || 'loading';
    const only = options.only || [];
    const except = options.except || [];
    if (only.length && except.length) {
        throw new Error(
            'It is ambiguous to configurate `only` and `except` items at the same time.',
        );
    }
    const initialState: LoadingState = { global: false, models: {}, effects: {} };
    function loadingReducer(
        state: LoadingState = initialState,
        action: LoadingAction = { type: '' },
    ): LoadingState {
        const payload = action.payload || {};
        const modelNamespace = String(payload.namespace);
        const actionType = String(payload.actionType);
        if (action.type === SHOW_LOADING) {
            return {
                ...state,
                global: true,
                models: { ...state.models, [modelNamespace]: true },
                effects: { ...state.effects, [actionType]: true },
            };
        }
        if (action.type === HIDE_LOADING) {
            const effects = { ...state.effects, [actionType]: false };
            const models = {
                ...state.models,
                [modelNamespace]: Object.keys(effects).some(
                    (effect) => effect.split('/')[0] === payload.namespace && effects[effect],
                ),
            };
            return { ...state, global: Object.values(models).some(Boolean), models, effects };
        }
        return state;
    }
    const extraReducers = { [namespace]: loadingReducer };
    const shouldTrack = (effectName: string): boolean =>
        (!only.length && !except.length) ||
        (only.length > 0 && only.includes(effectName)) ||
        (except.length > 0 && !except.includes(effectName));
    return {
        extraReducers,
        onEffect(
            effect: DvaEffect,
            { put }: DvaSagaEffects,
            model: { namespace: string },
            effectName: string,
        ): DvaEffect {
            if (!shouldTrack(effectName)) return effect;
            return function* trackedEffect(...args: DvaEffectArgument[]): LoadingEffectResult {
                yield put({
                    type: SHOW_LOADING,
                    payload: { namespace: model.namespace, actionType: effectName },
                });
                yield effect(...args);
                yield put({
                    type: HIDE_LOADING,
                    payload: { namespace: model.namespace, actionType: effectName },
                });
            };
        },
    };
}
