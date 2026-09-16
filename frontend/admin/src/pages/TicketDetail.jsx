let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
const {
  formatDateTime
} = require('../components/DateTimeDisplay.jsx');
var r,
  i = require("../vendor/modules/71317449.js"),
  o = interopDefault(i),
  a = require("../vendor/reactRedux.js"),
  s = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  l = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  c = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  u = require("../vendor/modules/77642f52.js"),
  h = interopDefault(u),
  f = (require("../vendor/i18n.js"), require("../vendor/modules/4e665578.js")),
  d = interopDefault(f),
  p = require("../components/Recovered_43674f62.jsx"),
  m = require("../vendor/modules/58307135.js");
class g extends o.a.Component {
  constructor() {
    super(...arguments), this.state = {}, this.chatCount = 0;
  }
  componentDidMount() {
    this.chatScroll();
  }
  componentDidUpdate() {
    var e, t;
    this.chatCount !== (null === (e = this.props.ticket) || void 0 === e ? void 0 : e.message.length) && (this.chatCount = null === (t = this.props.ticket) || void 0 === t ? void 0 : t.message.length, this.chatScroll());
  }
  chatScroll() {
    this.refs.chat && this.refs.chat.scrollTo(0, this.refs.chat.scrollHeight);
  }
  render() {
    var e,
      t,
      n = this.props.ticket;
    return <div>
                <div className={"block-content-full bg-gray-lighter p-3"}>
                    <span className={d.a.tag}>
                        {null === (e = this.props.ticket) || void 0 === e ? void 0 : e.subject}
                    </span>
                    <div className={d.a.ctrl}>
                        {o.a.createElement(p["a"], {
            userId: null === n || void 0 === n ? void 0 : n.user_id
          }, o.a.createElement(l["a"], {
            title: "用户管理",
            placement: "left"
          }, o.a.createElement(c["a"], {
            type: "user"
          })))}
                        {o.a.createElement(s["a"], {
            type: "vertical"
          })}
                        {o.a.createElement(m["a"], {
            userId: null === n || void 0 === n ? void 0 : n.user_id,
            key: null === n || void 0 === n ? void 0 : n.user_id
          }, o.a.createElement(l["a"], {
            title: "TA的流量记录",
            placement: "left"
          }, o.a.createElement(c["a"], {
            type: "solution"
          })))}
                    </div>
                </div>
                <div className={"bg-white js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto ".concat(d.a.content)} ref={"chat"}>
                    {null === (t = this.props.ticket) || void 0 === t ? void 0 : t.message.map(e => {
          return e.is_me ? <div>
                                      <div className={"font-size-sm text-muted my-2 text-right"}>
                                          {formatDateTime(e.created_at)}
                                      </div>
                                      <div className={"text-right ml-4"}>
                                          <div className={"d-inline-block bg-gray-lighter px-3 py-2 mb-2 mw-100 rounded text-left"}>
                                              {e.message}
                                          </div>
                                      </div>
                                  </div> : <div>
                                      <div className={"font-size-sm text-muted my-2"}>
                                          {formatDateTime(e.created_at)}
                                      </div>
                                      <div className={"mr-4"}>
                                          <div className={"d-inline-block bg-success-lighter px-3 py-2 mb-2 mw-100 rounded text-left"}>
                                              {e.message}
                                          </div>
                                      </div>
                                  </div>;
        })}
                </div>
                <div className={"js-chat-form block-content p-2 bg-body-dark ".concat(d.a.input)}>
                    <input onKeyDown={e => this.props.onKeyDown(e, () => {
          this.refs.message && (this.refs.message.value = "");
        })} ref={"message"} type={"text"} className={"js-chat-input bg-body-dark border-0 form-control form-control-alt"} placeholder={"输入内容回复工单..."} onChange={e => this.props.onChange(e)}></input>
                </div>
            </div>;
  }
}
class v extends o.a.Component {
  constructor(e) {
    super(e), this.state = {
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
    r = setTimeout(() => {
      this.props.dispatch({
        type: "ticket/fetchById",
        id: this.props.match.params.ticket_id
      }), this.check();
    }, 5e3);
  }
  componentWillUnmount() {
    clearTimeout(r);
  }
  reply(e) {
    this.props.dispatch({
      type: "ticket/reply",
      id: this.props.match.params.ticket_id,
      msg: this.state.message,
      callback: () => {
        e();
      }
    });
  }
  render() {
    var e = this.props.user.user,
      t = this.props.ticket,
      n = t.ticket,
      r = t.replyLoading;
    return o.a.createElement(g, {
      ticket: n,
      user: e,
      onKeyDown: (e, t) => {
        13 !== e.keyCode || r || this.reply(t);
      },
      onChange: e => {
        this.setState({
          message: e.target.value
        });
      }
    });
  }
}
legacyExports["default"] = Object(a["c"])(e => {
  var t = e.user,
    n = e.ticket;
  return {
    user: t,
    ticket: n
  };
})(v);
