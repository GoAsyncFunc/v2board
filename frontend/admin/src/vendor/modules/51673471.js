let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("./32717463.js");
var r = require("../Modal.js"),
  i = (require("./4f614579.js"), require("./32664d37.js")),
  o = (require("./69514446.js"), require("./2b655154.js")),
  a = (require("./354e4461.js"), require("./35724567.js")),
  s = require("./70307045.js"),
  l = interopDefault(s),
  c = require("./71317449.js"),
  u = interopDefault(c),
  h = require("../reactRedux.js"),
  f = require("./77642f52.js"),
  d = interopDefault(f);
class p extends u.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {}
    };
  }
  show() {
    this.setState({
      visible: !0
    });
  }
  hide() {
    this.setState({
      visible: !1,
      submit: {}
    });
  }
  formChange(e, t) {
    var n = this.state.submit;
    n[e] = t, this.setState({
      submit: n
    });
  }
  submit() {
    var e = l()({}, this.state.submit);
    this.props.dispatch({
      type: "user/generate",
      params: e,
      callback: () => {
        this.hide();
      }
    });
  }
  render() {
    var e = this.props.user,
      t = e.user,
      n = e.generateLoading,
      s = this.props.plan.plans,
      l = this.state,
      c = l.visible,
      h = l.submit;
    return u.a.createElement(u.a.Fragment, null, u.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), u.a.createElement(r["a"], {
      title: "\u521b\u5efa\u7528\u6237",
      visible: c,
      onCancel: () => this.hide(),
      cancelText: "\u53d6\u6d88",
      onOk: () => this.submit(),
      okButtonProps: {
        loading: n
      },
      okText: "\u751f\u6210"
    }, u.a.createElement("div", null, u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u90ae\u7bb1"), u.a.createElement(a["a"].Group, {
      compact: !0
    }, !h.generate_count && u.a.createElement(a["a"], {
      placeholder: "\u8d26\u53f7\uff08\u6279\u91cf\u751f\u6210\u8bf7\u7559\u7a7a\uff09",
      style: {
        width: "45%"
      },
      value: h.email_prefix,
      onChange: e => this.formChange("email_prefix", e.target.value)
    }), u.a.createElement(a["a"], {
      placeholder: "@",
      style: {
        width: "10%",
        textAlign: "center"
      },
      disabled: !0
    }), u.a.createElement(a["a"], {
      placeholder: "\u57df",
      style: {
        width: "45%"
      },
      value: h.email_suffix,
      onChange: e => this.formChange("email_suffix", e.target.value)
    }))), u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u5bc6\u7801"), u.a.createElement(a["a"], {
      value: h.password,
      placeholder: "\u7559\u7a7a\u5219\u5bc6\u7801\u4e0e\u90ae\u7bb1\u76f8\u540c",
      onChange: e => this.formChange("password", e.target.value)
    })), u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u5230\u671f\u65f6\u95f4"), u.a.createElement("div", null, u.a.createElement(o["a"], {
      placeholder: "\u8bf7\u9009\u62e9\u7528\u6237\u5230\u671f\u65e5\u671f\uff0c\u4e3a\u7a7a\u5219\u4e0d\u9650\u5236\u5230\u671f\u65f6\u95f4",
      defaultValue: h.expired_at && d()(1e3 * t.expired_at),
      style: {
        width: "100%"
      },
      onChange: e => this.formChange("expired_at", e ? e.format("X") : null)
    }))), u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u8ba2\u9605\u8ba1\u5212"), u.a.createElement(i["a"], {
      placeholder: "\u8bf7\u9009\u62e9\u7528\u6237\u8ba2\u9605\u8ba1\u5212",
      style: {
        width: "100%"
      },
      value: h.plan_id || null,
      onChange: e => this.formChange("plan_id", e)
    }, u.a.createElement(i["a"].Option, {
      value: null
    }, "\u65e0"), s.map(e => {
      return u.a.createElement(i["a"].Option, {
        key: Math.random(),
        value: e.id
      }, e.name);
    }))), !h.email_prefix && u.a.createElement("div", {
      className: "form-group"
    }, u.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u751f\u6210\u6570\u91cf"), u.a.createElement(a["a"], {
      value: h.generate_count,
      placeholder: "\u5982\u679c\u4e3a\u6279\u91cf\u751f\u6210\u8bf7\u8f93\u5165\u751f\u6210\u6570\u91cf",
      onChange: e => this.formChange("generate_count", e.target.value)
    })))));
  }
}
legacyExports["a"] = Object(h["c"])(e => {
  var t = e.user,
    n = e.plan;
  return {
    user: t,
    plan: n
  };
})(p);
