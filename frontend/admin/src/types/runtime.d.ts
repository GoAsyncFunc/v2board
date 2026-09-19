export {};

declare global {
  interface Window {
    settings: {
      secure_path: string;
      title?: string;
      theme: {
        header?: string;
        sidebar?: string;
      };
      [key: string]: unknown;
    };
    g_routes: unknown;
  }
}
