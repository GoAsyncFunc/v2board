import React from 'react';
import { createDva } from '../runtime/dvaApplication';
import type { DvaApplication } from '../runtime/dvaApplication';
import loadingPlugin from '../runtime/loadingPlugin';
import { mergeConfig } from '../runtime/pluginRuntime';
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
import type { UserStore } from '../types/store';
import type { DvaOptions, DvaPlugin } from '../types/dva';

export interface UserDvaApplication extends DvaApplication {}

interface DvaConfig {
    config?: DvaOptions;
    plugins?: DvaPlugin[];
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
                `User model registry mismatch: expected ${registeredNamespace}, received ${model.namespace}`,
            );
        }
        appInstance?.model(model);
    });
    return appInstance;
}

export function getApp(): UserDvaApplication {
    if (!appInstance) throw new Error('User application has not been created');
    return appInstance;
}

export function getUserStore(app: UserDvaApplication = getApp()): UserStore {
    if (!app._store) throw new Error('User store has not been initialized');
    return app._store;
}

interface DvaContainerProps {
    children: React.ReactElement;
}

export class DvaContainer extends React.Component<DvaContainerProps> {
    render(): React.ReactElement {
        const app = getApp();
        app.router(() => React.cloneElement(this.props.children, { store: getUserStore(app) }));
        const Provider = app.start();
        if (!Provider) throw new Error('User application did not create a provider');
        return <Provider />;
    }
}
