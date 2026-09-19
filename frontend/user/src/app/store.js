import React from 'react';
import { createDva } from '../vendor/dva.js';
import { loadingPlugin } from '../vendor/appRuntime.js';
import { mergeConfig } from '../vendor/appRuntime.js';
import history from './history.js';
import comm from '../models/comm.js';
import coupon from '../models/coupon.js';
import guest from '../models/guest.js';
import invite from '../models/invite.js';
import knowledge from '../models/knowledge.js';
import layout from '../models/layout.js';
import notice from '../models/notice.js';
import order from '../models/order.js';
import passport from '../models/passport.js';
import plan from '../models/plan.js';
import server from '../models/server.js';
import stat from '../models/stat.js';
import telegram from '../models/telegram.js';
import ticket from '../models/ticket.js';
import tutorial from '../models/tutorial.js';
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

export function _onCreate() {
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

export class _DvaContainer extends React.Component {
  render() {
    const app = getApp();
    app.router(() => React.cloneElement(this.props.children, { store: app._store }));
    return app.start()();
  }
}
