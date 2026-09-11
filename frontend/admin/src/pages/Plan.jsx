const {
  createPlanGroupColumn
} = require('../components/PlanGroupColumn.jsx');
const {
  createReadonlyPlanResourceColumns
} = require('../components/PlanResourceColumns.jsx');
const resourceColumns = createReadonlyPlanResourceColumns();
const {
  createReadonlyPlanPriceColumns
} = require('../components/PlanPriceColumns.jsx');
const readonlyColumns = createReadonlyPlanPriceColumns();
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
  o = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  a = (require("../vendor/modules/71566450.js"), require("../vendor/modules/6a73432b.js")),
  s = (require("../vendor/modules/6c55544b.js"), require("../vendor/modules/42764b73.js")),
  l = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/6d723332.js")),
  c = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  u = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  h = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  f = require("../vendor/modules/70307045.js"),
  d = interopDefault(f),
  p = require("../vendor/modules/71317449.js"),
  m = interopDefault(p),
  g = require("../layouts/MainLayout.jsx"),
  v = require("../vendor/reactRedux.js"),
  y = require("../vendor/modules/7449346c.js"),
  b = require("../vendor/modules/71716f75.js"),
  w = (require("../vendor/modules/62627350.js"), require("../vendor/modules/2f774774.js")),
  x = (require("../vendor/modules/7352426f.js"), require("../vendor/modules/6b617a38.js")),
  _ = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  E = (require("../vendor/modules/31344a33.js"), require("../vendor/modules/424d7252.js")),
  S = (require("../vendor/modules/6a435763.js"), require("../vendor/modules/6b504b48.js")),
  k = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  C = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  O = require("../vendor/modules/387a4e6a.js");
class T extends m.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      record: e.record || {
        show: 0,
        name: null,
        transfer_enable: null,
        group_id: void 0,
        month_price: null,
        quarter_price: null,
        half_year_price: null,
        year_price: null,
        two_year_price: null,
        three_year_price: null,
        onetime_price: null,
        reset_price: null
      }
    }, this.show = () => {
      this.setState({
        visible: !this.state.visible
      });
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "config/fetch",
      key: "site"
    }), this.props.dispatch({
      type: "serverGroup/fetch"
    });
  }
  priceOnChange(e, t) {
    this.setState({
      record: d()({}, this.state.record, {
        [e]: "" !== t ? t : null
      })
    });
  }
  save() {
    this.props.dispatch({
      type: "plan/save",
      params: d()({}, this.state.record),
      callback: () => {
        this.setState({
          visible: !1
        });
      }
    });
  }
  render() {
    var e = this.props.config.site,
      t = this.props.plan.saveLoading,
      n = this.props.serverGroup.groups;
    return m.a.createElement(m.a.Fragment, null, m.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), m.a.createElement(w["a"], {
      id: "plan",
      maskClosable: !0,
      onClose: () => this.setState({
        visible: !1
      }),
      title: "".concat(this.state.record.id ? "编辑订阅" : "新建订阅"),
      visible: this.state.visible,
      width: "80%"
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"套餐名称"}
                        </label>
                        {m.a.createElement(C["a"], {
          placeholder: "请输入套餐名称",
          value: this.state.record.name,
          onChange: e => {
            this.setState({
              record: d()({}, this.state.record, {
                name: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"套餐描述"}
                        </label>
                        {m.a.createElement(C["a"].TextArea, {
          rows: 4,
          value: this.state.record.content,
          placeholder: "请输入套餐描述，支持HTML",
          onChange: e => {
            this.setState({
              record: d()({}, this.state.record, {
                content: e.target.value
              })
            });
          }
        })}
                    </div>
                    {m.a.createElement(k["a"], {
        orientation: "center"
      }, "售价设置 ", m.a.createElement(c["a"], {
        placement: "top",
        title: "将金额留空则不会进行出售"
      }, m.a.createElement(h["a"], {
        type: "info-circle"
      })))}
                    {m.a.createElement(E["a"], {
        gutter: 10
      }, m.a.createElement(S["a"], {
        md: 4
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"月付"}
                                </label>
                                {m.a.createElement(C["a"], {
          value: null !== this.state.record.month_price ? this.state.record.month_price : void 0,
          onChange: e => this.priceOnChange("month_price", e.target.value)
        })}
                            </div>), m.a.createElement(S["a"], {
        md: 4
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"季付"}
                                </label>
                                {m.a.createElement(C["a"], {
          value: null !== this.state.record.quarter_price ? this.state.record.quarter_price : void 0,
          onChange: e => this.priceOnChange("quarter_price", e.target.value)
        })}
                            </div>), m.a.createElement(S["a"], {
        md: 4
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"半年"}
                                </label>
                                {m.a.createElement(C["a"], {
          value: null !== this.state.record.half_year_price ? this.state.record.half_year_price : void 0,
          onChange: e => this.priceOnChange("half_year_price", e.target.value)
        })}
                            </div>), m.a.createElement(S["a"], {
        md: 4
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"年付"}
                                </label>
                                {m.a.createElement(C["a"], {
          value: null !== this.state.record.year_price ? this.state.record.year_price : void 0,
          onChange: e => this.priceOnChange("year_price", e.target.value)
        })}
                            </div>), m.a.createElement(S["a"], {
        md: 4
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"两年付"}
                                </label>
                                {m.a.createElement(C["a"], {
          value: null !== this.state.record.two_year_price ? this.state.record.two_year_price : void 0,
          onChange: e => this.priceOnChange("two_year_price", e.target.value)
        })}
                            </div>), m.a.createElement(S["a"], {
        md: 4
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"三年付"}
                                </label>
                                {m.a.createElement(C["a"], {
          value: null !== this.state.record.three_year_price ? this.state.record.three_year_price : void 0,
          onChange: e => this.priceOnChange("three_year_price", e.target.value)
        })}
                            </div>))}
                    {m.a.createElement(E["a"], {
        gutter: 10
      }, m.a.createElement(S["a"], {
        md: 12
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"一次性"}
                                </label>
                                {m.a.createElement(C["a"], {
          addonAfter: e.currency_symbol,
          value: null !== this.state.record.onetime_price ? this.state.record.onetime_price : void 0,
          onChange: e => this.priceOnChange("onetime_price", e.target.value)
        })}
                            </div>), m.a.createElement(S["a"], {
        md: 12
      }, <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"重置包"}
                                </label>
                                {m.a.createElement(C["a"], {
          addonAfter: e.currency_symbol,
          value: null !== this.state.record.reset_price ? this.state.record.reset_price : void 0,
          onChange: e => this.priceOnChange("reset_price", e.target.value)
        })}
                            </div>))}
                    {m.a.createElement(k["a"], null)}
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"套餐流量"}
                        </label>
                        {m.a.createElement(C["a"], {
          addonAfter: "GB",
          placeholder: "请输入套餐流量",
          value: this.state.record.transfer_enable,
          onChange: e => {
            this.setState({
              record: d()({}, this.state.record, {
                transfer_enable: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"设备数限制"}
                        </label>
                        {m.a.createElement(C["a"], {
          placeholder: "留空则不限制",
          value: this.state.record.device_limit,
          onChange: e => {
            this.setState({
              record: d()({}, this.state.record, {
                device_limit: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"权限组 "}
                            {m.a.createElement(O["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {m.a.createElement(_["a"], {
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          value: this.state.record.group_id,
          onChange: e => {
            this.setState({
              record: d()({}, this.state.record, {
                group_id: e
              })
            });
          }
        }, n.map(e => {
          return m.a.createElement(_["a"].Option, {
            key: e.id,
            value: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"example-text-input-alt"}>
                            {"流量重置方式"}
                        </label>
                        {m.a.createElement(_["a"], {
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          value: this.state.record.reset_traffic_method,
          onChange: e => {
            this.setState({
              record: d()({}, this.state.record, {
                reset_traffic_method: e
              })
            });
          }
        }, m.a.createElement(_["a"].Option, {
          key: null,
          value: null
        }, "跟随系统设置"), m.a.createElement(_["a"].Option, {
          key: 0,
          value: 0
        }, "每月1号"), m.a.createElement(_["a"].Option, {
          key: 1,
          value: 1
        }, "按月重置"), m.a.createElement(_["a"].Option, {
          key: 2,
          value: 2
        }, "不重置"), m.a.createElement(_["a"].Option, {
          key: 3,
          value: 3
        }, "每年1月1日"), m.a.createElement(_["a"].Option, {
          key: 4,
          value: 4
        }, "按年重置"))}
                    </div>
                </div>, <div className={"form-group"}>
                    <label for={"example-text-input-alt"}>
                        {"最大容纳用户量"}
                    </label>
                    {m.a.createElement(C["a"], {
        placeholder: "留空则不限制",
        value: this.state.record.capacity_limit,
        onChange: e => {
          this.setState({
            record: d()({}, this.state.record, {
              capacity_limit: e.target.value
            })
          });
        }
      })}
                </div>, <div className={"form-group"}>
                    <label for={"example-text-input-alt"}>{"限速"}</label>
                    {m.a.createElement(C["a"], {
        addonAfter: "Mbps",
        placeholder: "留空则不限制",
        value: this.state.record.speed_limit,
        onChange: e => {
          this.setState({
            record: d()({}, this.state.record, {
              speed_limit: e.target.value
            })
          });
        }
      })}
                </div>, <div className={"v2board-drawer-action"}>
                    <div style={{
        float: "left",
        marginTop: 5
      }}>
                        {m.a.createElement(c["a"], {
          title: "勾选后变更的流量、限速、权限组将应用到该套餐下的用户",
          placement: "top"
        }, m.a.createElement(x["a"], {
          onChange: e => this.setState({
            record: d()({}, this.state.record, {
              force_update: e.target.checked
            })
          })
        }, "强制更新到用户"))}
                    </div>
                    {m.a.createElement(o["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.setState({
          visible: !1
        })
      }, "取消")}
                    {m.a.createElement(o["a"], {
        loading: t,
        onClick: () => t || this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
var L = Object(v["c"])(e => {
    var t = e.plan,
      n = e.serverGroup,
      r = e.config;
    return {
      plan: t,
      serverGroup: n,
      config: r
    };
  })(T),
  A = require("../components/Recovered_4f613657.jsx"),
  P = (require("../components/Recovered_48394c55.jsx"), require("../components/Recovered_33585647.jsx"), require("../components/Recovered_796b4332.jsx"), require("../vendor/modules/76333265.js"));
class j extends m.a.Component {
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
      type: "plan/fetch"
    }), this.props.dispatch({
      type: "serverGroup/fetch"
    });
  }
  balanceFormat(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return Object.keys(y["a"].periodText).map(n => {
      0 !== e[n] && (e[n] ? e[n] = t ? Math.round(100 * e[n]) : e[n] / 100 : e[n] = null);
    }), e;
  }
  drop(e) {
    this.props.dispatch({
      type: "plan/drop",
      id: e
    });
  }
  edit(e) {
    var t = this.props.plan.plans;
    this.setState({
      submit: d()({}, t[e]),
      visible: !0
    });
  }
  update(e, t, n) {
    this.props.dispatch({
      type: "plan/update",
      id: e,
      key: t,
      value: n
    });
  }
  render() {
    var e,
      t = this.props.plan,
      n = t.plans,
      r = t.fetchLoading,
      f = this.props.serverGroup.groups,
      d = [{
        title: "排序",
        dataIndex: "sort",
        key: "sort",
        render: (e, t) => {
          return m.a.createElement(m.a.Fragment, null, m.a.createElement(h["a"], {
            type: "menu",
            style: {
              cursor: "move"
            }
          }));
        }
      }, {
        title: "销售状态",
        dataIndex: "show",
        key: "show",
        render: (e, t) => {
          return m.a.createElement(u["a"], {
            size: "small",
            checked: parseInt(e),
            onClick: () => this.update(t.id, "show", parseInt(e) ? 0 : 1)
          });
        }
      }, {
        title: <span>
                            {"续费 "}
                            {m.a.createElement(c["a"], {
            placement: "top",
            title: "在订阅停止销售时，已购用户是否可以续费"
          }, m.a.createElement(h["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "renew",
        key: "renew",
        render: (e, t) => {
          return m.a.createElement(u["a"], {
            size: "small",
            checked: parseInt(e),
            onClick: () => this.update(t.id, "renew", parseInt(e) ? 0 : 1)
          });
        }
      }, resourceColumns["name"], resourceColumns["count"], resourceColumns["transfer_enable"], resourceColumns["device_limit"], readonlyColumns["month_price"], readonlyColumns["quarter_price"], readonlyColumns["half_year_price"], readonlyColumns["year_price"], readonlyColumns["two_year_price"], readonlyColumns["three_year_price"], readonlyColumns["onetime_price"], readonlyColumns["reset_price"], createPlanGroupColumn(f), {
        title: "操作",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        align: "right",
        render: (e, t) => {
          return m.a.createElement(m.a.Fragment, null, m.a.createElement(a["a"], {
            trigger: "click",
            overlay: m.a.createElement(s["a"], null, m.a.createElement(s["a"].Item, {
              onContextMenu: e => {
                e.stopPropagation();
              }
            }, <L record={t} key={null === t || void 0 === t ? void 0 : t.id}>
                                                <a>
                                                    {m.a.createElement(h["a"], {
                  type: "edit"
                })}
                                                    {" 编辑"}
                                                </a>
                                            </L>), m.a.createElement(s["a"].Item, {
              style: {
                color: "#ff4d4f"
              },
              onClick: () => this.drop(t.id)
            }, m.a.createElement(h["a"], {
              type: "delete"
            }), " 删除"))
          }, <a href={"javascript:void(0);"}>
                                    {"操作 "}
                                    {m.a.createElement(h["a"], {
              type: "caret-down"
            })}
                                </a>));
        }
      }],
      p = this;
    return m.a.createElement(g["a"], i()({}, this.props, {
      title: "订阅管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, m.a.createElement(P["a"], {
      loading: r
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            <L>
                                {m.a.createElement(o["a"], null, m.a.createElement(h["a"], {
              type: "plus"
            }), " 添加订阅")}
                            </L>
                        </div>
                        {m.a.createElement(b["a"], {
          onDragEnd: (e, t) => {
            p.props.dispatch({
              type: "plan/sort",
              fromIndex: e,
              toIndex: t
            });
          },
          nodeSelector: "tr",
          handleSelector: "i"
        }, m.a.createElement(A["a"], {
          onContextMenu: e => {
            this.record = e, this.forceUpdate();
          },
          tableLayout: "auto",
          dataSource: n,
          columns: d,
          pagination: !1,
          scroll: {
            x: 1300
          }
        }, <ul className={"ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical"}>
                                    <li className={"ant-dropdown-menu-item"}>
                                        <L record={this.record} key={null === (e = this.record) || void 0 === e ? void 0 : e.id}>
                                            <a>
                                                {m.a.createElement(h["a"], {
                  type: "edit"
                })}
                                                {" 编辑"}
                                            </a>
                                        </L>
                                    </li>
                                    <li className={"ant-dropdown-menu-item"} onClick={() => {
            var e;
            return this.drop(null === (e = this.record) || void 0 === e ? void 0 : e.id);
          }}>
                                        <a style={{
              color: "#ff4d4f"
            }}>
                                            {m.a.createElement(h["a"], {
                type: "delete"
              })}
                                            {" 删除"}
                                        </a>
                                    </li>
                                </ul>))}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(v["c"])(e => {
  var t = e.plan,
    n = e.serverGroup;
  return {
    plan: t,
    serverGroup: n
  };
})(j);
