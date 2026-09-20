export interface UserAction<Result = void> {
  type: string;
  params?: object;
  callback?: (result: Result) => void;
  [key: string]: unknown;
}

export type UserDispatchResult<Result> = UserAction<Result> | Promise<Result> | undefined;
export type UserDispatch = <Result = void>(action: UserAction<Result>) => UserDispatchResult<Result>;

export interface UserStore {
  dispatch: UserDispatch;
  getState(): Record<string, object>;
}
