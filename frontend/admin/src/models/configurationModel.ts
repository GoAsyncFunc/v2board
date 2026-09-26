import { get, post } from '@/services/apiClient';
import { isSuccessfulResponse, type ApiResponse } from '@/types/apiContracts';
import type {
    AdminConfigState,
    ConfigGroupKey,
    DepositConfig,
    InviteConfig,
    MailTestLog,
    SiteConfig,
} from '@/types/systemConfigurationContracts';
import type { AdminAction, AdminRootState } from '@/types/storeContracts';
import type { ModelEffect, ModelEffectTools } from '@/types/modelEffectContracts';

type ConfigRootState = Pick<AdminRootState, 'config'>;
interface ConfigTools extends ModelEffectTools<ConfigRootState> {}

interface FetchConfigAction {
    key?: ConfigGroupKey;
}

interface SaveConfigAction {
    parentKey: ConfigGroupKey;
    complete?: () => void;
}

interface TelegramWebhookAction {
    token?: string;
    complete?: () => void;
}

interface MailTestAction {
    complete?: (log: MailTestLog) => void;
}

type RawInviteConfig = Omit<InviteConfig, 'commission_withdraw_method'> & {
    commission_withdraw_method?: string | string[];
};
type RawSiteConfig = Omit<SiteConfig, 'email_whitelist_suffix'> & {
    email_whitelist_suffix?: string | string[];
};
type RawDepositConfig = Omit<DepositConfig, 'deposit_bounus'> & {
    deposit_bounus?: string | string[];
};
type ConfigFetchData = Partial<Omit<AdminConfigState, 'invite' | 'site' | 'deposit'>> & {
    invite?: RawInviteConfig;
    site?: RawSiteConfig;
    deposit?: RawDepositConfig;
};
type MailTestResponse = ApiResponse & { log?: MailTestLog };
type ConfigYield = ApiResponse | AdminConfigState;
type ConfigEffect = ModelEffect<ConfigYield>;

function normalizeListValue(value: string | string[] | undefined): string[] | undefined {
    return typeof value === 'string' ? value.split(',') : value;
}

export function normalizeConfigData(data: ConfigFetchData): Partial<AdminConfigState> {
    const { invite, site, deposit, ...otherConfig } = data;
    const normalized: Partial<AdminConfigState> = otherConfig;
    if (invite) {
        const { commission_withdraw_method, ...otherInviteConfig } = invite;
        normalized.invite = {
            ...otherInviteConfig,
            commission_withdraw_method: normalizeListValue(commission_withdraw_method),
        };
    }
    if (site) {
        const { email_whitelist_suffix, ...otherSiteConfig } = site;
        normalized.site = {
            ...otherSiteConfig,
            email_whitelist_suffix: normalizeListValue(email_whitelist_suffix),
        };
    }
    if (deposit) {
        const { deposit_bounus, ...otherDepositConfig } = deposit;
        normalized.deposit = {
            ...otherDepositConfig,
            deposit_bounus: normalizeListValue(deposit_bounus),
        };
    }
    return normalized;
}

const initialState = {
    ticket: {},
    deposit: {},
    invite: {},
    site: {},
    subscribe: {},
    frontend: {},
    server: {},
    email: {},
    telegram: {},
    app: {},
    safe: {},
    tabs: 'site',
    fetchLoading: false,
    emailTemplate: [],
    themeTemplate: [],
    setTelegramWebhookLoading: false,
};

export default {
    namespace: 'config',
    state: { ...initialState },
    reducers: {
        setState(state: AdminConfigState, { payload }: { payload: Partial<AdminConfigState> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *fetch({ key }: FetchConfigAction, { put }: ConfigTools): ConfigEffect {
            yield put({ type: 'setState', payload: { fetchLoading: true } });
            const response = (yield get<ConfigFetchData>(
                `/${window.settings.secure_path}/config/fetch`,
                { key },
            )) as ApiResponse<ConfigFetchData>;
            yield put({ type: 'setState', payload: { fetchLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            yield put({ type: 'setState', payload: normalizeConfigData(response.data) });
        },
        *save(
            { parentKey, complete }: SaveConfigAction,
            { put, select }: ConfigTools,
        ): ConfigEffect {
            const configState = (yield select((state) => state.config)) as AdminConfigState;
            const response = (yield post(`/${window.settings.secure_path}/config/save`, {
                ...configState[parentKey],
            })) as ApiResponse;
            if (!isSuccessfulResponse(response)) return;
            complete?.();
            yield put({ type: 'fetch' });
        },
        *getEmailTemplate(_: AdminAction, { put }: ConfigTools): ConfigEffect {
            const response = (yield get<string[]>(
                `/${window.settings.secure_path}/config/getEmailTemplate`,
            )) as ApiResponse<string[]>;
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { emailTemplate: response.data } });
        },
        *getThemeTemplate(_: AdminAction, { put }: ConfigTools): ConfigEffect {
            const response = (yield get<string[]>(
                `/${window.settings.secure_path}/config/getThemeTemplate`,
            )) as ApiResponse<string[]>;
            if (isSuccessfulResponse(response))
                yield put({ type: 'setState', payload: { themeTemplate: response.data } });
        },
        *setTelegramWebhook(
            { token, complete }: TelegramWebhookAction,
            { put }: ConfigTools,
        ): ConfigEffect {
            yield put({ type: 'setState', payload: { setTelegramWebhookLoading: true } });
            const response = (yield post(
                `/${window.settings.secure_path}/config/setTelegramWebhook`,
                { telegram_bot_token: token },
            )) as ApiResponse;
            yield put({ type: 'setState', payload: { setTelegramWebhookLoading: false } });
            if (isSuccessfulResponse(response)) complete?.();
        },
        *testSendMail({ complete }: MailTestAction, { put }: ConfigTools): ConfigEffect {
            yield put({ type: 'setState', payload: { testSendMailLoading: true } });
            const response = (yield post(
                `/${window.settings.secure_path}/config/testSendMail`,
            )) as MailTestResponse;
            yield put({ type: 'setState', payload: { testSendMailLoading: false } });
            if (!isSuccessfulResponse(response)) return;
            const log = response.log || {};
            complete?.(log);
        },
    },
};
