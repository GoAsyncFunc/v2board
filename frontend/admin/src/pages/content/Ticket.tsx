import React from 'react';
import { connect } from 'react-redux';
import Badge from 'antd/lib/badge';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Table from 'antd/lib/table';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { RadioChangeEvent } from 'antd/lib/radio/interface';
import type { ColumnProps } from 'antd/lib/table/interface';
import MainLayout from '../../layouts/MainLayout';
import LoadingContainer from '../../components/common/LoadingContainer';
import { createReadonlyTicketColumns, type TicketId, type TicketRecord } from '../../components/content/TicketDisplayColumns';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { TicketFilterState, TicketState } from '../../types/ticket';

interface TicketPageProps {
  dispatch: AdminDispatch;
  ticket: TicketState;
}

export class TicketPage extends React.Component<TicketPageProps> {
  searchTimer?: ReturnType<typeof setTimeout>;

  componentDidMount() {
    this.props.dispatch({ type: 'ticket/fetch' });
  }

  close(ticketId: TicketId | undefined): void {
    this.props.dispatch({ type: 'ticket/close', id: ticketId });
  }

  handleTableChange(pagination: PaginationConfig, filters: Partial<Record<keyof TicketRecord, string[]>>): void {
    this.props.dispatch({ type: 'ticket/filter', pagination, filter: filters });
  }

  filter<Field extends keyof TicketFilterState>(field: Field, value: TicketFilterState[Field]): void {
    this.props.dispatch({
      type: 'ticket/filter',
      filter: { [field]: value },
      pagination: { pageSize: 10, current: 1 },
    });
  }

  openTicket(ticketId: TicketId | undefined): void {
    const target = `${window.location.origin}${window.location.pathname}#/ticket/${ticketId}`;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = userAgent.includes('mobile') || userAgent.includes('ipad');
    if (isMobile) {
      window.location.href = target;
      return;
    }
    window.open(target, '_blank', 'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
  }

  search(field: 'email', value: string): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.filter(field, value), 300);
  }

  render() {
    const { tickets, fetchLoading, pagination, filter: filterState } = this.props.ticket;
    const readonlyColumns = createReadonlyTicketColumns(['低', '中', '高']);
    const columns: ColumnProps<TicketRecord>[] = [
      readonlyColumns.id,
      readonlyColumns.subject,
      readonlyColumns.level,
      ({
        title: '工单状态',
        dataIndex: 'reply_status',
        key: 'reply_status',
        filters: filterState.status !== 1 ? [
          { text: '已回复', value: 1 },
          { text: '待回复', value: 0 },
        ] : undefined,
        render: (replyStatus: boolean | number, ticket) => ticket.status === 1 ? (
          <span><Badge status="success" />已关闭</span>
        ) : (
          <span><Badge status={replyStatus ? 'processing' : 'error'} />{replyStatus ? '已回复' : '待回复'}</span>
        ),
      } as ColumnProps<TicketRecord>),
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
            <a href="javascript:void(0);" onClick={() => this.openTicket(ticket.id)}>查看</a>
            <Divider type="vertical" />
            <a href="javascript:void(0);" onClick={() => this.close(ticket.id)} aria-disabled={Boolean(ticket.status)}>关闭</a>
          </div>
        ),
      },
    ];
    return (
      <MainLayout {...this.props} title="工单管理">
        <LoadingContainer loading={fetchLoading}>
          <div className="block border-bottom">
            <div className="bg-white">
              <div className="p-3">
                <Radio.Group value={filterState.status} onChange={(event: RadioChangeEvent) => this.filter('status', event.target.value)}>
                  <Radio.Button value={0}>已开启</Radio.Button>
                  <Radio.Button value={1}>已关闭</Radio.Button>
                </Radio.Group>
                <div style={{ float: 'right' }}>
                  <Input placeholder="输入邮箱搜索" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.search('email', event.target.value)} />
                </div>
              </div>
              <Table<TicketRecord>
                tableLayout="auto"
                dataSource={tickets}
                pagination={{ ...pagination, size: 'small' }}
                columns={columns}
                scroll={{ x: 900 }}
                onChange={(nextPagination, filters) => this.handleTableChange(nextPagination, filters)}
              />
            </div>
          </div>
        </LoadingContainer>
      </MainLayout>
    );
  }
}

export default connect((state: AdminRootState) => ({ ticket: state.ticket }))(TicketPage);
