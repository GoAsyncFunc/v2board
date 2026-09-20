import React from 'react';
import { createDva } from '../vendor/dva.js';
import { loadingPlugin } from '../vendor/appRuntime.js';
import { mergeConfig } from '../vendor/appRuntime.js';
import history from './history.js';
import comm from '../models/comm';
import coupon from '../models/coupon';
import guest from '../models/guest';
import invite from '../models/invite';
import knowledge from '../models/knowledge';
import layout from '../models/layout';
import notice from '../models/notice';
import order from '../models/order.js';
import passport from '../models/passport';
import plan from '../models/plan';
import server from '../models/server';
import stat from '../models/stat';
import telegram from '../models/telegram';
import ticket from '../models/ticket.js';
import tutorial from '../models/tutorial';
import user from '../models/user.js';

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

let appInstance = null;

export function createApp() {
  const dvaConfig = mergeConfig('dva');
  appInstance = createDva({
    history,
    ...(dvaConfig.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  appInstance.use(loadingPlugin());
  (dvaConfig.plugins || []).forEach(plugin => appInstance.use(plugin));
  Object.entries(models).forEach(([namespace, model]) => {
    appInstance.model({ namespace, ...model });
  });
  return appInstance;
}

export function getApp() {
  return appInstance;
}

export class DvaContainer extends React.Component {
  render() {
    const app = getApp();
    app.router(() => React.cloneElement(this.props.children, { store: app._store }));
    return app.start()();
  }
}
