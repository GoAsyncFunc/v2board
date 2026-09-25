import type { History } from 'history';
import type { Middleware, Reducer, StoreEnhancer } from 'redux';
import type { Effect } from 'redux-saga/effects';
import type { UserAction, UserDispatch, UserRootState, UserStore } from './storeContracts';

export interface DvaRuntimeError extends Error {
    preventDefault(): void;
}

export interface DvaErrorContext {
    key: string;
    effectArgs: UserAction[];
}

export interface DvaEffectModel {
    namespace: string;
}

export type DvaSagaEffects = typeof import('redux-saga/effects');
export type DvaEffectArgument = UserAction | DvaSagaEffects;
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
    dispatch: UserDispatch,
    context: DvaErrorContext,
) => void;
export type DvaStateChangeHandler = (state: UserRootState) => void;
export type DvaHotReloadHandler = <Render extends (...args: never[]) => void>(
    render: Render,
) => void;
export type DvaHandleActions = <State>(
    handlers: Record<string, Reducer<State, UserAction>>,
    initialState: State,
) => Reducer<State, UserAction>;

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
    initialState?: Partial<UserRootState>;
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
    _store?: UserStore;
    model<State, Model extends DvaModelDefinition<State>>(model: Model): void;
    use(plugin: DvaPlugin): void;
}
