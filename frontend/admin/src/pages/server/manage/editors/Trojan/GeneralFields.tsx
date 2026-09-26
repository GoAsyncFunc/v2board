import React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import PermissionGroupEditor from '@/components/common/PermissionGroupEditor';
import type { ServerGroupOption, ServerRecord } from '@/types/serverContracts';

export interface TrojanGeneralFieldsProps {
    server: ServerRecord;
    groups: ServerGroupOption[];
    onChange: <Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]) => void;
}

export function TrojanGeneralFields({
    server,
    groups,
    onChange,
}: TrojanGeneralFieldsProps): React.ReactElement {
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
            <div className="form-group">
                <label>节点地址</label>
                <Input
                    placeholder="地址或IP"
                    value={server.host}
                    onChange={(event) => onChange('host', event.target.value)}
                />
            </div>
            <div className="row">
                <div className="form-group col-md-4 col-xs-12">
                    <label>连接端口</label>
                    <Input
                        placeholder="用户连接端口"
                        value={server.port ?? undefined}
                        onChange={(event) => onChange('port', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-4 col-xs-12">
                    <label>服务端口</label>
                    <Input
                        placeholder="服务端开放端口"
                        value={server.server_port ?? undefined}
                        onChange={(event) => onChange('server_port', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-4 col-xs-12">
                    <label>
                        <Tooltip
                            placement="top"
                            title="使用自签名证书需要允许不安全，用户才可以连接"
                        >
                            允许不安全 <Icon type="question-circle" />
                        </Tooltip>
                    </label>
                    <Select
                        value={parseInt(String(server.allow_insecure), 10) ? 1 : 0}
                        placeholder="允许不安全"
                        style={{ width: '100%' }}
                        onChange={(allow) => onChange('allow_insecure', allow)}
                    >
                        <Select.Option value={0}>否</Select.Option>
                        <Select.Option value={1}>是</Select.Option>
                    </Select>
                </div>
            </div>
            <div className="form-group">
                <label>服务器名称指示(sni)</label>
                <Input
                    placeholder="当节点地址与证书不一致时用于证书验证"
                    value={server.server_name}
                    onChange={(event) => onChange('server_name', event.target.value)}
                />
            </div>
        </>
    );
}
