const {
  formatDateTime
} = require('../components/DateTimeDisplay.jsx');
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
var refreshTimer,
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  reactModule = require("../vendor/modules/reactRuntime.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule),
  i18n = require("../vendor/i18n.js"),
  styleModule = require("../vendor/modules/4e665578.js"),
  styles = interopDefault(styleModule);
class TicketDetailBody extends ReactComponent.a.Component {
  constructor() {
    super(...arguments), this.state = {}, this.chatCount = 0;
  }
  componentDidMount() {
    this.chatScroll();
  }
  componentDidUpdate() {
    var ticket, updatedTicket;
    this.chatCount !== (null === (ticket = this.props.ticket) || void 0 === ticket ? void 0 : ticket.message.length) && (this.chatCount = null === (updatedTicket = this.props.ticket) || void 0 === updatedTicket ? void 0 : updatedTicket.message.length, this.chatScroll());
  }
  chatScroll() {
    this.refs.chat && this.refs.chat.scrollTo(0, this.refs.chat.scrollHeight);
  }
  render() {
    var ticketSubject,
      ticketMessages;
    return <div>
                <div className={"block-content-full bg-gray-lighter p-3"}>
                    <span className={styles.a.tag}>
                        {null === (ticketSubject = this.props.ticket) || void 0 === ticketSubject ? void 0 : ticketSubject.subject}
                    </span>
                </div>
                <div className={"bg-white js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto ".concat(styles.a.content)} ref={"chat"}>
                    {null === (ticketMessages = this.props.ticket) || void 0 === ticketMessages ? void 0 : ticketMessages.message.map(message => {
          return message.is_me ? <div>
                                      <div className={"font-size-sm text-muted my-2 text-right"}>
                                          {formatDateTime(message.created_at)}
                                      </div>
                                      <div className={"text-right ml-4"}>
                                          <div className={"d-inline-block bg-gray-lighter px-3 py-2 mb-2 mw-100 rounded text-left"}>
                                              {message.message}
                                          </div>
                                      </div>
                                  </div> : <div>
                                      <div className={"font-size-sm text-muted my-2"}>
                                          {formatDateTime(message.created_at)}
                                      </div>
                                      <div className={"mr-4"}>
                                          <div className={"d-inline-block bg-success-lighter px-3 py-2 mb-2 mw-100 rounded text-left"}>
                                              {message.message}
                                          </div>
                                      </div>
                                  </div>;
        })}
                </div>
                <div className={"js-chat-form block-content p-2 bg-body-dark ".concat(styles.a.input)}>
                    <input onKeyDown={event => this.props.onKeyDown(event, () => {
          this.refs.message && (this.refs.message.value = "");
        })} ref={"message"} type={"text"} className={"js-chat-input bg-body-dark border-0 form-control form-control-alt"} placeholder={Object(i18n["formatMessage"])({
          id: "输入内容回复工单..."
        })} onChange={event => this.props.onChange(event)}></input>
                </div>
            </div>;
  }
}
class TicketDetailPage extends ReactComponent.a.Component {
  componentDidMount() {
    this.fetchData(), refreshTimer = () => setTimeout(() => {
      this.fetchData(), "function" === typeof refreshTimer && refreshTimer();
    }, 5e3), refreshTimer();
  }
  componentWillUnmount() {
    refreshTimer = void 0;
  }
  fetchData() {
    this.props.dispatch({
      type: "ticket/fetchById",
      id: this.props.match.params.ticket_id
    });
  }
  reply(clearMessage) {
    this.props.dispatch({
      type: "ticket/reply",
      id: this.props.match.params.ticket_id,
      complete: () => clearMessage()
    });
  }
  render() {
    var ticketState = this.props.ticket,
      ticket = ticketState.ticket,
      replyData = ticketState.replyData,
      replyLoading = ticketState.replyLoading;
    return ReactComponent.a.createElement(TicketDetailBody, {
      ticket,
      onKeyDown: (event, clearMessage) => {
        13 !== event.keyCode || replyLoading || this.reply(clearMessage);
      },
      onChange: event => {
        this.props.dispatch({
          type: "ticket/setState",
          payload: {
            replyData: objectAssign()({}, replyData, {
              message: event.target.value
            })
          }
        });
      }
    });
  }
}
legacyExports["default"] = Object(reactRedux["c"])(state => {
  var header = state.header,
    ticket = state.ticket;
  return {
    header,
    ticket
  };
})(TicketDetailPage);
