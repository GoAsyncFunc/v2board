import React from 'react';
import Table from 'antd/lib/table';
import { formatMessage } from '@/locales/i18n';
import { createCommissionColumns } from '@/components/account/InviteDisplayColumns';
import type { CommissionRecord, InviteState } from '@/types/invitationContracts';

interface InviteCommissionHistoryProps {
    blockClassName: string;
    detailsLoading: boolean;
    pagination: InviteState['detailsPagination'];
    records: CommissionRecord[];
    onPageChange: (current?: number, pageSize?: number) => void;
}

export default function InviteCommissionHistory({
    blockClassName,
    detailsLoading,
    pagination,
    records,
    onPageChange,
}: InviteCommissionHistoryProps) {
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className={blockClassName}>
                    <div className="block-header block-header-default">
                        <h3 className="block-title">{formatMessage({ id: '佣金发放记录' })}</h3>
                    </div>
                    <div className="block-content p-0">
                        <Table
                            tableLayout="auto"
                            columns={createCommissionColumns()}
                            dataSource={records}
                            loading={detailsLoading}
                            pagination={{
                                ...pagination,
                                pageSize: pagination.page_size,
                                size: 'small',
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '50', '100', '150'],
                            }}
                            onChange={(page) => onPageChange(page.current, page.pageSize)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
