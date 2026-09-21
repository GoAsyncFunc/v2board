import React from 'react';
import Switch from 'antd/lib/switch';
import ConfigRow from '../_components/ConfigRow';
import type { ConfigChangeHandler, ConfigValue, SafeConfig } from '../../../../types/config';

interface TextSettingProps {
    title: string;
    description: string;
    placeholder: string;
    value?: Exclude<ConfigValue, null>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    multiline?: boolean;
    rows?: number;
}

function TextSetting({
    title,
    description,
    placeholder,
    value,
    onChange,
    multiline = false,
    rows = 4,
}: TextSettingProps) {
    const field = multiline ? (
        <textarea
            rows={rows}
            className="form-control"
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
        />
    ) : (
        <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
        />
    );
    return (
        <ConfigRow title={title} description={description}>
            {field}
        </ConfigRow>
    );
}

interface ToggleSettingProps {
    title: string;
    description: string;
    value?: string | number;
    onChange: (value: number) => void;
}

function ToggleSetting({ title, description, value, onChange }: ToggleSettingProps) {
    return (
        <ConfigRow title={title} description={description}>
            <Switch
                checked={Boolean(parseInt(String(value), 10))}
                onChange={(enabled) => onChange(enabled ? 1 : 0)}
            />
        </ConfigRow>
    );
}

interface SafeConfigTabProps {
    safe: SafeConfig;
    onChange: ConfigChangeHandler<SafeConfig>;
}

export default function SafeConfigTab({ safe, onChange }: SafeConfigTabProps) {
    return (
        <div>
            <ToggleSetting
                title="邮箱验证"
                description="开启后将会强制要求用户进行邮箱验证。"
                value={safe.email_verify}
                onChange={(value) => onChange('email_verify', value)}
            />
            <ToggleSetting
                title="禁止使用Gmail多别名"
                description="开启后Gmail多别名将无法注册。"
                value={safe.email_gmail_limit_enable}
                onChange={(value) => onChange('email_gmail_limit_enable', value)}
            />
            <ToggleSetting
                title="安全模式"
                description="开启后除了站点URL以外的绑定本站点的域名访问都将会被403。"
                value={safe.safe_mode_enable}
                onChange={(value) => onChange('safe_mode_enable', value)}
            />
            <TextSetting
                title="后台路径"
                description="后台管理路径，修改后将会改变原有的admin路径"
                placeholder="admin"
                value={safe.secure_path}
                onChange={(event) => onChange('secure_path', event.target.value)}
            />
            <ToggleSetting
                title="邮箱后缀白名单"
                description="开启后在名单中的邮箱后缀才允许进行注册。"
                value={safe.email_whitelist_enable}
                onChange={(value) => onChange('email_whitelist_enable', value)}
            />
            {safe.email_whitelist_enable && (
                <TextSetting
                    title="白名单后缀"
                    description="请使用逗号进行分割，如：qq.com,gmail.com。"
                    placeholder="请输入后缀域名，逗号分割 如：qq.com,gmail.com"
                    value={safe.email_whitelist_suffix}
                    onChange={(event) =>
                        onChange('email_whitelist_suffix', event.target.value.split(','))
                    }
                    multiline
                />
            )}
            <ToggleSetting
                title="防机器人"
                description="开启后将会使用Google reCAPTCHA防止机器人。"
                value={safe.recaptcha_enable}
                onChange={(value) => onChange('recaptcha_enable', value)}
            />
            {safe.recaptcha_enable && (
                <>
                    <TextSetting
                        title="密钥"
                        description="在Google reCAPTCHA申请的密钥。"
                        placeholder="请输入"
                        value={safe.recaptcha_key}
                        onChange={(event) => onChange('recaptcha_key', event.target.value)}
                    />
                    <TextSetting
                        title="网站密钥"
                        description="在Google reCAPTCH申请的网站密钥。"
                        placeholder="请输入"
                        value={safe.recaptcha_site_key}
                        onChange={(event) => onChange('recaptcha_site_key', event.target.value)}
                    />
                </>
            )}
            <ToggleSetting
                title="IP注册限制"
                description="开启后如果IP注册账户达到规则要求将会被限制注册，请注意IP判断可能因为CDN或前置代理导致问题。"
                value={safe.register_limit_by_ip_enable}
                onChange={(value) => onChange('register_limit_by_ip_enable', value)}
            />
            {safe.register_limit_by_ip_enable && (
                <>
                    <TextSetting
                        title="次数"
                        description="达到注册次数后开启惩罚。"
                        placeholder="请输入"
                        value={safe.register_limit_count}
                        onChange={(event) => onChange('register_limit_count', event.target.value)}
                    />
                    <TextSetting
                        title="惩罚时间(分钟)"
                        description="需要等待惩罚时间过后才可以再次注册。"
                        placeholder="请输入"
                        value={safe.register_limit_expire}
                        onChange={(event) => onChange('register_limit_expire', event.target.value)}
                    />
                </>
            )}
            <ToggleSetting
                title="防爆破限制"
                description="开启后如果该账户尝试登陆失败次数过多将会被限制。"
                value={safe.password_limit_enable}
                onChange={(value) => onChange('password_limit_enable', value)}
            />
            {safe.password_limit_enable && (
                <>
                    <TextSetting
                        title="次数"
                        description="达到失败次数后开启惩罚。"
                        placeholder="请输入"
                        value={safe.password_limit_count}
                        onChange={(event) => onChange('password_limit_count', event.target.value)}
                    />
                    <TextSetting
                        title="惩罚时间(分钟)"
                        description="需要等待惩罚时间过后才可以再次登陆。"
                        placeholder="请输入"
                        value={safe.password_limit_expire}
                        onChange={(event) => onChange('password_limit_expire', event.target.value)}
                    />
                </>
            )}
        </div>
    );
}
