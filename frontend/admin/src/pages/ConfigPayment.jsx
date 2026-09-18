const {
  createPaymentNotifyColumn
} = require('../components/PaymentNotifyColumn.jsx');
const {
  createReadonlyPaymentColumns
} = require('../components/PaymentDisplayColumns.jsx');
const readonlyColumns = createReadonlyPaymentColumns();
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
var loadingModule = require("../vendor/modules/6a65685a.js"),
  loading = interopDefault(loadingModule),
  table = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  modal = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  tooltip = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  checkbox = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/antdSwitch.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  reactModule = require("../vendor/modules/reactRuntime.js"),
  ReactComponent = interopDefault(reactModule),
  mainLayout = require("../layouts/MainLayout.jsx"),
  reactRedux = require("../vendor/reactRedux.js"),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule);
class PaymentEditor extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {
      submit: objectAssign()({}, this.props.record),
      visible: !1,
      paymentMethods: [],
      selectPaymentMethod: void 0,
      form: {},
      config: this.props.record && this.props.record.config || {}
    };
  }
  save() {
    var e = this.state,
      t = e.config,
      n = e.selectPaymentMethod,
      r = e.submit;
    this.props.dispatch({
      type: "payment/save",
      params: objectAssign()({}, r, {
        payment: n,
        config: t
      }),
      complete: () => this.setState({
        visible: !1
      })
    });
  }
  show() {
    this.props.dispatch({
      type: "payment/getPaymentMethods",
      complete: e => {
        this.setState({
          visible: !0,
          paymentMethods: e,
          selectPaymentMethod: this.state.selectPaymentMethod || this.state.submit.payment || e[0]
        }, () => {
          this.onSelectPaymentMethod(this.state.selectPaymentMethod);
        });
      }
    });
  }
  onSelectPaymentMethod(e) {
    this.props.dispatch({
      type: "payment/getPaymentForm",
      payment: e,
      id: this.state.submit.id,
      complete: t => {
        this.setState({
          form: t,
          selectPaymentMethod: e
        });
      }
    });
  }
  configOnChange(e, t) {
    var n = this.state.config;
    n[e] = t, this.setState({
      config: n
    });
  }
  submitOnChange(e, t) {
    var n = this.state.submit;
    n[e] = t, this.setState({
      submit: n
    });
  }
  render() {
    var e = this.props.payment.fetchLoading,
      t = this.state,
      n = t.paymentMethods,
      r = t.selectPaymentMethod,
      i = t.form,
      o = t.config,
      a = t.submit;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(modal["a"], {
      title: this.state.submit.id ? "编辑支付方式" : "添加支付方式",
      visible: this.state.visible,
      onCancel: () => this.setState({
        visible: !1
      }),
      onOk: () => this.save(),
      okText: this.state.submit.id ? "保存" : "添加",
      okButtonProps: {
        loading: e
      },
      cancelText: "取消"
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"显示名称"}
                        </label>
                        {ReactComponent.a.createElement(input["a"], {
          placeholder: "用于前端显示使用",
          defaultValue: a.name,
          onChange: e => this.submitOnChange("name", e.target.value)
        })}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"example-text-input-alt"}>
                            {"图标URL(选填)"}
                        </label>
                        {ReactComponent.a.createElement(input["a"], {
          placeholder: "用于前端显示使用(https://x.com/icon.svg)",
          defaultValue: a.icon,
          onChange: e => this.submitOnChange("icon", e.target.value)
        })}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"example-text-input-alt"}>
                            {"自定义通知域名(选填)"}
                        </label>
                        {ReactComponent.a.createElement(input["a"], {
          placeholder: "网关的通知将会发送到该域名(https://x.com)",
          defaultValue: a.notify_domain,
          onChange: e => this.submitOnChange("notify_domain", e.target.value)
        })}
                    </div>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div className={"form-group"}>
                                <label htmlFor={"example-text-input-alt"}>
                                    {"百分比手续费(选填)"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
              suffix: "%",
              type: "number",
              placeholder: "在订单金额基础上附加手续费",
              defaultValue: a.handling_fee_percent,
              onChange: e => this.submitOnChange("handling_fee_percent", e.target.value)
            })}
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div className={"form-group"}>
                                <label htmlFor={"example-text-input-alt"}>
                                    {"固定手续费(选填)"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
              type: "number",
              placeholder: "在订单金额基础上附加手续费",
              defaultValue: a.handling_fee_fixed / 100,
              onChange: e => this.submitOnChange("handling_fee_fixed", 100 * e.target.value)
            })}
                            </div>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"接口文件"}
                        </label>
                        <div>
                            {ReactComponent.a.createElement(select["a"], {
            style: {
              width: "100%"
            },
            defaultValue: r,
            onChange: e => this.onSelectPaymentMethod(e)
          }, n.map(e => {
            return ReactComponent.a.createElement(select["a"].Option, {
              value: e
            }, e);
          }))}
                        </div>
                    </div>
                    {Object.keys(i).map(e => {
        return <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {i[e].label}
                                </label>
                                {("input" === i[e].type || "text" === i[e].type || "string" === i[e].type || !i[e].type) && ReactComponent.a.createElement(input["a"], {
            placeholder: i[e].description,
            defaultValue: o[e] || i[e].value,
            onChange: t => this.configOnChange(e, t.target.value)
          })}
                            </div>;
      })}
                    {r && r.includes("Paytaro") && <div className={"alert alert-warning mb-0"} role={"alert"}>
                            <p className={"mb-0"}>
                                {"客服TG"}
                                <a href={"https://t.me/paytaro"} target={"_blank"} rel={"noopener noreferrer"}>
                                    {"@paytaro"}
                                </a>
                                <br></br>
                                {"机器人"}
                                <a href={"https://t.me/paytarorobot"} target={"_blank"} rel={"noopener noreferrer"}>
                                    {"@paytarorobot"}
                                </a>
                                <br></br>
                                {"官方网站"}
                                <a href={"https://v3.paytaro.com/#/docs"} target={"_blank"} rel={"noopener noreferrer"}>
                                    {"https://v3.paytaro.com"}
                                </a>
                            </p>
                        </div>}
                </div>));
  }
}
var ConnectedPaymentEditor = Object(reactRedux["c"])(e => {
    var t = e.payment;
    return {
      payment: t
    };
  })(PaymentEditor),
  _ = require("../vendor/modules/76333265.js"),
  E = require("../vendor/modules/71716f75.js");
class PaymentPage extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {
        show: 0
      }
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "payment/fetch"
    });
  }
  save(e, t) {
    this.props.dispatch({
      type: "payment/save",
      params: {
        id: e,
        enable: t
      }
    });
  }
  show(e) {
    this.props.dispatch({
      type: "payment/show",
      id: e
    });
  }
  render() {
    var e = this,
      t = this.props.payment,
      n = t.payments,
      r = t.fetchLoading,
      f = [{
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: e => {
          return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.createElement(icon["a"], {
            type: "menu",
            style: {
              cursor: "move"
            }
          }), " ", e);
        }
      }, {
        title: "启用",
        dataIndex: "enable",
        key: "enable",
        render: (e, t) => ReactComponent.a.createElement(checkbox["a"], {
          checked: parseInt(e),
          size: "small",
          onChange: e => this.show(t.id)
        })
      }, readonlyColumns["name"], readonlyColumns["payment"], createPaymentNotifyColumn(), {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t) => ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.createElement(ConnectedPaymentEditor, {
          key: t.id,
          record: t
        }, <a href={"javascript:void(0);"}>{"编辑"}</a>), ReactComponent.a.createElement(divider["a"], {
          type: "vertical"
        }), <a href={"javascript:void(0)"} onClick={() => {
          modal["a"].confirm({
            title: "警告",
            content: "确定要删除该条项目吗？",
            onOk: () => this.props.dispatch({
              type: "payment/drop",
              id: t.id
            }),
            okText: "确定",
            cancelText: "取消"
          });
        }}>
                                {"删除"}
                            </a>)
      }];
    return ReactComponent.a.createElement(mainLayout["a"], objectAssign()({}, this.props, {
      title: "支付配置"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, ReactComponent.a.createElement(_["a"], {
      loading: r
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {ReactComponent.a.createElement(ConnectedPaymentEditor, {
            key: 0
          }, ReactComponent.a.createElement(button["a"], null, ReactComponent.a.createElement(icon["a"], {
            type: "plus"
          }), " 添加支付方式"))}
                        </div>
                        {ReactComponent.a.createElement(E["a"], {
          onDragEnd: (t, n) => {
            e.props.dispatch({
              type: "payment/sort",
              fromIndex: t,
              toIndex: n
            });
          },
          nodeSelector: "tr",
          handleSelector: "i"
        }, ReactComponent.a.createElement(table["a"], {
          tableLayout: "auto",
          dataSource: n,
          columns: f,
          pagination: !1,
          scroll: {
            x: 1300
          }
        }))}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(reactRedux["c"])(e => {
  var t = e.payment;
  return {
    payment: t
  };
})(PaymentPage);
