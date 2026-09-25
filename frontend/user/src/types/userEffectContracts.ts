import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from './apiContracts';
import type { StateUpdate } from './queryState';
import type { UserState } from './userContracts';

export type UserModelAction =
    StateUpdate<UserState> | { type: 'getUserInfo' | 'user/getUserInfo' | 'user/getSubscribe' };

export interface UserModelEffectTools {
    put(action: UserModelAction): PutEffect<UserModelAction>;
}

export type UserModelEffect<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<UserModelAction>,
    void,
    ApiResponse<Data>
>;
