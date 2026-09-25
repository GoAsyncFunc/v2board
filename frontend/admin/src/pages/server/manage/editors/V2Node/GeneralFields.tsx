import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import PermissionGroupEditor from '../../../../../components/common/PermissionGroupEditor';
import type { ServerGroupOption, ServerRecord } from '../../../../../types/server';
import type { UpdateV2Node } from '../serverEditorTypes';

interface V2NodeGeneralFieldsProps {
    server: ServerRecord;
    groups: ServerGroupOption[];
    onChange: UpdateV2Node;
}

export default function V2NodeGeneralFields({
    server,
    groups,
    onChange,
}: V2NodeGeneralFieldsProps): React.ReactElement {
    return (
        <>
            <div className="row">
                <div className="form-group col-8">
                    <label>节点名称</label>
                    <Input
                        placeholder="请输入节点名称"
                        value={server.name}
                        onChange={(event) => onChange('name', event.target.value)}
                    />
                </div>
                <div className="form-group col-4">
                    <label>倍率</label>
                    <Input
                        addonAfter="x"
                        placeholder="请输入节点倍率"
                        value={server.rate ?? undefined}
                        onChange={(event) => onChange('rate', event.target.value)}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>节点标签</label>
                <Select
                    mode="tags"
                    value={server.tags || []}
                    style={{ width: '100%' }}
                    placeholder="输入后回车添加标签"
                    onChange={(tags) => onChange('tags', tags.length ? tags : null)}
                />
            </div>
            <div className="form-group">
                <label>
                    权限组{' '}
                    <PermissionGroupEditor>
                        <a href="javascript:void(0);">添加权限组</a>
                    </PermissionGroupEditor>
                </label>
                <Select
                    mode="multiple"
                    value={server.group_id}
                    placeholder="请选择权限组"
                    style={{ width: '100%' }}
                    onChange={(groupIds) => onChange('group_id', groupIds)}
                >
                    {groups.map((group) => (
                        <Select.Option key={group.id} value={group.id}>
                            {group.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="row">
                <div className="form-group col-md-6 col-xs-12">
                    <label>连接地址</label>
                    <Input
                        placeholder="地址或IP"
                        value={server.host}
                        onChange={(event) => onChange('host', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-6 col-xs-12">
                    <label>监听地址</label>
                    <Input
                        placeholder="地址或IP默认为0.0.0.0"
                        value={server.listen_ip}
                        onChange={(event) => onChange('listen_ip', event.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6 col-xs-12">
                    <label>连接端口</label>
                    <Input
                        placeholder="用户连接端口"
                        value={server.port ?? undefined}
                        onChange={(event) => onChange('port', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-6 col-xs-12">
                    <label>服务端口</label>
                    <Input
                        placeholder="服务端开放端口"
                        value={server.server_port ?? undefined}
                        onChange={(event) => onChange('server_port', event.target.value)}
                    />
                </div>
            </div>
        </>
    );
}
