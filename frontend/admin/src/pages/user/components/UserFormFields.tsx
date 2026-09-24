import React from 'react';
import Input from 'antd/lib/input';
import type { UserPlanOption, UserRecord } from '../../../types/user';
import { FormGroup } from './FormGroup';
import { UserAccountSettingsFields } from './UserAccountSettingsFields';
import { UserMoneyFields } from './UserMoneyFields';
import { UserTrafficFields } from './UserTrafficFields';

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
            <UserAccountSettingsFields user={user} plans={plans} onChange={onChange} />
        </div>
    );
}
