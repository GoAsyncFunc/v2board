import React from 'react';
import { createDva } from '../runtime/dvaApplication';
import type { DvaApplication } from '../runtime/dvaApplication';
import loadingPlugin from '../runtime/loadingPlugin';
import { mergeConfig } from '../runtime/pluginRuntime';
import history from './history';
import auth from '../models/auth';
import config from '../models/config';
import coupon from '../models/coupon';
import giftcard from '../models/giftcard';
import knowledge from '../models/knowledge';
import layout from '../models/layout';
import notice from '../models/notice';
import order from '../models/order';
import passport from '../models/passport';
import payment from '../models/payment';
import plan from '../models/plan';
import serverAnyTLS from '../models/serverAnyTLS';
import serverGroup from '../models/serverGroup';
import serverHysteria from '../models/serverHysteria';
import serverManage from '../models/serverManage';
import serverRoute from '../models/serverRoute';
import serverShadowsocks from '../models/serverShadowsocks';
import serverTrojan from '../models/serverTrojan';
import serverTuic from '../models/serverTuic';
import serverV2node from '../models/serverV2node';
import serverVless from '../models/serverVless';
import serverVmess from '../models/serverVmess';
import stat from '../models/stat';
import system from '../models/system';
import theme from '../models/theme';
import ticket from '../models/ticket';
import user from '../models/user';
import type { AdminStore } from '../types/store';
import type { DvaOptions, DvaPlugin } from '../types/dva';

export interface AdminDvaApplication extends DvaApplication {}

interface DvaConfig {
    config?: DvaOptions;
    plugins?: DvaPlugin[];
}

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

let appInstance: AdminDvaApplication | null = null;

export function createApp(): AdminDvaApplication {
    const dvaConfig = mergeConfig('dva') as DvaConfig;
    appInstance = createDva({
        history,
        ...(dvaConfig.config || {}),
        ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
    });
    appInstance.use(loadingPlugin());
    (dvaConfig.plugins || []).forEach((plugin) => appInstance?.use(plugin));
    Object.entries(models).forEach(([namespace, model]) => {
        appInstance?.model({ namespace, ...model });
    });
    return appInstance;
}

export function getApp(): AdminDvaApplication {
    if (!appInstance) throw new Error('Admin application has not been created');
    return appInstance;
}

export function getAdminStore(app: AdminDvaApplication = getApp()): AdminStore {
    if (!app._store) throw new Error('Admin store has not been initialized');
    return app._store;
}

interface DvaContainerProps {
    children: React.ReactElement;
}

export class DvaContainer extends React.Component<DvaContainerProps> {
    render(): React.ReactElement {
        const app = getApp();
        app.router(() => React.cloneElement(this.props.children, { store: getAdminStore(app) }));
        const Provider = app.start();
        if (!Provider) throw new Error('Admin application did not create a provider');
        return <Provider />;
    }
}
