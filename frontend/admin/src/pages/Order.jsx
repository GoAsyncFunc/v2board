const OrderDetailBody = require('../components/OrderDetailBody.jsx').default;
const {
  createReadonlyOrderColumns
} = require('../components/OrderDisplayColumns.jsx');
const readonlyColumns = createReadonlyOrderColumns();
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  a = require("../vendor/modules/70307045.js"),
  s = interopDefault(a),
  l = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  c = (require("../vendor/modules/71566450.js"), require("../vendor/modules/antdDropdown.js")),
  u = (require("../vendor/modules/41776870.js"), require("../vendor/modules/antdBadge.js")),
  h = (require("../vendor/modules/6c55544b.js"), require("../vendor/modules/antdMenu.js")),
  f = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  d = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  p = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/antdTag.js")),
  m = require("../vendor/modules/71317449.js"),
  g = interopDefault(m),
  v = require("../layouts/MainLayout.jsx"),
  y = require("../vendor/modules/7449346c.js"),
  b = require("../vendor/modules/77642f52.js"),
  w = interopDefault(b),
  x = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  _ = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  E = (require("../vendor/modules/31344a33.js"), require("../vendor/modules/antdRow.js")),
  S = (require("../vendor/modules/6a435763.js"), require("../vendor/modules/antdCol.js")),
  k = require("../vendor/modules/316c2f56.js"),
  C = interopDefault(k),
  O = require("../services/request.js"),
  T = require("../vendor/routerHistory.js"),
  L = interopDefault(T),
  A = require("../vendor/reactRedux.js");
require("../vendor/modules/6c4a435a.js");
function P() {
  P = function () {
    return e;
  };
  var e = {},
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = Object.defineProperty || function (e, t, n) {
      e[t] = n.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    o = i.iterator || "@@iterator",
    a = i.asyncIterator || "@@asyncIterator",
    s = i.toStringTag || "@@toStringTag";
  function l(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    l({}, "");
  } catch (e) {
    l = function (e, t, n) {
      return e[t] = n;
    };
  }
  function c(e, t, n, i) {
    var o = t && t.prototype instanceof f ? t : f,
      a = Object.create(o.prototype),
      s = new k(i || []);
    return r(a, "_invoke", {
      value: x(e, n, s)
    }), a;
  }
  function u(e, t, n) {
    try {
      return {
        type: "normal",
        arg: e.call(t, n)
      };
    } catch (e) {
      return {
        type: "throw",
        arg: e
      };
    }
  }
  e.wrap = c;
  var h = {};
  function f() {}
  function d() {}
  function p() {}
  var m = {};
  l(m, o, function () {
    return this;
  });
  var g = Object.getPrototypeOf,
    v = g && g(g(C([])));
  v && v !== t && n.call(v, o) && (m = v);
  var y = p.prototype = f.prototype = Object.create(m);
  function b(e) {
    ["next", "throw", "return"].forEach(function (t) {
      l(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function w(e, t) {
    function i(r, o, a, s) {
      var l = u(e[r], e, o);
      if ("throw" !== l.type) {
        var c = l.arg,
          h = c.value;
        return h && "object" == typeof h && n.call(h, "__await") ? t.resolve(h.__await).then(function (e) {
          i("next", e, a, s);
        }, function (e) {
          i("throw", e, a, s);
        }) : t.resolve(h).then(function (e) {
          c.value = e, a(c);
        }, function (e) {
          return i("throw", e, a, s);
        });
      }
      s(l.arg);
    }
    var o;
    r(this, "_invoke", {
      value: function (e, n) {
        function r() {
          return new t(function (t, r) {
            i(e, n, t, r);
          });
        }
        return o = o ? o.then(r, r) : r();
      }
    });
  }
  function x(e, t, n) {
    var r = "suspendedStart";
    return function (i, o) {
      if ("executing" === r) throw new Error("Generator is already running");
      if ("completed" === r) {
        if ("throw" === i) throw o;
        return O();
      }
      for (n.method = i, n.arg = o;;) {
        var a = n.delegate;
        if (a) {
          var s = _(a, n);
          if (s) {
            if (s === h) continue;
            return s;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if ("suspendedStart" === r) throw r = "completed", n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = "executing";
        var l = u(e, t, n);
        if ("normal" === l.type) {
          if (r = n.done ? "completed" : "suspendedYield", l.arg === h) continue;
          return {
            value: l.arg,
            done: n.done
          };
        }
        "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg);
      }
    };
  }
  function _(e, t) {
    var n = t.method,
      r = e.iterator[n];
    if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, _(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h;
    var i = u(r, e.iterator, t.arg);
    if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, h;
    var o = i.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, h) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, h);
  }
  function E(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function S(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function k(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(E, this), this.reset(!0);
  }
  function C(e) {
    if (e) {
      var t = e[o];
      if (t) return t.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var r = -1,
          i = function t() {
            for (; ++r < e.length;) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
            return t.value = void 0, t.done = !0, t;
          };
        return i.next = i;
      }
    }
    return {
      next: O
    };
  }
  function O() {
    return {
      value: void 0,
      done: !0
    };
  }
  return d.prototype = p, r(y, "constructor", {
    value: p,
    configurable: !0
  }), r(p, "constructor", {
    value: d,
    configurable: !0
  }), d.displayName = l(p, s, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === d || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, p) : (e.__proto__ = p, l(e, s, "GeneratorFunction")), e.prototype = Object.create(y), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, b(w.prototype), l(w.prototype, a, function () {
    return this;
  }), e.AsyncIterator = w, e.async = function (t, n, r, i, o) {
    void 0 === o && (o = Promise);
    var a = new w(c(t, n, r, i), o);
    return e.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, b(y), l(y, s, "Generator"), l(y, o, function () {
    return this;
  }), l(y, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (e) {
    var t = Object(e),
      n = [];
    for (var r in t) n.push(r);
    return n.reverse(), function e() {
      for (; n.length;) {
        var r = n.pop();
        if (r in t) return e.value = r, e.done = !1, e;
      }
      return e.done = !0, e;
    };
  }, e.values = C, k.prototype = {
    constructor: k,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(S), !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
    },
    stop: function () {
      this.done = !0;
      var e = this.tryEntries[0].completion;
      if ("throw" === e.type) throw e.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var t = this;
      function r(n, r) {
        return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var o = this.tryEntries[i],
          a = o.completion;
        if ("root" === o.tryLoc) return r("end");
        if (o.tryLoc <= this.prev) {
          var s = n.call(o, "catchLoc"),
            l = n.call(o, "finallyLoc");
          if (s && l) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          } else if (s) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
          } else {
            if (!l) throw new Error("try statement without catch or finally");
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var i = this.tryEntries[r];
        if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
          var o = i;
          break;
        }
      }
      o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
      var a = o ? o.completion : {};
      return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, h) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), h;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), S(n), h;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var i = r.arg;
            S(n);
          }
          return i;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: C(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), h;
    }
  }, e;
}
class j extends g.a.Component {
  constructor(e) {
    super(e), this.state = {
      order: {},
      user: {},
      invite_user: {},
      visible: !1
    };
  }
  getOrderInfo() {
    var e = this;
    return C()(P().mark(function t() {
      var n, r, i;
      return P().wrap(function (t) {
        while (1) switch (t.prev = t.next) {
          case 0:
            return e.onShow(), t.next = 3, Object(O["b"])("/" + window.settings.secure_path + "/order/detail", {
              id: e.props.orderId
            });
          case 3:
            if (n = t.sent, 200 === n.code) {
              t.next = 6;
              break;
            }
            return t.abrupt("return");
          case 6:
            return t.next = 8, Object(O["a"])("/" + window.settings.secure_path + "/user/getUserInfoById", {
              id: n.data.user_id
            });
          case 8:
            if (r = t.sent, 200 === r.code) {
              t.next = 11;
              break;
            }
            return t.abrupt("return");
          case 11:
            if (!n.data.invite_user_id) {
              t.next = 18;
              break;
            }
            return t.next = 14, Object(O["a"])("/" + window.settings.secure_path + "/user/getUserInfoById", {
              id: n.data.invite_user_id
            });
          case 14:
            if (i = t.sent, 200 === i.code) {
              t.next = 17;
              break;
            }
            return t.abrupt("return");
          case 17:
            e.setState({
              invite_user: i.data
            });
          case 18:
            e.setState({
              order: n.data,
              user: r.data
            });
          case 19:
          case "end":
            return t.stop();
        }
      }, t);
    }))();
  }
  onShow() {
    this.setState({
      visible: !this.state.visible
    });
  }
  jumpUserFilter(e, t, n) {
    this.props.dispatch({
      type: "user/addFilter",
      key: e,
      condition: t,
      value: n
    }), L.a.push("/user");
  }
  render() {
    var e,
      t = this.props.plan.plans,
      n = {
        marginBottom: 0
      };
    return <div>
                <div onClick={() => this.getOrderInfo()}>
                    {this.props.children}
                </div>
                {g.a.createElement(x["a"], {
        visible: this.state.visible,
        title: "订单信息",
        onCancel: () => this.onShow(),
        footer: !1
      }, <OrderDetailBody order={this.state.order} user={this.state.user} inviteUser={this.state.invite_user} plans={this.props.plan.plans} onUserFilter={(...args) => this.jumpUserFilter(...args)} />)}
            </div>;
  }
}
var M = Object(A["c"])(e => {
    var t = e.plan;
    return {
      plan: t
    };
  })(j),
  R = require("../vendor/modules/6d43642f.js"),
  N = require("../vendor/modules/antdButtonGroup.js"),
  D = require("../components/Recovered_68566c61.jsx"),
  I = require("../vendor/modules/76333265.js");
class $ extends g.a.Component {
  constructor(e) {
    super(e), this.state = {};
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: "order/empty"
    }), this.props.dispatch({
      type: "order/setState",
      payload: {
        filter: []
      }
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: "order/fetch"
    }), this.props.dispatch({
      type: "plan/fetch"
    });
  }
  update(e, t, n) {
    this.props.dispatch({
      type: "order/update",
      tradeNo: e,
      key: t,
      value: n
    });
  }
  tableOnChange(e) {
    this.props.dispatch({
      type: "order/changeTable",
      pagination: e
    });
  }
  render() {
    var e = this.props.order,
      t = e.orders,
      n = e.fetchLoading,
      r = e.pagination,
      a = e.filter,
      m = [{
        title: "# 订单号",
        dataIndex: "trade_no",
        key: "trade_no",
        render: (e, t) => {
          return <M orderId={t.id}>
                                <a href={"javascript:void(0);"}>
                                    {e.substr(0, 3)}
                                    {"..."}
                                    {e.substr(-3)}
                                </a>
                            </M>;
        }
      }, readonlyColumns["type"], {
        title: "订阅计划",
        dataIndex: "plan_name",
        key: "plan_name"
      }, readonlyColumns["period"], readonlyColumns["total_amount"], {
        title: <span>
                            {g.a.createElement(f["a"], {
            placement: "top",
            title: "标记为[已支付]后将会由系统进行开通后并完成"
          }, "订单状态 ", g.a.createElement(d["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "status",
        key: "status",
        render: (e, t) => {
          var n = ["error", "processing", "default", "success", "default"];
          return <div>
                                {g.a.createElement(c["a"], {
              disabled: 0 !== e,
              trigger: ["click"],
              overlay: g.a.createElement(h["a"], null, g.a.createElement(h["a"].Item, {
                key: "1",
                onClick: e => {
                  this.props.dispatch({
                    type: "order/paid",
                    tradeNo: t.trade_no
                  });
                }
              }, "已支付"), g.a.createElement(h["a"].Item, {
                key: "2",
                onClick: e => {
                  this.props.dispatch({
                    type: "order/cancel",
                    tradeNo: t.trade_no
                  });
                }
              }, "取消"))
            }, <div>
                                        {g.a.createElement(u["a"], {
                status: n[e]
              })}
                                        <span>
                                            {y["a"].orderStatusText[e]}{" "}
                                        </span>
                                        {0 === e && <a href={"javascript:void(0);"}>
                                                {"标记为 "}
                                                {g.a.createElement(d["a"], {
                  type: "caret-down"
                })}
                                            </a>}
                                    </div>)}
                            </div>;
        }
      }, readonlyColumns["commission_balance"], {
        title: <span>
                            {"佣金状态 "}
                            {g.a.createElement(f["a"], {
            placement: "top",
            title: "标记为[有效]后将会由系统处理后发放到用户并完成"
          }, g.a.createElement(d["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "commission_status",
        key: "commission_status",
        render: (e, t) => {
          if (0 === t.status || 2 === t.status) return "-";
          if (!t.commission_balance) return "-";
          var n = ["default", "processing", "success", "error"];
          return 2 === t.commission_status ? <div>
                                {g.a.createElement(u["a"], {
              status: n[e]
            })}
                                <span>{y["a"].commissionStatusText[e]} </span>
                            </div> : <div>
                                {g.a.createElement(c["a"], {
              trigger: ["click"],
              overlay: g.a.createElement(h["a"], null, g.a.createElement(h["a"].Item, {
                key: "0",
                disabled: 0 === e,
                onClick: e => {
                  this.update(t.trade_no, "commission_status", e.key);
                }
              }, "待确认"), g.a.createElement(h["a"].Item, {
                key: "1",
                disabled: 1 === e,
                onClick: e => {
                  this.update(t.trade_no, "commission_status", e.key);
                }
              }, "有效"), g.a.createElement(h["a"].Item, {
                key: "3",
                disabled: 3 === e,
                onClick: e => {
                  this.update(t.trade_no, "commission_status", e.key);
                }
              }, "无效"))
            }, <div>
                                        {g.a.createElement(u["a"], {
                status: n[e]
              })}
                                        <span>
                                            {y["a"].commissionStatusText[e]}{" "}
                                        </span>
                                        <a href={"javascript:void(0);"}>
                                            {"标记为 "}
                                            {g.a.createElement(d["a"], {
                  type: "caret-down"
                })}
                                        </a>
                                    </div>)}
                            </div>;
        }
      }, readonlyColumns["created_at"]];
    return g.a.createElement(v["a"], i()({}, this.props, {
      title: "订单管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, g.a.createElement(I["a"], {
      loading: n
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {g.a.createElement(N["a"], null, g.a.createElement(D["a"], {
            value: a,
            onOk: e => this.props.dispatch({
              type: "order/filter",
              filter: e
            }),
            keys: [{
              key: "trade_no",
              title: "订单号",
              condition: ["模糊", "="]
            }, {
              key: "status",
              title: "订单状态",
              type: "select",
              condition: ["="],
              options: [{
                key: "未支付",
                value: 0
              }, {
                key: "已支付",
                value: 1
              }, {
                key: "已取消",
                value: 2
              }, {
                key: "已完成",
                value: 3
              }, {
                key: "已折抵",
                value: 4
              }]
            }, {
              key: "commission_status",
              title: "佣金状态",
              type: "select",
              condition: ["="],
              options: [{
                key: "待确认",
                value: 0
              }, {
                key: "发放中",
                value: 1
              }, {
                key: "已发放",
                value: 2
              }, {
                key: "无效",
                value: 3
              }]
            }, {
              key: "user_id",
              title: "用户ID",
              condition: ["="]
            }, {
              key: "invite_user_id",
              title: "邀请人ID",
              condition: ["=", "!="]
            }, {
              key: "callback_no",
              title: "回调单号",
              condition: ["模糊"]
            }, {
              key: "commission_balance",
              title: "佣金金额",
              condition: [">", "<", "=", "!=", ">=", "<="]
            }]
          }, g.a.createElement(l["a"], {
            type: a.length > 0 ? "primary" : ""
          }, g.a.createElement(d["a"], {
            type: "filter"
          }), " 过滤器")))}
                            {g.a.createElement(R["a"], null, g.a.createElement(l["a"], {
            style: {
              marginLeft: 10
            }
          }, g.a.createElement(d["a"], {
            type: "plus"
          }), " 添加订单"))}
                        </div>
                        {g.a.createElement(o["a"], {
          tableLayout: "auto",
          dataSource: t,
          pagination: s()({}, r, {
            size: "small"
          }),
          columns: m,
          scroll: {
            x: 1050
          },
          onChange: e => this.tableOnChange(e)
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(A["c"])(e => {
  var t = e.order;
  return {
    order: t
  };
})($);
