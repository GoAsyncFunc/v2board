import React from 'react';
import { createDva } from '../vendor/dva.js';
import { loadingPlugin, mergeConfig } from '../vendor/appRuntime.js';
import history from './history';
import comm from '../models/comm';
import coupon from '../models/coupon';
import guest from '../models/guest';
import invite from '../models/invite';
import knowledge from '../models/knowledge';
import layout from '../models/layout';
import notice from '../models/notice';
import order from '../models/order';
import passport from '../models/passport';
import plan from '../models/plan';
import server from '../models/server';
import stat from '../models/stat';
import telegram from '../models/telegram';
import ticket from '../models/ticket';
import tutorial from '../models/tutorial';
import user from '../models/user';

interface DvaStore {
  getState(): Record<string, object>;
}

export interface UserDvaApplication {
  _store: DvaStore;
  use(plugin: object): void;
  model(model: object): void;
  router(render: () => React.ReactElement): void;
  start(): () => React.ReactElement;
}

interface DvaConfig {
  config?: Record<string, object>;
  plugins?: object[];
}

const models = {
  comm,
  coupon,
  guest,
  invite,
  knowledge,
  layout,
  notice,
  order,
  passport,
  plan,
  server,
  stat,
  telegram,
  ticket,
  tutorial,
  user,
};

let appInstance: UserDvaApplication | null = null;

export function createApp(): UserDvaApplication {
  const dvaConfig = mergeConfig('dva') as DvaConfig;
  appInstance = createDva({
    history,
    ...(dvaConfig.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  }) as UserDvaApplication;
  appInstance.use(loadingPlugin());
  (dvaConfig.plugins || []).forEach(plugin => appInstance?.use(plugin));
  Object.entries(models).forEach(([namespace, model]) => {
    appInstance?.model({ namespace, ...model });
  });
  return appInstance;
}

export function getApp(): UserDvaApplication {
  return appInstance as UserDvaApplication;
}

interface DvaContainerProps {
  children: React.ReactElement;
}

export class DvaContainer extends React.Component<DvaContainerProps> {
  render(): React.ReactElement {
    const app = getApp();
    app.router(() => React.cloneElement(this.props.children, { store: app._store }));
    return app.start()();
  }
}
