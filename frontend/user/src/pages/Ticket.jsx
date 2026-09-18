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
var mergeProps = require("../vendor/modules/6a65685a.js"),
  mergedProps = interopDefault(mergeProps),
  modal = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  inputControl = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  table = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  mergeStateModule = require("../vendor/modules/70307045.js"),
  mergeState = interopDefault(mergeStateModule),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  mainLayout = require("../layouts/MainLayout.jsx"),
  reactRedux = require("../vendor/reactRedux.js"),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule),
  i18n = require("../vendor/i18n.js");
class TicketPage extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {};
  }
  setSaveData(key, value) {
    var saveData = this.props.ticket.saveData;
    this.props.dispatch({
      type: "ticket/setState",
      payload: {
        saveData: mergeState()({}, saveData, {
          [key]: value
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
    var ticketState = this.props.ticket,
      tickets = ticketState.tickets,
      fetchLoading = ticketState.fetchLoading,
      saveData = ticketState.saveData,
      newTicketModalVisible = ticketState.newTicketModalVisible,
      saveLoading = ticketState.saveLoading,
      levels = [Object(i18n["formatMessage"])({
        id: "低"
      }), Object(i18n["formatMessage"])({
        id: "中"
      }), Object(i18n["formatMessage"])({
        id: "高"
      })],
      columns = createReadonlyTicketColumns(levels);
    return ReactComponent.a.createElement(mainLayout["a"], mergedProps()({}, this.props, {
      title: Object(i18n["formatMessage"])({
        id: "我的工单"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"block block-rounded js-appear-enabled ".concat(fetchLoading ? "block-mode-loading" : "")}>
                        <div className={"block-header block-header-default"}>
                            <h3 className={"block-title"}>
                                {Object(i18n["formatMessage"])({
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
                                    {saveLoading ? ReactComponent.a.createElement(icon["a"], {
                  type: "loading"
                }) : Object(i18n["formatMessage"])({
                  id: "新的工单"
                })}
                                </button>
                            </div>
                        </div>
                        <div className={"block-content p-0"}>
                            {ReactComponent.a.createElement(table["a"], {
              tableLayout: "auto",
              dataSource: tickets,
              columns: columns,
              pagination: !1,
              scroll: {
                x: 900
              }
            })}
                        </div>
                    </div>
                </div>
            </main>, ReactComponent.a.createElement(modal["a"], {
      title: Object(i18n["formatMessage"])({
        id: "新的工单"
      }),
      visible: newTicketModalVisible,
      onCancel: () => this.props.dispatch({
        type: "ticket/setState",
        payload: {
          newTicketModalVisible: !1
        }
      }),
      maskClosable: !0,
      onOk: () => saveLoading || this.save(),
      okText: saveLoading ? ReactComponent.a.createElement(icon["a"], {
        type: "loading"
      }) : Object(i18n["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(i18n["formatMessage"])({
        id: "取消"
      })
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {Object(i18n["formatMessage"])({
            id: "主题"
          })}
                        </label>
                        {ReactComponent.a.createElement(inputControl["a"], {
          placeholder: Object(i18n["formatMessage"])({
            id: "请输入工单主题"
          }),
          onChange: event => this.setSaveData("subject", event.target.value),
          value: saveData.subject
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {Object(i18n["formatMessage"])({
            id: "工单等级"
          })}
                        </label>
                        {ReactComponent.a.createElement(select["a"], {
          placeholder: Object(i18n["formatMessage"])({
            id: "请选择工单等级"
          }),
          style: {
            width: "100%"
          },
          onChange: value => this.setSaveData("level", value),
          value: saveData.level
        }, levels.map((level, index) => {
          return ReactComponent.a.createElement(select["a"].Option, {
            key: index,
            value: index
          }, level);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {Object(i18n["formatMessage"])({
            id: "消息"
          })}
                        </label>
                        {ReactComponent.a.createElement(inputControl["a"].TextArea, {
          rows: 5,
          placeholder: Object(i18n["formatMessage"])({
            id: "请描述你遇到的问题"
          }),
          onChange: event => this.setSaveData("message", event.target.value),
          value: saveData.message
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(reactRedux["c"])(state => {
  var ticket = state.ticket;
  return {
    ticket
  };
})(TicketPage);
