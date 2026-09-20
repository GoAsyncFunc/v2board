declare module 'dva-core' {
  export function create(options?: object, createOptions?: object): unknown;
}

declare module 'copy-to-clipboard' {
  export default function copyToClipboard(value?: string): boolean;
}
