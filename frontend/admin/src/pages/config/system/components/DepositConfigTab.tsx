import React from 'react';
import ConfigRow from './ConfigRow';
import type { ConfigChangeHandler, DepositConfig } from '../../../../types/config';

interface DepositConfigTabProps {
    deposit: DepositConfig;
    onChange: ConfigChangeHandler<DepositConfig>;
}

export default function DepositConfigTab({ deposit, onChange }: DepositConfigTabProps) {
    return (
        <div>
            <ConfigRow title="充值奖励" description="充值一定金额可以获得的奖励。">
                <textarea
                    rows={2}
                    className="form-control"
                    placeholder={'请输入 充值金额:奖励金额,逗号分割\n如 50:18,100:38, 200:88'}
                    defaultValue={deposit.deposit_bounus}
                    onChange={(event) => onChange('deposit_bounus', event.target.value.split(','))}
                />
            </ConfigRow>
        </div>
    );
}
