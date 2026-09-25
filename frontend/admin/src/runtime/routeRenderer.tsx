import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import type { RouteProps, SwitchProps } from 'react-router-dom';
import { apply } from './pluginRuntime';
import type { AdminRouteConfig } from '../routes/routeConfig';
import type {
    DynamicRouteProps,
    RouteComponentStatics,
    RouteMatchProps,
    RouteRenderFunction,
    RouteRenderProps,
} from './routeRuntimeTypes';
import { hasInitialPropsLoaded, withInitialProps } from './routeInitialProps';

export type {
    DynamicRouteProps,
    InitialRoutePropsContext,
    RouteRenderProps,
} from './routeRuntimeTypes';

type RenderRouteProps = Omit<RouteProps, 'render'> &
    DynamicRouteProps & {
        render: RouteRenderFunction;
    };

const routeComponentCache = new WeakMap<AdminRouteConfig, React.ElementType>();

function renderRoute({
    path,
    exact,
    strict,
    sensitive,
    location,
    render,
    ...routeProps
}: RenderRouteProps): React.ReactElement {
    return (
        <Route
            path={path}
            exact={exact}
            strict={strict}
            sensitive={sensitive}
            location={location}
            render={(routeMatch) => render({ ...routeMatch, ...routeProps })}
        />
    );
}

function createNestedRouteComponent(route: AdminRouteConfig): React.ElementType {
    const cachedComponent = routeComponentCache.get(route);
    if (cachedComponent) return cachedComponent;

    let renderChild: RouteRenderFunction = ({ render: childRender, ...props }) => {
        if (!childRender) throw new Error('Nested route render function was not provided');
        return childRender(props);
    };
    const wrappers = route.Routes || [];
    for (let index = wrappers.length - 1; index >= 0; index -= 1) {
        const ChildComponent = wrappers[index];
        const previousRender = renderChild;
        renderChild = (props) => (
            <ChildComponent {...props}>{previousRender(props)}</ChildComponent>
        );
    }

    const NestedRoute = (props: RenderRouteProps): React.ReactElement =>
        renderRoute({ ...props, render: renderChild });
    routeComponentCache.set(route, NestedRoute);
    return NestedRoute;
}

export default function routeRenderer(
    routes: AdminRouteConfig[] | null | undefined,
    incomingRouteProps: DynamicRouteProps = {},
    switchProps: SwitchProps = {},
): React.ReactNode {
    if (!routes) return null;
    let routeProps = incomingRouteProps;

    return (
        <Switch {...switchProps}>
            {routes.map((route, index) => {
                const key = route.key || index;
                if (route.redirect) {
                    return (
                        <Redirect
                            key={key}
                            from={route.path}
                            to={route.redirect}
                            exact={route.exact}
                            strict={route.strict}
                        />
                    );
                }

                const RouteComponent = route.Routes
                    ? createNestedRouteComponent(route)
                    : renderRoute;
                return (
                    <RouteComponent
                        key={key}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        sensitive={route.sensitive}
                        render={(routeMatch: RouteMatchProps) => {
                            const nestedChildren = routeRenderer(route.routes, routeProps, {
                                location: routeMatch.location,
                            });
                            if (!route.component) return nestedChildren;

                            if (hasInitialPropsLoaded()) routeProps = {};
                            const modifiedProps = apply<
                                RouteRenderProps,
                                { route: AdminRouteConfig }
                            >('modifyRouteProps', {
                                initialValue: { ...routeMatch, ...routeProps },
                                args: { route },
                            });
                            let Component = route.component;
                            const componentStatics = Component as RouteComponentStatics;
                            if (componentStatics.getInitialProps) {
                                const modifiedInitialProps = apply<DynamicRouteProps>(
                                    'modifyInitialProps',
                                    { initialValue: {} },
                                );
                                Component = withInitialProps(
                                    Component,
                                    modifiedInitialProps,
                                    routeProps,
                                );
                                route.component = Component;
                            }
                            return (
                                <Component key={route.path} {...modifiedProps} route={route}>
                                    {nestedChildren}
                                </Component>
                            );
                        }}
                    />
                );
            })}
        </Switch>
    );
}
