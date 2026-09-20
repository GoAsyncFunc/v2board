import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from './api';
import type { NodeRecord, TrafficRecord } from './commerce';
import type { UserNotice } from './subscription';

export interface StateUpdate<State> {
    type: 'setState';
    payload: Partial<State>;
}

export interface QueryEffects<State> {
    put(action: StateUpdate<State>): PutEffect<StateUpdate<State>>;
}

export type QueryGenerator<State, Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<StateUpdate<State>>,
    void,
    ApiResponse<Data>
>;

export interface ServerState {
    servers: NodeRecord[];
    fetchLoading: boolean;
}
export interface TrafficState {
    traffics: TrafficRecord[];
    getTrafficLogLoading: boolean;
}
export interface NoticeState {
    notices: UserNotice[];
}
export interface TelegramBot {
    username?: string;
}
export interface TelegramState {
    botInfo: TelegramBot;
}
