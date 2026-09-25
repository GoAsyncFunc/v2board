import type { LayoutState } from '../types/session';
import type { AdminRootState } from '../types/store';
import type { ModelEffect, ModelEffectTools } from '../types/modelEffects';

interface ShowNavigationAction {
    show?: boolean;
}

type LayoutStoreState = Pick<AdminRootState, 'layout'>;

interface LayoutEffectTools extends ModelEffectTools<LayoutStoreState> {}

type LayoutEffect = ModelEffect<LayoutState>;

const initialState: LayoutState = { showNav: false };

export default {
    namespace: 'layout',
    state: initialState,
    reducers: {
        save(state: LayoutState, { payload }: { payload: Partial<LayoutState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *showNav({ show }: ShowNavigationAction, { put, select }: LayoutEffectTools): LayoutEffect {
            const layout = yield select((state) => state.layout);
            yield put({
                type: 'save',
                payload: { ...layout, showNav: show !== undefined ? show : !layout.showNav },
            });
        },
    },
};
