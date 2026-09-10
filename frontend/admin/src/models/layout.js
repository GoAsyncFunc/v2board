export default {
  name: 'layout',
  state: { showNav: false },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *showNav({ show }, { put, select }) {
      const layout = yield select(state => state.layout);
      yield put({
        type: 'save',
        payload: { ...layout, showNav: show !== undefined ? show : !layout.showNav },
      });
    },
  },
};
