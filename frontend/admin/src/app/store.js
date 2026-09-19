import React from 'react';
import { createDva } from '../vendor/dva.js';
import { loadingPlugin } from '../vendor/appRuntime.js';
import { mergeConfig } from '../vendor/appRuntime.js';
import history from './history.js';
import auth from '../models/auth.js';
import config from '../models/config.js';
import coupon from '../models/coupon.js';
import giftcard from '../models/giftcard.js';
import knowledge from '../models/knowledge.js';
import layout from '../models/layout.js';
import notice from '../models/notice.js';
import order from '../models/order.js';
import passport from '../models/passport.js';
import payment from '../models/payment.js';
import plan from '../models/plan.js';
import serverAnyTLS from '../models/serverAnyTLS.js';
import serverGroup from '../models/serverGroup.js';
import serverHysteria from '../models/serverHysteria.js';
import serverManage from '../models/serverManage.js';
import serverRoute from '../models/serverRoute.js';
import serverShadowsocks from '../models/serverShadowsocks.js';
import serverTrojan from '../models/serverTrojan.js';
import serverTuic from '../models/serverTuic.js';
import serverV2node from '../models/serverV2node.js';
import serverVless from '../models/serverVless.js';
import serverVmess from '../models/serverVmess.js';
import stat from '../models/stat.js';
import system from '../models/system.js';
import theme from '../models/theme.js';
import ticket from '../models/ticket.js';
import user from '../models/user.js';

const models = {
  auth,
  config,
  coupon,
  giftcard,
  knowledge,
  layout,
  notice,
  order,
  passport,
  payment,
  plan,
  serverGroup,
  serverHysteria,
  serverTuic,
  serverManage,
  serverRoute,
  serverShadowsocks,
  serverTrojan,
  serverVless,
  serverVmess,
  serverAnyTLS,
  serverV2node,
  stat,
  system,
  theme,
  ticket,
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
    app.router(() => this.props.children);
    return app.start()();
  }
}
