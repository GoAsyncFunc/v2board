import React from 'react';
import ReactDOM from 'react-dom';
import * as plugins from '../runtime/pluginRuntime';
import appDvaConfig from './dvaConfig';
import { initialProps, modifyInitialProps, rootContainer } from './rootRuntime';
import { configureRequestPresentation } from './requestPresentation';
import Router from './Router';
import { createApp } from './store';

configureRequestPresentation();

window.g_plugins = plugins;
plugins.init({
    validKeys: [
        'patchRoutes',
        'render',
        'rootContainer',
        'modifyRouteProps',
        'onRouteChange',
        'modifyInitialProps',
        'initialProps',
        'dva',
    ],
});
plugins.use({ rootContainer, initialProps, modifyInitialProps });
plugins.use({ dva: appDvaConfig });

window.g_app = createApp();

async function renderApp(): Promise<void> {
    window.g_isBrowser = true;
    const ssrInitialProps = window.g_useSSR ? window.g_initialData : {};
    const root = plugins.apply<React.ReactElement>('rootContainer', {
        initialValue: <Router {...ssrInitialProps} />,
    });
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error('Application root element was not found');
    const render = window.g_useSSR ? ReactDOM.hydrate : ReactDOM.render;
    render(root, rootElement);
}

const render = plugins.compose<() => Promise<void> | void>('render', { initialValue: renderApp });
Promise.resolve()
    .then(() => render())
    .catch((error: Error) => {
        window.console?.error(error);
    });

export default null;
