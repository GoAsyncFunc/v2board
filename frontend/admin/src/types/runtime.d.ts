export {};

import type { AdminHistory } from '../app/history';
import type { AdminDvaApplication } from '../app/store';
import type { AdminRouteConfig } from '../routes/types';
import type { AdminRootState, AdminValue } from './store';

declare global {
  interface Window {
    settings: {
      secure_path: string;
      title?: string;
      host?: string;
      theme: {
        color?: string;
        header?: string;
        sidebar?: string;
      };
      [key: string]: AdminValue;
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
