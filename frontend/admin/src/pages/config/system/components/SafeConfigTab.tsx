import React from 'react';
import { TextSetting, ToggleSetting } from './SafeConfigFields';
import SafeConfigLimits from './SafeConfigLimits';
import type { ConfigGroupChangeHandler, SafeConfig } from '@/types/systemConfigurationContracts';

interface SafeConfigTabProps {
    safe: SafeConfig;
    onChange: ConfigGroupChangeHandler;
}

export default function SafeConfigTab({ safe, onChange }: SafeConfigTabProps): React.ReactElement {
    return (
        <div>
            <ToggleSetting
                title="邮箱验证"
                description="开启后将会强制要求用户进行邮箱验证。"
                value={safe.email_verify}
                onChange={(value) => onChange('safe', 'email_verify', value)}
            />
            <ToggleSetting
                title="禁止使用Gmail多别名"
                description="开启后Gmail多别名将无法注册。"
                value={safe.email_gmail_limit_enable}
                onChange={(value) => onChange('safe', 'email_gmail_limit_enable', value)}
            />
            <ToggleSetting
                title="安全模式"
                description="开启后除了站点URL以外的绑定本站点的域名访问都将会被403。"
                value={safe.safe_mode_enable}
                onChange={(value) => onChange('safe', 'safe_mode_enable', value)}
            />
            <TextSetting
                title="后台路径"
                description="后台管理路径，修改后将会改变原有的admin路径"
                placeholder="admin"
                value={safe.secure_path}
                onChange={(event) => onChange('safe', 'secure_path', event.target.value)}
            />
            <ToggleSetting
                title="邮箱后缀白名单"
                description="开启后在名单中的邮箱后缀才允许进行注册。"
                value={safe.email_whitelist_enable}
                onChange={(value) => onChange('safe', 'email_whitelist_enable', value)}
            />
            {safe.email_whitelist_enable && (
                <TextSetting
                    isChildren
                    title="白名单后缀"
                    description="请使用逗号进行分割，如：qq.com,gmail.com。"
                    placeholder="请输入后缀域名，逗号分割 如：qq.com,gmail.com"
                    value={safe.email_whitelist_suffix}
                    onChange={(event) =>
                        onChange('safe', 'email_whitelist_suffix', event.target.value.split(','))
                    }
                    multiline
                />
            )}
            <ToggleSetting
                title="防机器人"
                description="开启后将会使用Google reCAPTCHA防止机器人。"
                value={safe.recaptcha_enable}
                onChange={(value) => onChange('safe', 'recaptcha_enable', value)}
            />
            {safe.recaptcha_enable && (
                <>
                    <TextSetting
                        isChildren
                        title="密钥"
                        description="在Google reCAPTCHA申请的密钥。"
                        placeholder="请输入"
                        value={safe.recaptcha_key}
                        onChange={(event) => onChange('safe', 'recaptcha_key', event.target.value)}
                    />
                    <TextSetting
                        isChildren
                        title="网站密钥"
                        description="在Google reCAPTCH申请的网站密钥。"
                        placeholder="请输入"
                        value={safe.recaptcha_site_key}
                        onChange={(event) =>
                            onChange('safe', 'recaptcha_site_key', event.target.value)
                        }
                    />
                </>
            )}
            <SafeConfigLimits
                safe={safe}
                onChange={(field, value) => onChange('safe', field, value)}
            />
        </div>
    );
}
