export interface AdminAction {
  type: string;
  params?: object;
  callback?: () => void;
  [key: string]: unknown;
}

export type AdminDispatch = (action: AdminAction) => unknown;
