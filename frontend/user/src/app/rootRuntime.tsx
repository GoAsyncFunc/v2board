import React from 'react';
import { DvaContainer, getApp } from './store';

type InitialProps = Record<string, unknown>;

export function rootContainer(children: React.ReactElement): React.ReactElement {
  return <DvaContainer>{children}</DvaContainer>;
}

export function initialProps(props?: InitialProps): InitialProps {
  if (props) return props;
  const state = getApp()._store.getState() as Record<string, unknown>;
  return Object.keys(state).reduce<InitialProps>((result, key) => {
    if (!['@@dva', 'loading', 'routing'].includes(key)) result[key] = state[key];
    return result;
  }, {});
}

export function modifyInitialProps(props?: InitialProps): InitialProps {
  return props ? { store: getApp()._store } : {};
}
