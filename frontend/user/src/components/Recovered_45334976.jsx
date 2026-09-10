let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
require("../vendor/modules/32717463.js");
var r = require("../vendor/Modal.js"),
  o = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  i = require("../vendor/modules/71317449.js"),
  a = interopDefault(i),
  s = require("../vendor/reactRedux.js"),
  c = require("../vendor/i18n.js");
class u extends a.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      transferAmount: void 0
    };
  }
  show() {
    this.setState({
      visible: !this.state.visible,
      transferAmount: void 0
    });
  }
  ok() {
    this.props.dispatch({
      type: "user/transfer",
      transferAmount: this.state.transferAmount,
      callback: () => {
        this.show();
      }
    });
  }
  render() {
    var e = this.state.visible,
      t = this.props.user.userInfo;
    return a.a.createElement(a.a.Fragment, null, a.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), a.a.createElement(r["a"], {
      title: Object(c["formatMessage"])({
        id: "推广佣金划转至余额"
      }),
      visible: e,
      onOk: () => this.ok(),
      onCancel: () => this.show(),
      okText: Object(c["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(c["formatMessage"])({
        id: "取消"
      })
    }, <div className={"alert alert-danger d-flex align-items-center"} role={"alert"}>
                    <div className={"flex-00-auto"}>
                        <i className={"fa fa-fw fa-info-circle"}></i>
                    </div>
                    <div className={"flex-fill ml-3"}>
                        <p className={"mb-0"}>
                            {Object(c["formatMessage"])({
            id: "划转后的余额仅用于{title}消费使用"
          }, {
            title: window.settings.title
          })}
                        </p>
                    </div>
                </div>, <div className={"form-group"}>
                    <label>
                        {Object(c["formatMessage"])({
          id: "当前推广佣金余额"
        })}
                    </label>
                    {a.a.createElement(o["a"], {
        disabled: !0,
        type: "text",
        className: "form-control",
        value: t.commission_balance / 100
      })}
                </div>, <div className={"form-group"}>
                    <label>
                        {Object(c["formatMessage"])({
          id: "划转金额"
        })}
                    </label>
                    {a.a.createElement(o["a"], {
        type: "text",
        className: "form-control",
        placeholder: Object(c["formatMessage"])({
          id: "请输入需要划转到余额的金额"
        }),
        onChange: e => this.setState({
          transferAmount: e.target.value
        })
      })}
                </div>));
  }
}
legacyExports["a"] = Object(s["c"])(e => {
  var t = e.user;
  return {
    user: t
  };
})(u);
