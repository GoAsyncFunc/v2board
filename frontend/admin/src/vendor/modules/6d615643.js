let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("./32717463.js");
var r = require("../Modal.js"),
  i = require("./70307045.js"),
  o = interopDefault(i),
  a = (require("./354e4461.js"), require("./35724567.js")),
  s = require("./71317449.js"),
  l = interopDefault(s),
  c = require("../reactRedux.js");
class u extends l.a.Component {
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
      visible: !1
    });
  }
  send() {
    this.props.dispatch({
      type: "user/sendMail",
      params: this.state.submit,
      callback: () => {
        this.hide();
      }
    });
  }
  render() {
    var e = this.props.user,
      t = e.filter,
      n = e.sendMailLoading,
      i = this.state.visible;
    return l.a.createElement(l.a.Fragment, null, l.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), l.a.createElement(r["a"], {
      title: "\u53d1\u9001\u90ae\u4ef6",
      visible: i,
      onOk: () => this.send(),
      okButtonProps: {
        loading: n
      },
      onCancel: () => this.hide()
    }, l.a.createElement("div", {
      className: "form-group"
    }, l.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u6536\u4ef6\u4eba"), l.a.createElement(a["a"], {
      disabled: !0,
      value: t.length ? "\u8fc7\u6ee4\u7528\u6237" : "\u5168\u90e8\u7528\u6237"
    })), l.a.createElement("div", {
      className: "form-group"
    }, l.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u4e3b\u9898"), l.a.createElement(a["a"], {
      placeholder: "\u8bf7\u8f93\u5165\u90ae\u4ef6\u4e3b\u9898",
      value: this.state.submit.subject,
      onChange: e => {
        this.setState({
          submit: o()({}, this.state.submit, {
            subject: e.target.value
          })
        });
      }
    })), l.a.createElement("div", {
      className: "form-group"
    }, l.a.createElement("label", {
      htmlFor: "example-text-input-alt"
    }, "\u53d1\u9001\u5185\u5bb9"), l.a.createElement(a["a"].TextArea, {
      rows: 12,
      value: this.state.submit.content,
      placeholder: "\u8bf7\u8f93\u5165\u90ae\u4ef6\u5185\u5bb9",
      onChange: e => {
        this.setState({
          submit: o()({}, this.state.submit, {
            content: e.target.value
          })
        });
      }
    }))));
  }
}
legacyExports["a"] = Object(c["c"])(e => {
  var t = e.user;
  return {
    user: t
  };
})(u);
