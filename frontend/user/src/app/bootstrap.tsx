import React from 'react';
import ReactDOM from 'react-dom';
import * as plugins from '../vendor/appRuntime.js';
import {
  appDvaConfig,
  initialProps,
  modifyInitialProps,
  rootContainer,
} from '../vendor/appRuntime.js';
import Router from './Router';
import { createApp } from './store';

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

async function renderApp(): Promise<void> {
  window.g_isBrowser = true;
  const ssrInitialProps = window.g_useSSR ? window.g_initialData : {};
  const root = plugins.apply('rootContainer', {
    initialValue: <Router {...ssrInitialProps} />,
  }) as React.ReactElement;
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Application root element was not found');
  const render = window.g_useSSR ? ReactDOM.hydrate : ReactDOM.render;
  render(root, rootElement);
}

const render = plugins.compose('render', { initialValue: renderApp }) as () => Promise<void> | void;
Promise.resolve()
  .then(() => render())
  .catch((error: Error) => {
    window.console?.error(error);
  });

export default null;
