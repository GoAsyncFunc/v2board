import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { formatMessage } from '../vendor/i18n.js';
import { ticketDetailStyles as styles } from '../vendor/content.js';
import { formatDateTime } from '../components/DateTimeDisplay.jsx';

export class TicketDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.chatCount = 0;
    this.chatRef = React.createRef();
    this.messageRef = React.createRef();
  }

  componentDidMount() {
    this.chatScroll();
  }

  componentDidUpdate() {
    const messageCount = this.props.ticket?.message.length;
    if (this.chatCount !== messageCount) {
      this.chatCount = messageCount;
      this.chatScroll();
    }
  }

  chatScroll() {
    const chat = this.chatRef.current;
    if (chat) chat.scrollTo(0, chat.scrollHeight);
  }

  renderMessage(message) {
    return message.is_me ? (
      <div key={message.id || message.created_at}>
        <div className="font-size-sm text-muted my-2 text-right">{formatDateTime(message.created_at)}</div>
        <div className="text-right ml-4">
          <div className="d-inline-block bg-gray-lighter px-3 py-2 mb-2 mw-100 rounded text-left">{message.message}</div>
        </div>
      </div>
    ) : (
      <div key={message.id || message.created_at}>
        <div className="font-size-sm text-muted my-2">{formatDateTime(message.created_at)}</div>
        <div className="mr-4">
          <div className="d-inline-block bg-success-lighter px-3 py-2 mb-2 mw-100 rounded text-left">{message.message}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="block-content-full bg-gray-lighter p-3">
          <span className={styles.tag}>{this.props.ticket?.subject}</span>
        </div>
        <div className={`bg-white js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto ${styles.content}`} ref={this.chatRef}>
          {this.props.ticket?.message.map(message => this.renderMessage(message))}
        </div>
        <div className={`js-chat-form block-content p-2 bg-body-dark ${styles.input}`}>
          <input
            ref={this.messageRef}
            type="text"
            className="js-chat-input bg-body-dark border-0 form-control form-control-alt"
            placeholder={formatMessage({ id: '输入内容回复工单...' })}
            onKeyDown={event => this.props.onKeyDown(event, () => {
              if (this.messageRef.current) this.messageRef.current.value = '';
            })}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}

export class TicketDetailPage extends React.Component {
  componentDidMount() {
    this.fetchData();
    const refresh = () => {
      this.refreshTimeout = setTimeout(() => {
        this.fetchData();
        refresh();
      }, 5000);
    };
    refresh();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimeout);
  }

  fetchData() {
    this.props.dispatch({ type: 'ticket/fetchById', id: this.props.match.params.ticket_id });
  }

  reply(clearMessage) {
    this.props.dispatch({
      type: 'ticket/reply',
      id: this.props.match.params.ticket_id,
      complete: clearMessage,
    });
  }

  render() {
    const { ticket, replyData, replyLoading } = this.props.ticket;
    return (
      <TicketDetailBody
        ticket={ticket}
        onKeyDown={(event, clearMessage) => {
          if (event.keyCode === 13 && !replyLoading) this.reply(clearMessage);
        }}
        onChange={event => this.props.dispatch({
          type: 'ticket/setState',
          payload: { replyData: { ...replyData, message: event.target.value } },
        })}
      />
    );
  }
}

export default connect(state => ({ header: state.header, ticket: state.ticket }))(TicketDetailPage);
