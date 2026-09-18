const {
  createReadonlyGiftcardColumns
} = require('../components/GiftcardDisplayColumns.jsx');
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var loadingModule = require("../vendor/modules/6a65685a.js"),
  loading = interopDefault(loadingModule),
  datePicker = (require("../vendor/modules/69514446.js"), require("../vendor/modules/2b655154.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  table = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  modal = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  clipboard = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/6d723332.js")),
  notification = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  checkbox = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  mainLayout = require("../layouts/MainLayout.jsx"),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule),
  copyModule = require("../vendor/modules/2b515243.js"),
  copy = interopDefault(copyModule),
  reactRedux = require("../vendor/reactRedux.js"),
  loadingIndicator = require("../vendor/modules/7449346c.js"),
  tableLoading = require("../vendor/modules/76333265.js");
class GiftcardPage extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.defaultValue = {
      type: 1
    }, this.state = {
      visible: !1,
      submit: objectAssign()({}, this.defaultValue)
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "giftcard/fetch"
    }), this.props.dispatch({
      type: "plan/fetch"
    });
  }
  modalVisible() {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible || this.setState({
        submit: this.defaultValue
      });
    });
  }
  generate() {
    var e = objectAssign()({}, this.state.submit);
    this.props.dispatch({
      type: "giftcard/generate",
      params: e,
      callback: () => {
        this.modalVisible();
      }
    });
  }
  drop(e) {
    this.props.dispatch({
      type: "giftcard/drop",
      id: e.id
    });
  }
  tableOnChange(e, t) {
    this.props.dispatch({
      type: "giftcard/changeTable",
      pagination: e,
      sort: {
        sort_type: "ascend" === t.order ? "ASC" : "DESC",
        sort: t.columnKey
      }
    });
  }
  render() {
    var e = this.props.giftcard,
      t = e.giftcards,
      n = e.fetchLoading,
      r = e.saveLoading,
      g = e.pagination,
      y = this.props.plan.plans,
      x = [createReadonlyGiftcardColumns(y)["id"], createReadonlyGiftcardColumns(y)["name"], createReadonlyGiftcardColumns(y)["type"], createReadonlyGiftcardColumns(y)["value"], createReadonlyGiftcardColumns(y)["plan_id"], {
        title: "卡密",
        dataIndex: "code",
        key: "code",
        render: e => {
          return ReactComponent.a.createElement(clipboard["a"], {
            style: {
              cursor: "pointer"
            },
            onClick: () => {
              copy()(e), notification["a"].success("复制成功");
            }
          }, e);
        }
      }, createReadonlyGiftcardColumns(y)["limit_use"], createReadonlyGiftcardColumns(y)["started_at"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, n, r) => {
          return <div>
                                <a onClick={() => {
              this.setState({
                submit: t[r]
              }, () => {
                this.modalVisible();
              });
            }} href={"javascript:void(0);"}>
                                    {"编辑"}
                                </a>
                                {ReactComponent.a.createElement(divider["a"], {
              type: "vertical"
            })}
                                <a onClick={() => {
              modal["a"].confirm({
                title: "警告",
                content: "确定要删除该条项目吗？",
                onOk: () => this.drop(n),
                okText: "确定",
                cancelText: "取消"
              });
            }} href={"javascript:void(0);"}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return ReactComponent.a.createElement(mainLayout["a"], loading()({}, this.props, {
      title: "礼品卡管理"
    }), ReactComponent.a.createElement(tableLoading["a"], {
      loading: n
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {ReactComponent.a.createElement(button["a"], {
            onClick: () => this.modalVisible()
          }, ReactComponent.a.createElement(icon["a"], {
            type: "plus"
          }), "添加礼品卡")}
                        </div>
                        {ReactComponent.a.createElement(table["a"], {
          tableLayout: "auto",
          dataSource: t,
          columns: x,
          scroll: {
            x: 1050
          },
          pagination: objectAssign()({}, g, {
            size: "small",
            showSizeChanger: !0,
            pageSizeOptions: [10, 50, 100, 150]
          }),
          onChange: (e, t, n) => this.tableOnChange(e, n)
        })}
                    </div>
                </div>), ReactComponent.a.createElement(modal["a"], {
      title: "".concat(this.state.submit.id ? "编辑礼品卡" : "新建礼品卡"),
      visible: this.state.visible,
      onCancel: () => this.modalVisible(),
      onOk: () => this.generate(),
      okText: "提交",
      cancelText: "取消",
      okButtonProps: {
        loading: r
      },
      key: this.key
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"名称"}</label>
                        {ReactComponent.a.createElement(input["a"], {
          placeholder: "请输入礼品卡名称",
          value: this.state.submit.name,
          onChange: e => {
            this.setState({
              submit: objectAssign()({}, this.state.submit, {
                name: e.target.value
              })
            });
          }
        })}
                    </div>
                    {!this.state.submit.generate_count && <div className={"form-group"}>
                            <label for={"example-text-input-alt"}>
                                {"自定义礼品卡卡密"}
                            </label>
                            {ReactComponent.a.createElement(input["a"], {
          placeholder: "自定义礼品卡卡密(留空随机生成)",
          value: this.state.submit.code,
          onChange: e => {
            this.setState({
              submit: objectAssign()({}, this.state.submit, {
                code: e.target.value,
                generate_count: void 0
              })
            });
          }
        })}
                        </div>}
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"礼品卡类型"}
                        </label>
                        {ReactComponent.a.createElement(input["a"], {
          type: "number",
          addonBefore: ReactComponent.a.createElement(select["a"], {
            style: {
              width: 140
            },
            value: this.state.submit.type,
            onChange: e => {
              this.setState({
                submit: objectAssign()({}, this.state.submit, {
                  type: e
                })
              });
            }
          }, ReactComponent.a.createElement(select["a"].Option, {
            value: 1
          }, "增加账户余额"), ReactComponent.a.createElement(select["a"].Option, {
            value: 2
          }, "增加订阅时长"), ReactComponent.a.createElement(select["a"].Option, {
            value: 3
          }, "增加套餐流量"), ReactComponent.a.createElement(select["a"].Option, {
            value: 4
          }, "重置套餐流量"), ReactComponent.a.createElement(select["a"].Option, {
            value: 5
          }, "兑换订阅套餐")),
          addonAfter: (() => {
            switch (this.state.submit.type) {
              case 1:
                return "¥";
              case 2:
                return "天";
              case 3:
                return "GB";
              case 4:
                return "";
              case 5:
                return "天";
              default:
                return "";
            }
          })(),
          disabled: this.state.submit.type === 4,
          placeholder: this.state.submit.type === 5 ? "一次性套餐输入0" : "请输入值",
          value: this.state.submit.type === 4 ? 0 : this.state.submit.value,
          onChange: e => {
            this.setState({
              submit: objectAssign()({}, this.state.submit, {
                value: e.target.value
              })
            });
          }
        })}
                    </div>
                    {this.state.submit.type === 5 && <div className={"form-group"}>
                            <label for={"example-text-input-alt"}>
                                {"指定订阅"}
                            </label>
                            <div>
                                {ReactComponent.a.createElement(select["a"], {
            value: this.state.submit.plan_id,
            onChange: e => {
              this.setState({
                submit: objectAssign()({}, this.state.submit, {
                  plan_id: e.length ? e : null
                })
              });
            },
            mode: "single",
            placeholder: "指定订阅",
            style: {
              width: "100%"
            }
          }, y.map(e => {
            return ReactComponent.a.createElement(select["a"].Option, {
              key: Math.random(),
              value: "".concat(e.id)
            }, e.name);
          }))}
                            </div>
                        </div>}
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"礼品卡有效期"}
                        </label>
                        {ReactComponent.a.createElement(datePicker["a"].RangePicker, {
          style: {
            width: "100%"
          },
          showTime: {
            format: "HH:mm"
          },
          format: "YYYY-MM-DD HH:mm",
          placeholder: ["Start Time", "End Time"],
          value: [this.state.submit.started_at ? moment()(1e3 * this.state.submit.started_at) : null, this.state.submit.ended_at ? moment()(1e3 * this.state.submit.ended_at) : null],
          onChange: e => this.setState({
            submit: objectAssign()({}, this.state.submit, {
              started_at: e[0] ? e[0].format("X") : null,
              ended_at: e[1] ? e[1].format("X") : null
            })
          }),
          onOk: e => this.setState({
            submit: objectAssign()({}, this.state.submit, {
              started_at: e[0] ? e[0].format("X") : null,
              ended_at: e[1] ? e[1].format("X") : null
            })
          })
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"最大使用次数"}
                        </label>
                        {ReactComponent.a.createElement(input["a"], {
          placeholder: "限制最大使用次数，用完则无法使用(为空则不限制)",
          value: this.state.submit.limit_use,
          onChange: e => {
            this.setState({
              submit: objectAssign()({}, this.state.submit, {
                limit_use: e.target.value
              })
            });
          }
        })}
                    </div>
                    {!this.state.submit.code && !this.state.submit.id && <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"生成数量"}
                            </label>
                            {ReactComponent.a.createElement(input["a"], {
          placeholder: "输入数量批量生成",
          value: this.state.submit.generate_count,
          onChange: e => {
            this.setState({
              submit: objectAssign()({}, this.state.submit, {
                generate_count: e.target.value,
                code: void 0
              })
            });
          }
        })}
                        </div>}
                </div>));
  }
}
legacyExports["default"] = Object(reactRedux["c"])(e => {
  var t = e.giftcard,
    n = e.plan;
  return {
    giftcard: t,
    plan: n
  };
})(GiftcardPage);
