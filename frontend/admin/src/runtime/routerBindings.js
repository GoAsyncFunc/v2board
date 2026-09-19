import {
    CALL_HISTORY_METHOD,
    ConnectedRouter,
    LOCATION_CHANGE,
    go,
    goBack,
    goForward,
    push,
    replace,
    routerActions,
    routerMiddleware,
} from "react-router-redux";

export { ConnectedRouter, routerMiddleware };
export {
    CALL_HISTORY_METHOD,
    LOCATION_CHANGE,
    go,
    goBack,
    goForward,
    push,
    replace,
    routerActions,
};

export function connectRouter() {
    return (state = { location: null, action: null }, action = {}) => {
        if (action.type !== LOCATION_CHANGE) return state;
        const { location, action: navigationAction, isFirstRendering } = action.payload || {};
        if (isFirstRendering) return state;
        return {
            location,
            action: navigationAction,
        };
    };
}

export const getLocation = state => state.router && state.router.location;
export const getAction = state => state.router && state.router.action;
export const getSearch = state => getLocation(state)?.search;
export const getHash = state => getLocation(state)?.hash;
