import React from 'react';
import { DvaContainer, getUserStore } from './store';
import type { UserRootState } from '../types/store';

type InitialProps = Record<string, object>;

export function rootContainer(children: React.ReactElement): React.ReactElement {
  return <DvaContainer>{children}</DvaContainer>;
}

export function initialProps(props?: InitialProps): InitialProps {
  if (props) return props;
  const state: UserRootState = getUserStore().getState();
  return Object.keys(state).reduce<InitialProps>((result, key) => {
    if (!['@@dva', 'loading', 'routing'].includes(key)) result[key] = state[key];
    return result;
  }, {});
}

export function modifyInitialProps(props?: InitialProps): InitialProps {
  return props ? { store: getUserStore() } : {};
}
