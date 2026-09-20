export type UserValue = object | string | number | boolean | symbol | bigint | null | undefined;

export interface UserAction<Result = void> {
  type: string;
  params?: object;
  callback?: (result: Result) => void;
  [key: string]: UserValue;
}

export type UserDispatchResult<Result> = UserAction<Result> | Promise<Result> | undefined;
export type UserDispatch = <Result = void>(action: UserAction<Result>) => UserDispatchResult<Result>;
export type UserRootState = Record<string, object>;

export interface UserStore {
  dispatch: UserDispatch;
  getState(): UserRootState;
}
