export {};

import type { AdminHistory } from '../app/history';
import type { AdminDvaApplication } from '../app/store';

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
      [key: string]: unknown;
    };
    g_routes: unknown;
    g_app: AdminDvaApplication;
    g_history: AdminHistory;
    g_initialData: Record<string, object>;
    g_isBrowser: boolean;
    g_plugins: typeof import('../runtime/pluginRuntime');
    g_useSSR: boolean;
  }
}
