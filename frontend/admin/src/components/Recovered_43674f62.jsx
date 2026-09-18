let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
require("../vendor/modules/62627350.js");
var drawer = require("../vendor/modules/antdDrawer.js"),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  checkbox = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/antdSwitch.js")),
  tooltip = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  datePicker = (require("../vendor/modules/69514446.js"), require("../vendor/modules/antdDatePicker.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  reactModule = require("../vendor/modules/reactRuntime.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule);
class UserEditor extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1
    };
  }
  show() {
    this.props.userId && this.setState({
      visible: !0
    }, () => {
      this.props.dispatch({
        type: "user/getUserInfoById",
        id: this.props.userId
      });
    });
  }
  hide() {
    this.setState({
      visible: !1
    }, () => {
      this.props.dispatch({
        type: "user/setState",
        payload: {
          user: {}
        }
      });
    });
  }
  formChange(e, t) {
    this.props.dispatch({
      type: "user/setState",
      payload: {
        user: objectAssign()({}, this.props.user.user, {
          [e]: t
        })
      }
    });
  }
  submit() {
    var e = objectAssign()({}, this.props.user.user);
    this.props.dispatch({
      type: "user/update",
      params: e,
      callback: () => {
        this.hide();
      }
    });
  }
  render() {
    var e = this.props.user,
      t = e.user,
      n = e.updateLoading,
      h = this.props.plan.plans,
      f = this.state.visible;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(drawer["a"], {
      id: "user",
      width: "80%",
      title: "用户管理",
      visible: f,
      onClose: () => this.hide(),
      cancelText: "取消"
    }, t.email ? <div>
                        <div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"邮箱"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            placeholder: "请输入邮箱",
            defaultValue: t.email,
            onChange: e => this.formChange("email", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"邀请人邮箱"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            placeholder: "请输入邀请人邮箱",
            defaultValue: t.invite_user_email,
            onChange: e => this.formChange("invite_user_email", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"密码"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            defaultValue: t.password,
            placeholder: "如需修改密码请输入",
            onChange: e => this.formChange("password", e.target.value)
          })}
                            </div>
                            <div className={"row"}>
                                <div className={"form-group col-md-6 col-xs-12"}>
                                    <label>{"余额"}</label>
                                    {ReactComponent.a.createElement(input["a"], {
              type: "number",
              addonAfter: "¥",
              placeholder: "余额",
              defaultValue: t.balance,
              onChange: e => this.formChange("balance", e.target.value)
            })}
                                </div>
                                <div className={"form-group col-md-6 col-xs-12"}>
                                    <label>{"推广佣金"}</label>
                                    {ReactComponent.a.createElement(input["a"], {
              type: "number",
              addonAfter: "¥",
              placeholder: "推广佣金",
              defaultValue: t.commission_balance,
              onChange: e => this.formChange("commission_balance", e.target.value)
            })}
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"form-group col-md-6 col-xs-12"}>
                                    <label>{"已用上行"}</label>
                                    {ReactComponent.a.createElement(input["a"], {
              type: "number",
              addonAfter: "GB",
              placeholder: "已用上行",
              defaultValue: t.u,
              onChange: e => this.formChange("u", e.target.value)
            })}
                                </div>
                                <div className={"form-group col-md-6 col-xs-12"}>
                                    <label>{"已用下行"}</label>
                                    {ReactComponent.a.createElement(input["a"], {
              type: "number",
              addonAfter: "GB",
              placeholder: "已用下行",
              defaultValue: t.d,
              onChange: e => this.formChange("d", e.target.value)
            })}
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"流量"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            type: "number",
            addonAfter: "GB",
            defaultValue: t.transfer_enable,
            placeholder: "请输入流量",
            onChange: e => this.formChange("transfer_enable", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"设备数限制"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            placeholder: "留空则不限制",
            defaultValue: t.device_limit,
            onChange: e => this.formChange("device_limit", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"到期时间"}
                                </label>
                                <div>
                                    {ReactComponent.a.createElement(datePicker["a"], {
              placeholder: "长期有效",
              defaultValue: null !== t.expired_at && moment()(1e3 * t.expired_at),
              style: {
                width: "100%"
              },
              onChange: e => this.formChange("expired_at", e ? e.format("X") : null)
            })}
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"订阅计划"}
                                </label>
                                {ReactComponent.a.createElement(select["a"], {
            placeholder: "请选择用户订阅计划",
            style: {
              width: "100%"
            },
            defaultValue: t.plan_id || null,
            onChange: e => this.formChange("plan_id", e)
          }, ReactComponent.a.createElement(select["a"].Option, {
            value: null
          }, "无"), h.map(e => {
            return ReactComponent.a.createElement(select["a"].Option, {
              key: Math.random(),
              value: e.id
            }, e.name);
          }))}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"账户状态"}
                                </label>
                                {ReactComponent.a.createElement(select["a"], {
            style: {
              width: "100%"
            },
            defaultValue: t.banned ? 1 : 0,
            onChange: e => this.formChange("banned", e)
          }, ReactComponent.a.createElement(select["a"].Option, {
            key: 1,
            value: 1
          }, "封禁"), ReactComponent.a.createElement(select["a"].Option, {
            key: 0,
            value: 0
          }, "正常"))}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"推荐返利类型"}
                                </label>
                                {ReactComponent.a.createElement(select["a"], {
            style: {
              width: "100%"
            },
            defaultValue: parseInt(t.commission_type),
            onChange: e => this.formChange("commission_type", e)
          }, ReactComponent.a.createElement(select["a"].Option, {
            key: 0,
            value: 0
          }, "跟随系统设置"), ReactComponent.a.createElement(select["a"].Option, {
            key: 1,
            value: 1
          }, "循环返利"), ReactComponent.a.createElement(select["a"].Option, {
            key: 2,
            value: 2
          }, "首次返利"))}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"推荐返利比例"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            addonAfter: "%",
            defaultValue: t.commission_rate,
            placeholder: "请输入推荐返利比例(为空则跟随站点设置返利比例)",
            onChange: e => this.formChange("commission_rate", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"专享折扣比例 "}
                                    {ReactComponent.a.createElement(tooltip["a"], {
              placement: "top",
              title: "设置后该用户购买任何订阅将始终享受该折扣"
            }, ReactComponent.a.createElement(icon["a"], {
              type: "question-circle"
            }))}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            addonAfter: "%",
            defaultValue: t.discount,
            placeholder: "请输入专享折扣比例",
            onChange: e => this.formChange("discount", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"限速"}
                                </label>
                                {ReactComponent.a.createElement(input["a"], {
            addonAfter: "Mbps",
            defaultValue: t.speed_limit,
            placeholder: "留空则不限制",
            onChange: e => this.formChange("speed_limit", e.target.value)
          })}
                            </div>
                            <div className={"form-group"}>
                                <label for={"example-text-input-alt"}>
                                    {"是否管理员"}
                                </label>
                                <div>
                                    {ReactComponent.a.createElement(checkbox["a"], {
              checked: t.is_admin,
              onChange: e => this.formChange("is_admin", e ? 1 : 0)
            })}
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"example-text-input-alt"}>
                                    {"是否员工"}
                                </label>
                                <div>
                                    {ReactComponent.a.createElement(checkbox["a"], {
              checked: t.is_staff,
              onChange: e => this.formChange("is_staff", e ? 1 : 0)
            })}
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"example-text-input-alt"}>
                                    {"备注"}
                                </label>
                                <div>
                                    {ReactComponent.a.createElement(input["a"].TextArea, {
              rows: 4,
              placeholder: "请在这里记录..",
              defaultValue: t.remarks,
              onChange: e => this.formChange("remarks", e.target.value)
            })}
                                </div>
                            </div>
                        </div>
                        <div className={"v2board-drawer-action"}>
                            {ReactComponent.a.createElement(button["a"], {
          style: {
            marginRight: 8
          },
          onClick: () => this.hide()
        }, "取消")}
                            {ReactComponent.a.createElement(button["a"], {
          disabled: n,
          loading: n,
          onClick: () => this.submit(),
          type: "primary"
        }, "提交")}
                        </div>
                    </div> : ReactComponent.a.createElement(icon["a"], {
      type: "loading",
      style: {
        fontSize: 24,
        color: "#415A94"
      }
    })));
  }
}
legacyExports["a"] = Object(reactRedux["c"])(e => {
  var t = e.user,
    n = e.plan;
  return {
    user: t,
    plan: n
  };
})(UserEditor);
