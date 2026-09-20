import React from 'react';
import { DvaContainer, getAdminStore } from './store';
import type { DynamicRouteProps } from '../runtime/routeRenderer';
import type { AdminRootState } from '../types/store';

type InitialProps = DynamicRouteProps;

export function rootContainer(children: React.ReactElement): React.ReactElement {
  return <DvaContainer>{children}</DvaContainer>;
}

export function initialProps(props?: InitialProps): InitialProps {
  if (props) return props;
  const state: AdminRootState = getAdminStore().getState();
  return Object.keys(state).reduce<InitialProps>((result, key) => {
    if (!['@@dva', 'loading', 'routing'].includes(key)) result[key] = state[key];
    return result;
  }, {});
}

export function modifyInitialProps(props?: InitialProps): InitialProps {
  return props ? { store: getAdminStore() } : {};
}
