let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
require("../vendor/modules/32717463.js");
var r = require("../vendor/Modal.js"),
  o = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  i = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  a = require("../vendor/modules/71317449.js"),
  s = interopDefault(a),
  c = require("../vendor/reactRedux.js"),
  u = require("../vendor/i18n.js");
class l extends s.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      withdrawMethod: void 0,
      withdrawAccount: void 0
    };
  }
  show() {
    this.setState({
      visible: !this.state.visible
    }), this.setState({
      withdrawMethod: void 0,
      withdrawAccount: void 0
    });
  }
  ok() {
    this.props.dispatch({
      type: "ticket/withdraw",
      withdrawAccount: this.state.withdrawAccount,
      withdrawMethod: this.state.withdrawMethod,
      callback: () => {
        this.show();
      }
    });
  }
  render() {
    var e = this.state,
      t = e.visible,
      n = e.withdrawMethod,
      a = this.props.comm.config;
    return s.a.createElement(s.a.Fragment, null, s.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), s.a.createElement(r["a"], {
      title: Object(u["formatMessage"])({
        id: "申请提现"
      }),
      visible: t,
      onOk: () => this.ok(),
      onCancel: () => this.show(),
      okText: Object(u["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(u["formatMessage"])({
        id: "取消"
      })
    }, <div className={"form-group"}>
                    <label>
                        {Object(u["formatMessage"])({
          id: "提现方式"
        })}
                    </label>
                    <div>
                        {s.a.createElement(i["a"], {
          style: {
            width: "100%"
          },
          placeholder: Object(u["formatMessage"])({
            id: "请选择提现方式"
          }),
          value: n,
          onChange: e => this.setState({
            withdrawMethod: e
          })
        }, a.withdraw_methods && a.withdraw_methods.map(e => {
          return s.a.createElement(i["a"].Option, {
            value: e
          }, e);
        }))}
                    </div>
                </div>, <div className={"form-group"}>
                    <label>
                        {Object(u["formatMessage"])({
          id: "提现账号"
        })}
                    </label>
                    {s.a.createElement(o["a"], {
        type: "text",
        className: "form-control",
        placeholder: Object(u["formatMessage"])({
          id: "请输入提现账号"
        }),
        onChange: e => this.setState({
          withdrawAccount: e.target.value
        })
      })}
                </div>));
  }
}
legacyExports["a"] = Object(c["c"])(e => {
  var t = e.user,
    n = e.comm;
  return {
    user: t,
    comm: n
  };
})(l);
