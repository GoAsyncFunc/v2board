import type { AdminAction } from './store';

// DVA effects yield either Redux-Saga instruction objects or request promises.
export type EffectInstruction = object;

export interface PutEffectTools<Action = AdminAction> {
    put(action: Action): EffectInstruction;
}

export interface ModelEffectTools<RootState, Action = AdminAction> extends PutEffectTools<Action> {
    select<Result>(selector: (state: RootState) => Result): EffectInstruction;
}

export type ModelEffect<NextValue> = Generator<EffectInstruction, void, NextValue>;
