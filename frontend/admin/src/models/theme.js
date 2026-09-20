import { get, post } from '../services/request.js';
import '../config/adminSettings';

const initialState = { themes: [], active: undefined };

export default {
  name: 'theme',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *getThemes(_, { put }) {
      yield put({ type: 'setState', payload: { getThemesLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/theme/getThemes`);
      yield put({ type: 'setState', payload: { getThemesLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: {
        themes: response?.data?.themes,
        active: response?.data?.active,
      } });
    },
    *getThemeConfig({ name, complete }, { put }) {
      yield put({ type: 'setState', payload: { getThemeConfigLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/theme/getThemeConfig`, { name });
      yield put({ type: 'setState', payload: { getThemeConfigLoading: false } });
      if (response.code === 200 && typeof complete === 'function') complete(response.data);
    },
    *saveThemeConfig({ config, name, complete }, { put }) {
      yield put({ type: 'setState', payload: { saveThemeConfigLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/theme/saveThemeConfig`, { config, name });
      yield put({ type: 'setState', payload: { saveThemeConfigLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'getThemes' });
      if (typeof complete === 'function') complete(response.data);
    },
  },
};
