import React from 'react';
import ReactDOM from 'react-dom';
import * as plugins from '../vendor/appRuntime.js';
import {
  rootContainer,
  initialProps,
  modifyInitialProps,
} from '../vendor/appRuntime.js';
import { appDvaConfig } from '../vendor/appRuntime.js';

import Router from './Router';
import { createApp } from './store.js';

window.g_plugins = plugins;
plugins.init({
  validKeys: [
    'patchRoutes', 'render', 'rootContainer', 'modifyRouteProps', 'onRouteChange',
    'modifyInitialProps', 'initialProps', 'dva', 'locale',
  ],
});
plugins.use({ rootContainer, initialProps, modifyInitialProps });
plugins.use({ dva: appDvaConfig });

window.g_app = createApp();

async function renderApp() {
  window.g_isBrowser = true;
  const initialProps = window.g_useSSR ? window.g_initialData : {};
  const root = plugins.apply('rootContainer', {
    initialValue: <Router {...initialProps} />,
  });
  ReactDOM[window.g_useSSR ? 'hydrate' : 'render'](
    root,
    document.getElementById('root'),
  );
}

const render = plugins.compose('render', { initialValue: renderApp });
Promise.resolve()
  .then(() => render())
  .catch(error => {
    if (window.console) window.console.error(error);
  });

export default null;
