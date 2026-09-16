const {
  createReadonlyTicketColumns
} = require('../components/TicketReadonlyColumns.jsx');
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  a = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  s = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  c = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  u = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  l = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  p = require("../vendor/modules/70307045.js"),
  d = interopDefault(p),
  h = require("../vendor/modules/71317449.js"),
  m = interopDefault(h),
  v = require("../layouts/MainLayout.jsx"),
  g = require("../vendor/modules/77642f52.js"),
  b = interopDefault(g),
  w = require("../vendor/i18n.js");
class x extends m.a.Component {
  constructor(e) {
    super(e), this.state = {};
  }
  setSaveData(e, t) {
    var n = this.props.ticket.saveData;
    this.props.dispatch({
      type: "ticket/setState",
      payload: {
        saveData: d()({}, n, {
          [e]: t
        })
      }
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: "ticket/fetch"
    });
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: "ticket/empty"
    });
  }
  save() {
    this.props.dispatch({
      type: "ticket/save"
    });
  }
  close(e) {
    this.props.dispatch({
      type: "ticket/close",
      id: e
    });
  }
  toChat(e) {
    var t = window.location.origin + window.location.pathname + "#/ticket/" + e;
    -1 === window.navigator.userAgent.toLowerCase().indexOf("mobile") && -1 === window.navigator.userAgent.toLowerCase().indexOf("ipad") ? window.open(t, "newwindow", "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no") : window.location.href = t;
  }
  render() {
    var e = this.props.ticket,
      t = e.tickets,
      n = e.fetchLoading,
      r = e.saveData,
      p = e.newTicketModalVisible,
      d = e.saveLoading,
      h = [Object(w["formatMessage"])({
        id: "低"
      }), Object(w["formatMessage"])({
        id: "中"
      }), Object(w["formatMessage"])({
        id: "高"
      })],
      y = createReadonlyTicketColumns(h);
    return m.a.createElement(v["a"], o()({}, this.props, {
      title: Object(w["formatMessage"])({
        id: "我的工单"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"block block-rounded js-appear-enabled ".concat(n ? "block-mode-loading" : "")}>
                        <div className={"block-header block-header-default"}>
                            <h3 className={"block-title"}>
                                {Object(w["formatMessage"])({
                id: "工单历史"
              })}
                            </h3>
                            <div className={"block-options"}>
                                <button type={"button"} className={"btn btn-primary btn-sm btn-primary btn-rounded px-3"} onClick={() => this.props.dispatch({
                type: "ticket/setState",
                payload: {
                  newTicketModalVisible: !0
                }
              })}>
                                    {d ? m.a.createElement(u["a"], {
                  type: "loading"
                }) : Object(w["formatMessage"])({
                  id: "新的工单"
                })}
                                </button>
                            </div>
                        </div>
                        <div className={"block-content p-0"}>
                            {m.a.createElement(c["a"], {
              tableLayout: "auto",
              dataSource: t,
              columns: y,
              pagination: !1,
              scroll: {
                x: 900
              }
            })}
                        </div>
                    </div>
                </div>
            </main>, m.a.createElement(i["a"], {
      title: Object(w["formatMessage"])({
        id: "新的工单"
      }),
      visible: p,
      onCancel: () => this.props.dispatch({
        type: "ticket/setState",
        payload: {
          newTicketModalVisible: !1
        }
      }),
      maskClosable: !0,
      onOk: () => d || this.save(),
      okText: d ? m.a.createElement(u["a"], {
        type: "loading"
      }) : Object(w["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(w["formatMessage"])({
        id: "取消"
      })
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {Object(w["formatMessage"])({
            id: "主题"
          })}
                        </label>
                        {m.a.createElement(s["a"], {
          placeholder: Object(w["formatMessage"])({
            id: "请输入工单主题"
          }),
          onChange: e => this.setSaveData("subject", e.target.value),
          value: r.subject
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {Object(w["formatMessage"])({
            id: "工单等级"
          })}
                        </label>
                        {m.a.createElement(a["a"], {
          placeholder: Object(w["formatMessage"])({
            id: "请选择工单等级"
          }),
          style: {
            width: "100%"
          },
          onChange: e => this.setSaveData("level", e),
          value: r.level
        }, h.map((e, t) => {
          return m.a.createElement(a["a"].Option, {
            key: t,
            value: t
          }, e);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {Object(w["formatMessage"])({
            id: "消息"
          })}
                        </label>
                        {m.a.createElement(s["a"].TextArea, {
          rows: 5,
          placeholder: Object(w["formatMessage"])({
            id: "请描述你遇到的问题"
          }),
          onChange: e => this.setSaveData("message", e.target.value),
          value: r.message
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(y["c"])(e => {
  var t = e.ticket;
  return {
    ticket: t
  };
})(x);
