import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../types/server';
import type { OpenVmessSettings, UpdateVmessServer } from '../serverEditorTypes';

export interface VmessNetworkFieldsProps {
    server: ServerRecord;
    onChange: UpdateVmessServer;
    onOpenSettings: OpenVmessSettings;
}

export default function VmessNetworkFields({
    server,
    onChange,
    onOpenSettings,
}: VmessNetworkFieldsProps): React.ReactElement {
    return (
        <div className="form-group">
            <label>
                传输协议{' '}
                <a
                    href="javascript:void(0);"
                    onClick={() => onOpenSettings('编辑协议配置', 'networkSettings')}
                >
                    编辑配置
                </a>
            </label>
            <Select
                value={server.network}
                placeholder="选择传输协议"
                style={{ width: '100%' }}
                onChange={(network) => onChange('network', network)}
            >
                <Select.Option value="tcp">TCP</Select.Option>
                <Select.Option value="ws">WebSocket</Select.Option>
                <Select.Option value="grpc">gRPC</Select.Option>
                <Select.Option value="kcp">mKCP</Select.Option>
                <Select.Option value="httpupgrade">HTTPUpgrade</Select.Option>
                <Select.Option value="xhttp">XHTTP</Select.Option>
            </Select>
        </div>
    );
}
