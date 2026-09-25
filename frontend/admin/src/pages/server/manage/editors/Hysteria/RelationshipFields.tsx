import React from 'react';
import Select from 'antd/lib/select';
import type { ServerRecord, ServerRouteOption } from '../../../../../types/serverContracts';

export interface HysteriaRelationshipFieldsProps {
    server: ServerRecord;
    servers: ServerRecord[];
    routes: ServerRouteOption[];
    onChange: <Key extends keyof ServerRecord>(field: Key, value: ServerRecord[Key]) => void;
}

export function HysteriaRelationshipFields({
    server,
    servers,
    routes,
    onChange,
}: HysteriaRelationshipFieldsProps): React.ReactElement {
    return (
        <>
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
                        .filter((option) => option.type === 'hysteria' && option.id !== server.id)
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
