import React from 'react';
import type { ConfigChangeHandler, SafeConfig } from '@/types/systemConfigurationContracts';
import { TextSetting, ToggleSetting } from './SafeConfigFields';

interface SafeConfigLimitsProps {
    safe: SafeConfig;
    onChange: ConfigChangeHandler<SafeConfig>;
}

export default function SafeConfigLimits({
    safe,
    onChange,
}: SafeConfigLimitsProps): React.ReactElement {
    return (
        <>
            <ToggleSetting
                title="IP注册限制"
                description="开启后如果IP注册账户达到规则要求将会被限制注册，请注意IP判断可能因为CDN或前置代理导致问题。"
                value={safe.register_limit_by_ip_enable}
                onChange={(value) => onChange('register_limit_by_ip_enable', value)}
            />
            {safe.register_limit_by_ip_enable && (
                <>
                    <TextSetting
                        isChildren
                        title="次数"
                        description="达到注册次数后开启惩罚。"
                        placeholder="请输入"
                        value={safe.register_limit_count}
                        onChange={(event) => onChange('register_limit_count', event.target.value)}
                    />
                    <TextSetting
                        isChildren
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
                        isChildren
                        title="次数"
                        description="达到失败次数后开启惩罚。"
                        placeholder="请输入"
                        value={safe.password_limit_count}
                        onChange={(event) => onChange('password_limit_count', event.target.value)}
                    />
                    <TextSetting
                        isChildren
                        title="惩罚时间(分钟)"
                        description="需要等待惩罚时间过后才可以再次登陆。"
                        placeholder="请输入"
                        value={safe.password_limit_expire}
                        onChange={(event) => onChange('password_limit_expire', event.target.value)}
                    />
                </>
            )}
        </>
    );
}
