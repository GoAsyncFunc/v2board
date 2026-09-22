import React from 'react';
import Switch from 'antd/lib/switch';
import ConfigRow from './ConfigRow';
import type {
    ConfigChangeHandler,
    ConfigValue,
    PlanSummary,
    SiteConfig,
} from '../../../../types/config';

interface TextSettingProps {
    title: string;
    description?: string;
    placeholder?: string;
    value?: Exclude<ConfigValue, null>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    multiline?: boolean;
}

function TextSetting({
    title,
    description,
    placeholder,
    value,
    onChange,
    multiline = false,
}: TextSettingProps) {
    const field = multiline ? (
        <textarea
            rows={4}
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

interface SiteConfigTabProps {
    site: SiteConfig;
    plans: PlanSummary[];
    onChange: ConfigChangeHandler<SiteConfig>;
}

export default function SiteConfigTab({ site, plans, onChange }: SiteConfigTabProps) {
    return (
        <div>
            <TextSetting
                title="站点名称"
                description="用于显示需要站点名称的地方。"
                placeholder="请输入站点名称"
                value={site.app_name}
                onChange={(event) => onChange('app_name', event.target.value)}
            />
            <TextSetting
                title="站点描述"
                description="用于显示需要站点描述的地方。"
                placeholder="请输入站点描述"
                value={site.app_description}
                onChange={(event) => onChange('app_description', event.target.value)}
            />
            <TextSetting
                title="站点网址"
                description="当前网站最新网址，将会在邮件等需要用于网址处体现。"
                placeholder="请输入站点URL，末尾不要/"
                value={site.app_url}
                onChange={(event) => onChange('app_url', event.target.value)}
            />
            <ConfigRow
                title="强制HTTPS"
                description="当站点没有使用HTTPS，CDN或反代开启强制HTTPS时需要开启。"
            >
                <Switch
                    checked={Boolean(parseInt(String(site.force_https), 10))}
                    onChange={(enabled) => onChange('force_https', enabled ? 1 : 0)}
                />
            </ConfigRow>
            <TextSetting
                title="LOGO"
                description="用于显示需要LOGO的地方。"
                placeholder="请输入LOGO URL，末尾不要/"
                value={site.logo}
                onChange={(event) => onChange('logo', event.target.value)}
            />
            <TextSetting
                title="订阅URL"
                description="用于订阅所使用，留空则为站点URL。如需多个订阅URL随机获取请使用逗号进行分割。"
                placeholder="请输入订阅URL，末尾不要/。逗号分割支持多域名"
                value={site.subscribe_url}
                onChange={(event) => onChange('subscribe_url', event.target.value)}
                multiline
            />
            <TextSetting
                title="订阅路径"
                description="用于订阅所使用，留空则为/api/v1/client/subscribe。如需更换不同的订阅路径请设置。"
                placeholder="/api/v1/client/subscribe"
                value={site.subscribe_path}
                onChange={(event) => onChange('subscribe_path', event.target.value)}
            />
            <TextSetting
                title="用户条款(TOS)URL"
                description="用于跳转到用户条款(TOS)"
                placeholder="请输入用户条款URL，末尾不要/"
                value={site.tos_url}
                onChange={(event) => onChange('tos_url', event.target.value)}
            />
            <ConfigRow title="停止新用户注册" description="开启后任何人都将无法进行注册。">
                <Switch
                    checked={Boolean(parseInt(String(site.stop_register), 10))}
                    onChange={(enabled) => onChange('stop_register', enabled ? 1 : 0)}
                />
            </ConfigRow>
            <ConfigRow
                title="注册试用"
                description="选择需要试用的订阅，如果没有选项请先前往订阅管理添加。"
            >
                <select
                    className="form-control"
                    value={site.try_out_plan_id}
                    placeholder="请选择试用订阅"
                    onChange={(event) => onChange('try_out_plan_id', event.target.value)}
                >
                    <option value={0}>关闭</option>
                    {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </select>
            </ConfigRow>
            {site.try_out_plan_id !== 0 && (
                <ConfigRow isChildren title="试用时间(小时)">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="请输入"
                        defaultValue={site.try_out_hour}
                        onChange={(event) => onChange('try_out_hour', event.target.value)}
                    />
                </ConfigRow>
            )}
            <TextSetting
                title="货币单位"
                description="仅用于展示使用，更改后系统中所有的货币单位都将发生变更。"
                placeholder="CNY"
                value={site.currency}
                onChange={(event) => onChange('currency', event.target.value)}
            />
            <TextSetting
                title="货币符号"
                description="仅用于展示使用，更改后系统中所有的货币单位都将发生变更。"
                placeholder="¥"
                value={site.currency_symbol}
                onChange={(event) => onChange('currency_symbol', event.target.value)}
            />
        </div>
    );
}
