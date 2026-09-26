import React from 'react';
import Table from 'antd/lib/table';
import { createQueueWorkloadColumns } from './QueueWorkloadColumns';
import type { QueueWorkload } from '@/types/monitoringContracts';

interface QueueWorkloadTableProps {
    workload?: QueueWorkload[] | null;
}

export default function QueueWorkloadTable({
    workload,
}: QueueWorkloadTableProps): React.ReactElement {
    const visibleWorkload = workload?.filter((queue) => queue.name !== 'default');

    return (
        <div className="block block-rounded">
            <div className="block-header block-header-default">
                <h3 className="block-title">当前作业详情</h3>
            </div>
            <div className="block-content p-0">
                <Table<QueueWorkload>
                    columns={createQueueWorkloadColumns()}
                    dataSource={visibleWorkload}
                    pagination={false}
                />
            </div>
        </div>
    );
}
