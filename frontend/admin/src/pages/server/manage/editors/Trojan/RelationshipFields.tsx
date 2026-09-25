import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord, ServerRouteOption } from '../../../../../types/serverContracts';

export interface TrojanRelationshipFieldsProps {
    server: ServerRecord;
    servers: ServerRecord[];
    routes: ServerRouteOption[];
    onChange: <Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]) => void;
    onOpenNetworkSettings: () => void;
}

export function TrojanRelationshipFields({
    server,
    servers,
    routes,
    onChange,
    onOpenNetworkSettings,
}: TrojanRelationshipFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>
                    传输协议{' '}
                    <a href="javascript:void(0);" onClick={onOpenNetworkSettings}>
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
                </Select>
            </div>
            <div className="form-group">
                <label>
                    父节点{' '}
                    <a
                        target="_blank"
                        href="https://docs.v2board.com/use/node.html#父节点与子节点关系"
                        rel="noreferrer"
                    >
                        更多解答
                    </a>
                </label>
                <Select
                    value={server.parent_id || ''}
                    onChange={(parentId) => onChange('parent_id', parentId)}
                    style={{ width: '100%' }}
                >
                    <Select.Option value="">无</Select.Option>
                    {servers
                        .filter((option) => option.type === 'trojan' && option.id !== server.id)
                        .map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                </Select>
            </div>
            <div className="form-group">
                <label>路由组</label>
                <Select
                    mode="multiple"
                    value={server.route_id || []}
                    placeholder="请选择路由组"
                    style={{ width: '100%' }}
                    onChange={(routeIds) => onChange('route_id', routeIds.length ? routeIds : null)}
                >
                    {routes.map((route) => (
                        <Select.Option key={route.id} value={route.id}>
                            {route.remarks}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </>
    );
}
