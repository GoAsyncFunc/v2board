import { get, post, type ApiResponse } from '../services/request';
import '../config/adminSettings';
import type { ThemeConfigParams, ThemeListResponse, ThemeState } from '../types/theme';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface ThemeEffectTools extends PutEffectTools {}
interface ThemeNameAction { name: string; complete?: (config: ThemeConfigParams) => void; }
interface SaveThemeAction extends ThemeNameAction { config: string; }
type ThemeEffect<Data> = ModelEffect<ApiResponse<Data>>;

const initialState: ThemeState = { themes: {}, active: undefined };

export default {
  name: 'theme',
  state: { ...initialState },
  reducers: {
    setState(state: ThemeState, { payload }: { payload: Partial<ThemeState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getThemes(_: AdminAction, { put }: ThemeEffectTools): ThemeEffect<ThemeListResponse> {
      yield put({ type: 'setState', payload: { getThemesLoading: true } });
      const response = yield get<ThemeListResponse>(`/${window.settings.secure_path}/theme/getThemes`);
      yield put({ type: 'setState', payload: { getThemesLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { themes: response.data.themes, active: response.data.active } });
    },
    *getThemeConfig(
      { name, complete }: ThemeNameAction,
      { put }: ThemeEffectTools,
    ): ThemeEffect<ThemeConfigParams> {
      yield put({ type: 'setState', payload: { getThemeConfigLoading: true } });
      const response = yield post<ThemeConfigParams>(`/${window.settings.secure_path}/theme/getThemeConfig`, { name });
      yield put({ type: 'setState', payload: { getThemeConfigLoading: false } });
      if (response.code === 200) complete?.(response.data);
    },
    *saveThemeConfig(
      { config, name, complete }: SaveThemeAction,
      { put }: ThemeEffectTools,
    ): ThemeEffect<ThemeConfigParams> {
      yield put({ type: 'setState', payload: { saveThemeConfigLoading: true } });
      const response = yield post<ThemeConfigParams>(`/${window.settings.secure_path}/theme/saveThemeConfig`, { config, name });
      yield put({ type: 'setState', payload: { saveThemeConfigLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'getThemes' });
      complete?.(response.data);
    },
  },
};
