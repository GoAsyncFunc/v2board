export interface AdminAction {
  type: string;
  params?: object;
  callback?: () => void;
}

export type AdminDispatch = (action: AdminAction) => unknown;
