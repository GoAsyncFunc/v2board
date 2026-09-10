let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
defineExport(legacyExports, "a", function () {
  return y;
});
require("../vendor/modules/62627350.js");
var r = require("../vendor/modules/2f774774.js"),
  i = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  o = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  a = (require("../vendor/modules/69514446.js"), require("../vendor/modules/2b655154.js")),
  s = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  l = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  c = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  u = (require("../vendor/modules/2f786b65.js"), require("../vendor/notification.js")),
  h = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  f = require("../vendor/modules/70307045.js"),
  d = interopDefault(f),
  p = require("../vendor/modules/71317449.js"),
  m = interopDefault(p),
  g = require("../vendor/modules/77642f52.js"),
  v = interopDefault(g);
class y extends m.a.Component {
  constructor(e) {
    super(e), this.defaultValue = {
      key: this.props.keys[0].key,
      condition: this.props.keys[0].condition[0],
      value: ""
    }, this.state = {
      visible: !1,
      filter: e.value || [],
      select: d()({}, this.defaultValue),
      keyIndex: 0
    };
  }
  show() {
    this.setState({
      visible: !0
    });
  }
  add() {
    var e = this.state.filter;
    e.push({
      key: this.props.keys[0].key,
      condition: this.props.keys[0].condition[0],
      value: ""
    }), this.setState({
      filter: e
    });
  }
  add1() {
    var e = this.state,
      t = e.filter,
      n = e.select;
    "" !== n.value ? (t.push(n), this.setState({
      filter: t
    }, () => {
      this.setState({
        select: d()({}, this.defaultValue),
        selectIndex: 0
      });
    })) : h["a"].error("值不能为空");
  }
  onChange(e, t, n, r) {
    var i = this.state.filter;
    i[n][e] = t, "key" === e && (i[n]["condition"] = this.props.keys[r].condition[0]), this.setState({
      filter: i
    }), "undefined" !== typeof r && this.setState({
      keyIndex: r
    });
  }
  onOk() {
    var e = !0;
    this.state.filter.forEach(t => {
      "" === t.value && (u["a"].error({
        message: "过滤器",
        description: "欲检索内容不能为空",
        duration: 1.5
      }), e = !1);
    }), e && (this.props.onOk(this.state.filter), this.setState({
      visible: !1
    }));
  }
  hide() {
    var e = this.state.select;
    e["value"] = "", this.setState({
      visible: !1,
      select: e
    });
  }
  onDelete(e) {
    var t = this.state.filter;
    t.splice(e, 1), this.setState({
      filter: t
    });
  }
  reset() {
    this.setState({
      filter: []
    }, () => {
      this.onOk();
    });
  }
  render() {
    return m.a.createElement(m.a.Fragment, null, m.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), m.a.createElement(r["a"], {
      onOk: () => this.onOk(),
      title: "过滤器",
      visible: this.state.visible,
      onClose: () => this.hide(),
      className: "v2board-filter-drawer",
      footer: m.a.createElement(m.a.Fragment, null)
    }, this.state.filter.length > 0 && this.state.filter.map((e, t) => {
      var n = this.props.keys.find(e => e.key === this.state.filter[t].key);
      return m.a.createElement(m.a.Fragment, null, m.a.createElement(l["a"], {
        type: "horizontal"
      }, "条件".concat(t + 1), " ", m.a.createElement(c["a"], {
        type: "delete",
        style: {
          color: "#ff4d4f"
        },
        onClick: () => this.onDelete(t)
      })), <div className={"form-group"}>
                                <label>{"字段名"}</label>
                                <div>
                                    {m.a.createElement(s["a"], {
            value: this.state.filter[t].key,
            style: {
              width: "100%"
            }
          }, this.props.keys.map((e, n) => {
            return m.a.createElement(s["a"].Option, {
              key: n,
              value: e.key,
              onClick: () => this.onChange("key", this.props.keys[n].key, t, n)
            }, e.title);
          }))}
                                </div>
                            </div>, <div className={"form-group"}>
                                <label>{"条件"}</label>
                                <div>
                                    {m.a.createElement(s["a"], {
            value: this.state.filter[t].condition,
            style: {
              width: "100%"
            },
            onChange: e => this.onChange("condition", e, t)
          }, this.props.keys[this.state.keyIndex].condition.map(e => {
            return m.a.createElement(s["a"].Option, {
              key: e,
              value: e
            }, e);
          }))}
                                </div>
                            </div>, <div className={"form-group"}>
                                <label>{"欲检索内容"}</label>
                                <div>
                                    {"select" === n.type && m.a.createElement(s["a"], {
            defaultValue: this.state.filter[t].value || void 0,
            style: {
              width: "100%"
            },
            placeholder: "请选择值",
            onChange: e => this.onChange("value", e, t)
          }, n.options.map((e, t) => {
            return m.a.createElement(s["a"].Option, {
              value: e.value
            }, e.key);
          }))}
                                    {"date" === n.type && m.a.createElement(a["a"], {
            style: {
              width: "100%"
            },
            onChange: e => this.onChange("value", e && e.format("X"), t),
            showTime: {
              defaultValue: v()("00:00:00", "HH:mm:ss")
            }
          })}
                                    {void 0 === n.type && m.a.createElement(o["a"], {
            style: {
              width: "100%"
            },
            defaultValue: this.state.filter[t].value || void 0,
            placeholder: "值",
            onChange: e => this.onChange("value", e.target.value, t)
          })}
                                </div>
                            </div>);
    }), m.a.createElement(i["a"], {
      style: {
        width: "100%"
      },
      type: "primary",
      onClick: () => this.add()
    }, m.a.createElement(c["a"], {
      type: "plus"
    }), " 添加条件"), <div className={"v2board-drawer-action"}>
                    {m.a.createElement(i["a"], {
        disabled: !this.state.filter.length,
        type: "danger",
        onClick: () => this.reset(),
        style: {
          float: "left"
        }
      }, "重置")}
                    {m.a.createElement(i["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.hide()
      }, "取消")}
                    {m.a.createElement(i["a"], {
        disabled: !this.state.filter.length,
        onClick: () => this.onOk(),
        type: "primary"
      }, "检索")}
                </div>));
  }
}
