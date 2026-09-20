import type { Effect, PutEffect, SelectEffect } from 'redux-saga/effects';
import type { Action as ReduxAction } from 'redux';
import type { ApiResponse } from './api';
import type { AdminAction } from './store';

// Recovered models yield Redux-Saga instructions or typed request promises.
export type RequestEffectResult = Pick<ApiResponse, 'code'>;
export type EffectInstruction = Effect | Promise<RequestEffectResult>;
export type PutEffectInstruction<Action> = Action extends ReduxAction ? PutEffect<Action> : Effect;

export interface PutEffectTools<Action = AdminAction> {
    put<EffectAction extends Action>(action: EffectAction): PutEffectInstruction<EffectAction>;
}

export interface ModelEffectTools<RootState, Action = AdminAction> extends PutEffectTools<Action> {
    select<Result>(selector: (state: RootState) => Result): SelectEffect;
}

export type ModelEffect<NextValue> = Generator<EffectInstruction, void, NextValue>;
