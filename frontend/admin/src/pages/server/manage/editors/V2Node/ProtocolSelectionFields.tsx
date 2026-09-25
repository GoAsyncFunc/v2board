import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/serverContracts';
import type { OpenV2NodeSettings, UpdateV2Node } from '../serverEditorTypes';

const PROTOCOL_OPTIONS = [
    ['anytls', 'AnyTLS'],
    ['hysteria2', 'Hysteria2'],
    ['shadowsocks', 'Shadowsocks'],
    ['trojan', 'Trojan'],
    ['tuic', 'Tuic'],
    ['vless', 'VLess'],
    ['vmess', 'VMess'],
];

export interface V2NodeProtocolSelectionFieldsProps {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}

export default function V2NodeProtocolSelectionFields({
    server,
    onChange,
    onOpenSettings,
}: V2NodeProtocolSelectionFieldsProps): React.ReactElement {
    const protocol = server.protocol;
    const requiresTls = Boolean(protocol && ['hysteria2', 'trojan', 'tuic'].includes(protocol));

    return (
        <div className="row">
            <div className="form-group col-md-6 col-xs-12">
                <label>节点协议</label>
                <Select
                    value={protocol}
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('protocol', value)}
                >
                    {PROTOCOL_OPTIONS.map(([value, label]) => (
                        <Select.Option key={value} value={value}>
                            {label}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {protocol && protocol !== 'shadowsocks' && (
                <div className="form-group col-md-6 col-xs-12">
                    <label>
                        安全性{' '}
                        {(parseInt(String(server.tls ?? 0), 10) !== 0 || requiresTls) && (
                            <a
                                href="javascript:void(0);"
                                onClick={() => onOpenSettings('编辑安全性配置', 'tls_settings')}
                            >
                                编辑配置
                            </a>
                        )}
                    </label>
                    <Select
                        value={parseInt(String(server.tls ?? 0), 10) || (requiresTls ? 1 : 0)}
                        style={{ width: '100%' }}
                        onChange={(value) => onChange('tls', value)}
                    >
                        {['vless', 'vmess'].includes(protocol) && (
                            <Select.Option value={0}>无</Select.Option>
                        )}
                        <Select.Option value={1}>TLS</Select.Option>
                        {['vless', 'anytls'].includes(protocol) && (
                            <Select.Option value={2}>Reality</Select.Option>
                        )}
                    </Select>
                </div>
            )}
        </div>
    );
}
