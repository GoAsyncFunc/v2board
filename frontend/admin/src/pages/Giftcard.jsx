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
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = (require("../vendor/modules/69514446.js"), require("../vendor/modules/2b655154.js")),
  a = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  s = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  l = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  c = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  u = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  h = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  f = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  d = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/6d723332.js")),
  p = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  m = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  g = require("../vendor/modules/70307045.js"),
  v = interopDefault(g),
  y = require("../vendor/modules/71317449.js"),
  b = interopDefault(y),
  w = require("../layouts/MainLayout.jsx"),
  x = require("../vendor/modules/77642f52.js"),
  _ = interopDefault(x),
  E = require("../vendor/modules/2b515243.js"),
  S = interopDefault(E),
  k = require("../vendor/reactRedux.js"),
  C = require("../vendor/modules/7449346c.js"),
  O = require("../vendor/modules/76333265.js");
class T extends b.a.Component {
  constructor(e) {
    super(e), this.defaultValue = {
      type: 1
    }, this.state = {
      visible: !1,
      submit: v()({}, this.defaultValue)
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
    var e = v()({}, this.state.submit);
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
          return b.a.createElement(d["a"], {
            style: {
              cursor: "pointer"
            },
            onClick: () => {
              S()(e), p["a"].success("复制成功");
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
                                {b.a.createElement(f["a"], {
              type: "vertical"
            })}
                                <a onClick={() => {
              h["a"].confirm({
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
    return b.a.createElement(w["a"], i()({}, this.props, {
      title: "礼品卡管理"
    }), b.a.createElement(O["a"], {
      loading: n
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {b.a.createElement(c["a"], {
            onClick: () => this.modalVisible()
          }, b.a.createElement(u["a"], {
            type: "plus"
          }), "添加礼品卡")}
                        </div>
                        {b.a.createElement(l["a"], {
          tableLayout: "auto",
          dataSource: t,
          columns: x,
          scroll: {
            x: 1050
          },
          pagination: v()({}, g, {
            size: "small",
            showSizeChanger: !0,
            pageSizeOptions: [10, 50, 100, 150]
          }),
          onChange: (e, t, n) => this.tableOnChange(e, n)
        })}
                    </div>
                </div>), b.a.createElement(h["a"], {
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
                        {b.a.createElement(s["a"], {
          placeholder: "请输入礼品卡名称",
          value: this.state.submit.name,
          onChange: e => {
            this.setState({
              submit: v()({}, this.state.submit, {
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
                            {b.a.createElement(s["a"], {
          placeholder: "自定义礼品卡卡密(留空随机生成)",
          value: this.state.submit.code,
          onChange: e => {
            this.setState({
              submit: v()({}, this.state.submit, {
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
                        {b.a.createElement(s["a"], {
          type: "number",
          addonBefore: b.a.createElement(a["a"], {
            style: {
              width: 140
            },
            value: this.state.submit.type,
            onChange: e => {
              this.setState({
                submit: v()({}, this.state.submit, {
                  type: e
                })
              });
            }
          }, b.a.createElement(a["a"].Option, {
            value: 1
          }, "增加账户余额"), b.a.createElement(a["a"].Option, {
            value: 2
          }, "增加订阅时长"), b.a.createElement(a["a"].Option, {
            value: 3
          }, "增加套餐流量"), b.a.createElement(a["a"].Option, {
            value: 4
          }, "重置套餐流量"), b.a.createElement(a["a"].Option, {
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
              submit: v()({}, this.state.submit, {
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
                                {b.a.createElement(a["a"], {
            value: this.state.submit.plan_id,
            onChange: e => {
              this.setState({
                submit: v()({}, this.state.submit, {
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
            return b.a.createElement(a["a"].Option, {
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
                        {b.a.createElement(o["a"].RangePicker, {
          style: {
            width: "100%"
          },
          showTime: {
            format: "HH:mm"
          },
          format: "YYYY-MM-DD HH:mm",
          placeholder: ["Start Time", "End Time"],
          value: [this.state.submit.started_at ? _()(1e3 * this.state.submit.started_at) : null, this.state.submit.ended_at ? _()(1e3 * this.state.submit.ended_at) : null],
          onChange: e => this.setState({
            submit: v()({}, this.state.submit, {
              started_at: e[0] ? e[0].format("X") : null,
              ended_at: e[1] ? e[1].format("X") : null
            })
          }),
          onOk: e => this.setState({
            submit: v()({}, this.state.submit, {
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
                        {b.a.createElement(s["a"], {
          placeholder: "限制最大使用次数，用完则无法使用(为空则不限制)",
          value: this.state.submit.limit_use,
          onChange: e => {
            this.setState({
              submit: v()({}, this.state.submit, {
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
                            {b.a.createElement(s["a"], {
          placeholder: "输入数量批量生成",
          value: this.state.submit.generate_count,
          onChange: e => {
            this.setState({
              submit: v()({}, this.state.submit, {
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
legacyExports["default"] = Object(k["c"])(e => {
  var t = e.giftcard,
    n = e.plan;
  return {
    giftcard: t,
    plan: n
  };
})(T);
