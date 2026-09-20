import type { AdminAction } from './store';

// DVA effects yield either Redux-Saga instruction objects or request promises.
export type EffectInstruction = object;

export interface PutEffectTools {
  put(action: AdminAction): EffectInstruction;
}

export interface ModelEffectTools<RootState> extends PutEffectTools {
  select<Result>(selector: (state: RootState) => Result): EffectInstruction;
}

export type ModelEffect<NextValue> = Generator<EffectInstruction, void, NextValue>;
