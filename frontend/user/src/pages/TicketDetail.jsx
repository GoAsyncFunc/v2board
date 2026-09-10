let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r,
  o = require("../vendor/modules/70307045.js"),
  i = interopDefault(o),
  a = require("../vendor/modules/71317449.js"),
  s = interopDefault(a),
  c = require("../vendor/reactRedux.js"),
  u = require("../vendor/modules/77642f52.js"),
  l = interopDefault(u),
  f = require("../vendor/i18n.js"),
  p = require("../vendor/modules/4e665578.js"),
  d = interopDefault(p);
class h extends s.a.Component {
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
    var e, t;
    return <div>
                <div className={"block-content-full bg-gray-lighter p-3"}>
                    <span className={d.a.tag}>
                        {null === (e = this.props.ticket) || void 0 === e ? void 0 : e.subject}
                    </span>
                </div>
                <div className={"bg-white js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto ".concat(d.a.content)} ref={"chat"}>
                    {null === (t = this.props.ticket) || void 0 === t ? void 0 : t.message.map(e => {
          return e.is_me ? <div>
                                      <div className={"font-size-sm text-muted my-2 text-right"}>
                                          {l()(1e3 * e.created_at).format("YYYY/MM/DD HH:mm")}
                                      </div>
                                      <div className={"text-right ml-4"}>
                                          <div className={"d-inline-block bg-gray-lighter px-3 py-2 mb-2 mw-100 rounded text-left"}>
                                              {e.message}
                                          </div>
                                      </div>
                                  </div> : <div>
                                      <div className={"font-size-sm text-muted my-2"}>
                                          {l()(1e3 * e.created_at).format("YYYY/MM/DD HH:mm")}
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
        })} ref={"message"} type={"text"} className={"js-chat-input bg-body-dark border-0 form-control form-control-alt"} placeholder={Object(f["formatMessage"])({
          id: "输入内容回复工单..."
        })} onChange={e => this.props.onChange(e)}></input>
                </div>
            </div>;
  }
}
class m extends s.a.Component {
  componentDidMount() {
    this.fetchData(), r = () => setTimeout(() => {
      this.fetchData(), "function" === typeof r && r();
    }, 5e3), r();
  }
  componentWillUnmount() {
    r = void 0;
  }
  fetchData() {
    this.props.dispatch({
      type: "ticket/fetchById",
      id: this.props.match.params.ticket_id
    });
  }
  reply(e) {
    this.props.dispatch({
      type: "ticket/reply",
      id: this.props.match.params.ticket_id,
      complete: () => e()
    });
  }
  render() {
    var e = this.props.ticket,
      t = e.ticket,
      n = e.replyData,
      r = e.replyLoading;
    return s.a.createElement(h, {
      ticket: t,
      onKeyDown: (e, t) => {
        13 !== e.keyCode || r || this.reply(t);
      },
      onChange: e => {
        this.props.dispatch({
          type: "ticket/setState",
          payload: {
            replyData: i()({}, n, {
              message: e.target.value
            })
          }
        });
      }
    });
  }
}
legacyExports["default"] = Object(c["c"])(e => {
  var t = e.header,
    n = e.ticket;
  return {
    header: t,
    ticket: n
  };
})(m);
