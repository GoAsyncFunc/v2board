export interface UserAction<Result = void> {
  type: string;
  params?: object;
  callback?: (result: Result) => void;
  [key: string]: unknown;
}

export type UserDispatch = <Result = void>(action: UserAction<Result>) => unknown;

export interface UserStore {
  dispatch: UserDispatch;
  getState(): Record<string, object>;
}
