import React from 'react';
import Divider from 'antd/lib/divider';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import { createRouteActionColumn } from './RouteActionColumn';
import { createReadonlyServerRouteColumns } from './columns';
import type { ServerRouteRecord } from '../index';

interface ServerRouteListProps {
    routes: ServerRouteRecord[];
    routeActionText: Record<string, string>;
    renderEditor: (record?: ServerRouteRecord, key?: React.Key) => React.ReactElement;
    onDelete: (id: string | number | undefined) => void;
}

const readonlyColumns = createReadonlyServerRouteColumns<ServerRouteRecord>();

export default function ServerRouteList({
    routes,
    routeActionText,
    renderEditor,
    onDelete,
}: ServerRouteListProps) {
    const columns: ColumnProps<ServerRouteRecord>[] = [
        readonlyColumns.id,
        readonlyColumns.remarks,
        readonlyColumns.match,
        createRouteActionColumn<ServerRouteRecord>(routeActionText),
        {
            title: '操作',
            dataIndex: 'action2',
            key: 'action2',
            align: 'right',
            render: (_value, record) => (
                <div>
                    {renderEditor(record, record.id)}
                    <Divider type="vertical" />
                    <a href="javascript:void(0);" onClick={() => onDelete(record.id)}>
                        删除
                    </a>
                </div>
            ),
        },
    ];
    return (
        <Table<ServerRouteRecord>
            tableLayout="auto"
            columns={columns}
            dataSource={routes}
            pagination={false}
        />
    );
}
