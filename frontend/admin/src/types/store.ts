export type AdminValue = object | string | number | boolean | symbol | bigint | null | undefined;

export interface AdminAction {
  type: string;
  params?: object;
  callback?: () => void;
  [key: string]: AdminValue;
}

export type AdminDispatchResult = AdminAction | Promise<AdminAction>;
export type AdminDispatch = (action: AdminAction) => AdminDispatchResult;
export type AdminRootState = Record<string, object>;

export interface AdminStore {
  dispatch: AdminDispatch;
  getState(): AdminRootState;
}
