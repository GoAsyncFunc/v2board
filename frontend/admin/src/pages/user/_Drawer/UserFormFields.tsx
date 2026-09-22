import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import NullableSelectOption from '../../../components/common/NullableSelectOption';
import type { UserPlanOption, UserRecord } from '../../../types/user';

interface FormGroupProps {
    label: React.ReactNode;
    children: React.ReactNode;
}

interface UserMoneyFieldsProps {
    user: Partial<UserRecord>;
    onChange: UserFormFieldsProps['onChange'];
}

function UserMoneyFields({ user, onChange }: UserMoneyFieldsProps): React.ReactElement {
    return (
        <div className="row">
            <div className="form-group col-md-6 col-xs-12">
                <label>余额</label>
                <Input
                    type="number"
                    addonAfter="¥"
                    placeholder="余额"
                    defaultValue={user.balance as string | number | undefined}
                    onChange={(event) => onChange('balance', event.target.value)}
                />
            </div>
            <div className="form-group col-md-6 col-xs-12">
                <label>推广佣金</label>
                <Input
                    type="number"
                    addonAfter="¥"
                    placeholder="推广佣金"
                    defaultValue={user.commission_balance as string | number | undefined}
                    onChange={(event) => onChange('commission_balance', event.target.value)}
                />
            </div>
        </div>
    );
}

interface UserTrafficFieldsProps {
    user: Partial<UserRecord>;
    onChange: UserFormFieldsProps['onChange'];
}

function UserTrafficFields({ user, onChange }: UserTrafficFieldsProps): React.ReactElement {
    return (
        <>
            <div className="row">
                <div className="form-group col-md-6 col-xs-12">
                    <label>已用上行</label>
                    <Input
                        type="number"
                        addonAfter="GB"
                        placeholder="已用上行"
                        defaultValue={user.u as string | number | undefined}
                        onChange={(event) => onChange('u', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-6 col-xs-12">
                    <label>已用下行</label>
                    <Input
                        type="number"
                        addonAfter="GB"
                        placeholder="已用下行"
                        defaultValue={user.d as string | number | undefined}
                        onChange={(event) => onChange('d', event.target.value)}
                    />
                </div>
            </div>
            <FormGroup label="流量">
                <Input
                    type="number"
                    addonAfter="GB"
                    defaultValue={user.transfer_enable as string | number | undefined}
                    placeholder="请输入流量"
                    onChange={(event) => onChange('transfer_enable', event.target.value)}
                />
            </FormGroup>
            <FormGroup label="设备数限制">
                <Input
                    placeholder="留空则不限制"
                    defaultValue={user.device_limit as string | number | undefined}
                    onChange={(event) => onChange('device_limit', event.target.value)}
                />
            </FormGroup>
        </>
    );
}

function FormGroup({ label, children }: FormGroupProps): React.ReactElement {
    return (
        <div className="form-group">
            <label>{label}</label>
            {children}
        </div>
    );
}

export interface UserFormFieldsProps {
    user: Partial<UserRecord>;
    plans: UserPlanOption[];
    onChange: <Field extends keyof UserRecord>(field: Field, value: UserRecord[Field]) => void;
}

export function UserFormFields({ user, plans, onChange }: UserFormFieldsProps): React.ReactElement {
    return (
        <div>
            <FormGroup label="邮箱">
                <Input
                    placeholder="请输入邮箱"
                    defaultValue={user.email}
                    onChange={(event) => onChange('email', event.target.value)}
                />
            </FormGroup>
            <FormGroup label="邀请人邮箱">
                <Input
                    placeholder="请输入邀请人邮箱"
                    defaultValue={user.invite_user_email}
                    onChange={(event) => onChange('invite_user_email', event.target.value)}
                />
            </FormGroup>
            <FormGroup label="密码">
                <Input
                    defaultValue={user.password}
                    placeholder="如需修改密码请输入"
                    onChange={(event) => onChange('password', event.target.value)}
                />
            </FormGroup>
            <UserMoneyFields user={user} onChange={onChange} />
            <UserTrafficFields user={user} onChange={onChange} />
            <FormGroup label="到期时间">
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
            </FormGroup>
            <FormGroup label="订阅计划">
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
            </FormGroup>
            <FormGroup label="账户状态">
                <Select
                    style={{ width: '100%' }}
                    defaultValue={user.banned ? 1 : 0}
                    onChange={(banned) => onChange('banned', banned)}
                >
                    <Select.Option value={1}>封禁</Select.Option>
                    <Select.Option value={0}>正常</Select.Option>
                </Select>
            </FormGroup>
            <FormGroup label="推荐返利类型">
                <Select
                    style={{ width: '100%' }}
                    defaultValue={parseInt(String(user.commission_type), 10)}
                    onChange={(type) => onChange('commission_type', type)}
                >
                    <Select.Option value={0}>跟随系统设置</Select.Option>
                    <Select.Option value={1}>循环返利</Select.Option>
                    <Select.Option value={2}>首次返利</Select.Option>
                </Select>
            </FormGroup>
            <FormGroup label="推荐返利比例">
                <Input
                    addonAfter="%"
                    defaultValue={user.commission_rate as string | number | undefined}
                    placeholder="请输入推荐返利比例(为空则跟随站点设置返利比例)"
                    onChange={(event) => onChange('commission_rate', event.target.value)}
                />
            </FormGroup>
            <FormGroup
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
                    defaultValue={user.discount as string | number | undefined}
                    placeholder="请输入专享折扣比例"
                    onChange={(event) => onChange('discount', event.target.value)}
                />
            </FormGroup>
            <FormGroup label="限速">
                <Input
                    addonAfter="Mbps"
                    defaultValue={user.speed_limit as string | number | undefined}
                    placeholder="留空则不限制"
                    onChange={(event) => onChange('speed_limit', event.target.value)}
                />
            </FormGroup>
            <FormGroup label="是否管理员">
                <Switch
                    checked={Boolean(user.is_admin)}
                    onChange={(enabled) => onChange('is_admin', enabled ? 1 : 0)}
                />
            </FormGroup>
            <FormGroup label="是否员工">
                <Switch
                    checked={Boolean(user.is_staff)}
                    onChange={(enabled) => onChange('is_staff', enabled ? 1 : 0)}
                />
            </FormGroup>
            <FormGroup label="备注">
                <Input.TextArea
                    rows={4}
                    placeholder="请在这里记录.."
                    defaultValue={user.remarks}
                    onChange={(event) => onChange('remarks', event.target.value)}
                />
            </FormGroup>
        </div>
    );
}
