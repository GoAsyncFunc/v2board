import React from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import NullableSelectOption from '@/components/common/NullableSelectOption';

export interface UserGenerationFormValues {
    email_prefix?: string;
    email_suffix?: string;
    password?: string;
    expired_at?: string | number | null;
    plan_id?: string | number | null;
    generate_count?: string | number;
}

interface UserGenerationPlan {
    id: string | number;
    name: string;
}

interface UserGenerationFormProps {
    submit: UserGenerationFormValues;
    plans?: UserGenerationPlan[];
    isBatch: boolean;
    showPrefix: boolean;
    onChange: <Field extends keyof UserGenerationFormValues>(
        field: Field,
        value: UserGenerationFormValues[Field],
    ) => void;
}

export default function UserGenerationForm({
    submit,
    plans,
    isBatch,
    showPrefix,
    onChange,
}: UserGenerationFormProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="user-email-prefix">邮箱</label>
                <Input.Group compact>
                    {showPrefix && (
                        <Input
                            id="user-email-prefix"
                            style={{ width: '45%' }}
                            value={submit.email_prefix}
                            onChange={(event) => onChange('email_prefix', event.target.value)}
                        />
                    )}
                    <Input placeholder="@" disabled style={{ width: '10%', textAlign: 'center' }} />
                    <Input
                        placeholder="域"
                        style={{ width: showPrefix ? '45%' : '90%' }}
                        value={submit.email_suffix}
                        onChange={(event) => onChange('email_suffix', event.target.value)}
                    />
                </Input.Group>
            </div>
            <div className="form-group">
                <label htmlFor="user-password">密码</label>
                <Input
                    id="user-password"
                    value={submit.password}
                    placeholder="留空则密码与邮箱相同"
                    onChange={(event) => onChange('password', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="user-expired-at">到期时间</label>
                <DatePicker
                    id="user-expired-at"
                    style={{ width: '100%' }}
                    placeholder="请选择用户到期日期，为空则不限制到期时间"
                    defaultValue={
                        submit.expired_at ? moment.unix(Number(submit.expired_at)) : undefined
                    }
                    onChange={(value) => onChange('expired_at', value ? value.format('X') : null)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="user-plan">订阅计划</label>
                <Select
                    id="user-plan"
                    style={{ width: '100%' }}
                    placeholder="请选择用户订阅计划"
                    value={submit.plan_id || null}
                    onChange={(value: string | number | null) => onChange('plan_id', value)}
                >
                    <NullableSelectOption value={null}>无</NullableSelectOption>
                    {(plans || []).map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {isBatch && (
                <div className="form-group">
                    <label htmlFor="user-generate-count">生成数量</label>
                    <Input
                        id="user-generate-count"
                        value={submit.generate_count}
                        placeholder="如果为批量生成请输入生成数量"
                        onChange={(event) => onChange('generate_count', event.target.value)}
                    />
                </div>
            )}
        </>
    );
}
