import React from 'react';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import type {
    ManagedServerRecord,
    ServerRecord,
    ServerRouteOption,
} from '../../../../../types/serverContracts';
import type { UpdateVmessServer } from '../serverEditorTypes';

interface VmessRelationshipFieldsProps {
    server: ServerRecord;
    servers: ManagedServerRecord[];
    routes: ServerRouteOption[];
    onChange: UpdateVmessServer;
}

export default function VmessRelationshipFields({
    server,
    servers,
    routes,
    onChange,
}: VmessRelationshipFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label>
                    <Tooltip placement="top" title="父节点说明">
                        父节点{' '}
                        <a
                            target="_blank"
                            href="https://docs.v2board.com/use/node.html#父节点与子节点关系"
                            rel="noreferrer"
                        >
                            <Icon type="read" />
                        </a>
                    </Tooltip>
                </label>
                <Select
                    value={server.parent_id || ''}
                    onChange={(parentId) => onChange('parent_id', parentId)}
                    style={{ width: '100%' }}
                >
                    <Select.Option value="">无</Select.Option>
                    {servers
                        .filter((option) => option.type === 'vmess' && option.id !== server.id)
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
