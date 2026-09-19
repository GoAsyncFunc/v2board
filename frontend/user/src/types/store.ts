export interface UserAction {
  type: string;
  params?: object;
  callback?: () => void;
  [key: string]: unknown;
}

export type UserDispatch = (action: UserAction) => unknown;
