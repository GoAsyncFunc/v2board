import React from 'react';
import { createDva } from '../runtime/dvaApplication';
import type { DvaApplication } from '../runtime/dvaApplication';
import loadingPlugin from '../runtime/loadingPlugin';
import { mergeConfig } from '../runtime/pluginRuntime';
import history from './history';
import adminAuthenticationModel from '../models/adminAuthenticationModel';
import configurationModel from '../models/configurationModel';
import coupon from '../models/couponModel';
import giftcard from '../models/giftCardModel';
import knowledge from '../models/knowledgeModel';
import layout from '../models/layoutModel';
import notice from '../models/noticeModel';
import order from '../models/orderModel';
import passport from '../models/adminPassportModel';
import payment from '../models/paymentModel';
import plan from '../models/planModel';
import serverGroup from '../models/serverGroupModel';
import serverManage from '../models/serverManagementModel';
import serverRoute from '../models/serverRouteModel';
import {
    serverAnyTLS,
    serverHysteria,
    serverShadowsocks,
    serverTrojan,
    serverTuic,
    serverV2node,
    serverVless,
    serverVmess,
} from '../models/serverProtocolModelFactory';
import dashboardStatistics from '../models/dashboardStatisticsModel';
import system from '../models/queueMonitoringModel';
import theme from '../models/themeModel';
import ticket from '../models/ticketModel';
import user from '../models/userModel';
import type { AdminStore } from '../types/store';
import type { DvaOptions, DvaPlugin } from '../types/dva';

export interface AdminDvaApplication extends DvaApplication {}

interface DvaConfig {
    config?: DvaOptions;
    plugins?: DvaPlugin[];
}

const models = {
    auth: adminAuthenticationModel,
    config: configurationModel,
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
    stat: dashboardStatistics,
    system,
    theme,
    ticket,
    user,
};

let appInstance: AdminDvaApplication | null = null;

export function createApp(): AdminDvaApplication {
    const dvaConfig = mergeConfig<DvaConfig>('dva');
    appInstance = createDva({
        history,
        ...(dvaConfig.config || {}),
        ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
    });
    appInstance.use(loadingPlugin());
    (dvaConfig.plugins || []).forEach((plugin) => appInstance?.use(plugin));
    Object.entries(models).forEach(([registeredNamespace, model]) => {
        if (model.namespace !== registeredNamespace) {
            throw new Error(
                `Admin model registry mismatch: expected ${registeredNamespace}, received ${model.namespace}`,
            );
        }
        appInstance?.model(model);
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
