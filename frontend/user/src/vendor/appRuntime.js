import { createHashHistory } from "history";

export * from '../runtime/pluginRuntime.js';
export { default as appDvaConfig } from "./appDvaConfig.js";
export { default as loadingPlugin } from '../runtime/loadingPlugin';
export { default as routeRenderer } from '../runtime/routeRenderer.js';
export { router } from './routerRuntime.js';
export { initialProps, modifyInitialProps, rootContainer } from './rootRuntime.js';

export function parseLocationQuery(search = "") {
    const query = {};
    const searchParams = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    searchParams.forEach((value, key) => {
        if (!(key in query)) {
            query[key] = value;
            return;
        }
        query[key] = Array.isArray(query[key]) ? [...query[key], value] : [query[key], value];
    });
    return query;
}

function attachLocationQuery(location) {
    location.query = parseLocationQuery(location.search);
    return location;
}

export function createHistory(options) {
    const history = createHashHistory(options);
    const listen = history.listen.bind(history);
    attachLocationQuery(history.location);
    history.listen = listener => listen((location, action) => {
        listener(attachLocationQuery(location), action);
    });
    return history;
}
