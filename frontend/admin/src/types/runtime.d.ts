export {};

import type { AdminHistory } from '../app/history';
import type { AdminDvaApplication } from '../app/store';
import type { AdminRouteConfig } from '../routes/routeConfig';
import type { AdminRootState } from './storeContracts';

declare global {
    interface Window {
        settings: {
            background_url?: string;
            logo?: string;
            secure_path: string;
            title?: string;
            host?: string;
            theme: {
                color?: string;
                header?: string;
                sidebar?: string;
            };
        };
        g_routes: AdminRouteConfig[];
        g_app: AdminDvaApplication;
        g_history: AdminHistory;
        g_initialData: Partial<AdminRootState>;
        g_isBrowser: boolean;
        g_plugins: typeof import('../runtime/pluginRuntime');
        g_useSSR: boolean;
    }
}
