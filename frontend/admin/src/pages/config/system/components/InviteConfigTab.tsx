import React from 'react';
import Switch from 'antd/lib/switch';
import ConfigRow from './ConfigRow';
import InviteCommissionDistribution from './InviteCommissionDistribution';
import type {
    ConfigGroupChangeHandler,
    ConfigValue,
    InviteConfig,
} from '@/types/systemConfigurationContracts';

interface TextSettingProps {
    title: string;
    description?: string;
    value?: Exclude<ConfigValue, null>;
    onChange: (value: ConfigValue) => void;
    parseValue?: (value: string) => ConfigValue;
    multiline?: boolean;
    isChildren?: boolean;
    placeholder?: string;
}

function TextSetting({
    title,
    description,
    value,
    onChange,
    parseValue = (value) => value,
    multiline = false,
    isChildren = false,
    placeholder = '请输入',
}: TextSettingProps) {
    const field = multiline ? (
        <textarea
            rows={4}
            className="form-control"
            placeholder="请输入后缀域名，逗号分割 如：支付宝,USDT,贝宝"
            defaultValue={value}
            onChange={(event) => onChange(parseValue(event.target.value))}
        />
    ) : (
        <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            defaultValue={value}
            onChange={(event) => onChange(parseValue(event.target.value))}
        />
    );
    return (
        <ConfigRow isChildren={isChildren} title={title} description={description}>
            {field}
        </ConfigRow>
    );
}

interface ToggleSettingProps {
    title: string;
    description?: string;
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

interface InviteConfigTabProps {
    invite: InviteConfig;
    onChange: ConfigGroupChangeHandler;
}

export default function InviteConfigTab({ invite, onChange }: InviteConfigTabProps) {
    return (
        <div>
            <ToggleSetting
                title="开启强制邀请"
                description="开启后只有被邀请的用户才可以进行注册。"
                value={invite.invite_force}
                onChange={(value) => onChange('invite', 'invite_force', value)}
            />
            <TextSetting
                title="邀请佣金百分比"
                description="默认全局的佣金分配比例，你可以在用户管理单独配置单个比例。"
                value={invite.invite_commission}
                onChange={(value) => onChange('invite', 'invite_commission', value)}
                parseValue={(value) => parseInt(value)}
            />
            <TextSetting
                title="用户可创建邀请码上限"
                value={invite.invite_gen_limit}
                onChange={(value) => onChange('invite', 'invite_gen_limit', value)}
                parseValue={(value) => parseInt(value)}
            />
            <ToggleSetting
                title="邀请码永不失效"
                description="开启后邀请码被使用后将不会失效，否则使用过后即失效。"
                value={invite.invite_never_expire}
                onChange={(value) => onChange('invite', 'invite_never_expire', value)}
            />
            <ToggleSetting
                title="佣金仅首次发放"
                description="开启后被邀请人首次支付时才会产生佣金，可以在用户管理对用户进行单独配置。"
                value={invite.commission_first_time_enable}
                onChange={(value) => onChange('invite', 'commission_first_time_enable', value)}
            />
            <ToggleSetting
                title="佣金自动确认"
                description="开启后佣金将会在订单完成3日后自动进行确认。"
                value={invite.commission_auto_check_enable}
                onChange={(value) => onChange('invite', 'commission_auto_check_enable', value)}
            />
            <TextSetting
                title="提现单申请门槛(元)"
                description="小于门槛金额的提现单将不会被提交。"
                value={invite.commission_withdraw_limit}
                onChange={(value) => onChange('invite', 'commission_withdraw_limit', value)}
            />
            <TextSetting
                title="提现方式"
                description="可以支持的提现方式。"
                value={invite.commission_withdraw_method}
                onChange={(value) => onChange('invite', 'commission_withdraw_method', value)}
                parseValue={(value) => value.split(',')}
                multiline
            />
            <ToggleSetting
                title="关闭提现"
                description="关闭后将禁止用户申请提现，且邀请佣金将会直接进入用户余额。"
                value={invite.withdraw_close_enable}
                onChange={(value) => onChange('invite', 'withdraw_close_enable', value)}
            />
            <ToggleSetting
                title="三级分销"
                description="开启后将佣金将按照设置的3成比例进行分成，三成比例合计请不要>100%。"
                value={invite.commission_distribution_enable}
                onChange={(value) => onChange('invite', 'commission_distribution_enable', value)}
            />
            <InviteCommissionDistribution
                invite={invite}
                onChange={(field, value) => onChange('invite', field, value)}
                TextSetting={TextSetting}
            />
        </div>
    );
}
