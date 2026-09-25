import React from 'react';
import Input from 'antd/lib/input';
import { UserFormFieldGroup } from './UserFormFieldGroup';
import type { UserRecord } from '../../../types/userContracts';
import { toInputDefaultValue } from './UserFormValues';

export interface UserTrafficFieldsProps {
    user: Partial<UserRecord>;
    onChange: <Field extends keyof UserRecord>(field: Field, value: UserRecord[Field]) => void;
}

export function UserTrafficFields({ user, onChange }: UserTrafficFieldsProps): React.ReactElement {
    return (
        <>
            <div className="row">
                <div className="form-group col-md-6 col-xs-12">
                    <label>已用上行</label>
                    <Input
                        type="number"
                        addonAfter="GB"
                        placeholder="已用上行"
                        defaultValue={user.u}
                        onChange={(event) => onChange('u', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-6 col-xs-12">
                    <label>已用下行</label>
                    <Input
                        type="number"
                        addonAfter="GB"
                        placeholder="已用下行"
                        defaultValue={user.d}
                        onChange={(event) => onChange('d', event.target.value)}
                    />
                </div>
            </div>
            <UserFormFieldGroup label="流量">
                <Input
                    type="number"
                    addonAfter="GB"
                    defaultValue={toInputDefaultValue(user.transfer_enable)}
                    placeholder="请输入流量"
                    onChange={(event) => onChange('transfer_enable', event.target.value)}
                />
            </UserFormFieldGroup>
            <UserFormFieldGroup label="设备数限制">
                <Input
                    placeholder="留空则不限制"
                    defaultValue={toInputDefaultValue(user.device_limit)}
                    onChange={(event) => onChange('device_limit', event.target.value)}
                />
            </UserFormFieldGroup>
        </>
    );
}
