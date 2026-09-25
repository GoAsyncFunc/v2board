import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { Scalar, ServerRecord } from '../../../../../types/serverContracts';

export interface TuicTransportSettingsProps {
    server: Pick<
        ServerRecord,
        | 'insecure'
        | 'disable_sni'
        | 'udp_relay_mode'
        | 'server_name'
        | 'congestion_control'
        | 'zero_rtt_handshake'
    >;
    onChange: <Field extends keyof ServerRecord>(field: Field, value: ServerRecord[Field]) => void;
}

function YesNoSelect({
    value,
    onChange,
}: {
    value: Scalar | undefined;
    onChange: (value: Scalar | undefined) => void;
}): React.ReactElement {
    return (
        <Select
            value={parseInt(String(value), 10) ? 1 : 0}
            style={{ width: '100%' }}
            onChange={onChange}
        >
            <Select.Option value={0}>否</Select.Option>
            <Select.Option value={1}>是</Select.Option>
        </Select>
    );
}

export function TuicTransportSettings({
    server,
    onChange,
}: TuicTransportSettingsProps): React.ReactElement {
    const disableSni = Boolean(parseInt(String(server.disable_sni), 10));

    return (
        <>
            <div className="row">
                <div className="form-group col-md-6 col-xs-12">
                    <label>禁用SNI</label>
                    <YesNoSelect
                        value={server.disable_sni}
                        onChange={(value) => onChange('disable_sni', value)}
                    />
                </div>
                <div className="form-group col-md-6 col-xs-12">
                    <label>数据包中继模式</label>
                    <Select
                        value={server.udp_relay_mode || 'native'}
                        style={{ width: '100%' }}
                        onChange={(mode) => onChange('udp_relay_mode', mode)}
                    >
                        <Select.Option value="native">native</Select.Option>
                        <Select.Option value="quic">quic</Select.Option>
                    </Select>
                </div>
            </div>
            {!disableSni && (
                <div className="form-group">
                    <label>服务器名称指示(sni)</label>
                    <Input
                        placeholder="当节点地址与证书不一致时用于证书验证"
                        value={server.server_name}
                        onChange={(event) => onChange('server_name', event.target.value)}
                    />
                </div>
            )}
            <div className="row">
                <div className="form-group col-md-6 col-xs-12">
                    <label>拥塞控制算法</label>
                    <Select
                        value={server.congestion_control || 'cubic'}
                        style={{ width: '100%' }}
                        onChange={(algorithm) => onChange('congestion_control', algorithm)}
                    >
                        <Select.Option value="cubic">cubic</Select.Option>
                        <Select.Option value="new_reno">new_reno</Select.Option>
                        <Select.Option value="bbr">bbr</Select.Option>
                    </Select>
                </div>
                <div className="form-group col-md-6 col-xs-12">
                    <label>客户端启用 0-RTT</label>
                    <YesNoSelect
                        value={server.zero_rtt_handshake}
                        onChange={(value) => onChange('zero_rtt_handshake', value)}
                    />
                </div>
            </div>
        </>
    );
}
