import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './reactRedux.js';
import { createHashHistory } from 'history';
import { create as createDvaCore } from 'dva-core';
import * as routerBindings from '../runtime/routerBindings.js';
import { routerMiddleware } from '../runtime/routerBindings.js';

const fetchResponse = (...args) => globalThis.fetch(...args);

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function isDomElement(value) {
  return typeof value === 'object' && value !== null && value.nodeType && value.nodeName;
}

function createProvider(store, app, router) {
  return props => React.createElement(
    Provider,
    { store },
    router({ app, history: app._history, ...props }),
  );
}

function renderApplication(container, store, app, router) {
  ReactDOM.render(React.createElement(createProvider(store, app, router)), container);
}

function patchHistory(history) {
  const originalListen = history.listen;
  history.listen = listener => {
    const listenerSource = listener.toString();
    const requiresImmediateDispatch = (
      (listener.name === 'handleLocationChange' && listenerSource.includes('onLocationChanged'))
      || (
        listenerSource.includes('.inTimeTravelling')
        && listenerSource.includes('.inTimeTravelling')
        && listenerSource.includes('arguments[2]')
      )
    );
    listener(history.location, history.action);
    return originalListen.call(history, (...args) => {
      if (requiresImmediateDispatch) listener(...args);
      else setTimeout(() => listener(...args));
    });
  };
  return history;
}

export function createDva(options = {}) {
  const history = options.history || createHashHistory();
  const createOptions = {
    initialReducer: {
      router: routerBindings.connectRouter(history),
    },
    setupMiddlewares(middlewares) {
      return [routerMiddleware(history), ...middlewares];
    },
    setupApp(app) {
      app._history = patchHistory(history);
    },
  };
  const app = createDvaCore(options, createOptions);
  const startCore = app.start;

  app.router = router => {
    invariant(typeof router === 'function', `[app.router] router should be function, but got ${typeof router}`);
    app._router = router;
  };

  app.start = container => {
    let target = container;
    if (typeof target === 'string') {
      target = document.querySelector(target);
      invariant(target, `[app.start] container ${container} not found`);
    }
    invariant(!target || isDomElement(target), '[app.start] container should be HTMLElement');
    invariant(app._router, '[app.start] router must be registered before app.start()');
    if (!app._store) startCore.call(app);
    const store = app._store;
    app._getProvider = createProvider.bind(null, store, app);
    if (!target) return createProvider(store, app, app._router);
    renderApplication(target, store, app, app._router);
    app._plugin.apply('onHmr')(renderApplication.bind(null, target, store, app));
    return undefined;
  };

  return app;
}

export { fetchResponse, routerBindings };
export {
  createDva as a,
  fetchResponse as b,
  routerBindings as c,
};
