let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
const {
  formatDate,
  formatDateDash,
  formatDaysRemaining
} = require('../components/DateTimeDisplay.jsx');
const {
  subscribePercent,
  progressBarColor,
  formatDeviceLimit
} = require('../components/SubscribeUsage.jsx');
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  a = (require("../vendor/modules/66563532.js"), require("../vendor/modules/antdCarousel.js")),
  s = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  c = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  u = require("../vendor/modules/reactRuntime.js"),
  l = interopDefault(u),
  f = require("../layouts/MainLayout.jsx"),
  p = require("../vendor/siteHelpers.js"),
  d = require("../vendor/routerHistory.js"),
  h = interopDefault(d),
  m = require("../vendor/modules/77642f52.js"),
  v = interopDefault(m),
  y = require("../vendor/reactRedux.js"),
  g = require("../vendor/modules/2f497261.js"),
  b = require("../vendor/i18n.js"),
  w = require("../vendor/modules/76333265.js");
class DashboardPage extends l.a.Component {
  constructor(props) {
    super(props), this.state = {
      user: {
        plan: {}
      },
      stat: [],
      loading: !0,
      visible: !1,
      notices: []
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "user/getSubscribe"
    }), this.props.dispatch({
      type: "user/getStat"
    }), this.props.dispatch({
      type: "notice/fetch",
      complete: () => {
        var e,
          t = (null === (e = this.props.notice) || void 0 === e ? void 0 : e.notices) || [];
        if (t.length) {
          var n = t.find(e => -1 !== e.tags.indexOf("弹窗"));
          console.log(n), n && this.modalVisible(n);
        }
      }
    }), this.props.dispatch({
      type: "comm/config"
    });
  }
  modalVisible(notice) {
    this.setState({
      visible: !this.state.visible,
      notice: notice || {}
    });
  }
  renderNotice(notice) {
    return <a className={"block block-rounded bg-image mb-0 v2board-bg-pixels"} style={notice.img_url ? {
      backgroundImage: "url(".concat(notice.img_url, ")"),
      backgroundSize: "cover"
    } : {}} href={"javascript:void(0)"} onClick={() => this.modalVisible(notice)}>
                <div className={"block-content bg-black-50"}>
                    <div className={"mb-5 mb-sm-7 d-sm-flex justify-content-sm-between align-items-sm-center"}>
                        <p>
                            <span className={"badge badge-danger p-2 text-uppercase"}>
                                {Object(b["formatMessage"])({
                id: "公告"
              })}
                            </span>
                        </p>
                    </div>
                    <p className={"font-size-lg text-white mb-1"}>{notice.title}</p>
                    <p className={"font-w600 text-white-75"}>
                        {formatDateDash(notice.created_at)}
                    </p>
                </div>
            </a>;
  }
  resetPackage() {
    var e = this.props.user.subscribe,
      t = this;
    c["a"].confirm({
      maskClosable: !0,
      title: Object(b["formatMessage"])({
        id: "确定重置当前已用流量？"
      }),
      content: Object(b["formatMessage"])({
        id: "点击「确定」将会跳转到收银台，支付订单后系统将会清空您当月已使用流量。"
      }),
      onOk() {
        t.props.dispatch({
          type: "order/save",
          params: {
            period: "reset_price",
            plan_id: e.plan_id
          }
        });
      },
      onCancel() {},
      okText: t.props.order.saveLoading ? l.a.createElement(s["a"], {
        type: "loading"
      }) : Object(b["formatMessage"])({
        id: "确定"
      }),
      cancelText: Object(b["formatMessage"])({
        id: "取消"
      }),
      okButtonProps: {
        disabled: t.props.order.saveLoading
      }
    });
  }
  newPeriod() {
    var e = this.props.user.subscribe,
      t = this;
    c["a"].confirm({
      maskClosable: !0,
      title: Object(b["formatMessage"])({
        id: "确定开启下一个流量周期？"
      }),
      content: Object(b["formatMessage"])({
        id: "点击「确定」将会扣除当前流量周期剩余订阅时长（按月重置时扣除本周期剩余订阅时长，每月1号重置时扣除整月时间30天，年周期同理），系统将会重置您的已使用流量。"
      }),
      onOk() {
        t.props.dispatch({
          type: "user/newPeriod"
        });
      },
      onCancel() {},
      okText: Object(b["formatMessage"])({
        id: "确定"
      }),
      cancelText: Object(b["formatMessage"])({
        id: "取消"
      })
    });
  }
  render() {
    var windowRef,
      settings,
      stats,
      plan,
      subscribePlan = subscribe.plan,
      userState = this.props.user,
      stat = userState.stat,
      subscribe = userState.subscribe,
      notices = this.props.notice.notices,
      usagePercent = subscribePercent(subscribe),
      alerts = [];
    (void 0 !== stat[0] && stat[0] && alerts.push(<div className={"alert alert-danger"} role={"alert"}>
                    <p className={"mb-0"}>
                        {Object(b["formatMessage"])({
          id: "还有没支付的订单"
        })}{" "}
                        <a className={"alert-link"} href={"javascript:void(0)"} onClick={() => h.a.push("/order")}>
                            {Object(b["formatMessage"])({
            id: "立即支付"
          })}
                        </a>
                    </p>
                </div>), void 0 !== stat[1] && stat[1] && alerts.push(<div className={"alert alert-warning"} role={"alert"}>
                    <p className={"mb-0"}>
                        <strong>{stat[1]}</strong>{" "}
                        {Object(b["formatMessage"])({
          id: "条工单正在处理中"
        })}{" "}
                        <a className={"alert-link"} href={"javascript:void(0)"} onClick={() => h.a.push("/ticket")}>
                            {Object(b["formatMessage"])({
            id: "立即查看"
          })}
                        </a>
                    </p>
                </div>), usagePercent >= 80 && usagePercent < 100 && !Object(p["h"])(subscribe.expired_at)) && alerts.push(<div className={"alert alert-info"} role={"alert"}>
                    <p className={"mb-0"}>
                        {Object(b["formatMessage"])({
          id: "当前已使用流量达{rate}%"
        }, {
          rate: usagePercent
        })}{" "}
                        {(null === subscribePlan || void 0 === subscribePlan ? void 0 : subscribePlan.reset_price) && <a onClick={() => this.resetPackage()}>
                                <strong>{"购买流量重置包"}</strong>
                            </a>}
                    </p>
                </div>);
    return l.a.createElement(f["a"], o()({}, this.props, {
      title: Object(b["formatMessage"])({
        id: "仪表盘"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    {alerts.map(alert => alert)}
                    {notices.length > 0 && <div className={"row mb-3 mb-md-0"}>
                            <div className={"col-12 mb-sm-4"}>
                                {notices.length > 1 ? l.a.createElement(a["a"], {
              autoplay: !0
            }, notices.map(notice => {
              return <div key={Math.random()}>
                                                      {this.renderNotice(notice)}
                                                  </div>;
            })) : this.renderNotice(notices[0])}
                            </div>
                        </div>}
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-xl-12"}>
                            <div className={"block block-rounded js-appear-enabled"}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(b["formatMessage"])({
                    id: "我的订阅"
                  })}
                                    </h3>
                                </div>
                                <div className={"block-content"}>
                                    {subscribe.email ? subscribe.plan_id ? <div>
                                                <div>
                                                    <div className={"justify-content-md-between align-items-md-center"}>
                                                        <div>
                                                            <h3 className={"h4 mb-3"}>
                                                                {subscribe.plan.name}
                                                            </h3>
                                                            {null === subscribe.expired_at ? <p className={"font-size-sm text-muted"}>
                                                                    {Object(b["formatMessage"])({
                            id: "该订阅长期有效"
                          })}
                                                                </p> : <p className={"font-size-sm text-muted"}>
                                                                    {Object(p["h"])(subscribe.expired_at) ? <a className={"font-w600 text-danger"} href={"javascript:void(0);"}>
                                                                            {Object(b["formatMessage"])({
                              id: "已过期"
                            })}
                                                                        </a> : <span>
                                                                            {Object(b["formatMessage"])({
                              id: "于 {date} 到期，距离到期还有 {day} 天。"
                            }, {
                              date: formatDate(subscribe.expired_at),
                              day: formatDaysRemaining(subscribe.expired_at)
                            })}
                                                                            {null !== subscribe.reset_day ? 0 !== subscribe.reset_day ? Object(b["formatMessage"])({
                              id: "已用流量将在 {reset_day} 日后重置"
                            }, {
                              reset_day: subscribe.reset_day
                            }) : Object(b["formatMessage"])({
                              id: "已用流量已在今日重置"
                            }) : ""}
                                                                        </span>}
                                                                </p>}
                                                            <div className={"mb-0"}>
                                                                <div className={"progress mb-1"} style={{
                            height: 6
                          }}>
                                                                    <div className={"progress-bar progress-bar-striped progress-bar-animated bg-".concat(progressBarColor(usagePercent))} role={"progressbar"} style={{
                              width: Object(p["f"])(subscribe.u + subscribe.d, subscribe.transfer_enable) + "%"
                            }}></div>
                                                                </div>
                                                                <p className={"font-size-sm font-w600 mb-3"}>
                                                                    <span className={"font-w700"}>
                                                                        {Object(b["formatMessage"])({
                                id: "已用 {used} / 总计 {total}"
                              }, {
                                used: Object(p["b"])(subscribe.u + subscribe.d),
                                total: Object(p["b"])(subscribe.transfer_enable)
                              })}
                                                                    </span>
                                                                    <span className={"font-w700"}>
                                                                        {"  "}
                                                                    </span>
                                                                    <span className={"font-w700"}>
                                                                        {Object(b["formatMessage"])({
                                id: "在线设备 {alive_ip}/{device_limit}"
                              }, {
                                alive_ip: subscribe.alive_ip,
                                device_limit: formatDeviceLimit(subscribe.device_limit)
                              })}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            {usagePercent >= 80 && !Object(p["h"])(subscribe.expired_at) && (null === subscribePlan || void 0 === subscribePlan ? void 0 : subscribePlan.reset_price) && <div className={"mb-4"}>
                                                                        {l.a.createElement(i["a"], {
                            type: "primary",
                            onClick: () => this.resetPackage()
                          }, Object(b["formatMessage"])({
                            id: "购买流量重置包"
                          }))}
                                                                    </div>}
                                                            {subscribe.allow_new_period && usagePercent >= 100 && !Object(p["h"])(subscribe.expired_at) ? <div className={"mb-4"}>
                                                                    {l.a.createElement(i["a"], {
                            type: "primary",
                            onClick: () => this.newPeriod()
                          }, Object(b["formatMessage"])({
                            id: "提前开启流量周期"
                          }))}
                                                                </div> : ""}
                                                            {Object(p["h"])(subscribe.expired_at) && <div className={"mb-4"}>
                                                                    {l.a.createElement(i["a"], {
                            type: "primary",
                            onClick: () => h.a.push(Object(p["m"])(subscribe) ? "/plan/" + subscribe.plan_id : "/plan")
                          }, Object(b["formatMessage"])({
                            id: Object(p["m"])(subscribe) ? "续费订阅" : "购买订阅"
                          }))}
                                                                </div>}
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div> : <a onClick={() => h.a.push("/plan")}>
                                                <div>
                                                    <div className={"text-center"}>
                                                        <div>
                                                            <i className={"fa fa-plus fa-2x"}></i>
                                                        </div>
                                                        <div className={"font-size-sm text-uppercase text-muted pt-2 pb-3"}>
                                                            {Object(b["formatMessage"])({
                          id: "购买订阅"
                        })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> : l.a.createElement(w["a"], {
                  className: "font-size-h3 mb-3"
                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-xl-12"}>
                            <div className={"block block-rounded js-appear-enabled"}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(b["formatMessage"])({
                    id: "捷径"
                  })}
                                    </h3>
                                </div>
                                <div className={"block-content p-0"}>
                                    <div className={"justify-content-md-between align-items-md-center"}>
                                        <div className={"mb-3"}>
                                            <div className={"v2board-shortcuts-item"} onClick={() => h.a.push("/knowledge")}>
                                                <div>
                                                    {Object(b["formatMessage"])({
                          id: "查看教程"
                        })}
                                                </div>
                                                <div className={"description"}>
                                                    {Object(b["formatMessage"])({
                          id: "学习如何使用"
                        })}{" "}
                                                    {null === (t = window) || void 0 === t ? void 0 : null === (n = t.settings) || void 0 === n ? void 0 : n.title}
                                                </div>
                                                <i style={{
                        float: "right"
                      }} className={"nav-main-link-icon si si-book-open"}></i>
                                            </div>
                                            {l.a.createElement(g["a"], {
                      subscribeUrl: subscribe.subscribe_url
                    }, <div className={"v2board-shortcuts-item"}>
                                                    <div>
                                                        {Object(b["formatMessage"])({
                          id: "一键订阅"
                        })}
                                                    </div>
                                                    <div className={"description"}>
                                                        {Object(b["formatMessage"])({
                          id: "快速将节点导入对应客户端进行使用"
                        })}
                                                    </div>
                                                    <i style={{
                        float: "right"
                      }} className={"nav-main-link-icon si si-feed"}></i>
                                                </div>)}
                                            <div className={"v2board-shortcuts-item"} onClick={() => h.a.push(Object(p["m"])(subscribe) ? "/plan/" + subscribe.plan_id : "/plan")}>
                                                <div>
                                                    {Object(b["formatMessage"])({
                            id: Object(p["m"])(subscribe) ? "续费订阅" : "购买订阅"
                        })}
                                                </div>
                                                <div className={"description"}>
                                                    {Object(b["formatMessage"])({
                          id: Object(p["m"])(subscribe) ? "对您当前的订阅进行续费" : "对您当前的订阅进行购买"
                        })}
                                                </div>
                                                <i style={{
                        float: "right"
                      }} className={"nav-main-link-icon si si-".concat(Object(p["m"])(subscribe) ? "clock" : "bag")}></i>
                                            </div>
                                            <div className={"v2board-shortcuts-item"} onClick={() => h.a.push("/ticket")}>
                                                <div>
                                                    {Object(b["formatMessage"])({
                          id: "遇到问题"
                        })}
                                                </div>
                                                <div className={"description"}>
                                                    {Object(b["formatMessage"])({
                          id: "遇到问题可以通过工单与我们沟通"
                        })}
                                                </div>
                                                <i style={{
                        float: "right"
                      }} className={"nav-main-link-icon si si-support"}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>, this.state.notice && l.a.createElement(c["a"], {
      title: this.state.noticnotice.title,
      visible: this.state.visible,
      maskClosable: !0,
      footer: !1,
      onCancel: () => this.modalVisible()
    }, this.state.notice.content && <div className={"notice-content"} dangerouslySetInnerHTML={{
      __html: this.state.notice.content
    }}></div>));
  }
}
legacyExports["default"] = Object(y["c"])(state => ({
  notice: state.notice,
  user: state.user,
  comm: state.comm,
  knowledge: state.knowledge,
  order: state.order
}))(DashboardPage);
