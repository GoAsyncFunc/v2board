declare module 'dva-core' {
  export function create<Application extends object = object>(options?: object, createOptions?: object): Application;
}

declare module 'copy-to-clipboard' {
  export default function copyToClipboard(value?: string): boolean;
}
