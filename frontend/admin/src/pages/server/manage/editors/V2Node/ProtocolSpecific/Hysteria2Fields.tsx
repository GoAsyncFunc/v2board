import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { ServerRecord } from '../../../../../../types/server';
import type { UpdateV2Node } from '../../types';

export function Hysteria2Fields({
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
                            onChange={(event) => onChange('obfs_password', event.target.value)}
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
    );
}
