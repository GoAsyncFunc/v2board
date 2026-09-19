export {};

declare global {
  interface Window {
    settings: {
      secure_path: string;
      title?: string;
      theme: { header?: string; sidebar?: string };
      i18n: string[] & Record<string, Record<string, string>>;
      [key: string]: unknown;
    };
    g_routes: unknown;
    g_lang?: string;
    g_langSeparator?: string;
  }
}
