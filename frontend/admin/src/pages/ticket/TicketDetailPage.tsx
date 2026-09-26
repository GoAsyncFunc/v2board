import React from 'react';
import { connect } from 'react-redux';
import message from 'antd/lib/message';
import TicketDetailChat from './components/TicketDetailChat';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import type { TicketState } from '@/types/ticketContracts';

interface TicketDetailState {
    message?: string;
}

interface TicketDetailPageProps {
    dispatch: AdminDispatch;
    match: { params: { ticket_id: string } };
    ticket: TicketState;
}

export class TicketDetailPage extends React.Component<TicketDetailPageProps, TicketDetailState> {
    state: TicketDetailState = { message: undefined };
    refreshTimer?: ReturnType<typeof setTimeout>;

    constructor(props: TicketDetailPageProps) {
        super(props);
    }

    componentDidMount() {
        this.fetchTicket();
        this.props.dispatch({ type: 'plan/fetch' });
        this.scheduleRefresh();
    }

    componentWillUnmount() {
        clearTimeout(this.refreshTimer);
    }

    fetchTicket() {
        this.props.dispatch({ type: 'ticket/fetchById', id: this.props.match.params.ticket_id });
    }

    scheduleRefresh() {
        this.refreshTimer = setTimeout(() => {
            this.fetchTicket();
            this.scheduleRefresh();
        }, 5000);
    }

    reply(clearMessage: () => void): void {
        this.props.dispatch({
            type: 'ticket/reply',
            id: this.props.match.params.ticket_id,
            msg: this.state.message,
            start: () => message.loading('发送中'),
            finish: () => message.destroy(),
            callback: clearMessage,
        });
    }

    render() {
        const { ticket, replyLoading } = this.props.ticket;
        return (
            <TicketDetailChat
                ticket={ticket}
                onKeyDown={(event, clearMessage) => {
                    if (event.keyCode === 13 && !replyLoading) this.reply(clearMessage);
                }}
                onChange={(event) => this.setState({ message: event.target.value })}
            />
        );
    }
}

export default connect((state: AdminRootState) => ({ ticket: state.ticket }))(TicketDetailPage);
