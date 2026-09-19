import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Divider } from '../vendor/Divider.js';
import { Tooltip } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { ticketDetailStyles as styles } from '../vendor/content.js';
import UserEditor from '../components/UserEditor.jsx';
import TrafficPanel from '../components/TrafficPanel.tsx';
import { formatDateTime } from '../components/DateTimeDisplay.ts';

import '../vendor/iconStyles.js';

export class TicketDetailChat extends React.Component {
  constructor(props) {
    super(props);
    this.chatCount = 0;
    this.chatRef = React.createRef();
    this.messageRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToLatestMessage();
  }

  componentDidUpdate() {
    const messageCount = this.props.ticket?.message.length;
    if (this.chatCount !== messageCount) {
      this.chatCount = messageCount;
      this.scrollToLatestMessage();
    }
  }

  scrollToLatestMessage() {
    const chat = this.chatRef.current;
    if (chat) chat.scrollTo(0, chat.scrollHeight);
  }

  renderMessage(message, index) {
    const timestamp = <div className={`font-size-sm text-muted my-2${message.is_me ? ' text-right' : ''}`}>{formatDateTime(message.created_at)}</div>;
    return <div key={message.id || index}>
      {timestamp}
      <div className={message.is_me ? 'text-right ml-4' : 'mr-4'}>
        <div className={`d-inline-block px-3 py-2 mb-2 mw-100 rounded text-left ${message.is_me ? 'bg-gray-lighter' : 'bg-success-lighter'}`}>{message.message}</div>
      </div>
    </div>;
  }

  render() {
    const { ticket } = this.props;
    return <div>
      <div className="block-content-full bg-gray-lighter p-3">
        <span className={styles.tag}>{ticket?.subject}</span>
        <div className={styles.ctrl}>
          <UserEditor userId={ticket?.user_id}><Tooltip title="用户管理" placement="left"><Icon type="user" /></Tooltip></UserEditor>
          <Divider type="vertical" />
          <TrafficPanel userId={ticket?.user_id} key={ticket?.user_id}><Tooltip title="TA的流量记录" placement="left"><Icon type="solution" /></Tooltip></TrafficPanel>
        </div>
      </div>
      <div ref={this.chatRef} className={`bg-white js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto ${styles.content}`}>
        {ticket?.message.map((message, index) => this.renderMessage(message, index))}
      </div>
      <div className={`js-chat-form block-content p-2 bg-body-dark ${styles.input}`}>
        <input
          ref={this.messageRef}
          type="text"
          className="js-chat-input bg-body-dark border-0 form-control form-control-alt"
          placeholder="输入内容回复工单..."
          onChange={this.props.onChange}
          onKeyDown={event => this.props.onKeyDown(event, () => { if (this.messageRef.current) this.messageRef.current.value = ''; })}
        />
      </div>
    </div>;
  }
}

export class TicketDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: undefined };
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

  reply(clearMessage) {
    this.props.dispatch({
      type: 'ticket/reply',
      id: this.props.match.params.ticket_id,
      msg: this.state.message,
      callback: clearMessage,
    });
  }

  render() {
    const { ticket, replyLoading } = this.props.ticket;
    return <TicketDetailChat
      ticket={ticket}
      user={this.props.user.user}
      onKeyDown={(event, clearMessage) => { if (event.keyCode === 13 && !replyLoading) this.reply(clearMessage); }}
      onChange={event => this.setState({ message: event.target.value })}
    />;
  }
}

export default connect(state => ({ user: state.user, ticket: state.ticket }))(TicketDetailPage);
