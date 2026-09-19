export {};

declare global {
  interface Window {
    settings: {
      secure_path: string;
      [key: string]: unknown;
    };
  }
}
