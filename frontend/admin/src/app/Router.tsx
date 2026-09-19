import React from 'react';
import type { Action, Location, UnregisterCallback } from 'history';
import { routeRenderer } from '../vendor/appRuntime.js';
import { routerBindings } from '../vendor/dva.js';
import * as plugins from '../vendor/appRuntime.js';
import history from './history.js';
import appRoutes from './routes.js';

const { ConnectedRouter } = routerBindings;

interface RouterProps {
  store?: unknown;
  [key: string]: unknown;
}

interface RouteChangePayload {
  routes: typeof appRoutes;
  location: Location;
  action?: Action;
}

export const routes = appRoutes;
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
    return (
      <ConnectedRouter history={history} store={this.props.store}>
        {routeRenderer(routes, this.props)}
      </ConnectedRouter>
    );
  }
}
