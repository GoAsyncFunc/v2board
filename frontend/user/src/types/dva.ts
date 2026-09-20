import type { History } from 'history';
import type { Middleware, Reducer, StoreEnhancer } from 'redux';
import type { UserRootState, UserStore } from './store';

export interface DvaRuntimeError extends Error {
    preventDefault(): void;
}

export type DvaHook = (...args: never[]) => unknown;
export type DvaReducer = (...args: never[]) => unknown;

export interface DvaPlugin {
    onError?: DvaHook;
    onStateChange?: DvaHook;
    onAction?: Middleware | Middleware[];
    onHmr?: DvaHook;
    onReducer?: (reducer: Reducer) => Reducer;
    onEffect?: DvaHook;
    extraReducers?: Record<string, DvaReducer>;
    extraEnhancers?: StoreEnhancer[];
    _handleActions?: DvaHook;
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
    apply(name: 'onHmr'): (render: DvaHook) => void;
}

export interface DvaCoreApplication {
    _history: History;
    _plugin: DvaPluginManager;
    _store?: UserStore;
    model<State, Model extends DvaModelDefinition<State>>(model: Model): void;
    use(plugin: DvaPlugin): void;
}
