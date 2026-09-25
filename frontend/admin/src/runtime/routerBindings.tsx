import React from 'react';
import type { Action, History, Location, UnregisterCallback } from 'history';
import { Router } from 'react-router-dom';
import {
    CALL_HISTORY_METHOD,
    LOCATION_CHANGE,
    go,
    goBack,
    goForward,
    push,
    replace,
    routerActions,
    routerMiddleware,
} from 'react-router-redux';
import type { RouterState } from '../types/routerContracts';
import type { AdminRootState, AdminStore } from '../types/storeContracts';

export type { RouterState } from '../types/routerContracts';

export { routerMiddleware };
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

interface ConnectedRouterProps {
    history: History;
    store: AdminStore;
    children?: React.ReactNode;
}
interface LocationChangeAction {
    type?: string;
    payload?: { location?: Location; action?: Action; isFirstRendering?: boolean };
}

export class ConnectedRouter extends React.Component<ConnectedRouterProps> {
    private stopListening?: UnregisterCallback;

    componentDidMount(): void {
        this.stopListening = this.props.history.listen(this.handleLocationChange);
    }
    componentWillUnmount(): void {
        this.stopListening?.();
    }
    handleLocationChange = (location: Location, action: Action): void => {
        this.props.store.dispatch({ type: LOCATION_CHANGE, payload: { location, action } });
    };
    render(): React.ReactNode {
        return <Router history={this.props.history}>{this.props.children}</Router>;
    }
}

export function connectRouter() {
    return (
        state: RouterState = { location: null, action: null },
        action: LocationChangeAction = {},
    ): RouterState => {
        if (action.type !== LOCATION_CHANGE) return state;
        const { location, action: navigationAction, isFirstRendering } = action.payload || {};
        if (isFirstRendering) return state;
        return { location, action: navigationAction };
    };
}

export const getLocation = (state: AdminRootState): Location | null | undefined =>
    state.router?.location;
export const getAction = (state: AdminRootState): Action | null | undefined => state.router?.action;
export const getSearch = (state: AdminRootState): string | undefined => getLocation(state)?.search;
export const getHash = (state: AdminRootState): string | undefined => getLocation(state)?.hash;
