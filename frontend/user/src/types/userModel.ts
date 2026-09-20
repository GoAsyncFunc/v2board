import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from './api';
import type { StateUpdate } from './queryModels';
import type { UserState } from './user';

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
