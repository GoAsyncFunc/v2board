import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { connect } from '../vendor/reactRedux.js';
import { Table, Input, Radio, Badge, LoadingContainer } from '../vendor/ui.js';
import { Divider } from '../vendor/Divider.js';
import { assignProps as mergeProps } from '../vendor/utilities.js';
import { createReadonlyTicketColumns } from '../components/TicketDisplayColumns.jsx';
import '../vendor/dateTime.js';

export class TicketPage extends React.Component {
  state = { visible: false, submit: { level: 1 } };

  componentDidMount() {
    this.props.dispatch({ type: 'ticket/fetch' });
  }

  close(ticketId) {
    this.props.dispatch({ type: 'ticket/close', id: ticketId });
  }

  handleTableChange(pagination, filters) {
    this.props.dispatch({ type: 'ticket/filter', pagination, filter: filters });
  }

  filter(field, value) {
    this.props.dispatch({
      type: 'ticket/filter',
      filter: { [field]: value },
      pagination: { pageSize: 10, current: 1 },
    });
  }

  openTicket(ticketId) {
    const target = `${window.location.origin}${window.location.pathname}#/ticket/${ticketId}`;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = userAgent.includes('mobile') || userAgent.includes('ipad');
    if (isMobile) {
      window.location.href = target;
      return;
    }
    window.open(target, '_blank', 'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
  }

  search(field, value) {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.filter(field, value), 300);
  }

  render() {
    const { tickets, fetchLoading, pagination, filter: filterState } = this.props.ticket;
    const readonlyColumns = createReadonlyTicketColumns(['低', '中', '高']);
    const columns = [
      readonlyColumns.id,
      readonlyColumns.subject,
      readonlyColumns.level,
      {
        title: '工单状态',
        dataIndex: 'reply_status',
        key: 'reply_status',
        filters: filterState.status !== 1 ? [
          { text: '已回复', value: 1 },
          { text: '待回复', value: 0 },
        ] : undefined,
        render: (replyStatus, ticket) => ticket.status === 1 ? (
          <span><Badge status="success" />已关闭</span>
        ) : (
          <span><Badge status={replyStatus ? 'processing' : 'error'} />{replyStatus ? '已回复' : '待回复'}</span>
        ),
      },
      readonlyColumns.created_at,
      readonlyColumns.updated_at,
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'right',
        fixed: 'right',
        render: (value, ticket) => (
          <div>
            <a href="javascript:void(0);" onClick={() => this.openTicket(ticket.id)}>查看</a>
            <Divider type="vertical" />
            <a href="javascript:void(0);" onClick={() => this.close(ticket.id)} aria-disabled={ticket.status}>关闭</a>
          </div>
        ),
      },
    ];
    return (
      <MainLayout {...mergeProps({}, this.props, { title: '工单管理' })}>
        <LoadingContainer loading={fetchLoading}>
          <div className="block border-bottom">
            <div className="bg-white">
              <div className="p-3">
                <Radio.Group value={filterState.status} onChange={event => this.filter('status', event.target.value)}>
                  <Radio.Button value={0}>已开启</Radio.Button>
                  <Radio.Button value={1}>已关闭</Radio.Button>
                </Radio.Group>
                <div style={{ float: 'right' }}>
                  <Input placeholder="输入邮箱搜索" onChange={event => this.search('email', event.target.value)} />
                </div>
              </div>
              <Table
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

export default connect(state => ({ ticket: state.ticket }))(TicketPage);
