import React from 'react';
import Divider from 'antd/lib/divider';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import PermissionGroupEditor from '../../../../components/common/PermissionGroupEditor';
import { createReadonlyServerGroupColumns, type ServerGroupRecord } from './columns';

interface ServerGroupListProps {
    groups: ServerGroupRecord[];
    onDelete: (id: string | number) => void;
}

const readonlyColumns = createReadonlyServerGroupColumns();

export default function ServerGroupList({ groups, onDelete }: ServerGroupListProps) {
    const columns: ColumnProps<ServerGroupRecord>[] = [
        readonlyColumns.id,
        readonlyColumns.name,
        readonlyColumns.user_count,
        readonlyColumns.server_count,
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            render: (_value, record) => (
                <div>
                    <PermissionGroupEditor record={record}>
                        <a href="javascript:void(0);">编辑</a>
                    </PermissionGroupEditor>
                    <Divider type="vertical" />
                    <a href="javascript:void(0);" onClick={() => onDelete(record.id)}>
                        删除
                    </a>
                </div>
            ),
        },
    ];
    return (
        <Table<ServerGroupRecord>
            tableLayout="auto"
            columns={columns}
            dataSource={groups}
            pagination={false}
        />
    );
}
