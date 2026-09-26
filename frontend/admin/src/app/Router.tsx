import React from 'react';
import type { Action, Location, UnregisterCallback } from 'history';
import routeRenderer from '@/runtime/routeRenderer';
import { routerBindings } from '@/runtime/dvaApplication';
import * as plugins from '@/runtime/pluginRuntime';
import adminRoutes from '@/routes/adminRoutes';
import history from './history';
import type { AdminStore } from '@/types/storeContracts';
import type { DynamicRouteProps } from '@/runtime/routeRenderer';

const { ConnectedRouter } = routerBindings;

interface RouterProps extends DynamicRouteProps {
    store?: AdminStore;
}

interface RouteChangePayload {
    routes: typeof adminRoutes;
    location: Location;
    action?: Action;
}

export const routes = adminRoutes;
window.g_routes = routes;

export default class Router extends React.Component<RouterProps> {
    private unlisten: UnregisterCallback;

    constructor(props: RouterProps) {
        super(props);
        plugins.applyForEach('patchRoutes', { initialValue: routes });

        const onRouteChange = (location: Location, action?: Action): void => {
            const routeChange: RouteChangePayload = { routes, location, action };
            plugins.applyForEach('onRouteChange', { initialValue: routeChange });
        };

        this.unlisten = history.listen(onRouteChange);
        const invokesInitialCallback = history.listen
            .toString()
            .includes('callback(history.location, history.action)');
        if (!invokesInitialCallback) onRouteChange(history.location, history.action);
    }

    componentWillUnmount(): void {
        this.unlisten();
    }

    render(): React.ReactNode {
        if (!this.props.store) throw new Error('Router store was not initialized');
        return (
            <ConnectedRouter history={history} store={this.props.store}>
                {routeRenderer(routes, this.props)}
            </ConnectedRouter>
        );
    }
}
