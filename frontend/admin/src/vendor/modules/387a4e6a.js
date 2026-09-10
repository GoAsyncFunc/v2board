let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("./32717463.js");
var r = require("../Modal.js"),
  i = (require("./354e4461.js"), require("./35724567.js")),
  o = (require("../iconStyles.js"), require("../Icon.js")),
  a = require("./70307045.js"),
  s = interopDefault(a),
  l = require("./71317449.js"),
  c = interopDefault(l),
  u = (require("../../layouts/MainLayout.jsx"), require("../reactRedux.js"));
class h extends c.a.Component {
  constructor(e) {
    super(e), this.state = {
      submit: s()({}, this.props.record),
      visible: !1
    };
  }
  save() {
    var e = s()({}, this.state.submit);
    this.props.dispatch({
      type: "serverGroup/save",
      params: e,
      callback: () => {
        this.setState({
          visible: !1
        });
      }
    });
  }
  render() {
    var e = this.props.serverGroup.fetchLoading;
    return c.a.createElement(c.a.Fragment, null, c.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), c.a.createElement(r["a"], {
      title: "".concat(this.state.submit.id ? "\u7f16\u8f91\u7ec4" : "\u521b\u5efa\u7ec4"),
      visible: this.state.visible,
      onCancel: () => this.setState({
        visible: !1
      }),
      onOk: () => e || this.save(),
      okText: e ? c.a.createElement(o["a"], {
        type: "loading"
      }) : "\u63d0\u4ea4",
      cancelText: "\u53d6\u6d88"
    }, c.a.createElement("div", null, c.a.createElement("div", {
      className: "form-group"
    }, c.a.createElement("label", {
      for: "example-text-input-alt"
    }, "\u7ec4\u540d"), c.a.createElement(i["a"], {
      placeholder: "\u8bf7\u8f93\u5165\u7ec4\u540d",
      value: this.state.submit.name,
      onChange: e => {
        this.setState({
          submit: s()({}, this.state.submit, {
            name: e.target.value
          })
        });
      }
    })))));
  }
}
legacyExports["a"] = Object(u["c"])(e => {
  var t = e.serverGroup;
  return {
    serverGroup: t
  };
})(h);
