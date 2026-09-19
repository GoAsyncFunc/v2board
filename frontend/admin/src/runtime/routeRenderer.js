import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { apply } from './pluginRuntime.js';

const routeComponentCache = new WeakMap();
let initialPropsLoaded = false;

function renderRoute({ path, exact, strict, sensitive, location, render, ...routeProps }) {
  return (
    <Route
      path={path}
      exact={exact}
      strict={strict}
      sensitive={sensitive}
      location={location}
      render={routeMatch => render({ ...routeMatch, ...routeProps })}
    />
  );
}

function createNestedRouteComponent(route) {
  if (routeComponentCache.has(route)) return routeComponentCache.get(route);

  let renderChild = ({ render: childRender, ...props }) => childRender(props);
  for (let index = route.Routes.length - 1; index >= 0; index -= 1) {
    const ChildComponent = route.Routes[index];
    const previousRender = renderChild;
    renderChild = props => (
      <ChildComponent {...props}>
        {previousRender(props)}
      </ChildComponent>
    );
  }

  const NestedRoute = props => renderRoute({ ...props, render: renderChild });
  routeComponentCache.set(route, NestedRoute);
  return NestedRoute;
}

function withInitialProps(Component, extraProps, routeProps) {
  if (Component.wrappedWithInitialProps) return Component;

  class InitialPropsRoute extends React.Component {
    constructor(props) {
      super(props);
      this.state = { extraProps: { ...extraProps } };
      this.wrappedWithInitialProps = true;
      initialPropsLoaded = initialPropsLoaded || !window.g_useSSR || props.history?.action !== 'POP';
    }

    componentDidMount() {
      if (initialPropsLoaded) this.loadInitialProps();
    }

    componentDidUpdate(previousProps) {
      if (previousProps.location.pathname !== this.props.location.pathname) {
        initialPropsLoaded = true;
        this.loadInitialProps();
      }
    }

    componentWillUnmount() {
      initialPropsLoaded = true;
    }

    async loadInitialProps() {
      this.setState({ extraProps: { ...this.state.extraProps, fetchingProps: true } });
      const nextProps = await Component.getInitialProps({
        isServer: false,
        route: this.props.match,
        location: this.props.location,
        prevInitialProps: this.state.extraProps,
        ...routeProps,
      });
      this.setState({ extraProps: { ...(nextProps || {}), fetchingProps: false } });
    }

    render() {
      return <Component {...this.props} {...this.state.extraProps} />;
    }
  }

  InitialPropsRoute.wrappedWithInitialProps = true;
  return InitialPropsRoute;
}

export default function routeRenderer(routes, routeProps = {}, switchProps = {}) {
  if (!routes) return null;

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

        const RouteComponent = route.Routes ? createNestedRouteComponent(route) : renderRoute;
        return (
          <RouteComponent
            key={key}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={routeMatch => {
              const location = routeMatch.location;
              const nestedChildren = routeRenderer(route.routes, routeProps, { location });
              if (!route.component) return nestedChildren;

              if (initialPropsLoaded) routeProps = {};
              const modifiedProps = apply('modifyRouteProps', {
                initialValue: { ...routeMatch, ...routeProps },
                args: { route },
              });
              let Component = route.component;
              if (Component.getInitialProps) {
                const modifiedInitialProps = apply('modifyInitialProps', { initialValue: {} });
                Component = withInitialProps(Component, modifiedInitialProps, routeProps);
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
