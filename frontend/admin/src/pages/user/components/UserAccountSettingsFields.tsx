import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import NullableSelectOption from '../../../components/common/NullableSelectOption';
import type { UserPlanOption, UserRecord } from '../../../types/userContracts';
import { UserFormFieldGroup } from './UserFormFieldGroup';
import { toInputDefaultValue } from './UserFormValues';

export interface UserAccountSettingsFieldsProps {
    user: Partial<UserRecord>;
    plans: UserPlanOption[];
    onChange: <Field extends keyof UserRecord>(field: Field, value: UserRecord[Field]) => void;
}

export function UserAccountSettingsFields({
    user,
    plans,
    onChange,
}: UserAccountSettingsFieldsProps): React.ReactElement {
    return (
        <>
            <UserFormFieldGroup label="到期时间">
                <DatePicker
                    placeholder="长期有效"
                    defaultValue={
                        user.expired_at !== null && user.expired_at !== undefined
                            ? moment(1000 * Number(user.expired_at))
                            : null
                    }
                    style={{ width: '100%' }}
                    onChange={(date) => onChange('expired_at', date ? date.format('X') : null)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup label="订阅计划">
                <Select
                    placeholder="请选择用户订阅计划"
                    style={{ width: '100%' }}
                    defaultValue={user.plan_id || undefined}
                    onChange={(planId) => onChange('plan_id', planId)}
                >
                    <NullableSelectOption value={null}>无</NullableSelectOption>
                    {plans.map((plan) => (
                        <Select.Option key={plan.id} value={plan.id}>
                            {plan.name}
                        </Select.Option>
                    ))}
                </Select>
            </UserFormFieldGroup>
            <UserFormFieldGroup label="账户状态">
                <Select
                    style={{ width: '100%' }}
                    defaultValue={user.banned ? 1 : 0}
                    onChange={(banned) => onChange('banned', banned)}
                >
                    <Select.Option value={1}>封禁</Select.Option>
                    <Select.Option value={0}>正常</Select.Option>
                </Select>
            </UserFormFieldGroup>
            <UserFormFieldGroup label="推荐返利类型">
                <Select
                    style={{ width: '100%' }}
                    defaultValue={parseInt(String(user.commission_type), 10)}
                    onChange={(type) => onChange('commission_type', type)}
                >
                    <Select.Option value={0}>跟随系统设置</Select.Option>
                    <Select.Option value={1}>循环返利</Select.Option>
                    <Select.Option value={2}>首次返利</Select.Option>
                </Select>
            </UserFormFieldGroup>
            <UserFormFieldGroup label="推荐返利比例">
                <Input
                    addonAfter="%"
                    defaultValue={toInputDefaultValue(user.commission_rate)}
                    placeholder="请输入推荐返利比例(为空则跟随站点设置返利比例)"
                    onChange={(event) => onChange('commission_rate', event.target.value)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup
                label={
                    <>
                        专享折扣比例{' '}
                        <Tooltip placement="top" title="设置后该用户购买任何订阅将始终享受该折扣">
                            <Icon type="question-circle" />
                        </Tooltip>
                    </>
                }
            >
                <Input
                    addonAfter="%"
                    defaultValue={toInputDefaultValue(user.discount)}
                    placeholder="请输入专享折扣比例"
                    onChange={(event) => onChange('discount', event.target.value)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup label="限速">
                <Input
                    addonAfter="Mbps"
                    defaultValue={toInputDefaultValue(user.speed_limit)}
                    placeholder="留空则不限制"
                    onChange={(event) => onChange('speed_limit', event.target.value)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup label="是否管理员">
                <Switch
                    checked={Boolean(user.is_admin)}
                    onChange={(enabled) => onChange('is_admin', enabled ? 1 : 0)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup label="是否员工">
                <Switch
                    checked={Boolean(user.is_staff)}
                    onChange={(enabled) => onChange('is_staff', enabled ? 1 : 0)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup label="备注">
                <Input.TextArea
                    rows={4}
                    placeholder="请在这里记录.."
                    defaultValue={user.remarks}
                    onChange={(event) => onChange('remarks', event.target.value)}
                />
            </UserFormFieldGroup>
        </>
    );
}
