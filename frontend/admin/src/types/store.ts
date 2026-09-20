export interface AdminAction {
  type: string;
  params?: object;
  callback?: () => void;
  [key: string]: unknown;
}

export type AdminDispatch = (action: AdminAction) => unknown;

export interface AdminStore {
  dispatch: AdminDispatch;
  getState(): Record<string, object>;
}
