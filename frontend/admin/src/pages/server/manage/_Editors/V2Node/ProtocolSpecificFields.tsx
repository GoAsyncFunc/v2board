import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/server';
import type { OpenV2NodeSettings, UpdateV2Node } from './types';

const SHADOWSOCKS_CIPHERS = [
    'aes-128-gcm',
    'aes-192-gcm',
    'aes-256-gcm',
    'chacha20-ietf-poly1305',
    '2022-blake3-aes-128-gcm',
    '2022-blake3-aes-256-gcm',
];

interface V2NodeProtocolSpecificFieldsProps {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}

function YesNoSelect({
    field,
    value,
    onChange,
}: {
    field: 'disable_sni' | 'zero_rtt_handshake';
    value: ServerRecord['disable_sni'];
    onChange: UpdateV2Node;
}): React.ReactElement {
    return (
        <Select
            value={parseInt(String(value), 10) ? 1 : 0}
            style={{ width: '100%' }}
            onChange={(nextValue) => onChange(field, nextValue)}
        >
            <Select.Option value={0}>否</Select.Option>
            <Select.Option value={1}>是</Select.Option>
        </Select>
    );
}

export default function V2NodeProtocolSpecificFields({
    server,
    onChange,
    onOpenSettings,
}: V2NodeProtocolSpecificFieldsProps): React.ReactElement {
    const protocol = server.protocol;

    return (
        <>
            {protocol === 'hysteria2' && (
                <>
                    <div className="row">
                        <div className="form-group col-md-6 col-xs-12">
                            <label>混淆方式obfs</label>
                            <Select
                                value={server.obfs ?? ''}
                                style={{ width: '100%' }}
                                onChange={(value) => onChange('obfs', value || null)}
                            >
                                <Select.Option value="">无</Select.Option>
                                <Select.Option value="salamander">salamander</Select.Option>
                            </Select>
                        </div>
                        {server.obfs === 'salamander' && (
                            <div className="form-group col-md-6 col-xs-12">
                                <label>混淆密码obfs_password</label>
                                <Input
                                    value={server.obfs_password}
                                    placeholder="留空自动生成"
                                    onChange={(event) =>
                                        onChange('obfs_password', event.target.value)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>上行带宽</label>
                        <Input
                            addonAfter="Mbps"
                            placeholder="服务端发送带宽,留空或填0使用BBR"
                            value={server.up_mbps ?? undefined}
                            onChange={(event) => onChange('up_mbps', event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>下行带宽</label>
                        <Input
                            addonAfter="Mbps"
                            placeholder="服务端接收带宽,留空或填0使用BBR"
                            value={server.down_mbps ?? undefined}
                            onChange={(event) => onChange('down_mbps', event.target.value)}
                        />
                    </div>
                </>
            )}
            {protocol === 'tuic' && (
                <>
                    <div className="row">
                        <div className="form-group col-md-6 col-xs-12">
                            <label>禁用SNI</label>
                            <YesNoSelect
                                field="disable_sni"
                                value={server.disable_sni}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group col-md-6 col-xs-12">
                            <label>数据包中继模式</label>
                            <Select
                                value={server.udp_relay_mode || 'native'}
                                style={{ width: '100%' }}
                                onChange={(value) => onChange('udp_relay_mode', value)}
                            >
                                <Select.Option value="native">native</Select.Option>
                                <Select.Option value="quic">quic</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6 col-xs-12">
                            <label>拥塞控制算法</label>
                            <Select
                                value={server.congestion_control || 'cubic'}
                                style={{ width: '100%' }}
                                onChange={(value) => onChange('congestion_control', value)}
                            >
                                <Select.Option value="cubic">cubic</Select.Option>
                                <Select.Option value="new_reno">new_reno</Select.Option>
                                <Select.Option value="bbr">bbr</Select.Option>
                            </Select>
                        </div>
                        <div className="form-group col-md-6 col-xs-12">
                            <label>客户端启用 0-RTT</label>
                            <YesNoSelect
                                field="zero_rtt_handshake"
                                value={server.zero_rtt_handshake}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </>
            )}
            {protocol === 'shadowsocks' && (
                <div className="form-group">
                    <label>加密算法</label>
                    <Select
                        value={server.cipher ?? 'aes-128-gcm'}
                        style={{ width: '100%' }}
                        onChange={(value) => onChange('cipher', value)}
                    >
                        {SHADOWSOCKS_CIPHERS.map((value) => (
                            <Select.Option key={value} value={value}>
                                {value}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            )}
            {protocol === 'vless' && (
                <>
                    <div className="form-group">
                        <label>
                            加密方式{' '}
                            {server.encryption && (
                                <a
                                    href="javascript:void(0);"
                                    onClick={() =>
                                        onOpenSettings('编辑加密配置', 'encryption_settings')
                                    }
                                >
                                    编辑配置
                                </a>
                            )}
                        </label>
                        <Select
                            value={server.encryption ?? ''}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange('encryption', value || null)}
                        >
                            <Select.Option value="">无</Select.Option>
                            <Select.Option value="mlkem768x25519plus">
                                MLKEM768X25519PLUS
                            </Select.Option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label>XTLS流控算法</label>
                        <Select
                            value={server.flow ?? ''}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange('flow', value || null)}
                        >
                            <Select.Option value="">无</Select.Option>
                            <Select.Option value="xtls-rprx-vision">xtls-rprx-vision</Select.Option>
                        </Select>
                    </div>
                </>
            )}
        </>
    );
}
