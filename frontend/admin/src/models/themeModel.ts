import { get, post } from '@/services/apiClient';
import { isSuccessfulResponse, type ApiResponse } from '@/types/apiContracts';
import '@/config/adminSettings';
import type { ThemeConfigParams, ThemeListResponse, ThemeState } from '@/types/themeContracts';
import type { AdminAction } from '@/types/storeContracts';
import type { ModelEffect, PutEffectTools } from '@/types/modelEffectContracts';

interface ThemeEffectTools extends PutEffectTools {}
interface ThemeNameAction {
    name: string;
    complete?: (config: ThemeConfigParams) => void;
}
interface SaveThemeAction extends ThemeNameAction {
    config: string;
}
type ThemeEffect<Data> = ModelEffect<ApiResponse<Data>>;

const initialState: ThemeState = { themes: [], active: undefined };

export default {
    namespace: 'theme',
    state: { ...initialState },
    reducers: {
        setState(state: ThemeState, { payload }: { payload: Partial<ThemeState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getThemes(_: AdminAction, { put }: ThemeEffectTools): ThemeEffect<ThemeListResponse> {
            yield put({ type: 'setState', payload: { getThemesLoading: true } });
            const response = yield get<ThemeListResponse>(
                `/${window.settings.secure_path}/theme/getThemes`,
            );
            yield put({ type: 'setState', payload: { getThemesLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({
                type: 'setState',
                payload: { themes: response.data.themes, active: response.data.active },
            });
        },
        *getThemeConfig(
            { name, complete }: ThemeNameAction,
            { put }: ThemeEffectTools,
        ): ThemeEffect<ThemeConfigParams> {
            yield put({ type: 'setState', payload: { getThemeConfigLoading: true } });
            const response = yield post<ThemeConfigParams>(
                `/${window.settings.secure_path}/theme/getThemeConfig`,
                { name },
            );
            yield put({ type: 'setState', payload: { getThemeConfigLoading: false } });
            if (isSuccessfulResponse(response)) complete?.(response.data);
        },
        *saveThemeConfig(
            { config, name, complete }: SaveThemeAction,
            { put }: ThemeEffectTools,
        ): ThemeEffect<ThemeConfigParams> {
            yield put({ type: 'setState', payload: { saveThemeConfigLoading: true } });
            const response = yield post<ThemeConfigParams>(
                `/${window.settings.secure_path}/theme/saveThemeConfig`,
                { config, name },
            );
            yield put({ type: 'setState', payload: { saveThemeConfigLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'getThemes' });
            complete?.(response.data);
        },
    },
};
