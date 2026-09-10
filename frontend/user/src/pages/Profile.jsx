let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  a = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  s = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  c = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  u = require("../vendor/modules/71317449.js"),
  l = interopDefault(u),
  f = require("../layouts/MainLayout.jsx"),
  p = require("../vendor/reactRedux.js"),
  d = require("../services/request.js"),
  h = (require("../components/Recovered_45334976.jsx"), require("../components/Recovered_54643430.jsx"), require("../vendor/modules/79786e6e.js")),
  m = require("../vendor/i18n.js");
require("../vendor/modules/76333265.js");
class v extends l.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "user/getUserInfo"
    }), this.props.dispatch({
      type: "comm/config"
    });
  }
  changePassword() {
    if (this.refs.re_password.value !== this.refs.new_password.value) return c["a"].error(Object(m["formatMessage"])({
      id: "两次新密码输入不同"
    }));
    this.props.dispatch({
      type: "user/changePassword",
      oldPassword: this.refs.old_password.value,
      newPassword: this.refs.new_password.value
    });
  }
  redeemgiftcard() {
    if (this.refs.giftcard.value.length == 0) return c["a"].error(Object(m["formatMessage"])({
      id: "请输入礼品卡"
    }));
    this.props.dispatch({
      type: "user/redeemgiftcard",
      giftcard: this.refs.giftcard.value,
      callback: () => {
        componentDidMount();
      }
    });
  }
  update(e, t) {
    this.props.dispatch({
      type: "user/update",
      key: e,
      value: t
    });
  }
  resetSecurity() {
    var e = this;
    s["a"].confirm({
      title: Object(m["formatMessage"])({
        id: "确定要重置订阅信息？"
      }),
      content: Object(m["formatMessage"])({
        id: "如果你的订阅地址或信息泄露可以进行此操作。重置后你的UUID及订阅将会变更，需要重新进行订阅。"
      }),
      onOk() {
        Object(d["a"])("/user/resetSecurity").then(t => {
          200 === t.code && (c["a"].success(Object(m["formatMessage"])({
            id: "重置成功"
          })), e.fetchData());
        });
      },
      onCancel() {},
      okText: Object(m["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(m["formatMessage"])({
        id: "取消"
      })
    });
  }
  unbindTelegram() {
    var e = this;
    s["a"].confirm({
      title: Object(m["formatMessage"])({
        id: "确定要解除绑定Telegram？"
      }),
      content: Object(m["formatMessage"])({
        id: "如果你的Telegram ID已失效可以进行此操作。重置后你需要重新进行绑定。"
      }),
      onOk() {
        Object(d["a"])("/user/unbindTelegram").then(t => {
          if (200 === t.code) {
            c["a"].success(Object(m["formatMessage"])({
              id: "重置成功"
            }));
            e.props.dispatch({
              type: "user/getUserInfo"
            });
            e.props.dispatch({
              type: "user/getSubscribe"
            });
          }
        });
      },
      onCancel() {},
      okText: Object(m["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(m["formatMessage"])({
        id: "取消"
      })
    });
  }
  deposit() {
    var e = this;
    s["a"].confirm({
      title: <input className={"form-control"} placeholder={Object(m["formatMessage"])({
        id: "请输入充值金额" + e.props.comm.config.currency
      })} onChange={function (event) {
        e.deposit_amount = event.target.value * 100;
      }} autocomplete={"one-time-code"}></input>,
      onOk() {
        var o = {
          period: "deposit",
          deposit_amount: e.deposit_amount,
          plan_id: 0
        };
        e.props.dispatch({
          type: "order/save",
          params: o
        });
      },
      onCancel() {},
      okText: Object(m["formatMessage"])({
        id: "确认"
      }),
      cancelText: Object(m["formatMessage"])({
        id: "取消"
      })
    });
  }
  render() {
    var e = this.props.user,
      t = e.userInfo,
      n = e.changePasswordLoading,
      r = this.props.comm.config;
    return l.a.createElement(f["a"], o()({}, this.props, {
      title: Object(m["formatMessage"])({
        id: "个人中心"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-lg-12"}>
                            <div className={"block "}>
                                <div className={"block-content pb-3"}>
                                    <i className={"fa fa-wallet fa-2x text-gray-light float-right"}></i>
                                    <div className={"pb-sm-3"}>
                                        <p className={"text-muted w-75"}>
                                            {Object(m["formatMessage"])({
                      id: "我的钱包(仅消费)"
                    })}
                                        </p>
                                        <p className={"display-4 text-black font-w300 mb-2"}>
                                            {void 0 !== t.balance ? (parseInt(t.balance) / 100).toFixed(2) : "--.--"}
                                            <span className={"font-size-h5 text-muted ml-4"}>
                                                {r.currency}
                                            </span>
                                        </p>
                                        <span className={"text-muted"} style={{
                    cursor: "pointer"
                  }}>
                                            {Object(m["formatMessage"])({
                      id: "自动续费"
                    })}{" "}
                                            {l.a.createElement(i["a"], {
                      loading: this.props.user.auto_renewal_loading,
                      checked: t.auto_renewal,
                      onChange: e => this.update("auto_renewal", e ? 1 : 0)
                    })}
                                        </span>
                                        <div className={"pt-3"}>
                                            {l.a.createElement(a["a"], {
                      type: "primary",
                      onClick: () => this.deposit()
                    }, Object(m["formatMessage"])({
                      id: "充值"
                    }))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded "}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(m["formatMessage"])({
                    id: "礼品卡"
                  })}
                                    </h3>
                                </div>
                                <div className={"block-content"}>
                                    <div className={"row push"}>
                                        <div className={"col-lg-8 col-xl-5"}>
                                            <div className={"form-group"}>
                                                <input className={"form-control"} placeholder={Object(m["formatMessage"])({
                        id: "请输入礼品卡"
                      })} ref={"giftcard"} autocomplete={"one-time-code"}></input>
                                            </div>
                                            {l.a.createElement(a["a"], {
                      type: "primary",
                      onClick: () => this.redeemgiftcard(),
                      loading: e.redeemgiftcardLoading
                    }, Object(m["formatMessage"])({
                      id: "兑换"
                    }))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded "}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(m["formatMessage"])({
                    id: "修改密码"
                  })}
                                    </h3>
                                    <div className={"block-options"}></div>
                                </div>
                                <div className={"block-content"}>
                                    <div className={"row push"}>
                                        <div className={"col-lg-8 col-xl-5"}>
                                            <div className={"form-group"}>
                                                <label>
                                                    {Object(m["formatMessage"])({
                          id: "旧密码"
                        })}
                                                </label>
                                                <input type={"password"} className={"form-control"} placeholder={Object(m["formatMessage"])({
                        id: "请输入旧密码"
                      })} ref={"old_password"}></input>
                                            </div>
                                            <div className={"form-group"}>
                                                <label>
                                                    {Object(m["formatMessage"])({
                          id: "新密码"
                        })}
                                                </label>
                                                <input type={"password"} className={"form-control"} placeholder={Object(m["formatMessage"])({
                        id: "请输入新密码"
                      })} ref={"new_password"}></input>
                                            </div>
                                            <div className={"form-group"}>
                                                <label>
                                                    {Object(m["formatMessage"])({
                          id: "新密码"
                        })}
                                                </label>
                                                <input type={"password"} className={"form-control"} placeholder={Object(m["formatMessage"])({
                        id: "请输入新密码"
                      })} ref={"re_password"}></input>
                                            </div>
                                            {l.a.createElement(a["a"], {
                      type: "primary",
                      onClick: () => this.changePassword(),
                      loading: n
                    }, Object(m["formatMessage"])({
                      id: "保存"
                    }))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded "}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(m["formatMessage"])({
                    id: "通知"
                  })}
                                    </h3>
                                </div>
                                <div className={"block-content"}>
                                    <div className={"row"}>
                                        <div className={"col-lg-8 col-xl-5"}>
                                            <div className={"form-group"}>
                                                <label>
                                                    {Object(m["formatMessage"])({
                          id: "到期邮件提醒"
                        })}
                                                </label>
                                                <div>
                                                    {l.a.createElement(i["a"], {
                          loading: this.props.user.remind_expire_loading,
                          checked: t.remind_expire,
                          onChange: e => this.update("remind_expire", e ? 1 : 0)
                        })}
                                                </div>
                                            </div>
                                            <div className={"form-group"}>
                                                <label>
                                                    {Object(m["formatMessage"])({
                          id: "流量邮件提醒"
                        })}
                                                </label>
                                                <div>
                                                    {l.a.createElement(i["a"], {
                          loading: this.props.user.remind_traffic_loading,
                          checked: t.remind_traffic,
                          onChange: e => this.update("remind_traffic", e ? 1 : 0)
                        })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            {r.is_telegram ? !t.telegram_id ? <div className={"block block-rounded bind_telegram"}>
                                        <div className={"block-header block-header-default"}>
                                            <h3 className={"block-title"}>
                                                {Object(m["formatMessage"])({
                    id: "绑定Telegram"
                  })}
                                            </h3>
                                            <div className={"block-options"}>
                                                {l.a.createElement(h["a"], null, <button type={"button"} className={"btn btn-primary btn-sm btn-primary btn-rounded px-3"}>
                                                        {Object(m["formatMessage"])({
                      id: "立即开始"
                    })}
                                                    </button>)}
                                            </div>
                                        </div>
                                    </div> : <div className={"block block-rounded unbind_telegram"}>
                                        <div className={"block-header block-header-default"}>
                                            <h3 className={"block-title"}>
                                                {Object(m["formatMessage"])({
                    id: "绑定Telegram"
                  })}
                                            </h3>
                                            <div className={"block-options"}>
                                                {l.a.createElement(a["a"], {
                    type: "danger",
                    onClick: () => this.unbindTelegram()
                  }, Object(m["formatMessage"])({
                    id: "解除绑定"
                  }))}
                                            </div>
                                        </div>
                                        <div className={"block-options"}>
                                            {Object(m["formatMessage"])({
                  id: "Telegram ID: " + String(t.telegram_id)
                })}
                                        </div>
                                    </div> : l.a.createElement(l.a.Fragment, null)}
                            {r.telegram_discuss_link ? <div className={"block block-rounded join_telegram_disscuss"}>
                                    <div className={"block-header block-header-default"}>
                                        <h3 className={"block-title"}>
                                            {Object(m["formatMessage"])({
                    id: "Telegram 讨论组"
                  })}
                                        </h3>
                                        <div className={"block-options"}>
                                            <a href={r.telegram_discuss_link} target={"_blank"} className={"btn btn-primary btn-sm btn-primary btn-rounded px-3"}>
                                                {Object(m["formatMessage"])({
                      id: "立即加入"
                    })}
                                            </a>
                                        </div>
                                    </div>
                                </div> : l.a.createElement(l.a.Fragment, null)}
                            <div className={"block block-rounded "}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(m["formatMessage"])({
                    id: "重置订阅信息"
                  })}
                                    </h3>
                                    <div className={"block-options"}></div>
                                </div>
                                <div className={"block-content"}>
                                    <div className={"row push"}>
                                        <div className={"col-md-12"}>
                                            <div className={"alert alert-warning mb-3"} role={"alert"}>
                                                {Object(m["formatMessage"])({
                        id: "重置订阅提示信息"
                      })}
                                            </div>
                                            {l.a.createElement(a["a"], {
                      type: "danger",
                      onClick: () => this.resetSecurity()
                    }, Object(m["formatMessage"])({
                      id: "重置"
                    }))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(p["c"])(e => {
  var t = e.user,
    n = e.comm;
  return {
    user: t,
    comm: n
  };
})(v);
