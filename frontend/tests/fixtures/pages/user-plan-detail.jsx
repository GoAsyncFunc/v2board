let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  a = (require("../vendor/modules/374b616b.js"), require("../vendor/modules/antdRadio.js")),
  s = (require("../vendor/modules/4a2b2f76.js"), require("../vendor/modules/4d6f5257.js")),
  c = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  u = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  l = require("../vendor/modules/reactRuntime.js"),
  f = interopDefault(l),
  p = require("../layouts/MainLayout.jsx"),
  d = require("../vendor/reactRedux.js"),
  h = require("../vendor/localeSettings.js"),
  m = require("../vendor/i18n.js"),
  v = require("../vendor/siteHelpers.js"),
  y = require("../vendor/modules/4172412b.js");
class g extends f.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "plan/fetchById",
      id: this.props.match.params.plan_id
    }), this.props.dispatch({
      type: "comm/config"
    }), this.props.dispatch({
      type: "order/fetch"
    });
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: "coupon/empty"
    }), this.props.dispatch({
      type: "plan/empty"
    });
  }
  preOrder() {
    var e = this.props.plan.plan,
      t = this.props.order,
      n = t.orders,
      r = t.cancelLoading,
      o = this.props.user,
      i = o.userInfo.plan_id,
      a = o.subscribe;
    return i && i !== e.id && !Object(v["h"])(a.expired_at) ? u["a"].confirm({
      title: Object(m["formatMessage"])({
        id: "注意"
      }),
      content: Object(m["formatMessage"])({
        id: "变更订阅会导致当前订阅被新订阅覆盖，请注意。"
      }),
      onOk: () => this.order()
    }) : !n.length || 1 !== n[0].status && 0 !== n[0].status ? void this.order() : u["a"].confirm({
      title: Object(m["formatMessage"])({
        id: "注意"
      }),
      content: Object(m["formatMessage"])({
        id: "你还有未完成的订单，购买前需要先进行取消，确定取消先前的订单吗？"
      }),
      onOk: () => {
        this.props.dispatch({
          type: "order/cancel",
          tradeNo: n[0].trade_no,
          complete: () => {
            this.order();
          }
        });
      },
      okText: Object(m["formatMessage"])({
        id: "确定取消"
      }),
      okButtonProps: {
        loading: r
      },
      cancelText: Object(m["formatMessage"])({
        id: "返回我的订单"
      }),
      onCancel: () => y["router"].push("/order")
    });
  }
  order() {
    var e = this.props.coupon.coupon,
      t = this.props.plan,
      n = t.plan,
      r = t.selectPeriod,
      o = {
        period: r,
        plan_id: n.id
      };
    e.name && (o.coupon_code = e.code), this.props.dispatch({
      type: "order/save",
      params: o
    });
  }
  couponCheck() {
    this.props.dispatch({
      type: "coupon/check",
      code: this.refs.coupon.value,
      planId: this.props.match.params.plan_id
    });
  }
  couponProcess(e, t, n) {
    switch (t) {
      case 1:
        return n.toFixed(2);
      case 2:
        return (e * (n / 100)).toFixed(2);
    }
  }
  getTotalAmount() {
    var e = this.props.coupon.coupon,
      t = this.props.plan,
      n = t.selectPeriod,
      r = t.plan,
      o = r[n];
    return e.name && (o -= this.couponProcess(o, e.type, e.value)), o <= 0 && (o = 0), (o / 100).toFixed(2);
  }
  getCouponJSX() {
    var e = this.props.coupon.coupon,
      t = this.props.plan,
      n = t.selectPeriod,
      r = t.plan,
      o = this.props.comm.config;
    if (e.name) return <div>
                    <div className={"pt-3"} style={{
        color: "#646669"
      }}>
                        {Object(m["formatMessage"])({
          id: "折扣"
        })}
                    </div>
                    <div className={"row no-gutters py-3"} style={{
        borderBottom: "1px solid #646669"
      }}>
                        <div className={"col-8"}>{e.name}</div>
                        <div className={"col-4 text-right"}>
                            {"-"}
                            {o.currency_symbol}
                            {(this.couponProcess(r[n], e.type, e.value) / 100).toFixed(2)}
                        </div>
                    </div>
                </div>;
  }
  render() {
    var e = this.props.plan,
      t = e.plan,
      n = e.selectPeriod,
      r = e.fetchLoading,
      u = this.props.user.userInfo,
      l = this.props.order.saveLoading,
      d = this.props.comm.config,
      g = Object(v["c"])(t.content);
    return f.a.createElement(p["a"], o()({}, this.props, {
      title: Object(m["formatMessage"])({
        id: "配置订阅"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    {r ? <div className={"spinner-grow text-primary"} role={"status"}>
                            <span className={"sr-only"}>{"Loading..."}</span>
                        </div> : t.renew || u.plan_id !== t.id ? <div className={"row"} id={"cashier"}>
                            <div className={"col-md-8 col-sm-12"}>
                                <div className={"block block-link-pop block-rounded py-3"} style={{
              backgroundColor: "#fff"
            }}>
                                    <h4 className={"mb-0 px-3"}>{t.name}</h4>
                                    {g && "object" === typeof g ? <div className={"v2board-plan-content px-3"}>
                                            {null === g || void 0 === g ? void 0 : g.map(e => {
                  return <div style={{
                    textAlign: "left",
                    marginBottom: 8,
                    opacity: e.support ? 1 : 0.3
                  }}>
                                                              {e.support ? <i className={"si si-check text-primary"} style={{
                      fontSize: 21,
                      verticalAlign: "sub"
                    }}></i> : <i className={"si si-close text-primary"} style={{
                      fontSize: 21,
                      verticalAlign: "sub"
                    }}></i>}
                                                              <span style={{
                      paddingLeft: 8
                    }}>
                                                                  {e.feature}
                                                              </span>
                                                          </div>;
                })}
                                        </div> : <div dangerouslySetInnerHTML={{
                __html: t.content
              }} className={"v2board-plan-content"}></div>}
                                </div>
                                <div className={"block block-rounded js-appear-enabled"}>
                                    <div className={"block-header block-header-default"}>
                                        <h3 className={"block-title"}>
                                            {Object(m["formatMessage"])({
                    id: "付款周期"
                  })}
                                        </h3>
                                        <div className={"block-options"}></div>
                                    </div>
                                    <div className={"block-content p-0"}>
                                        {Object.keys(h["a"].periodText).map(e => {
                  if ("reset_price" !== e) return null !== t[e] ? <div onClick={() => this.props.dispatch({
                    type: "plan/setState",
                    payload: {
                      selectPeriod: e
                    }
                  })} className={"v2board-select ".concat(n === e && "active border-primary")}>
                                                            <div style={{
                      flex: 1
                    }}>
                                                                {f.a.createElement(a["a"], {
                        className: "v2board-select-radio",
                        checked: n === e
                      })}
                                                                {h["a"].periodText[e] && h["a"].periodText[e]()}
                                                            </div>
                                                            <div style={{
                      flex: 1,
                      textAlign: "right"
                    }}>
                                                                <span className={"price"}>
                                                                    {d.currency_symbol}
                                                                    {(t[e] / 100).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div> : void 0;
                })}
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-4 col-sm-12"}>
                                <div className={"block block-link-pop block-rounded  px-3 py-3 mb-2 text-light"} style={{
              background: "#35383D"
            }}>
                                    <input type={"text"} className={"form-control v2board-input-coupon p-0"} ref={"coupon"} placeholder={Object(m["formatMessage"])({
                id: "有优惠券？"
              })}></input>
                                    <button onClick={() => this.couponCheck()} type={"button"} className={"btn btn-primary"} style={{
                position: "absolute",
                right: 30,
                top: 17
              }}>
                                        <i className={"fa fa-fw fa-ticket-alt mr-2"}></i>
                                        {Object(m["formatMessage"])({
                  id: "验证"
                })}
                                    </button>
                                </div>
                                <div className={"block block-link-pop block-rounded  px-3 py-3 text-light"} style={{
              background: "#35383D"
            }}>
                                    <h5 className={"text-light mb-3"}>
                                        {Object(m["formatMessage"])({
                  id: "订单总额"
                })}
                                    </h5>
                                    <div className={"row no-gutters pb-3"} style={{
                borderBottom: "1px solid #646669"
              }}>
                                        <div className={"col-8"}>
                                            {t.name}
                                            {" x "}
                                            {h["a"].periodText[n] && h["a"].periodText[n]()}
                                        </div>
                                        <div className={"col-4 text-right"}>
                                            {d.currency_symbol}
                                            {(t[n] / 100).toFixed(2)}
                                        </div>
                                    </div>
                                    {this.getCouponJSX()}
                                    <div className={"pt-3"} style={{
                color: "#646669"
              }}>
                                        {Object(m["formatMessage"])({
                  id: "总计"
                })}
                                    </div>
                                    <h1 className={"text-light mt-3 mb-3"}>
                                        {d.currency_symbol}{" "}
                                        {this.getTotalAmount()} {d.currency}
                                    </h1>
                                    <button type={"button"} className={"btn btn-block btn-primary"} disabled={l} onClick={() => this.preOrder()}>
                                        {l ? f.a.createElement(i["a"], {
                  type: "loading"
                }) : <span>
                                                <i className={"far fa-check-circle"}></i>{" "}
                                                {Object(m["formatMessage"])({
                    id: "下单"
                  })}
                                            </span>}
                                    </button>
                                </div>
                            </div>
                        </div> : <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"block block-rounded"}>
                                    <div className={"block-content"}>
                                        {f.a.createElement(s["a"], {
                  status: "info",
                  title: Object(m["formatMessage"])({
                    id: "该订阅无法续费，仅允许新用户购买"
                  }),
                  subTitle: f.a.createElement(c["a"], {
                    className: "mt-3",
                    type: "primary",
                    onClick: () => y["router"].push("/plan")
                  }, Object(m["formatMessage"])({
                    id: "选择其他订阅"
                  }))
                })}
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(d["c"])(e => {
  var t = e.plan,
    n = e.coupon,
    r = e.order,
    o = e.user,
    i = e.comm;
  return {
    plan: t,
    coupon: n,
    order: r,
    user: o,
    comm: i
  };
})(g);
