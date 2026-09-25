import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/serverContracts';

export interface HysteriaObfuscationSettingsProps {
    server: Pick<ServerRecord, 'version' | 'obfs' | 'obfs_password'>;
    onChange: <Field extends keyof ServerRecord>(field: Field, value: ServerRecord[Field]) => void;
}

export function HysteriaObfuscationSettings({
    server,
    onChange,
}: HysteriaObfuscationSettingsProps): React.ReactElement {
    const version = parseInt(String(server.version), 10) || 1;
    const method = version === 1 ? 'xplus' : 'salamander';

    return (
        <div className="row">
            <div className="form-group col-md-6 col-xs-12">
                <label>混淆方式obfs</label>
                <Select
                    value={server.obfs ?? undefined}
                    style={{ width: '100%' }}
                    onChange={(obfs) => onChange('obfs', obfs || null)}
                >
                    <Select.Option value="">无</Select.Option>
                    <Select.Option value={method}>{method}</Select.Option>
                </Select>
            </div>
            {server.obfs === method && (
                <div className="form-group col-md-6 col-xs-12">
                    <label>{version === 1 ? '混淆密码obfsParam' : '混淆密码obfs_password'}</label>
                    <Input
                        value={server.obfs_password}
                        placeholder="留空自动生成"
                        onChange={(event) => onChange('obfs_password', event.target.value)}
                    />
                </div>
            )}
        </div>
    );
}
