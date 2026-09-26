export type ConfigValue = string | number | string[] | null | undefined;

interface ConfigFields {
    [field: string]: ConfigValue;
}

export type ConfigChangeHandler<Config> = (
    field: Extract<keyof Config, string>,
    value: ConfigValue,
) => void;

export interface PlanSummary {
    id: string | number;
    name: string;
}

export interface SiteConfig extends ConfigFields {
    app_name?: string;
    app_description?: string;
    app_url?: string;
    force_https?: string | number;
    logo?: string;
    subscribe_url?: string;
    subscribe_path?: string;
    tos_url?: string;
    stop_register?: string | number;
    try_out_plan_id?: string | number;
    try_out_hour?: string | number;
    currency?: string;
    currency_symbol?: string;
}

export interface SafeConfig extends ConfigFields {
    email_verify?: string | number;
    email_gmail_limit_enable?: string | number;
    safe_mode_enable?: string | number;
    secure_path?: string;
    email_whitelist_enable?: string | number;
    email_whitelist_suffix?: string[];
    recaptcha_enable?: string | number;
    recaptcha_key?: string;
    recaptcha_site_key?: string;
    register_limit_by_ip_enable?: string | number;
    register_limit_count?: string | number;
    register_limit_expire?: string | number;
    password_limit_enable?: string | number;
    password_limit_count?: string | number;
    password_limit_expire?: string | number;
}

export interface SubscribeConfig extends ConfigFields {
    plan_change_enable?: string | number;
    reset_traffic_method?: string | number;
    surplus_enable?: string | number;
    allow_new_period?: string | number;
    new_order_event_id?: string | number;
    renew_order_event_id?: string | number;
    change_order_event_id?: string | number;
    show_info_to_server_enable?: string | number;
    show_subscribe_method?: string | number;
    show_subscribe_expire?: string | number;
}

export interface DepositConfig extends ConfigFields {
    deposit_bounus?: string[];
}

export interface TicketConfig extends ConfigFields {
    ticket_status?: string | number;
}

export interface InviteConfig extends ConfigFields {
    invite_force?: string | number;
    invite_commission?: string | number;
    invite_gen_limit?: string | number;
    invite_never_expire?: string | number;
    commission_first_time_enable?: string | number;
    commission_auto_check_enable?: string | number;
    commission_withdraw_limit?: string | number;
    commission_withdraw_method?: string[];
    withdraw_close_enable?: string | number;
    commission_distribution_enable?: string | number;
    commission_distribution_l1?: string | number;
    commission_distribution_l2?: string | number;
    commission_distribution_l3?: string | number;
}

export interface FrontendConfig extends ConfigFields {
    frontend_theme_sidebar?: string;
    frontend_theme_header?: string;
    frontend_theme_color?: string;
    frontend_background_url?: string;
}

export interface ServerConfig extends ConfigFields {
    server_api_url?: string;
    server_token?: string;
    server_pull_interval?: string | number;
    server_push_interval?: string | number;
    server_node_report_min_traffic?: string | number;
    server_device_online_min_traffic?: string | number;
    device_limit_mode?: string | number;
}

export interface EmailConfig extends ConfigFields {
    email_host?: string;
    email_port?: string | number;
    email_encryption?: string;
    email_username?: string;
    email_password?: string;
    email_from_address?: string;
    email_template?: string;
}

export interface TelegramConfig extends ConfigFields {
    telegram_bot_token?: string;
    telegram_bot_enable?: string | number;
    telegram_discuss_link?: string;
}

export interface AppConfig extends ConfigFields {
    windows_version?: string;
    windows_download_url?: string;
    macos_version?: string;
    macos_download_url?: string;
    android_version?: string;
    android_download_url?: string;
}

export interface AdminConfigState {
    site: SiteConfig;
    safe: SafeConfig;
    subscribe: SubscribeConfig;
    deposit: DepositConfig;
    ticket: TicketConfig;
    invite: InviteConfig;
    frontend: FrontendConfig;
    server: ServerConfig;
    email: EmailConfig;
    telegram: TelegramConfig;
    app: AppConfig;
    tabs: string;
    fetchLoading: boolean;
    emailTemplate: string[];
    themeTemplate: string[];
    setTelegramWebhookLoading: boolean;
    testSendMailLoading: boolean;
}

export type ConfigGroupKey = Exclude<
    keyof AdminConfigState,
    | 'tabs'
    | 'fetchLoading'
    | 'emailTemplate'
    | 'themeTemplate'
    | 'setTelegramWebhookLoading'
    | 'testSendMailLoading'
>;

// Mirrors the artifact's page-level set(group, field, value) call. A few
// fields in the original bundle save under a different group than the tab
// they are rendered in (e.g. show_subscribe_expire under "safe",
// frontend_theme_* under "site"), so tabs carry the group themselves.
export type ConfigGroupChangeHandler = (
    group: ConfigGroupKey,
    field: string,
    value: ConfigValue,
) => void;

export interface MailServerSnapshot {
    host?: string;
    port?: string | number;
    encryption?: string;
    username?: string;
}

export interface MailTestLog {
    error?: string;
    email?: string;
    config?: MailServerSnapshot;
}
