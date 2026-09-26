import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { NodeTlsSettings } from '@/types/serverContracts';

type SecurityInputValue = string | number | null | undefined;

export interface TlsRealitySettingsProps {
    settings: NodeTlsSettings;
    tlsMode: number;
    onChange: <Field extends keyof NodeTlsSettings>(
        field: Field,
        value: NodeTlsSettings[Field],
    ) => void;
}

function inputValue(value: SecurityInputValue): string | number | undefined {
    return value ?? undefined;
}

function numericSetting(value: SecurityInputValue): number {
    return parseInt(String(value ?? ''), 10) || 0;
}

export function TlsRealitySettings({
    settings,
    tlsMode,
    onChange,
}: TlsRealitySettingsProps): React.ReactElement | null {
    if (tlsMode !== 2) return null;

    return (
        <>
            <div className="form-group">
                <label>Server Address</label>
                <Input
                    value={inputValue(settings.dest)}
                    onChange={(event) => onChange('dest', event.target.value)}
                    placeholder="REALITY目标地址,默认使用SNI"
                />
            </div>
            <div className="form-group">
                <label>Server Port</label>
                <Input
                    value={inputValue(settings.server_port)}
                    onChange={(event) => onChange('server_port', event.target.value)}
                    placeholder="REALITY目标端口,默认443"
                />
            </div>
            <div className="form-group">
                <label>Proxy Protocol</label>
                <Select
                    value={numericSetting(settings.xver)}
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('xver', value)}
                >
                    <Select.Option value={0}>0</Select.Option>
                    <Select.Option value={1}>1</Select.Option>
                    <Select.Option value={2}>2</Select.Option>
                </Select>
            </div>
            <div className="form-group">
                <label>Private Key</label>
                <Input
                    value={inputValue(settings.private_key)}
                    onChange={(event) => onChange('private_key', event.target.value)}
                    placeholder="留空自动生成"
                />
            </div>
            <div className="form-group">
                <label>Public Key</label>
                <Input
                    value={inputValue(settings.public_key)}
                    onChange={(event) => onChange('public_key', event.target.value)}
                    placeholder="留空自动生成"
                />
            </div>
            <div className="form-group">
                <label>ShortId</label>
                <Input
                    value={inputValue(settings.short_id)}
                    onChange={(event) => onChange('short_id', event.target.value)}
                    placeholder="留空自动生成"
                />
            </div>
        </>
    );
}
