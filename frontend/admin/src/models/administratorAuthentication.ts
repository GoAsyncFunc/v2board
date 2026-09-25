import { get, post } from '../services/request';
import { isSuccessfulResponse, type ApiResponse, type FormRecord } from '../types/api';
import history from '../app/navigation';
import type { AdminLoginData, AdministratorAuthenticationState } from '../types/session';
import type { ModelEffect, PutEffectTools } from '../types/modelEffects';

interface AdministratorAuthenticationLoginAction {
    action: FormRecord;
}

interface AdministratorAuthenticationRegisterAction {
    action: FormRecord;
    complete(response: ApiResponse<AdminLoginData>): void;
}

interface AdministratorAuthenticationEffectTools extends PutEffectTools {}

type AdministratorAuthenticationEffect = ModelEffect<ApiResponse<AdminLoginData>>;

export default {
    namespace: 'auth',
    state: {},
    reducers: {
        save(
            state: AdministratorAuthenticationState,
            { payload }: { payload: Partial<AdministratorAuthenticationState> },
        ) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *login(
            { action }: AdministratorAuthenticationLoginAction,
            { put }: AdministratorAuthenticationEffectTools,
        ): AdministratorAuthenticationEffect {
            yield put({ type: 'save', payload: { loginLoading: true } });
            const response = yield post<AdminLoginData>('/passport/auth/login', action);
            yield put({ type: 'save', payload: { loginLoading: false } });
            if (!isSuccessfulResponse(response) || !response.data.is_admin) return;
            history.push('/dashboard');
        },
        *register({
            action,
            complete,
        }: AdministratorAuthenticationRegisterAction): AdministratorAuthenticationEffect {
            const response = yield get<AdminLoginData>('/passport/auth/register', action);
            if (response) complete(response);
        },
    },
};
