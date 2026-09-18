let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
require("../vendor/modules/32717463.js");
var modal = require("../vendor/Modal.js"),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  i18n = require("../vendor/i18n.js");
class WithdrawModal extends ReactComponent.a.Component {
  constructor(props) {
    super(props), this.state = {
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
    var withdrawState = this.state,
      visible = withdrawState.visible,
      withdrawMethod = withdrawState.withdrawMethod,
      commConfig = this.props.comm.config;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(modal["a"], {
      title: Object(i18n["formatMessage"])({
        id: "申请提现"
      }),
      visible,
      onOk: () => this.ok(),
      onCancel: () => this.show(),
      okText: Object(i18n["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(i18n["formatMessage"])({
        id: "取消"
      })
    }, <div className={"form-group"}>
                    <label>
                        {Object(i18n["formatMessage"])({
          id: "提现方式"
        })}
                    </label>
                    <div>
                        {ReactComponent.a.createElement(select["a"], {
          style: {
            width: "100%"
          },
          placeholder: Object(i18n["formatMessage"])({
            id: "请选择提现方式"
          }),
          value: withdrawMethod,
          onChange: method => this.setState({
            withdrawMethod: method
          })
        }, commConfig.withdraw_methods && commConfig.withdraw_methods.map(method => {
          return ReactComponent.a.createElement(select["a"].Option, {
            value: method
          }, method);
        }))}
                    </div>
                </div>, <div className={"form-group"}>
                    <label>
                        {Object(i18n["formatMessage"])({
          id: "提现账号"
        })}
                    </label>
                    {ReactComponent.a.createElement(input["a"], {
        type: "text",
        className: "form-control",
        placeholder: Object(i18n["formatMessage"])({
          id: "请输入提现账号"
        }),
        onChange: event => this.setState({
          withdrawAccount: event.target.value
        })
      })}
                </div>));
  }
}
legacyExports["a"] = Object(reactRedux["c"])(state => {
  var user = state.user,
    comm = state.comm;
  return {
    user,
    comm
  };
})(WithdrawModal);
