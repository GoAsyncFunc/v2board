import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/serverContracts';

export const SHADOWSOCKS_CIPHERS = [
    'aes-128-gcm',
    'aes-192-gcm',
    'aes-256-gcm',
    'chacha20-ietf-poly1305',
    '2022-blake3-aes-128-gcm',
    '2022-blake3-aes-256-gcm',
] as const;

export interface ShadowsocksSecuritySettingsProps {
    server: Pick<ServerRecord, 'cipher' | 'obfs' | 'obfs_settings'>;
    onChange: <Field extends keyof ServerRecord>(field: Field, value: ServerRecord[Field]) => void;
    onObfsChange: (field: 'path' | 'host', value: string) => void;
}

export function ShadowsocksSecuritySettings({
    server,
    onChange,
    onObfsChange,
}: ShadowsocksSecuritySettingsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>加密算法</label>
                <Select
                    value={server.cipher}
                    onChange={(cipher) => onChange('cipher', cipher)}
                    style={{ width: '100%' }}
                >
                    {SHADOWSOCKS_CIPHERS.map((cipher) => (
                        <Select.Option key={cipher} value={cipher}>
                            {cipher}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="form-group">
                <label>混淆</label>
                <Select
                    value={server.obfs || ''}
                    onChange={(obfs) => onChange('obfs', obfs)}
                    style={{ width: '100%' }}
                >
                    <Select.Option value="">无</Select.Option>
                    <Select.Option value="http">HTTP</Select.Option>
                </Select>
                {server.obfs === 'http' && (
                    <div className="row mt-2">
                        <div className="form-group col-4 mb-0">
                            <Input
                                placeholder="路径"
                                value={server.obfs_settings?.path}
                                onChange={(event) => onObfsChange('path', event.target.value)}
                            />
                        </div>
                        <div className="form-group col-8 mb-0">
                            <Input
                                placeholder="Host"
                                value={server.obfs_settings?.host}
                                onChange={(event) => onObfsChange('host', event.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
