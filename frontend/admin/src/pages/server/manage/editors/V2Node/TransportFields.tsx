import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/serverContracts';
import type { OpenV2NodeSettings, UpdateV2Node } from '../serverEditorTypes';

export interface V2NodeTransportFieldsProps {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}

export default function V2NodeTransportFields({
    server,
    onChange,
    onOpenSettings,
}: V2NodeTransportFieldsProps): React.ReactElement {
    const protocol = server.protocol;
    const supportsTransport = Boolean(
        protocol && !['hysteria2', 'shadowsocks', 'tuic'].includes(protocol),
    );
    const hasShadowsocksTransport = protocol === 'shadowsocks';

    return (
        <>
            {(hasShadowsocksTransport || supportsTransport) && (
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
                        {hasShadowsocksTransport ? (
                            <Select.Option value="http">HTTP伪装</Select.Option>
                        ) : (
                            <>
                                <Select.Option value="ws">WebSocket</Select.Option>
                                <Select.Option value="grpc">gRPC</Select.Option>
                                {protocol !== 'trojan' && (
                                    <Select.Option value="httpupgrade">HTTPUpgrade</Select.Option>
                                )}
                                {protocol !== 'trojan' && (
                                    <Select.Option value="xhttp">XHTTP</Select.Option>
                                )}
                            </>
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
