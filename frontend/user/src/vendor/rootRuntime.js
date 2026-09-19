import React from 'react';
import { DvaContainer, getApp } from '../app/store.js';

export function rootContainer(children) {
  return <DvaContainer>{children}</DvaContainer>;
}

export function initialProps(props) {
  if (props) return props;
  const state = getApp()._store.getState();
  return Object.keys(state).reduce((result, key) => {
    if (!['@@dva', 'loading', 'routing'].includes(key)) result[key] = state[key];
    return result;
  }, {});
}

export function modifyInitialProps(props) {
  return props ? { store: getApp()._store } : {};
}
