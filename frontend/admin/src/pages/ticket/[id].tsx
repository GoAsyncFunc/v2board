import React from 'react';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import message from 'antd/lib/message';
import { ticketDetailClassNames as styles } from '../../styles/ticketDetail';
import TicketMessageList from './components/TicketMessageList';
import UserEditor from '../user/components/UserEditor';
import TrafficPanel from '../../components/user/TrafficPanel';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { TicketId, TicketMessage, TicketRecord, TicketState } from '../../types/ticket';

interface TicketDetailChatProps {
    ticket?: TicketRecord;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, clearMessage: () => void) => void;
}

export class TicketDetailChat extends React.Component<TicketDetailChatProps> {
    messageRef = React.createRef<HTMLInputElement>();

    render() {
        const { ticket } = this.props;
        return (
            <div>
                <div className="block-content-full bg-gray-lighter p-3">
                    <span className={styles.tag}>{ticket?.subject}</span>
                    <div className={styles.controls}>
                        <UserEditor userId={ticket?.user_id}>
                            <Tooltip title="用户管理" placement="left">
                                <Icon type="user" />
                            </Tooltip>
                        </UserEditor>
                        <Divider type="vertical" />
                        <TrafficPanel userId={ticket?.user_id as TicketId} key={ticket?.user_id}>
                            <Tooltip title="TA的流量记录" placement="left">
                                <Icon type="solution" />
                            </Tooltip>
                        </TrafficPanel>
                    </div>
                </div>
                <TicketMessageList messages={ticket?.message || []} />
                <div className={`js-chat-form block-content p-2 bg-body-dark ${styles.input}`}>
                    <input
                        ref={this.messageRef}
                        type="text"
                        className="js-chat-input bg-body-dark border-0 form-control form-control-alt"
                        placeholder="输入内容回复工单..."
                        onChange={this.props.onChange}
                        onKeyDown={(event) =>
                            this.props.onKeyDown(event, () => {
                                if (this.messageRef.current) this.messageRef.current.value = '';
                            })
                        }
                    />
                </div>
            </div>
        );
    }
}

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
