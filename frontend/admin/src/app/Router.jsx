import React from 'react';
import { routeRenderer } from '../vendor/appRuntime.js';
import { c as routerBindings } from '../vendor/dva.js';
import * as plugins from '../vendor/appRuntime.js';
import history from './history.js';
import appRoutes from './routes.js';

const { ConnectedRouter } = routerBindings;

export const routes = appRoutes;
window.g_routes = routes;
plugins.applyForEach('patchRoutes', { initialValue: routes });

export default class Router extends React.Component {
  constructor(props) {
    super(props);
    const onRouteChange = (location, action) => {
      plugins.applyForEach('onRouteChange', {
        initialValue: { routes, location, action },
      });
    };
    this.unListen = history.listen(onRouteChange);
    const invokesInitialCallback = history.listen
      .toString()
      .includes('callback(history.location, history.action)');
    if (!invokesInitialCallback) onRouteChange(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        {routeRenderer(routes, this.props || {})}
      </ConnectedRouter>
    );
  }
}
