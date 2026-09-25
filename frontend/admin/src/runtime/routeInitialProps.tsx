import React from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { AdminRouteComponent } from '../routes/routeConfig';
import type { DynamicRouteProps, RouteComponentStatics } from './routeRuntimeTypes';

type RouteMatchProps = RouteComponentProps<Record<string, string | undefined>>;

interface InitialPropsRouteState {
    extraProps: DynamicRouteProps & { fetchingProps?: boolean };
}

let initialPropsLoaded = false;

export function hasInitialPropsLoaded(): boolean {
    return initialPropsLoaded;
}

export function withInitialProps(
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
