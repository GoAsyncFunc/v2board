import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import type { RouteComponentProps, RouteProps, SwitchProps } from 'react-router-dom';
import { apply } from './pluginRuntime';
import type { AdminRouteComponent, AdminRouteConfig } from '../routes/types';
import type { AdminRootState, AdminStore } from '../types/store';

export type DynamicRouteProps = Partial<AdminRootState> & {
    store?: AdminStore;
    fetchingProps?: boolean;
    render?: RouteRenderFunction;
};
type RouteMatchProps = RouteComponentProps<Record<string, string | undefined>>;

export interface InitialRoutePropsContext extends DynamicRouteProps {
    isServer: false;
    route: RouteMatchProps['match'];
    location: RouteMatchProps['location'];
    prevInitialProps: DynamicRouteProps;
}

interface RouteComponentStatics {
    getInitialProps?: (
        context: InitialRoutePropsContext,
    ) => Promise<DynamicRouteProps | null | undefined>;
    wrappedWithInitialProps?: boolean;
}

export type RouteRenderProps = RouteMatchProps & DynamicRouteProps;
type RouteRenderFunction = (props: RouteRenderProps) => React.ReactNode;
type RenderRouteProps = Omit<RouteProps, 'render'> &
    DynamicRouteProps & {
        render: RouteRenderFunction;
    };

const routeComponentCache = new WeakMap<AdminRouteConfig, React.ElementType>();
let initialPropsLoaded = false;

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

interface InitialPropsRouteState {
    extraProps: DynamicRouteProps & { fetchingProps?: boolean };
}

function withInitialProps(
    Component: AdminRouteComponent,
    extraProps: DynamicRouteProps,
    routeProps: DynamicRouteProps,
): AdminRouteComponent {
    const componentStatics = Component as RouteComponentStatics;
    if (componentStatics.wrappedWithInitialProps) return Component;

    class InitialPropsRoute extends React.Component<RouteMatchProps, InitialPropsRouteState> {
        static wrappedWithInitialProps = true;
        wrappedWithInitialProps = true;
        state: InitialPropsRouteState = { extraProps: { ...extraProps } };

        constructor(props: RouteMatchProps) {
            super(props);
            initialPropsLoaded =
                initialPropsLoaded || !window.g_useSSR || props.history?.action !== 'POP';
        }

        componentDidMount(): void {
            if (initialPropsLoaded) void this.loadInitialProps();
        }

        componentDidUpdate(previousProps: RouteMatchProps): void {
            if (previousProps.location.pathname !== this.props.location.pathname) {
                initialPropsLoaded = true;
                void this.loadInitialProps();
            }
        }

        componentWillUnmount(): void {
            initialPropsLoaded = true;
        }

        async loadInitialProps(): Promise<void> {
            this.setState({ extraProps: { ...this.state.extraProps, fetchingProps: true } });
            const nextProps = await componentStatics.getInitialProps?.({
                isServer: false,
                route: this.props.match,
                location: this.props.location,
                prevInitialProps: this.state.extraProps,
                ...routeProps,
            });
            this.setState({ extraProps: { ...(nextProps || {}), fetchingProps: false } });
        }

        render(): React.ReactNode {
            const RenderComponent = Component as React.ElementType;
            return <RenderComponent {...this.props} {...this.state.extraProps} />;
        }
    }

    return InitialPropsRoute as AdminRouteComponent;
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

                            if (initialPropsLoaded) routeProps = {};
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
