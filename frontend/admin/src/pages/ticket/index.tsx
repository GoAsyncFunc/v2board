import React from 'react';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import type { RadioChangeEvent } from 'antd/lib/radio/interface';
import MainLayout from '../../layouts/MainLayout';
import LoadingContainer from '../../components/common/LoadingContainer';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { TicketFilterState, TicketId, TicketRecord, TicketState } from '../../types/ticket';
import { TicketList } from './_List';

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

    handleTableChange(
        pagination: Parameters<
            NonNullable<React.ComponentProps<typeof TicketList>['onTableChange']>
        >[0],
        filters: Parameters<
            NonNullable<React.ComponentProps<typeof TicketList>['onTableChange']>
        >[1],
    ): void {
        this.props.dispatch({ type: 'ticket/filter', pagination, filter: filters });
    }

    filter<Field extends keyof TicketFilterState>(
        field: Field,
        value: TicketFilterState[Field],
    ): void {
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
        window.open(
            target,
            '_blank',
            'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no',
        );
    }

    search(field: 'email', value: string): void {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => this.filter(field, value), 300);
    }

    render() {
        const { fetchLoading, filter: filterState } = this.props.ticket;
        return (
            <MainLayout {...this.props} title="工单管理">
                <LoadingContainer loading={fetchLoading}>
                    <div className="block border-bottom">
                        <div className="bg-white">
                            <div className="p-3">
                                <Radio.Group
                                    value={filterState.status}
                                    onChange={(event: RadioChangeEvent) =>
                                        this.filter('status', event.target.value)
                                    }
                                >
                                    <Radio.Button value={0}>已开启</Radio.Button>
                                    <Radio.Button value={1}>已关闭</Radio.Button>
                                </Radio.Group>
                                <div style={{ float: 'right' }}>
                                    <Input
                                        placeholder="输入邮箱搜索"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            this.search('email', event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <TicketList
                                dispatch={this.props.dispatch}
                                ticket={this.props.ticket}
                                onOpenTicket={(ticketId) => this.openTicket(ticketId)}
                                onCloseTicket={(ticketId) => this.close(ticketId)}
                                onTableChange={(nextPagination, filters) =>
                                    this.handleTableChange(nextPagination, filters)
                                }
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { TicketList } from './_List';

export default connect((state: AdminRootState) => ({ ticket: state.ticket }))(TicketPage);
