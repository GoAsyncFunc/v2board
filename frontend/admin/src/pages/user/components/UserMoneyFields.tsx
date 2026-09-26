import React from 'react';
import Input from 'antd/lib/input';
import type { UserRecord } from '@/types/userContracts';

export interface UserMoneyFieldsProps {
    user: Partial<UserRecord>;
    onChange: <Field extends keyof UserRecord>(field: Field, value: UserRecord[Field]) => void;
}

export function UserMoneyFields({ user, onChange }: UserMoneyFieldsProps): React.ReactElement {
    return (
        <div className="row">
            <div className="form-group col-md-6 col-xs-12">
                <label>余额</label>
                <Input
                    type="number"
                    addonAfter="¥"
                    placeholder="余额"
                    defaultValue={user.balance}
                    onChange={(event) => onChange('balance', event.target.value)}
                />
            </div>
            <div className="form-group col-md-6 col-xs-12">
                <label>推广佣金</label>
                <Input
                    type="number"
                    addonAfter="¥"
                    placeholder="推广佣金"
                    defaultValue={user.commission_balance}
                    onChange={(event) => onChange('commission_balance', event.target.value)}
                />
            </div>
        </div>
    );
}
