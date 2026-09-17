let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
defineExport(legacyExports, "a", function () {
  return FilterDrawer;
});
require("../vendor/modules/62627350.js");
var drawer = require("../vendor/modules/2f774774.js"),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  datePicker = (require("../vendor/modules/69514446.js"), require("../vendor/modules/2b655154.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  notification = (require("../vendor/modules/2f786b65.js"), require("../vendor/notification.js")),
  notificationModule = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule);
class FilterDrawer extends ReactComponent.a.Component {
  constructor(props) {
    super(props), this.defaultValue = {
      key: this.props.keys[0].key,
      condition: this.props.keys[0].condition[0],
      value: ""
    }, this.state = {
      visible: !1,
      filter: props.value || [],
      select: objectAssign()({}, this.defaultValue),
      keyIndex: 0
    };
  }
  show() {
    this.setState({
      visible: !0
    });
  }
  add() {
    var filter = this.state.filter;
    filter.push({
      key: this.props.keys[0].key,
      condition: this.props.keys[0].condition[0],
      value: ""
    }), this.setState({
      filter
    });
  }
  add1() {
    var filterState = this.state,
      filter = filterState.filter,
      selected = filterState.select;
    "" !== selected.value ? (filter.push(selected), this.setState({
      filter
    }, () => {
      this.setState({
        select: objectAssign()({}, this.defaultValue),
        selectIndex: 0
      });
    })) : notificationModule["a"].error("值不能为空");
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
    var valid = !0;
    this.state.filter.forEach(t => {
      "" === t.value && (notification["a"].error({
        message: "过滤器",
        description: "欲检索内容不能为空",
        duration: 1.5
      }), valid = !1);
    }), valid && (this.props.onOk(this.state.filter), this.setState({
      visible: !1
    }));
  }
  hide() {
    var selected = this.state.select;
    selected["value"] = "", this.setState({
      visible: !1,
      select: selected
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
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(drawer["a"], {
      onOk: () => this.onOk(),
      title: "过滤器",
      visible: this.state.visible,
      onClose: () => this.hide(),
      className: "v2board-filter-drawer",
      footer: ReactComponent.a.createElement(ReactComponent.a.Fragment, null)
    }, this.state.filter.length > 0 && this.state.filter.map((e, t) => {
      var n = this.props.keys.find(e => e.key === this.state.filter[t].key);
      return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.createElement(divider["a"], {
        type: "horizontal"
      }, "条件".concat(t + 1), " ", ReactComponent.a.createElement(icon["a"], {
        type: "delete",
        style: {
          color: "#ff4d4f"
        },
        onClick: () => this.onDelete(t)
      })), <div className={"form-group"}>
                                <label>{"字段名"}</label>
                                <div>
                                    {ReactComponent.a.createElement(select["a"], {
            value: this.state.filter[t].key,
            style: {
              width: "100%"
            }
          }, this.props.keys.map((e, n) => {
            return ReactComponent.a.createElement(select["a"].Option, {
              key: n,
              value: e.key,
              onClick: () => this.onChange("key", this.props.keys[n].key, t, n)
            }, e.title);
          }))}
                                </div>
                            </div>, <div className={"form-group"}>
                                <label>{"条件"}</label>
                                <div>
                                    {ReactComponent.a.createElement(select["a"], {
            value: this.state.filter[t].condition,
            style: {
              width: "100%"
            },
            onChange: e => this.onChange("condition", e, t)
          }, this.props.keys[this.state.keyIndex].condition.map(e => {
            return ReactComponent.a.createElement(select["a"].Option, {
              key: e,
              value: e
            }, e);
          }))}
                                </div>
                            </div>, <div className={"form-group"}>
                                <label>{"欲检索内容"}</label>
                                <div>
                                    {"select" === n.type && ReactComponent.a.createElement(select["a"], {
            defaultValue: this.state.filter[t].value || void 0,
            style: {
              width: "100%"
            },
            placeholder: "请选择值",
            onChange: e => this.onChange("value", e, t)
          }, n.options.map((e, t) => {
            return ReactComponent.a.createElement(select["a"].Option, {
              value: e.value
            }, e.key);
          }))}
                                    {"date" === n.type && ReactComponent.a.createElement(datePicker["a"], {
            style: {
              width: "100%"
            },
            onChange: e => this.onChange("value", e && e.format("X"), t),
            showTime: {
              defaultValue: moment()("00:00:00", "HH:mm:ss")
            }
          })}
                                    {void 0 === n.type && ReactComponent.a.createElement(input["a"], {
            style: {
              width: "100%"
            },
            defaultValue: this.state.filter[t].value || void 0,
            placeholder: "值",
            onChange: e => this.onChange("value", e.target.value, t)
          })}
                                </div>
                            </div>);
    }), ReactComponent.a.createElement(button["a"], {
      style: {
        width: "100%"
      },
      type: "primary",
      onClick: () => this.add()
    }, ReactComponent.a.createElement(icon["a"], {
      type: "plus"
    }), " 添加条件"), <div className={"v2board-drawer-action"}>
                    {ReactComponent.a.createElement(button["a"], {
        disabled: !this.state.filter.length,
        type: "danger",
        onClick: () => this.reset(),
        style: {
          float: "left"
        }
      }, "重置")}
                    {ReactComponent.a.createElement(button["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.hide()
      }, "取消")}
                    {ReactComponent.a.createElement(button["a"], {
        disabled: !this.state.filter.length,
        onClick: () => this.onOk(),
        type: "primary"
      }, "检索")}
                </div>));
  }
}
