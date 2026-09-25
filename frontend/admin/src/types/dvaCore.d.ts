// dva-core 2.0.4 does not publish TypeScript declarations.
declare module 'dva-core' {
    import type { DvaCoreApplication, DvaCreateOptions, DvaOptions } from './dvaRuntimeContracts';

    export function create<Application extends DvaCoreApplication = DvaCoreApplication>(
        options?: DvaOptions,
        createOptions?: DvaCreateOptions<Application>,
    ): Application;
}
