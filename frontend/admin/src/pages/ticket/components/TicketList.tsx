import React from 'react';
import { connect } from 'react-redux';
import Badge from 'antd/lib/badge';
import Divider from 'antd/lib/divider';
import Table from 'antd/lib/table';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { ColumnProps } from 'antd/lib/table/interface';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type {
    TicketFilterState,
    TicketId,
    TicketRecord,
    TicketState,
} from '../../../types/ticketContracts';
import { createReadonlyTicketColumns } from './TicketColumns';

export interface TicketListProps {
    dispatch: AdminDispatch;
    ticket: TicketState;
    onOpenTicket: (ticketId: TicketId | undefined) => void;
    onCloseTicket: (ticketId: TicketId | undefined) => void;
    onTableChange: (
        pagination: PaginationConfig,
        filters: Partial<Record<keyof TicketRecord, string[]>>,
    ) => void;
}

export class TicketList extends React.Component<TicketListProps> {
    columns(filterState: TicketFilterState): ColumnProps<TicketRecord>[] {
        const readonlyColumns = createReadonlyTicketColumns(['低', '中', '高']);
        return [
            readonlyColumns.id,
            readonlyColumns.subject,
            readonlyColumns.level,
            {
                title: '工单状态',
                dataIndex: 'reply_status',
                key: 'reply_status',
                filters:
                    filterState.status !== 1
                        ? [
                              { text: '已回复', value: 1 },
                              { text: '待回复', value: 0 },
                          ]
                        : undefined,
                render: (replyStatus: boolean | number, ticket) =>
                    ticket.status === 1 ? (
                        <span>
                            <Badge status="success" />
                            已关闭
                        </span>
                    ) : (
                        <span>
                            <Badge status={replyStatus ? 'processing' : 'error'} />
                            {replyStatus ? '已回复' : '待回复'}
                        </span>
                    ),
            } as ColumnProps<TicketRecord>,
            readonlyColumns.created_at,
            readonlyColumns.updated_at,
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                fixed: 'right',
                render: (_value, ticket) => (
                    <div>
                        <a
                            href="javascript:void(0);"
                            onClick={() => this.props.onOpenTicket(ticket.id)}
                        >
                            查看
                        </a>
                        <Divider type="vertical" />
                        <a
                            href="javascript:void(0);"
                            onClick={() => this.props.onCloseTicket(ticket.id)}
                            aria-disabled={Boolean(ticket.status)}
                        >
                            关闭
                        </a>
                    </div>
                ),
            },
        ];
    }

    render(): React.ReactNode {
        const { tickets, pagination, filter } = this.props.ticket;
        return (
            <Table<TicketRecord>
                tableLayout="auto"
                dataSource={tickets}
                pagination={{ ...pagination, size: 'small' }}
                columns={this.columns(filter)}
                scroll={{ x: 900 }}
                onChange={(nextPagination, filters) =>
                    this.props.onTableChange(nextPagination, filters)
                }
            />
        );
    }
}

export default connect((state: AdminRootState) => ({ ticket: state.ticket }))(TicketList);
