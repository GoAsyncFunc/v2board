import type { History } from 'history';
import type { Middleware, Reducer, StoreEnhancer } from 'redux';
import type { Effect } from 'redux-saga/effects';
import type { AdminAction, AdminDispatch, AdminRootState, AdminStore } from './storeContracts';

export interface DvaRuntimeError extends Error {
    preventDefault(): void;
}

export interface DvaErrorContext {
    key: string;
    effectArgs: AdminAction[];
}

export interface DvaEffectModel {
    namespace: string;
}

export type DvaSagaEffects = typeof import('redux-saga/effects');
export type DvaEffectArgument = AdminAction | DvaSagaEffects;
export type DvaEffectYield = Effect | DvaEffectIterator;
export interface DvaEffectIterator extends Iterator<DvaEffectYield, void, void> {}
export type DvaEffect = (...args: DvaEffectArgument[]) => DvaEffectIterator;
export type DvaEffectEnhancer = (
    effect: DvaEffect,
    effects: DvaSagaEffects,
    model: DvaEffectModel,
    effectName: string,
) => DvaEffect;
export type DvaErrorHandler = (
    error: DvaRuntimeError,
    dispatch: AdminDispatch,
    context: DvaErrorContext,
) => void;
export type DvaStateChangeHandler = (state: AdminRootState) => void;
export type DvaHotReloadHandler = <Render extends (...args: never[]) => void>(
    render: Render,
) => void;
export type DvaHandleActions = <State>(
    handlers: Record<string, Reducer<State, AdminAction>>,
    initialState: State,
) => Reducer<State, AdminAction>;

export interface DvaPlugin {
    onError?: DvaErrorHandler;
    onStateChange?: DvaStateChangeHandler;
    onAction?: Middleware | Middleware[];
    onHmr?: DvaHotReloadHandler;
    onReducer?: (reducer: Reducer) => Reducer;
    onEffect?: DvaEffectEnhancer;
    extraReducers?: Record<string, Reducer>;
    extraEnhancers?: StoreEnhancer[];
    _handleActions?: DvaHandleActions;
}

export interface DvaOptions extends DvaPlugin {
    history?: History;
    initialState?: Partial<AdminRootState>;
}

export interface DvaModelDefinition<State> {
    namespace: string;
    state: State;
}

export interface DvaCreateOptions<Application> {
    initialReducer: Record<string, Reducer>;
    setupMiddlewares(middlewares: Middleware[]): Middleware[];
    setupApp(app: Application): void;
}

export interface DvaPluginManager {
    apply(name: 'onHmr'): <Render extends (...args: never[]) => void>(render: Render) => void;
}

export interface DvaCoreApplication {
    _history: History;
    _plugin: DvaPluginManager;
    _store?: AdminStore;
    model<State, Model extends DvaModelDefinition<State>>(model: Model): void;
    use(plugin: DvaPlugin): void;
}
