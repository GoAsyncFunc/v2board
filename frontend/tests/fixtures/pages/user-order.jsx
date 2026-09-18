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
  i = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  a = (require("../vendor/modules/39643851.js"), require("../vendor/modules/62486a79.js"), require("../vendor/modules/61305739.js"), require("../vendor/modules/51624c5a.js")),
  s = interopDefault(a),
  c = require("../vendor/modules/69436335.js"),
  u = interopDefault(c),
  l = require("../vendor/modules/56376f43.js"),
  f = interopDefault(l),
  p = require("../vendor/modules/46597733.js"),
  d = interopDefault(p),
  h = require("../vendor/modules/6d526730.js"),
  m = interopDefault(h),
  v = require("../vendor/modules/54535951.js"),
  y = interopDefault(v),
  g = require("../vendor/modules/71317449.js"),
  b = interopDefault(g),
  w = require("../vendor/modules/59454956.js"),
  x = interopDefault(w),
  O = function (e) {
    function t() {
      u()(this, t);
      var e = d()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
      return e.state = {
        active: !1
      }, e.onTouchStart = function (t) {
        e.triggerEvent("TouchStart", !0, t);
      }, e.onTouchMove = function (t) {
        e.triggerEvent("TouchMove", !1, t);
      }, e.onTouchEnd = function (t) {
        e.triggerEvent("TouchEnd", !1, t);
      }, e.onTouchCancel = function (t) {
        e.triggerEvent("TouchCancel", !1, t);
      }, e.onMouseDown = function (t) {
        e.triggerEvent("MouseDown", !0, t);
      }, e.onMouseUp = function (t) {
        e.triggerEvent("MouseUp", !1, t);
      }, e.onMouseLeave = function (t) {
        e.triggerEvent("MouseLeave", !1, t);
      }, e;
    }
    return m()(t, e), f()(t, [{
      key: "componentDidUpdate",
      value: function () {
        this.props.disabled && this.state.active && this.setState({
          active: !1
        });
      }
    }, {
      key: "triggerEvent",
      value: function (e, t, n) {
        var r = "on" + e,
          o = this.props.children;
        o.props[r] && o.props[r](n), t !== this.state.active && this.setState({
          active: t
        });
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.children,
          n = e.disabled,
          r = e.activeClassName,
          o = e.activeStyle,
          i = n ? void 0 : {
            onTouchStart: this.onTouchStart,
            onTouchMove: this.onTouchMove,
            onTouchEnd: this.onTouchEnd,
            onTouchCancel: this.onTouchCancel,
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp,
            onMouseLeave: this.onMouseLeave
          },
          a = b.a.Children.only(t);
        if (!n && this.state.active) {
          var c = a.props,
            u = c.style,
            l = c.className;
          return !1 !== o && (o && (u = s()({}, u, o)), l = y()(l, r)), b.a.cloneElement(a, s()({
            className: l,
            style: u
          }, i));
        }
        return b.a.cloneElement(a, i);
      }
    }]), t;
  }(b.a.Component),
  E = O;
O.defaultProps = {
  disabled: !1
};
var _ = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var o = 0;
      for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]]);
    }
    return n;
  },
  k = function (e) {
    function t() {
      return u()(this, t), d()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return m()(t, e), f()(t, [{
      key: "render",
      value: function () {
        return g["createElement"]("div", {
          className: "am-list-brief",
          style: this.props.style
        }, this.props.children);
      }
    }]), t;
  }(g["Component"]),
  S = function (e) {
    function t(e) {
      u()(this, t);
      var n = d()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
      return n.onClick = function (e) {
        var t = n.props,
          r = t.onClick,
          o = t.platform,
          i = "android" === o;
        if (r && i) {
          n.debounceTimeout && (clearTimeout(n.debounceTimeout), n.debounceTimeout = null);
          var a = e.currentTarget,
            s = Math.max(a.offsetHeight, a.offsetWidth),
            c = e.currentTarget.getBoundingClientRect(),
            u = e.clientX - c.left - a.offsetWidth / 2,
            l = e.clientY - c.top - a.offsetWidth / 2,
            f = {
              width: s + "px",
              height: s + "px",
              left: u + "px",
              top: l + "px"
            };
          n.setState({
            coverRippleStyle: f,
            RippleClicked: !0
          }, function () {
            n.debounceTimeout = setTimeout(function () {
              n.setState({
                coverRippleStyle: {
                  display: "none"
                },
                RippleClicked: !1
              });
            }, 1e3);
          });
        }
        r && r(e);
      }, n.state = {
        coverRippleStyle: {
          display: "none"
        },
        RippleClicked: !1
      }, n;
    }
    return m()(t, e), f()(t, [{
      key: "componentWillUnmount",
      value: function () {
        this.debounceTimeout && (clearTimeout(this.debounceTimeout), this.debounceTimeout = null);
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t,
          n,
          r = this,
          o = this.props,
          i = o.prefixCls,
          a = o.className,
          c = o.activeStyle,
          u = o.error,
          l = o.align,
          f = o.wrap,
          p = o.disabled,
          d = o.children,
          h = o.multipleLine,
          m = o.thumb,
          v = o.extra,
          b = o.arrow,
          w = o.onClick,
          O = _(o, ["prefixCls", "className", "activeStyle", "error", "align", "wrap", "disabled", "children", "multipleLine", "thumb", "extra", "arrow", "onClick"]),
          k = (O.platform, _(O, ["platform"])),
          S = this.state,
          C = S.coverRippleStyle,
          j = S.RippleClicked,
          P = y()(i + "-item", a, (e = {}, x()(e, i + "-item-disabled", p), x()(e, i + "-item-error", u), x()(e, i + "-item-top", "top" === l), x()(e, i + "-item-middle", "middle" === l), x()(e, i + "-item-bottom", "bottom" === l), e)),
          T = y()(i + "-ripple", x()({}, i + "-ripple-animate", j)),
          L = y()(i + "-line", (t = {}, x()(t, i + "-line-multiple", h), x()(t, i + "-line-wrap", f), t)),
          N = y()(i + "-arrow", (n = {}, x()(n, i + "-arrow-horizontal", "horizontal" === b), x()(n, i + "-arrow-vertical", "down" === b || "up" === b), x()(n, i + "-arrow-vertical-up", "up" === b), n)),
          M = g["createElement"]("div", s()({}, k, {
            onClick: function (e) {
              r.onClick(e);
            },
            className: P
          }), m ? g["createElement"]("div", {
            className: i + "-thumb"
          }, "string" === typeof m ? g["createElement"]("img", {
            src: m
          }) : m) : null, g["createElement"]("div", {
            className: L
          }, void 0 !== d && g["createElement"]("div", {
            className: i + "-content"
          }, d), void 0 !== v && g["createElement"]("div", {
            className: i + "-extra"
          }, v), b && g["createElement"]("div", {
            className: N,
            "aria-hidden": "true"
          })), g["createElement"]("div", {
            style: C,
            className: T
          })),
          A = {};
        return Object.keys(k).forEach(function (e) {
          /onTouch/i.test(e) && (A[e] = k[e], delete k[e]);
        }), g["createElement"](E, s()({}, A, {
          disabled: p || !w,
          activeStyle: c,
          activeClassName: i + "-item-active"
        }), M);
      }
    }]), t;
  }(g["Component"]);
S.defaultProps = {
  prefixCls: "am-list",
  align: "middle",
  error: !1,
  multipleLine: !1,
  wrap: !1,
  platform: "ios"
}, S.Brief = k;
var C = S,
  j = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var o = 0;
      for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]]);
    }
    return n;
  },
  P = function (e) {
    function t() {
      return u()(this, t), d()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return m()(t, e), f()(t, [{
      key: "render",
      value: function () {
        var e = this.props,
          t = e.prefixCls,
          n = e.children,
          r = e.className,
          o = e.style,
          i = e.renderHeader,
          a = e.renderFooter,
          c = j(e, ["prefixCls", "children", "className", "style", "renderHeader", "renderFooter"]),
          u = y()(t, r);
        return g["createElement"]("div", s()({
          className: u,
          style: o
        }, c), i ? g["createElement"]("div", {
          className: t + "-header"
        }, "function" === typeof i ? i() : i) : null, n ? g["createElement"]("div", {
          className: t + "-body"
        }, n) : null, a ? g["createElement"]("div", {
          className: t + "-footer"
        }, "function" === typeof a ? a() : a) : null);
      }
    }]), t;
  }(g["Component"]),
  T = P;
P.Item = C, P.defaultProps = {
  prefixCls: "am-list"
};
require("../vendor/modules/2f7a7346.js");
var L = require("../vendor/Divider.js"),
  N = (require("../vendor/modules/41776870.js"), require("../vendor/modules/antdBadge.js")),
  M = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/antdTag.js")),
  A = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  D = require("../layouts/MainLayout.jsx"),
  I = require("../vendor/reactRedux.js"),
  R = require("../vendor/routerHistory.js"),
  F = interopDefault(R),
  V = require("../vendor/modules/77642f52.js"),
  z = interopDefault(V),
  B = require("../vendor/i18n.js"),
  W = require("../vendor/localeSettings.js"),
  U = require("../vendor/siteHelpers.js");
class q extends b.a.Component {
  constructor(e) {
    super(e);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    this.props.dispatch({
      type: "order/fetch"
    });
  }
  cancel(e) {
    var t = this.props.order.cancelLoading;
    return A["a"].confirm({
      title: Object(B["formatMessage"])({
        id: "注意"
      }),
      content: Object(B["formatMessage"])({
        id: "如果你已经付款，取消订单可能会导致支付失败，确定取消订单吗？"
      }),
      onOk: () => {
        this.props.dispatch({
          type: "order/cancel",
          tradeNo: e.trade_no
        });
      },
      okText: Object(B["formatMessage"])({
        id: "关闭订单"
      }),
      okButtonProps: {
        loading: t
      }
    });
  }
  render() {
    var e = this.props.order,
      t = e.orders,
      n = e.fetchLoading,
      r = ["error", "processing", "default", "success", "default"],
      a = [{
        title: Object(B["formatMessage"])({
          id: "# 订单号"
        }),
        dataIndex: "trade_no",
        key: "trade_no",
        render: e => {
          return <a href={"javascript:void(0);"} onClick={() => F.a.push("/order/" + e)}>
                                {e}
                            </a>;
        }
      }, {
        title: Object(B["formatMessage"])({
          id: "周期"
        }),
        dataIndex: "period",
        key: "period",
        align: "center",
        render: (e, t) => {
          return b.a.createElement(M["a"], null, W["a"].periodText[t.period] && W["a"].periodText[t.period]());
        }
      }, {
        title: Object(B["formatMessage"])({
          id: "订单金额"
        }),
        dataIndex: "total_amount",
        key: "total_amount",
        align: "right",
        render: e => {
          return (e / 100).toFixed(2);
        }
      }, {
        title: Object(B["formatMessage"])({
          id: "订单状态"
        }),
        dataIndex: "status",
        key: "status",
        render: e => {
          var t = ["error", "processing", "default", "success", "default"];
          return <div>
                                {b.a.createElement(N["a"], {
              status: t[e]
            })}
                                {W["a"].orderStatusText[e] && W["a"].orderStatusText[e]()}
                            </div>;
        }
      }, {
        title: Object(B["formatMessage"])({
          id: "创建时间"
        }),
        dataIndex: "created_at",
        key: "created_at",
        render: e => {
          return z()(1e3 * e).format("YYYY/MM/DD HH:mm");
        }
      }, {
        title: Object(B["formatMessage"])({
          id: "操作"
        }),
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t) => {
          return <div>
                                <a disabled={2 === t.status} href={"javascript:void(0);"} onClick={() => F.a.push("/order/" + t.trade_no)}>
                                    {Object(B["formatMessage"])({
                id: "查看详情"
              })}
                                </a>
                                {b.a.createElement(L["a"], {
              type: "vertical"
            })}
                                <a disabled={0 !== t.status} href={"javascript:void(0);"} onClick={() => this.cancel(t)}>
                                    {Object(B["formatMessage"])({
                id: "取消"
              })}
                                </a>
                            </div>;
        }
      }];
    return b.a.createElement(D["a"], o()({}, this.props, {
      title: Object(B["formatMessage"])({
        id: "我的订单"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"block block-rounded  ".concat(n ? "block-mode-loading" : "")}>
                        <div className={"bg-white"}>
                            {Object(U["l"])() ? <T>
                                    {t.map(e => {
                var t;
                return b.a.createElement(T.Item, {
                  arrow: "horizontal",
                  multipleLine: !0,
                  onClick: () => F.a.push("/order/" + e.trade_no),
                  extra: <div>
                                                        <div>
                                                            {(e.total_amount / 100).toFixed(2)}
                                                        </div>
                                                        <div>
                                                            {b.a.createElement(N["a"], {
                        status: r[e.status]
                      })}
                                                            {W["a"].orderStatusText[e.status] && W["a"].orderStatusText[e.status]()}
                                                        </div>
                                                    </div>
                }, null === (t = e.plan) || void 0 === t ? void 0 : t.name, " ", b.a.createElement(T.Item.Brief, null, z()(1e3 * e.created_at).format("YYYY-MM-DD HH:mm:ss")));
              })}
                                </T> : b.a.createElement(i["a"], {
              tableLayout: "auto",
              dataSource: t,
              columns: a,
              pagination: !1,
              scroll: {
                x: 900
              }
            })}
                        </div>
                    </div>
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(I["c"])(e => {
  var t = e.order;
  return {
    order: t
  };
})(q);
