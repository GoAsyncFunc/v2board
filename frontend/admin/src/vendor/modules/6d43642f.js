let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("./32717463.js");
var r = require("../Modal.js"),
  i = (require("./4f614579.js"), require("./32664d37.js")),
  o = (require("./354e4461.js"), require("./35724567.js")),
  a = (require("../iconStyles.js"), require("../Icon.js")),
  s = require("./70307045.js"),
  l = interopDefault(s),
  c = require("./71317449.js"),
  u = interopDefault(c),
  h = require("../reactRedux.js"),
  f = require("./7449346c.js");
class d extends u.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {
        email: this.props.email || void 0,
        plan_id: void 0,
        period: void 0,
        total_amount: void 0
      }
    };
  }
  show() {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible || this.setState({
        submit: {
          email: this.props.email || void 0,
          plan_id: void 0,
          period: void 0,
          total_amount: void 0
        }
      });
    });
  }
  setSubmit(e, t) {
    this.setState({
      submit: l()({}, this.state.submit, {
        [e]: t
      })
    });
  }
  ok() {
    this.props.dispatch({
      type: "order/assign",
      params: l()({}, this.state.submit),
      callback: () => {
        this.show();
      }
    });
  }
  render() {
    var e = this.state,
      t = e.visible,
      n = e.submit,
      s = this.props.plan.plans,
      l = this.props.order.assignLoading;
    return u.a.createElement(u.a.Fragment, null, u.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), u.a.createElement(r["a"], {
      title: "\u8ba2\u5355\u5206\u914d",
      visible: t,
      onCancel: () => this.show(),
      onOk: () => this.ok(),
      okText: l ? u.a.createElement(a["a"], {
        type: "loading"
      }) : "\u786e\u5b9a",
      cancelText: "\u53d6\u6d88"
    }, u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      for: "example-text-input-alt"
    }, "\u7528\u6237\u90ae\u7bb1"), u.a.createElement(o["a"], {
      placeholder: "\u8bf7\u8f93\u5165\u7528\u6237\u90ae\u7bb1",
      value: n.email,
      onChange: e => this.setSubmit("email", e.target.value)
    })), u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      for: "example-text-input-alt"
    }, "\u8bf7\u9009\u62e9\u8ba2\u9605"), u.a.createElement("div", null, u.a.createElement(i["a"], {
      value: n.plan_id,
      style: {
        width: "100%"
      },
      placeholder: "\u8bf7\u9009\u62e9\u8ba2\u9605",
      onChange: e => this.setSubmit("plan_id", e)
    }, s.map(e => {
      return u.a.createElement(i["a"].Option, {
        value: e.id,
        key: Math.random()
      }, e.name);
    })))), u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      for: "example-text-input-alt"
    }, "\u8bf7\u9009\u62e9\u5468\u671f"), u.a.createElement("div", null, u.a.createElement(i["a"], {
      value: n.period,
      style: {
        width: "100%"
      },
      placeholder: "\u8bf7\u9009\u62e9\u5468\u671f",
      onChange: e => this.setSubmit("period", e)
    }, Object.keys(f["a"].periodText).map(e => {
      return u.a.createElement(i["a"].Option, {
        value: e,
        key: Math.random()
      }, f["a"].periodText[e]);
    })))), u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      for: "example-text-input-alt"
    }, "\u652f\u4ed8\u91d1\u989d"), u.a.createElement(o["a"], {
      placeholder: "\u8bf7\u8f93\u5165\u9700\u8981\u652f\u4ed8\u7684\u91d1\u989d",
      addonAfter: "\xa5",
      value: n.total_amount,
      onChange: e => this.setSubmit("total_amount", e.target.value)
    }))));
  }
}
legacyExports["a"] = Object(h["c"])(e => {
  var t = e.plan,
    n = e.order;
  return {
    plan: t,
    order: n
  };
})(d);
