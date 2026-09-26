import type { LayoutState } from '@/types/authenticationContracts';
import type { AdminRootState } from '@/types/storeContracts';
import type { ModelEffect, ModelEffectTools } from '@/types/modelEffectContracts';

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
