import React from 'react';
import Badge from 'antd/lib/badge';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';
import Switch from 'antd/lib/switch';
import Tag from 'antd/lib/tag';
import type { ManagedServerRecord, ServerRecord } from '@/types/serverContracts';
import { SERVER_STATUS_BADGES } from './ServerManageColumns';
import { renderServerTypeTag } from './ServerTypeTag';

interface ServerManageMobileListProps {
    servers: ManagedServerRecord[];
    renderActions: (server: ManagedServerRecord) => React.ReactElement;
    updateServer: <Key extends keyof ServerRecord>(
        server: ManagedServerRecord,
        key: Key,
        value: ServerRecord[Key],
    ) => void;
}

export default function ServerManageMobileList({
    servers,
    renderActions,
    updateServer,
}: ServerManageMobileListProps): React.ReactElement {
    return (
        <List
            className="v2board-table"
            itemLayout="vertical"
            dataSource={servers}
            renderItem={(server) => (
                <List.Item
                    className={`v2board_node_mobile ${server.parent_id ? 'child_node' : ''}`}
                    actions={[
                        <React.Fragment key="summary">
                            {renderServerTypeTag(
                                server.type,
                                server.parent_id
                                    ? `${server.id} => ${server.parent_id}`
                                    : server.id,
                            )}{' '}
                            <Tag>
                                <Icon type="user" /> {server.online || 0}
                            </Tag>{' '}
                            <Tag>{server.rate} x</Tag>
                        </React.Fragment>,
                    ]}
                    extra={
                        <>
                            <Switch
                                size="small"
                                checked={Boolean(parseInt(String(server.show), 10))}
                                onClick={() =>
                                    updateServer(
                                        server,
                                        'show',
                                        parseInt(String(server.show), 10) ? 0 : 1,
                                    )
                                }
                            />
                            <Divider type="vertical" />
                            <span>{renderActions(server)}</span>
                        </>
                    }
                >
                    <List.Item.Meta
                        title={
                            <>
                                <Badge
                                    status={
                                        SERVER_STATUS_BADGES[
                                            server.available_status as keyof typeof SERVER_STATUS_BADGES
                                        ]
                                    }
                                />
                                {server.name}
                            </>
                        }
                        description={`${server.host}:${server.port}`}
                    />
                </List.Item>
            )}
        />
    );
}
