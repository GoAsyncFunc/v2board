import type { PutEffect, SelectEffect } from 'redux-saga/effects';
import type { LayoutState } from '@/types/contentState';

interface LayoutSave {
    type: 'save';
    payload: Partial<LayoutState>;
}
interface LayoutEffects {
    put(action: LayoutSave): PutEffect<LayoutSave>;
    select(selector: (state: { layout: LayoutState }) => LayoutState): SelectEffect;
}

export default {
    namespace: 'layout',
    state: { showNav: false },
    reducers: {
        save(state: LayoutState, { payload }: LayoutSave): LayoutState {
            return { ...state, ...payload };
        },
    },
    effects: {
        *showNav(
            { show }: { show?: boolean },
            { put, select }: LayoutEffects,
        ): Generator<SelectEffect | PutEffect<LayoutSave>, void, LayoutState> {
            const layout = yield select((state) => state.layout);
            yield put({
                type: 'save',
                payload: { ...layout, showNav: show !== undefined ? show : !layout.showNav },
            });
        },
    },
};
