let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
require("../vendor/modules/32717463.js");
var modal = require("../vendor/Modal.js"),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  i18n = require("../vendor/i18n.js");
class TransferCommissionModal extends ReactComponent.a.Component {
  constructor(props) {
    super(props), this.state = {
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
    var visible = this.state.visible,
      userInfo = this.props.user.userInfo;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(modal["a"], {
      title: Object(i18n["formatMessage"])({
        id: "推广佣金划转至余额"
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
    }, <div className={"alert alert-danger d-flex align-items-center"} role={"alert"}>
                    <div className={"flex-00-auto"}>
                        <i className={"fa fa-fw fa-info-circle"}></i>
                    </div>
                    <div className={"flex-fill ml-3"}>
                        <p className={"mb-0"}>
                            {Object(i18n["formatMessage"])({
            id: "划转后的余额仅用于{title}消费使用"
          }, {
            title: window.settings.title
          })}
                        </p>
                    </div>
                </div>, <div className={"form-group"}>
                    <label>
                        {Object(i18n["formatMessage"])({
          id: "当前推广佣金余额"
        })}
                    </label>
                    {ReactComponent.a.createElement(input["a"], {
        disabled: !0,
        type: "text",
        className: "form-control",
        value: userInfo.commission_balance / 100
      })}
                </div>, <div className={"form-group"}>
                    <label>
                        {Object(i18n["formatMessage"])({
          id: "划转金额"
        })}
                    </label>
                    {ReactComponent.a.createElement(input["a"], {
        type: "text",
        className: "form-control",
        placeholder: Object(i18n["formatMessage"])({
          id: "请输入需要划转到余额的金额"
        }),
        onChange: event => this.setState({
          transferAmount: event.target.value
        })
      })}
                </div>));
  }
}
legacyExports["a"] = Object(reactRedux["c"])(state => {
  var user = state.user;
  return {
    user
  };
})(TransferCommissionModal);
