const {
  formatDateTime
} = require('../components/DateTimeDisplay.jsx');
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var refreshTimer,
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  tooltip = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule),
  stylesModule = (require("../vendor/i18n.js"), require("../vendor/modules/4e665578.js")),
  styles = interopDefault(stylesModule),
  userCard = require("../components/Recovered_43674f62.jsx"),
  trafficPanel = require("../vendor/modules/58307135.js");
class TicketDetailChat extends ReactComponent.a.Component {
  constructor() {
    super(...arguments), this.state = {}, this.chatCount = 0;
  }
  componentDidMount() {
    this.chatScroll();
  }
  componentDidUpdate() {
    var currentTicket, updatedTicket;
    this.chatCount !== (null === (currentTicket = this.props.ticket) || void 0 === currentTicket ? void 0 : currentTicket.message.length) && (this.chatCount = null === (updatedTicket = this.props.ticket) || void 0 === updatedTicket ? void 0 : updatedTicket.message.length, this.chatScroll());
  }
  chatScroll() {
    this.refs.chat && this.refs.chat.scrollTo(0, this.refs.chat.scrollHeight);
  }
  render() {
    var ticketSubject,
      ticketMessages,
      ticket = this.props.ticket;
    return <div>
                <div className={"block-content-full bg-gray-lighter p-3"}>
                    <span className={styles.a.tag}>
                        {null === (ticketSubject = this.props.ticket) || void 0 === ticketSubject ? void 0 : ticketSubject.subject}
                    </span>
                    <div className={styles.a.ctrl}>
                        {ReactComponent.a.createElement(userCard["a"], {
            userId: null === ticket || void 0 === ticket ? void 0 : ticket.user_id
          }, ReactComponent.a.createElement(tooltip["a"], {
            title: "用户管理",
            placement: "left"
          }, ReactComponent.a.createElement(icon["a"], {
            type: "user"
          })))}
                        {ReactComponent.a.createElement(divider["a"], {
            type: "vertical"
          })}
                        {ReactComponent.a.createElement(trafficPanel["a"], {
            userId: null === ticket || void 0 === ticket ? void 0 : ticket.user_id,
            key: null === ticket || void 0 === ticket ? void 0 : ticket.user_id
          }, ReactComponent.a.createElement(tooltip["a"], {
            title: "TA的流量记录",
            placement: "left"
          }, ReactComponent.a.createElement(icon["a"], {
            type: "solution"
          })))}
                    </div>
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
        })} ref={"message"} type={"text"} className={"js-chat-input bg-body-dark border-0 form-control form-control-alt"} placeholder={"输入内容回复工单..."} onChange={event => this.props.onChange(event)}></input>
                </div>
            </div>;
  }
}
class TicketDetailPage extends ReactComponent.a.Component {
  constructor(props) {
    super(props), this.state = {
      message: void 0,
      submit: {}
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "ticket/fetchById",
      id: this.props.match.params.ticket_id
    }), this.props.dispatch({
      type: "plan/fetch"
    }), this.check();
  }
  check() {
    refreshTimer = setTimeout(() => {
      this.props.dispatch({
        type: "ticket/fetchById",
        id: this.props.match.params.ticket_id
      }), this.check();
    }, 5e3);
  }
  componentWillUnmount() {
    clearTimeout(refreshTimer);
  }
  reply(clearMessage) {
    this.props.dispatch({
      type: "ticket/reply",
      id: this.props.match.params.ticket_id,
      msg: this.state.message,
      callback: () => {
        clearMessage();
      }
    });
  }
  render() {
    var currentUser = this.props.user.user,
      ticketState = this.props.ticket,
      ticket = ticketState.ticket,
      replyLoading = ticketState.replyLoading;
    return ReactComponent.a.createElement(TicketDetailChat, {
      ticket,
      user: currentUser,
      onKeyDown: (event, clearMessage) => {
        13 !== event.keyCode || replyLoading || this.reply(clearMessage);
      },
      onChange: event => {
        this.setState({
          message: event.target.value
        });
      }
    });
  }
}
legacyExports["default"] = Object(reactRedux["c"])(state => {
  var currentUser = state.user,
    currentTicket = state.ticket;
  return {
    user: currentUser,
    ticket: currentTicket
  };
})(TicketDetailPage);