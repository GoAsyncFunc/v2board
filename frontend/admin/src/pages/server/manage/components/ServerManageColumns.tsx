import React from 'react';
import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import message from 'antd/lib/message';
import type { ColumnProps } from 'antd/lib/table/interface';
import { TableDragHandle } from '@/components/common/SortableTable';
import { copyText } from '@/utils/clipboardService';
import type { ManagedServerRecord, ServerGroupOption, ServerRecord } from '@/types/serverContracts';
import { SERVER_TYPE_FILTERS } from '@/pages/server/manage/editors/ServerEditorRegistry';
import { createServerNameColumn } from './ServerNameColumn';
import { createServerRateColumn } from './ServerRateColumn';
import { renderServerTypeTag } from './ServerTypeTag';

export const SERVER_STATUS_BADGES = { 0: 'error', 1: 'warning', 2: 'processing' } as const;

interface ServerManageColumnOptions {
    groups: ServerGroupOption[];
    renderActions: (server: ManagedServerRecord) => React.ReactElement;
    updateServer: <Key extends keyof ServerRecord>(
        server: ManagedServerRecord,
        key: Key,
        value: ServerRecord[Key],
    ) => void;
}

export function createServerManageColumns({
    groups,
    renderActions,
    updateServer,
}: ServerManageColumnOptions): ColumnProps<ManagedServerRecord>[] {
    return [
        {
            title: '节点ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            filters: [...SERVER_TYPE_FILTERS],
            onFilter: (type, server) => server.type === String(type).toLowerCase(),
            render: (id, server) => (
                <span>
                    {renderServerTypeTag(
                        server.type,
                        server.parent_id ? `${id} => ${server.parent_id}` : id,
                    )}
                </span>
            ),
        },
        {
            title: '显隐',
            dataIndex: 'show',
            key: 'show',
            render: (shown: ServerRecord['show'], server) => (
                <Switch
                    size="small"
                    checked={Boolean(parseInt(String(shown), 10))}
                    onClick={() =>
                        updateServer(server, 'show', parseInt(String(shown), 10) ? 0 : 1)
                    }
                />
            ),
        },
        createServerNameColumn<ManagedServerRecord>(SERVER_STATUS_BADGES),
        {
            title: '地址',
            dataIndex: 'host',
            key: 'host',
            render: (_host, server) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        copyText(server.host);
                        message.success('复制成功');
                    }}
                >
                    {server.host}:{server.port}
                </span>
            ),
        },
        {
            title: (
                <span>
                    <Tooltip placement="top" title="根据服务端上报频率而定">
                        人数 <Icon type="question-circle" />
                    </Tooltip>
                </span>
            ),
            dataIndex: 'online',
            key: 'online',
            align: 'left',
            width: 130,
            sorter: (left, right) => left.online - right.online,
            render: (online: ServerRecord['online']) => (
                <>
                    <Icon type="user" /> {online || 0}
                </>
            ),
        },
        createServerRateColumn(),
        {
            title: '权限组',
            dataIndex: 'group_id',
            key: 'group_id',
            filters: groups.map((group) => ({ text: group.name, value: String(group.id) })),
            onFilter: (groupId, server) =>
                (server.group_id || []).map(String).includes(String(groupId)),
            render: (groupIds: ServerRecord['group_id'] = []) => (
                <>
                    {groupIds.map((groupId) => {
                        const group = groups.find(
                            (item) => item.id === parseInt(String(groupId), 10),
                        );
                        return group ? <Tag key={groupId}>{group.name}</Tag> : null;
                    })}
                </>
            ),
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            fixed: 'right',
            width: 100,
            render: (_value, server) => <div>{renderActions(server)}</div>,
        },
    ];
}

export function createServerSortColumns(): ColumnProps<ManagedServerRecord>[] {
    return [
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            align: 'left',
            width: 100,
            render: () => <TableDragHandle title="拖动排序" />,
        },
        {
            title: '节点ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (id, server) => (
                <span>
                    {renderServerTypeTag(
                        server.type,
                        server.parent_id ? `${id} => ${server.parent_id}` : id,
                    )}
                </span>
            ),
        },
        { title: '节点', dataIndex: 'name', key: 'name' },
    ];
}
