// dva-core 2.0.4 does not publish TypeScript declarations.
declare module 'dva-core' {
  export function create<Application extends object = object>(options?: object, createOptions?: object): Application;
}
