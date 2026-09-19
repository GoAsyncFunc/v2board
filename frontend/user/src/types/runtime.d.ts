export {};

declare global {
  interface Window {
    copy?: (text: string) => void;
    jump?: (id: string | number) => void;
    settings: {
      background_url?: string;
      description?: string;
      homepage?: string;
      logo?: string;
      secure_path: string;
      title?: string;
      theme: { header?: string; sidebar?: string };
      i18n: string[] & Record<string, Record<string, string>>;
      [key: string]: unknown;
    };
    g_routes: unknown;
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
