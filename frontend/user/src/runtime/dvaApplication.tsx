import React from 'react';
import ReactDOM from 'react-dom';
import { create as createDvaCore } from 'dva-core';
import { createHashHistory } from 'history';
import type { History } from 'history';
import { Provider } from 'react-redux';
import * as routerBindings from './routerBindings';
import { routerMiddleware } from './routerBindings';
import type { UserRootState, UserStore, UserValue } from '../types/store';

export type DvaRouterProps = Record<string, UserValue>;
export type DvaRouter = (props: DvaRouterProps) => React.ReactElement;
export type DvaProvider = React.ComponentType<DvaRouterProps>;
type DvaStartResult = DvaProvider | void;

export interface DvaCoreApplication {
    _history: History;
    _getProvider?: (router: DvaRouter) => DvaProvider;
    _plugin: { apply(name: string): (render: (router: DvaRouter) => void) => void };
    _router?: DvaRouter;
    _store?: UserStore;
    model(model: object): void;
    router?: (router: DvaRouter) => void;
    start: (container?: string | Element) => DvaStartResult;
    use(plugin: object): void;
}

export interface DvaApplication extends DvaCoreApplication {
    router(router: DvaRouter): void;
}

interface DvaOptions {
    history?: History;
    initialState?: Partial<UserRootState>;
    [key: string]: UserValue;
}

function assert(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(message);
}

function isDomElement(value: unknown): value is Element {
    return (
        typeof value === 'object' && value !== null && 'nodeType' in value && 'nodeName' in value
    );
}

function createApplicationProvider(
    store: UserStore,
    app: DvaCoreApplication,
    router: DvaRouter,
): DvaProvider {
    const ApplicationProvider = (props: DvaRouterProps = {}): React.ReactElement => (
        <Provider store={store as React.ComponentProps<typeof Provider>['store']}>
            {router({ app, history: app._history, ...props })}
        </Provider>
    );
    return ApplicationProvider;
}

function renderApplication(
    container: Element,
    store: UserStore,
    app: DvaCoreApplication,
    router: DvaRouter,
): void {
    const ApplicationProvider = createApplicationProvider(store, app, router);
    ReactDOM.render(<ApplicationProvider />, container);
}

function patchHistory(history: History): History {
    const originalListen = history.listen;
    history.listen = (listener) => {
        const listenerSource = listener.toString();
        const requiresImmediateDispatch =
            (listener.name === 'handleLocationChange' &&
                listenerSource.includes('onLocationChanged')) ||
            (listenerSource.includes('.inTimeTravelling') &&
                listenerSource.includes('arguments[2]'));
        listener(history.location, history.action);
        return originalListen.call(history, (...args) => {
            if (requiresImmediateDispatch) listener(...args);
            else setTimeout(() => listener(...args));
        });
    };
    return history;
}

export function createDva(options: DvaOptions = {}): DvaApplication {
    const history = options.history || createHashHistory();
    const createOptions = {
        initialReducer: { router: routerBindings.connectRouter() },
        setupMiddlewares(middlewares: object[]) {
            return [routerMiddleware(history), ...middlewares];
        },
        setupApp(app: DvaCoreApplication) {
            app._history = patchHistory(history);
        },
    };
    const app = createDvaCore<DvaCoreApplication>(options, createOptions);
    const startCore = app.start;

    app.router = (router) => {
        assert(
            typeof router === 'function',
            `[app.router] router should be function, but got ${typeof router}`,
        );
        app._router = router;
    };

    app.start = (container) => {
        let target = container;
        if (typeof target === 'string') {
            target = document.querySelector(target) || undefined;
            assert(target, `[app.start] container ${container} not found`);
        }
        assert(!target || isDomElement(target), '[app.start] container should be HTMLElement');
        assert(app._router, '[app.start] router must be registered before app.start()');
        if (!app._store) startCore.call(app);
        const store = app._store as UserStore;
        app._getProvider = createApplicationProvider.bind(null, store, app);
        if (!target) return createApplicationProvider(store, app, app._router);
        renderApplication(target, store, app, app._router);
        app._plugin.apply('onHmr')(renderApplication.bind(null, target, store, app));
        return undefined;
    };

    return app as DvaApplication;
}

export { routerBindings };
