let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
require("../vendor/iconStyles.js");
var r = require("../vendor/Icon.js"),
  o = (require("../vendor/modules/374b616b.js"), require("../vendor/modules/antdRadio.js")),
  i = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  a = (require("../vendor/modules/4a2b2f76.js"), require("../vendor/modules/4d6f5257.js")),
  s = require("../vendor/modules/6a65685a.js"),
  c = interopDefault(s),
  u = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/antdMessage.js")),
  l = require("../vendor/modules/71317449.js"),
  f = interopDefault(l),
  p = require("../layouts/MainLayout.jsx"),
  d = require("../vendor/reactRedux.js"),
  h = require("../vendor/localeSettings.js"),
  m = require("../vendor/modules/44314466.js"),
  v = interopDefault(m),
  y = require("../vendor/modules/5642306f.js"),
  g = interopDefault(y),
  b = require("../vendor/i18n.js"),
  w = require("../vendor/modules/77642f52.js"),
  x = interopDefault(w),
  O = (require("../vendor/modules/79786e6e.js"), require("../vendor/modules/76333265.js")),
  E = require("../vendor/modules/4172412b.js");
function _(e) {
  if ("function" !== typeof WeakMap) return null;
  var t = new WeakMap(),
    n = new WeakMap();
  return (_ = function (e) {
    return e ? n : t;
  })(e);
}
function k(e, t) {
  if (!t && e && e.__esModule) return e;
  if (null === e || "object" !== typeof e && "function" !== typeof e) return {
    default: e
  };
  var n = _(t);
  if (n && n.has(e)) return n.get(e);
  var r = {},
    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e) if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
    var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
    a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
  }
  return r.default = e, n && n.set(e, r), r;
}
var S,
  C = g()({
    loader: () => Promise.resolve().then(() => k(require("../vendor/modules/6d623341.js")))
  });
class j extends f.a.Component {
  constructor(e) {
    super(e), this.state = {
      stripe: {}
    };
  }
  componentDidMount() {
    this.fetchData(), this.props.dispatch({
      type: "user/getUserInfo"
    }), this.props.dispatch({
      type: "comm/config"
    });
  }
  componentWillUnmount() {
    clearTimeout(S), this.props.dispatch({
      type: "order/empty"
    });
  }
  fetchData() {
    this.props.dispatch({
      type: "order/detail",
      tradeNo: this.props.match.params.trade_no,
      callback: () => {
        this.check(), this.getPaymentMethod();
      }
    });
  }
  getPaymentMethod() {
    this.props.dispatch({
      type: "order/getPaymentMethod",
      complete: e => {
        e.length && this.changePaymentMethod(e[0].id);
      }
    });
  }
  checkout() {
    var e = this.props.order,
      t = e.selectMethod,
      n = e.paymentMethod,
      r = this.state.stripe,
      o = n.find(e => e.id === t);
    if (o && "StripeCredit" === o.payment) return r.token ? void this.props.dispatch({
      type: "order/checkoutByStripe",
      tradeNo: this.props.match.params.trade_no,
      method: t,
      token: r.token.id
    }) : u["a"].error(Object(b["formatMessage"])({
      id: "请检查信用卡支付信息"
    }));
    this.props.dispatch({
      type: "order/checkout",
      tradeNo: this.props.match.params.trade_no,
      method: t
    });
  }
  check() {
    S = setTimeout(() => {
      this.props.dispatch({
        type: "order/check",
        tradeNo: this.props.match.params.trade_no,
        callback: e => {
          0 !== e.data ? (clearTimeout(S), this.props.dispatch({
            type: "order/setState",
            payload: {
              qrcodeModalVisible: !1
            }
          }), this.props.dispatch({
            type: "order/detail",
            tradeNo: this.props.match.params.trade_no
          })) : this.check();
        }
      });
    }, 3e3);
  }
  stripeCallback(e, t) {
    this.setState({
      stripe: {
        token: t
      }
    });
  }
  getResultText(e) {
    switch (e) {
      case 1:
        return {
          status: "info",
          title: Object(b["formatMessage"])({
            id: "开通中"
          }),
          subTitle: Object(b["formatMessage"])({
            id: "订单系统正在进行处理，请稍等1-3分钟。"
          })
        };
      case 2:
        return {
          status: "warning",
          title: Object(b["formatMessage"])({
            id: "已取消"
          }),
          subTitle: Object(b["formatMessage"])({
            id: "订单由于超时支付已被取消。"
          })
        };
      case 3:
      case 4:
        return {
          status: "success",
          title: Object(b["formatMessage"])({
            id: "已完成"
          }),
          subTitle: Object(b["formatMessage"])({
            id: "订单已支付并开通。"
          }),
          extra: [<button type={"button"} onClick={() => E["router"].push("/knowledge")} className={"btn btn-primary btn-sm btn-danger btn-rounded px-3"}>
                            <i className={"nav-main-link-icon si si-book-open mr-1"}></i>
                            {Object(b["formatMessage"])({
              id: "查看使用教程"
            })}
                        </button>]
        };
    }
  }
  changePaymentMethod(e) {
    var t = this.props.order,
      n = t.paymentMethod,
      r = t.order,
      o = n.find(t => t.id === e);
    o && "StripeCredit" === o.payment && !this.state.pk && this.props.dispatch({
      type: "comm/getStripePublicKey",
      id: e,
      complete: e => {
        this.setState({
          pk: e
        });
      }
    }), r.total_amount > 0 && (o.handling_fee_fixed || o.handling_fee_percent) ? r.pre_handling_amount = r.total_amount * (o.handling_fee_percent / 100) + o.handling_fee_fixed : r.pre_handling_amount = 0, this.props.dispatch({
      type: "order/setState",
      payload: {
        selectMethod: e,
        order: r
      }
    });
  }
  checkImage(e) {
    var t = new XMLHttpRequest();
    return t.open("HEAD", e, !1), t.send(), 404 != t.status;
  }
  render() {
    var e = this.props.order,
      t = e.order,
      n = e.selectMethod,
      s = e.paymentMethod,
      u = e.qrcodeModalVisible,
      l = e.payUrl,
      d = e.checkoutLoading,
      m = e.detailsLoading,
      y = e.cancelLoading,
      g = this.props.comm.config,
      w = this.state.stripe,
      E = s.find(e => e.id === n) || {};
    return f.a.createElement(p["a"], c()({}, this.props, {
      title: Object(b["formatMessage"])({
        id: "订单详情"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    {m ? <div className={"spinner-grow text-primary"} role={"status"}>
                            <span className={"sr-only"}>{"Loading..."}</span>
                        </div> : <div className={"row"} id={"cashier"}>
                            <div className={0 === t.status ? "col-md-8 col-sm-12" : "col-12"}>
                                {0 !== t.status && <div className={"block block-rounded"}>
                                        <div className={"block-content pt-0"}>
                                            {f.a.createElement(a["a"], c()({
                  className: "py-4"
                }, this.getResultText(t.status)))}
                                        </div>
                                    </div>}
                                <div className={"block block-rounded"}>
                                    <div className={"block-header block-header-default"}>
                                        <h3 className={"block-title v2board-trade-no"}>
                                            {Object(b["formatMessage"])({
                    id: "商品信息"
                  })}
                                        </h3>
                                    </div>
                                    <div className={"block-content pb-4"}>
                                        <div className={"v2board-order-info"}>
                                            {t.plan.id == 0 ? <div>
                                                    <span>
                                                        {Object(b["formatMessage"])({
                        id: "产品名称"
                      })}
                                                        {"："}
                                                    </span>
                                                    <span>{"充值"}</span>
                                                </div> : (<div>
                                                        <span>
                                                            {Object(b["formatMessage"])({
                        id: "产品名称"
                      })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {t.plan.name}
                                                        </span>
                                                    </div>, <div>
                                                        <span>
                                                            {Object(b["formatMessage"])({
                        id: "类型/周期"
                      })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {h["a"].periodText[t.period] && h["a"].periodText[t.period]()}
                                                        </span>
                                                    </div>, <div>
                                                        <span>
                                                            {Object(b["formatMessage"])({
                        id: "产品流量"
                      })}
                                                            {"："}
                                                        </span>
                                                        <span>
                                                            {t.plan.transfer_enable}
                                                            {" GB"}
                                                        </span>
                                                    </div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className={"block block-rounded"}>
                                    <div className={"block-header block-header-default"}>
                                        <h3 className={"block-title v2board-trade-no"}>
                                            {Object(b["formatMessage"])({
                    id: "订单信息"
                  })}
                                        </h3>
                                        {0 === t.status && <div className={"block-options"}>
                                                <button disabled={y} type={"button"} className={"btn btn-primary btn-sm btn-danger btn-rounded px-3"} onClick={() => {
                    return i["a"].confirm({
                      title: Object(b["formatMessage"])({
                        id: "注意"
                      }),
                      content: Object(b["formatMessage"])({
                        id: "如果你已经付款，取消订单可能会导致支付失败，确定取消订单吗？"
                      }),
                      onOk: () => {
                        this.props.dispatch({
                          type: "order/cancel",
                          tradeNo: t.trade_no
                        });
                      },
                      okText: Object(b["formatMessage"])({
                        id: "关闭订单"
                      }),
                      okButtonProps: {
                        loading: y
                      }
                    });
                  }}>
                                                    {y && f.a.createElement(O["a"], {
                      size: "sm",
                      type: "light"
                    })}{" "}
                                                    {Object(b["formatMessage"])({
                      id: "关闭订单"
                    })}
                                                </button>
                                            </div>}
                                    </div>
                                    <div className={"block-content pb-4"}>
                                        <div className={"v2board-order-info"}>
                                            <div>
                                                <span>
                                                    {Object(b["formatMessage"])({
                        id: "订单号"
                      })}
                                                    {"："}
                                                </span>
                                                <span>{t.trade_no}</span>
                                            </div>
                                            {t.discount_amount ? <div>
                                                    <span>
                                                        {Object(b["formatMessage"])({
                        id: "优惠金额"
                      })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {(t.discount_amount / 100).toFixed(2)}
                                                    </span>
                                                </div> : ""}
                                            {t.surplus_amount ? <div>
                                                    <span>
                                                        {Object(b["formatMessage"])({
                        id: "旧订阅折抵金额"
                      })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {(t.surplus_amount / 100).toFixed(2)}
                                                    </span>
                                                </div> : ""}
                                            {t.refund_amount ? <div>
                                                    <span>
                                                        {Object(b["formatMessage"])({
                        id: "退款金额"
                      })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {(t.refund_amount / 100).toFixed(2)}
                                                    </span>
                                                </div> : ""}
                                            {t.balance_amount ? <div>
                                                    <span>
                                                        {Object(b["formatMessage"])({
                        id: "余额支付"
                      })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {(t.balance_amount / 100).toFixed(2)}
                                                    </span>
                                                </div> : ""}
                                            {t.pre_handling_amount ? <div>
                                                    <span>
                                                        {Object(b["formatMessage"])({
                        id: "支付手续费"
                      })}
                                                        {"："}
                                                    </span>
                                                    <span>
                                                        {(t.pre_handling_amount / 100).toFixed(2)}
                                                    </span>
                                                </div> : ""}
                                            <div>
                                                <span>
                                                    {Object(b["formatMessage"])({
                        id: "创建时间"
                      })}
                                                    {"："}
                                                </span>
                                                <span>
                                                    {x()(1e3 * t.created_at).format("YYYY-MM-DD HH:mm:ss")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {0 === t.status && f.a.createElement(f.a.Fragment, null, <div className={"block block-rounded js-appear-enabled"}>
                                            <div className={"block-header block-header-default"}>
                                                <h3 className={"block-title"}>
                                                    {Object(b["formatMessage"])({
                    id: "支付方式"
                  })}
                                                </h3>
                                                <div className={"block-options"}></div>
                                            </div>
                                            <div className={"block-content p-0"}>
                                                {s.map(e => {
                  return <div onClick={() => this.changePaymentMethod(e.id)} className={"v2board-select ".concat(n === e.id && "active border-primary")}>
                                                            <div style={{
                      flex: 1,
                      paddingTop: 4
                    }}>
                                                                {f.a.createElement(o["a"], {
                        className: "v2board-select-radio",
                        checked: n === e.id
                      })}
                                                                {e.name}
                                                            </div>
                                                            {e.icon && <div style={{
                      flex: 1,
                      textAlign: "right"
                    }}>
                                                                    <img height={30} src={e.icon}></img>
                                                                </div>}
                                                        </div>;
                })}
                                            </div>
                                        </div>)}
                                {0 === t.status && "StripeCredit" === E.payment && this.state.pk && f.a.createElement(f.a.Fragment, null, <h3 className={"font-w300 mt-5 mb-3"}>
                                            {Object(b["formatMessage"])({
                id: "填写信用卡支付信息"
              })}
                                        </h3>, <C key={this.state.pk} pk={this.state.pk} callback={(e, t) => this.stripeCallback(e, t)}></C>, <div style={{
              fontSize: 12
            }} className={"mt-3 mb-5"}>
                                            <i className={"fa fa-user-shield"} style={{
                marginRight: 5,
                color: "#7cb305"
              }}></i>
                                            {Object(b["formatMessage"])({
                id: "您的信用卡信息只会被用作当次扣款，系统并不会保存，这是我们认为最安全的。"
              })}
                                        </div>)}
                            </div>
                            {0 === t.status && <div className={"col-md-4 col-sm-12"}>
                                    <div className={"block block-link-pop block-rounded  px-3 py-3 text-light"} style={{
              background: "#35383D"
            }}>
                                        <h5 className={"text-light mb-3"}>
                                            {Object(b["formatMessage"])({
                  id: "订单总额"
                })}
                                        </h5>
                                        {t.plan.id == 0 && <div>
                                                <div className={"pt-3"}>
                                                    {Object(b["formatMessage"])({
                    id: "充值奖励"
                  })}
                                                    <div className={"text-right"}>
                                                        {g.currency_symbol}
                                                        {(t.bounus / 100).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>}
                                        {t.plan.id == 0 && <div>
                                                <div className={"pt-3"}>
                                                    {Object(b["formatMessage"])({
                    id: "实际到账"
                  })}
                                                    <div className={"text-right"}>
                                                        {g.currency_symbol}
                                                        {(t.get_amount / 100).toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className={"row no-gutters py-3"} style={{
                  borderBottom: "1px solid #646669"
                }}></div>
                                            </div>}
                                        {t.plan.id != 0 && <div className={"row no-gutters pb-3"} style={{
                borderBottom: "1px solid #646669"
              }}>
                                                <div className={"col-8"}>
                                                    {t.plan.name}
                                                    {" x "}
                                                    {h["a"].periodText[t.period] && h["a"].periodText[t.period]()}
                                                </div>
                                                <div className={"col-4 text-right"}>
                                                    {g.currency_symbol}
                                                    {(t.plan[t.period] / 100).toFixed(2)}
                                                </div>
                                            </div>}
                                        {t.discount_amount ? <div>
                                                <div className={"pt-3"} style={{
                  color: "#646669"
                }}>
                                                    {Object(b["formatMessage"])({
                    id: "折扣"
                  })}
                                                </div>
                                                <div className={"row no-gutters py-3"} style={{
                  borderBottom: "1px solid #646669"
                }}>
                                                    <div className={"col-8"}></div>
                                                    <div className={"col-4 text-right"}>
                                                        {g.currency_symbol}
                                                        {(t.discount_amount / 100).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div> : ""}
                                        {t.surplus_amount ? <div>
                                                <div className={"pt-3"} style={{
                  color: "#646669"
                }}>
                                                    {Object(b["formatMessage"])({
                    id: "折抵"
                  })}
                                                </div>
                                                <div className={"row no-gutters py-3"} style={{
                  borderBottom: "1px solid #646669"
                }}>
                                                    <div className={"col-8"}></div>
                                                    <div className={"col-4 text-right"}>
                                                        {g.currency_symbol}
                                                        {(t.surplus_amount / 100).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div> : ""}
                                        {t.refund_amount ? <div>
                                                <div className={"pt-3"} style={{
                  color: "#646669"
                }}>
                                                    {Object(b["formatMessage"])({
                    id: "退款"
                  })}
                                                </div>
                                                <div className={"row no-gutters py-3"} style={{
                  borderBottom: "1px solid #646669"
                }}>
                                                    <div className={"col-8"}></div>
                                                    <div className={"col-4 text-right"}>
                                                        {"- "}
                                                        {g.currency_symbol}
                                                        {(t.refund_amount / 100).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div> : ""}
                                        {t.pre_handling_amount ? <div>
                                                <div className={"pt-3"} style={{
                  color: "#646669"
                }}>
                                                    {Object(b["formatMessage"])({
                    id: "支付手续费"
                  })}
                                                </div>
                                                <div className={"row no-gutters py-3"} style={{
                  borderBottom: "1px solid #646669"
                }}>
                                                    <div className={"col-8"}></div>
                                                    <div className={"col-4 text-right"}>
                                                        {"+ "}
                                                        {(t.pre_handling_amount / 100).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div> : ""}
                                        <div className={"pt-3"} style={{
                color: "#646669"
              }}>
                                            {Object(b["formatMessage"])({
                  id: "总计"
                })}
                                        </div>
                                        <h1 className={"text-light mt-3 mb-3"}>
                                            {g.currency_symbol}{" "}
                                            {((t.total_amount + (t.pre_handling_amount || 0)) / 100).toFixed(2)}{" "}
                                            {g.currency}
                                        </h1>
                                        <button type={"button"} className={"btn btn-block btn-primary"} disabled={d || "StripeCredit" === E.payment && !w.token} onClick={() => this.checkout()}>
                                            {d ? f.a.createElement(r["a"], {
                  type: "loading"
                }) : <span>
                                                    <i className={"far fa-check-circle"}></i>{" "}
                                                    {Object(b["formatMessage"])({
                    id: "结账"
                  })}
                                                </span>}
                                        </button>
                                    </div>
                                </div>}
                        </div>}
                </div>
            </main>, f.a.createElement(i["a"], {
      className: "v2board-payment-qrcode",
      maskClosable: !0,
      closable: !1,
      centered: !0,
      onCancel: () => {
        this.props.dispatch({
          type: "order/setState",
          payload: {
            qrcodeModalVisible: !1,
            payUrl: void 0
          }
        });
      },
      width: 300,
      visible: u,
      footer: <div style={{
        textAlign: "center"
      }}>
                            {Object(b["formatMessage"])({
          id: "等待支付中"
        })}
                        </div>
    }, l && f.a.createElement(v.a, {
      renderAs: "svg",
      size: "250",
      value: l
    })));
  }
}
legacyExports["default"] = Object(d["c"])(e => {
  var t = e.header,
    n = e.order,
    r = e.comm;
  return {
    header: t,
    order: n,
    comm: r
  };
})(j);
