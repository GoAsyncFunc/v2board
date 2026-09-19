import React from "react";
import { Router } from "react-router-dom";
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
} from "react-router-redux";

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

export class ConnectedRouter extends React.Component {
    constructor(props) {
        super(props);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount() {
        this.stopListening = this.props.history.listen(this.handleLocationChange);
    }

    componentWillUnmount() {
        if (this.stopListening) this.stopListening();
    }

    handleLocationChange(location, action) {
        this.props.store.dispatch({
            type: LOCATION_CHANGE,
            payload: { location, action },
        });
    }

    render() {
        return React.createElement(
            Router,
            { history: this.props.history },
            this.props.children,
        );
    }
}

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
