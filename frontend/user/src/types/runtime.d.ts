export {};

import type { UserHistory } from '../app/history';
import type { AppRoute } from '../app/routes';
import type { UserDvaApplication } from '../app/store';

declare global {
  type SupportChatValue = string | number | SupportChatValue[];

  interface Window {
    $crisp?: { push(command: SupportChatValue[]): void };
    Tawk_API?: { visitor?: { name: string; email: string } };
    copy?: (text: string) => void;
    jump?: (id: string | number) => void;
    settings: {
      background_url?: string;
      description?: string;
      homepage?: string;
      logo?: string;
      secure_path: string;
      title?: string;
      theme: { color?: string; header?: string; sidebar?: string };
      host?: string;
      i18n: string[] & Record<string, Record<string, string>>;
      [key: string]: unknown;
    };
    g_routes: AppRoute[];
    g_app: UserDvaApplication;
    g_history: UserHistory;
    g_initialData: Record<string, object>;
    g_isBrowser: boolean;
    g_plugins: typeof import('../runtime/pluginRuntime');
    g_useSSR: boolean;
    g_lang?: string;
    g_langSeparator?: string;
    grecaptcha?: {
      render(container: HTMLElement, options: {
        sitekey?: string;
        callback: (value?: string | null) => void;
        'expired-callback': () => void;
        'error-callback': () => void;
      }): number;
      reset(widgetId: number): void;
    };
  }
}
