import React from 'react';
import Icon from 'antd/lib/icon';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { ServerGroupCountValue, ServerGroupOption } from '@/types/serverContracts';

export type ServerGroupRecord = ServerGroupOption;

// A synchronous element helper, not a wrapper component. Preserve the Fragment,
// icon style and uncoerced child (including null/undefined or invalid children).
export function renderGroupCount(iconType: string, count: ServerGroupCountValue) {
    return (
        <React.Fragment>
            <Icon type={iconType} style={{ cursor: 'move' }} /> {count}
        </React.Fragment>
    );
}

// Counts are rendered directly: no coercion, fallback or added interaction.
export function createServerGroupColumns(): Record<
    'id' | 'name' | 'user_count' | 'server_count',
    ColumnProps<ServerGroupRecord>
> {
    return {
        id: { title: '组ID', dataIndex: 'id', key: 'id' },
        name: { title: '组名称', dataIndex: 'name', key: 'name' },
        user_count: {
            title: '用户数量',
            dataIndex: 'user_count',
            key: 'user_count',
            render: (value: ServerGroupCountValue) => renderGroupCount('user', value),
        },
        server_count: {
            title: '节点数量',
            dataIndex: 'server_count',
            key: 'server_count',
            render: (value: ServerGroupCountValue) => renderGroupCount('database', value),
        },
    };
}
