import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/server';
import type { OpenV2NodeSettings, UpdateV2Node } from './types';

const PROTOCOL_OPTIONS = [
    ['anytls', 'AnyTLS'],
    ['hysteria2', 'Hysteria2'],
    ['shadowsocks', 'Shadowsocks'],
    ['trojan', 'Trojan'],
    ['tuic', 'Tuic'],
    ['vless', 'VLess'],
    ['vmess', 'VMess'],
];

interface V2NodeProtocolFieldsProps {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}

export default function V2NodeProtocolFields({
    server,
    onChange,
    onOpenSettings,
}: V2NodeProtocolFieldsProps): React.ReactElement {
    const protocol = server.protocol;
    const requiresTls = Boolean(protocol && ['hysteria2', 'trojan', 'tuic'].includes(protocol));
    const supportsTransport = Boolean(
        protocol && !['hysteria2', 'shadowsocks', 'tuic'].includes(protocol),
    );

    return (
        <>
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
            {protocol === 'shadowsocks' && (
                <div className="form-group">
                    <label>
                        传输协议{' '}
                        <a
                            href="javascript:void(0);"
                            onClick={() => onOpenSettings('编辑协议配置', 'network_settings')}
                        >
                            编辑配置
                        </a>
                    </label>
                    <Select
                        value={server.network ?? 'tcp'}
                        style={{ width: '100%' }}
                        onChange={(value) => onChange('network', value)}
                    >
                        <Select.Option value="tcp">TCP</Select.Option>
                        <Select.Option value="http">HTTP伪装</Select.Option>
                    </Select>
                </div>
            )}
            {supportsTransport && (
                <div className="form-group">
                    <label>
                        传输协议{' '}
                        <a
                            href="javascript:void(0);"
                            onClick={() => onOpenSettings('编辑协议配置', 'network_settings')}
                        >
                            编辑配置
                        </a>
                    </label>
                    <Select
                        value={server.network ?? 'tcp'}
                        style={{ width: '100%' }}
                        onChange={(value) => onChange('network', value)}
                    >
                        <Select.Option value="tcp">TCP</Select.Option>
                        <Select.Option value="ws">WebSocket</Select.Option>
                        <Select.Option value="grpc">gRPC</Select.Option>
                        {protocol !== 'trojan' && (
                            <Select.Option value="httpupgrade">HTTPUpgrade</Select.Option>
                        )}
                        {protocol !== 'trojan' && (
                            <Select.Option value="xhttp">XHTTP</Select.Option>
                        )}
                    </Select>
                </div>
            )}
            {['xhttp', 'ws', 'grpc'].includes(server.network || '') && (
                <div className="form-group">
                    <label>信任的XFF头部(获取真实IP)</label>
                    <Select
                        mode="tags"
                        value={server.trusted_x_forwarded_for || []}
                        style={{ width: '100%' }}
                        placeholder="常见头部:X-Forwarded-For CF-Connecting-IP X-Real-IP"
                        onChange={(headers) =>
                            onChange('trusted_x_forwarded_for', headers.length ? headers : null)
                        }
                    />
                </div>
            )}
            {protocol === 'anytls' && (
                <div className="form-group">
                    <label>
                        <a
                            href="javascript:void(0);"
                            onClick={() => onOpenSettings('编辑填充方案', 'padding_scheme')}
                        >
                            编辑填充方案
                        </a>
                    </label>
                </div>
            )}
        </>
    );
}
