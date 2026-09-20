import React from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import type { UserRoute } from '../routes';
import type { PluginValue } from './pluginRuntime';
import { apply } from './pluginRuntime';

export type RouteRendererProps = Record<string, PluginValue>;

interface RenderedRouteProps extends RouteComponentProps, RouteRendererProps {
    route: UserRoute;
}

export default function routeRenderer(
    routes: UserRoute[] | null | undefined,
    routeProps: RouteRendererProps = {},
): React.ReactElement | null {
    if (!routes) return null;

    return (
        <Switch>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    render={(routeMatch) => {
                        const modifiedProps = apply('modifyRouteProps', {
                            initialValue: { ...routeMatch, ...routeProps },
                            args: { route },
                        });
                        const Component =
                            route.component as React.ComponentType<RenderedRouteProps>;
                        return <Component {...modifiedProps} route={route} />;
                    }}
                />
            ))}
        </Switch>
    );
}
