import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../../types/serverContracts';
import type { UpdateV2Node } from '../../serverEditorTypes';

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

export function TuicFields({
    server,
    onChange,
}: {
    server: ServerRecord;
    onChange: UpdateV2Node;
}): React.ReactElement {
    return (
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
    );
}
