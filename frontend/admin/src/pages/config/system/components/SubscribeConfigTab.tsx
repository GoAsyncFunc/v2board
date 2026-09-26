import React from 'react';
import Switch from 'antd/lib/switch';
import ConfigRow from './ConfigRow';
import SubscribeLinkValidity from './SubscribeLinkValidity';
import type {
    ConfigGroupChangeHandler,
    SubscribeConfig,
} from '@/types/systemConfigurationContracts';

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

interface SelectOption {
    value: number;
    label: string;
}

interface SelectSettingProps {
    title: string;
    description: string;
    value?: string | number;
    options: SelectOption[];
    onChange: (value: string) => void;
}

function SelectSetting({ title, description, value, options, onChange }: SelectSettingProps) {
    return (
        <ConfigRow title={title} description={description}>
            <select
                className="form-control"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </ConfigRow>
    );
}

interface SubscribeConfigTabProps {
    subscribe: SubscribeConfig;
    onChange: ConfigGroupChangeHandler;
}

export default function SubscribeConfigTab({ subscribe, onChange }: SubscribeConfigTabProps) {
    const resetOptions = [
        { value: 0, label: '每月1号' },
        { value: 1, label: '按月重置' },
        { value: 2, label: '不重置' },
        { value: 3, label: '每年1月1日' },
        { value: 4, label: '按年重置' },
    ];
    const eventOptions = [
        { value: 0, label: '不执行任何动作' },
        { value: 1, label: '重置用户流量' },
    ];
    const linkModeOptions = [
        { value: 0, label: '永久有效' },
        { value: 1, label: '一次性有效' },
        { value: 2, label: '限时有效' },
    ];
    return (
        <div>
            <ToggleSetting
                title="允许用户更改订阅"
                description="开启后用户将会可以对订阅计划进行变更。"
                value={subscribe.plan_change_enable}
                onChange={(value) => onChange('subscribe', 'plan_change_enable', value)}
            />
            <SelectSetting
                title="月流量重置方式"
                description="全局流量重置方式，默认每月1号。可以在订阅管理为订阅单独设置。"
                value={subscribe.reset_traffic_method}
                options={resetOptions}
                onChange={(value) => onChange('subscribe', 'reset_traffic_method', value)}
            />
            <ToggleSetting
                title="开启折抵方案"
                description="开启后用户更换订阅将会由系统对原有订阅进行折抵，方案参考文档。"
                value={subscribe.surplus_enable}
                onChange={(value) => onChange('subscribe', 'surplus_enable', value)}
            />
            <ToggleSetting
                title="允许提前开启流量周期"
                description="开启后用户流量用尽时可以选择扣除订阅时长为代价重置流量，按月重置时扣除本周期剩余订阅时长，每月1号重置时扣除整月时间30天。"
                value={subscribe.allow_new_period}
                onChange={(value) => onChange('subscribe', 'allow_new_period', value)}
            />
            <SelectSetting
                title="当订阅新购时触发事件"
                description="新购订阅完成时将触发该任务。"
                value={subscribe.new_order_event_id}
                options={eventOptions}
                onChange={(value) => onChange('subscribe', 'new_order_event_id', value)}
            />
            <SelectSetting
                title="当订阅续费时触发事件"
                description="续费订阅完成时将触发该任务。"
                value={subscribe.renew_order_event_id}
                options={eventOptions}
                onChange={(value) => onChange('subscribe', 'renew_order_event_id', value)}
            />
            <SelectSetting
                title="当订阅变更时触发事件"
                description="变更订阅完成时将触发该任务。"
                value={subscribe.change_order_event_id}
                options={eventOptions}
                onChange={(value) => onChange('subscribe', 'change_order_event_id', value)}
            />
            <ToggleSetting
                title="在订阅中展示订阅信息"
                description="开启后将会在用户订阅节点时输出订阅信息。"
                value={subscribe.show_info_to_server_enable}
                onChange={(value) => onChange('subscribe', 'show_info_to_server_enable', value)}
            />
            <SelectSetting
                title="订阅链接生效模式"
                description="用户获取订阅链接后的有效期。"
                value={subscribe.show_subscribe_method}
                options={linkModeOptions}
                onChange={(value) => onChange('subscribe', 'show_subscribe_method', value)}
            />
            {/* The original artifact saves the expire field under the safe group. */}
            <SubscribeLinkValidity
                subscribe={subscribe}
                onChange={(field, value) => onChange('safe', field, value)}
            />
        </div>
    );
}
