import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import PermissionGroupEditor from '@/components/common/PermissionGroupEditor';
import type { ServerGroupOption, ServerRecord } from '@/types/serverContracts';
import type {
    OpenVlessSettings,
    UpdateVlessServer,
} from '@/pages/server/manage/editors/serverEditorTypes';

interface VlessGeneralFieldsProps {
    server: ServerRecord;
    groups: ServerGroupOption[];
    onChange: UpdateVlessServer;
    onOpenSettings: OpenVlessSettings;
}

export default function VlessGeneralFields({
    server,
    groups,
    onChange,
    onOpenSettings,
}: VlessGeneralFieldsProps): React.ReactElement {
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
                <div className="form-group col-md-8 col-xs-12">
                    <label>节点地址</label>
                    <Input
                        placeholder="请输入连接地址"
                        value={server.host}
                        onChange={(event) => onChange('host', event.target.value)}
                    />
                </div>
                <div className="form-group col-md-4 col-xs-12">
                    <label>
                        安全性{' '}
                        {parseInt(String(server.tls ?? 0), 10) !== 0 && (
                            <a
                                href="javascript:void(0);"
                                onClick={() => onOpenSettings('编辑安全性配置', 'tls_settings')}
                            >
                                编辑配置
                            </a>
                        )}
                    </label>
                    <Select
                        value={parseInt(String(server.tls ?? 0), 10) || 0}
                        style={{ width: '100%' }}
                        onChange={(value) => onChange('tls', value)}
                    >
                        <Select.Option value={0}>无</Select.Option>
                        <Select.Option value={1}>TLS</Select.Option>
                        <Select.Option value={2}>Reality</Select.Option>
                    </Select>
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
                        placeholder="非NAT同连接端口"
                        value={server.server_port ?? undefined}
                        onChange={(event) => onChange('server_port', event.target.value)}
                    />
                </div>
            </div>
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
                    value={server.network}
                    placeholder="选择传输协议"
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('network', value)}
                >
                    {[
                        ['tcp', 'TCP'],
                        ['ws', 'WebSocket'],
                        ['grpc', 'gRPC'],
                        ['kcp', 'mKCP'],
                        ['httpupgrade', 'HTTPUpgrade'],
                        ['xhttp', 'XHTTP'],
                    ].map(([value, label]) => (
                        <Select.Option key={value} value={value}>
                            {label}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="form-group">
                <label>
                    加密方式{' '}
                    {server.encryption && (
                        <a
                            href="javascript:void(0);"
                            onClick={() => onOpenSettings('编辑加密配置', 'encryption_settings')}
                        >
                            编辑配置
                        </a>
                    )}
                </label>
                <Select
                    value={server.encryption ?? ''}
                    placeholder="选择加密方式"
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('encryption', value || null)}
                >
                    <Select.Option value="">无</Select.Option>
                    <Select.Option value="mlkem768x25519plus">MLKEM768X25519PLUS</Select.Option>
                </Select>
            </div>
            <div className="form-group">
                <label>XTLS流控算法</label>
                <Select
                    value={server.flow ?? ''}
                    placeholder="选择XTLS流控算法"
                    style={{ width: '100%' }}
                    onChange={(value) => onChange('flow', value || null)}
                >
                    <Select.Option value="">无</Select.Option>
                    {server.network === 'tcp' && (
                        <Select.Option value="xtls-rprx-vision">xtls-rprx-vision</Select.Option>
                    )}
                </Select>
            </div>
        </>
    );
}
