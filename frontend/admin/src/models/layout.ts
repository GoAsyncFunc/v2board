import type { LayoutState } from '../types/session';
import type { AdminAction } from '../types/store';

interface ShowNavigationAction {
  show?: boolean;
}

interface LayoutStoreState {
  layout: LayoutState;
}

interface LayoutEffectTools {
  put(action: AdminAction): unknown;
  select(selector: (state: LayoutStoreState) => LayoutState): unknown;
}

type LayoutEffect = Generator<unknown, void, LayoutState>;

const initialState: LayoutState = { showNav: false };

export default {
  name: 'layout',
  state: initialState,
  reducers: {
    save(state: LayoutState, { payload }: { payload: Partial<LayoutState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *showNav(
      { show }: ShowNavigationAction,
      { put, select }: LayoutEffectTools,
    ): LayoutEffect {
      const layout = yield select(state => state.layout);
      yield put({
        type: 'save',
        payload: { ...layout, showNav: show !== undefined ? show : !layout.showNav },
      });
    },
  },
};
