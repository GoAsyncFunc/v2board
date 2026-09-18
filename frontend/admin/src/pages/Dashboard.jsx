let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
const {
  formatIncome,
  formatLiveCount
} = require('../components/MoneyDisplay.jsx');
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = require("../vendor/modules/316c2f56.js"),
  a = interopDefault(o),
  s = require("../vendor/modules/reactRuntime.js"),
  l = interopDefault(s),
  c = require("../layouts/MainLayout.jsx"),
  u = require("../vendor/reactRedux.js"),
  h = require("../vendor/routerHistory.js"),
  f = interopDefault(h),
  d = require("../services/request.js"),
  p = require("../vendor/siteSettings.js"),
  m = require("../vendor/modules/4972526e.js"),
  g = require("../vendor/modules/472b6553.js"),
  v = require("../vendor/modules/6b355470.js"),
  y = require("../vendor/modules/4d4a536b.js"),
  b = require("../vendor/modules/4c616445.js"),
  w = require("../vendor/modules/53797178.js"),
  x = require("../vendor/modules/2f7a492f.js"),
  _ = require("../vendor/modules/4e694262.js"),
  E = require("../vendor/modules/544c5848.js"),
  S = require("../vendor/modules/7856706e.js"),
  k = require("../vendor/modules/6c367959.js");
function C() {
  C = function () {
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
    v = g && g(g(O([])));
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
        return T();
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
  function O(e) {
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
      next: T
    };
  }
  function T() {
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
  }, e.values = O, k.prototype = {
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
        iterator: O(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), h;
    }
  }, e;
}
m["a"]([v["a"], y["a"], b["a"], w["a"], x["a"], _["a"], E["a"], k["a"], S["a"]]);
class O extends l.a.Component {
  constructor(e) {
    super(e), this.state = {}, this.orderChart = l.a.createRef(), this.orderChartObj = void 0, this.serverLastRankChart = l.a.createRef(), this.serverTodayRankChart = l.a.createRef(), this.userTodayRankChart = l.a.createRef(), this.userLastRankChart = l.a.createRef(), this.serverLastRankChartObj = void 0, this.serverTodayRankChartObj = void 0, this.userTodayRankChartObj = void 0, this.userLastRankChartObj = void 0;
  }
  orderChartRender(e) {
    var t;
    this.orderChartObj = g["b"](null === (t = this.orderChart) || void 0 === t ? void 0 : t.current, "vintage", {
      renderer: "svg"
    });
    var n = {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: [],
        left: "0",
        z: 4
      },
      grid: {
        left: "1%",
        right: "1%",
        bottom: "3%",
        containLabel: !0
      },
      xAxis: {
        type: "category",
        boundaryGap: !1,
        data: []
      },
      yAxis: {
        type: "value"
      },
      series: []
    };
    e.forEach(e => {
      -1 === n.legend.data.indexOf(e.type) && n.legend.data.push(e.type), -1 === n.xAxis.data.indexOf(e.date) && n.xAxis.data.push(e.date);
      var t = n.series.find(t => t.name === e.type);
      t ? t.data.push(e.value) : n.series.push({
        name: e.type,
        type: "line",
        smooth: !0,
        data: [e.value]
      });
    }), this.orderChartObj.setOption(n), window.addEventListener("resize", this.chartResize.bind(this));
  }
  serverLastRankChartRender(e) {
    var t;
    this.serverLastRankChartObj = g["b"](null === (t = this.serverLastRankChart) || void 0 === t ? void 0 : t.current);
    var n = {
      tooltip: {
        trigger: "axis",
        formatter: e => {
          return "".concat(e[0].value, " GB");
        }
      },
      grid: {
        top: "1%",
        left: "1%",
        right: "1%",
        bottom: "3%",
        containLabel: !0
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        data: []
      },
      series: [{
        data: [],
        type: "bar"
      }]
    };
    e.reverse().forEach(e => {
      n.yAxis.data.push(e.server_name), n.series[0].data.push(e.total);
    }), this.serverLastRankChartObj.setOption(n);
  }
  serverTodayRankChartRender(e) {
    var t;
    this.serverTodayRankChartObj = g["b"](null === (t = this.serverTodayRankChart) || void 0 === t ? void 0 : t.current);
    var n = {
      tooltip: {
        trigger: "axis",
        formatter: e => {
          return "".concat(e[0].value, " GB");
        }
      },
      grid: {
        top: "1%",
        left: "1%",
        right: "1%",
        bottom: "3%",
        containLabel: !0
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        data: []
      },
      series: [{
        data: [],
        type: "bar"
      }]
    };
    e.reverse().forEach(e => {
      n.yAxis.data.push(e.server_name), n.series[0].data.push(e.total);
    }), this.serverTodayRankChartObj.setOption(n);
  }
  userTodayRankChartRender(e) {
    var t;
    this.userTodayRankChartObj = g["b"](null === (t = this.userTodayRankChart) || void 0 === t ? void 0 : t.current);
    var n = {
      tooltip: {
        trigger: "axis",
        formatter: e => {
          return "".concat(e[0].value, " GB");
        }
      },
      grid: {
        top: "1%",
        left: "1%",
        right: "1%",
        bottom: "3%",
        containLabel: !0
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        data: []
      },
      series: [{
        data: [],
        type: "bar"
      }]
    };
    e.reverse().forEach(e => {
      n.yAxis.data.push(e.email), n.series[0].data.push(e.total);
    }), this.userTodayRankChartObj.setOption(n);
  }
  userLastRankChartRender(e) {
    var t;
    this.userLastRankChartObj = g["b"](null === (t = this.userLastRankChart) || void 0 === t ? void 0 : t.current);
    var n = {
      tooltip: {
        trigger: "axis",
        formatter: e => {
          return "".concat(e[0].value, " GB");
        }
      },
      grid: {
        top: "1%",
        left: "1%",
        right: "1%",
        bottom: "3%",
        containLabel: !0
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        data: []
      },
      series: [{
        data: [],
        type: "bar"
      }]
    };
    e.reverse().forEach(e => {
      n.yAxis.data.push(e.email), n.series[0].data.push(e.total);
    }), this.userLastRankChartObj.setOption(n);
  }
  chartResize() {
    this.orderChartObj.resize(), this.serverLastRankChartObj.resize(), this.serverTodayRankChartObj.resize(), this.userTodayRankChartObj.resize(), this.userLastRankChartObj.resize();
  }
  componentDidMount() {
    var e = this;
    a()(C().mark(function t() {
      return C().wrap(function (t) {
        while (1) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, e.checkQueue();
          case 2:
          case "end":
            return t.stop();
        }
      }, t);
    }))(), this.props.dispatch({
      type: "stat/getOverride"
    }), this.props.dispatch({
      type: "stat/getOrder",
      complete: e => {
        this.orderChartRender(e);
      }
    }), this.props.dispatch({
      type: "stat/getServerLastRank",
      complete: e => {
        this.serverLastRankChartRender(e);
      }
    }), this.props.dispatch({
      type: "stat/getServerTodayRank",
      complete: e => {
        this.serverTodayRankChartRender(e);
      }
    }), this.props.dispatch({
      type: "stat/getUserTodayRank",
      complete: e => {
        this.userTodayRankChartRender(e);
      }
    }), this.props.dispatch({
      type: "stat/getUserLastRank",
      complete: e => {
        this.userLastRankChartRender(e);
      }
    }), this.props.dispatch({
      type: "config/fetch",
      key: "site"
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.chartResize.bind(this));
  }
  orderFilter() {
    this.props.dispatch({
      type: "order/addFilter",
      key: "commission_status",
      condition: "=",
      value: 0
    }), this.props.dispatch({
      type: "order/addFilter",
      key: "invite_user_id",
      condition: "!=",
      value: ""
    }), f.a.push("/order");
  }
  checkQueue() {
    var e = this;
    return a()(C().mark(function t() {
      var n, r;
      return C().wrap(function (t) {
        while (1) switch (t.prev = t.next) {
          case 0:
            return n = new URL(p["a"].serviceHost), t.next = 3, Object(d["a"])((null === n || void 0 === n ? void 0 : n.origin) + "/monitor/api/stats");
          case 3:
            r = t.sent, e.setState({
              queueStatus: null === r || void 0 === r ? void 0 : r.status
            });
          case 5:
          case "end":
            return t.stop();
        }
      }, t);
    }))();
  }
  render() {
    var e = this.props,
      t = e.stat,
      n = e.config,
      r = [];
    return t.ticket_pending_total && r.push(<div className={"alert alert-danger"} role={"alert"}>
                        <p className={"mb-0"}>
                            {"有 "}
                            {t.ticket_pending_total}
                            {" 条工单等待处理 "}
                            <a className={"alert-link"} href={"javascript:void(0)"} onClick={() => f.a.push("/ticket")}>
                                {"立即处理"}
                            </a>
                        </p>
                    </div>), t.commission_pending_total && r.push(<div className={"alert alert-danger"} role={"alert"}>
                        <p className={"mb-0"}>
                            {"有 "}
                            {t.commission_pending_total}
                            {" 笔佣金等待确认 "}
                            <a className={"alert-link"} href={"javascript:void(0)"} onClick={() => {
          this.props.dispatch({
            type: "order/addFilter",
            key: "status",
            condition: "=",
            value: "3"
          }), this.props.dispatch({
            type: "order/addFilter",
            key: "commission_status",
            condition: "=",
            value: "0"
          }), this.props.dispatch({
            type: "order/addFilter",
            key: "commission_balance",
            condition: ">",
            value: "0"
          }), f.a.push("/order");
        }}>
                                {"立即处理"}
                            </a>
                        </p>
                    </div>), l.a.createElement(c["a"], i()({}, this.props, {
      title: "仪表盘"
    }), this.state.queueStatus && "running" !== this.state.queueStatus && <div className={"row"}>
                            <div className={"col-lg-12"}>
                                <div className={"alert alert-danger"} role={"alert"}>
                                    <p className={"mb-0"}>
                                        {"当前队列服务运行异常，可能会导致业务无法使用。"}
                                    </p>
                                </div>
                            </div>
                        </div>, r.map(e => e), <div className={"mb-0 block border-bottom js-classic-nav d-none d-sm-block"}>
                    <div className={"block-content block-content-full"}>
                        <div className={"row no-gutters border"}>
                            <div className={"col-sm-6 col-xl-3 js-appear-enabled animated"} data-toggle={"appear"}>
                                <a className={"block block-bordered block-link-pop text-center mb-0"} onClick={() => f.a.push("/config/system")}>
                                    <div className={"block-content block-content-full text-center"}>
                                        <i className={"fa-2x si si-equalizer text-primary d-none d-sm-inline-block mb-3"}></i>
                                        <div className={"font-w600 text-uppercase"}>
                                            {"系统设置"}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className={"col-sm-6 col-xl-3 js-appear-enabled animated"} data-toggle={"appear"}>
                                <a className={"block block-bordered block-link-pop text-center mb-0"} onClick={() => f.a.push("/order")}>
                                    <div className={"block-content block-content-full text-center"}>
                                        <i className={"fa-2x si si-list text-primary d-none d-sm-inline-block mb-3"}></i>
                                        <div className={"font-w600 text-uppercase"}>
                                            {"订单管理"}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className={"col-sm-6 col-xl-3 js-appear-enabled animated"} data-toggle={"appear"}>
                                <a className={"block block-bordered block-link-pop text-center mb-0"} onClick={() => f.a.push("/plan")}>
                                    <div className={"block-content block-content-full text-center"}>
                                        <i className={"fa-2x si si-bag text-primary d-none d-sm-inline-block mb-3"}></i>
                                        <div className={"font-w600 text-uppercase"}>
                                            {"订阅管理"}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className={"col-sm-6 col-xl-3 js-appear-enabled animated"} data-toggle={"appear"}>
                                <a className={"block block-bordered block-link-pop text-center mb-0"} onClick={() => f.a.push("/user")}>
                                    <div className={"block-content block-content-full text-center"}>
                                        <i className={"fa-2x si si-users text-primary d-none d-sm-inline-block mb-3"}></i>
                                        <div className={"font-w600 text-uppercase"}>
                                            {"用户管理"}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>, <div className={"row no-gutters"}>
                    <div className={"col-lg-12 js-appear-enabled animated"} data-toggle={"appear"}>
                        <div className={"block border-bottom mb-0 v2board-stats-bar"}>
                            <div className={"block-content"}>
                                <div className={"d-flex align-items-center"}>
                                    <div className={"pr-4 pr-sm-5 pl-0 pl-sm-3 "}>
                                        <i className={"fa fa-users fa-2x text-gray-light float-right"}></i>
                                        <div className={"text-muted mb-1"} style={{
                  width: "120px"
                }}>
                                            {"在线人数"}
                                        </div>
                                        <div className={"display-4 text-black font-w300 mb-2"}>
                                            {t.online_user ? t.online_user : "0"}
                                        </div>
                                    </div>
                                    <div className={"pr-4 pr-sm-5 pl-0 pl-sm-3 "}>
                                        <i className={"fa fa-chart-line fa-2x text-gray-light float-right"}></i>
                                        <p className={"text-muted w-75 mb-1"}>
                                            {"今日收入"}
                                        </p>
                                        <p className={"display-4 text-black font-w300 mb-2"}>
                                            {formatIncome(t.day_income)}
                                            <span className={"font-size-h5 font-w600 text-muted"}>
                                                {n.site.currency}
                                            </span>
                                        </p>
                                    </div>
                                    <div className={"pr-4 pr-sm-5 pl-0 pl-sm-3 "}>
                                        <i className={"fa fa-user fa-2x text-gray-light float-right"}></i>
                                        <div className={"text-muted mb-1"} style={{
                  width: "120px"
                }}>
                                            {"实时注册"}
                                        </div>
                                        <div className={"display-4 text-black font-w300 mb-2"}>
                                            {formatLiveCount(t.day_register_total)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-12 js-appear-enabled animated"} data-toggle={"appear"}>
                        <div className={"block border-bottom mb-0 v2board-stats-bar"} onScroll={e => console.log(e.currentTarget.scrollLeft)}>
                            <div className={"block-content block-content-full"}>
                                <div class={"d-flex align-items-center"}>
                                    <div class={"pr-4 pr-sm-5 pl-0 pl-sm-3"}>
                                        <p class={"fs-3 text-dark mb-0"}>
                                            {formatIncome(t.month_income)}{" "}
                                            {n.site.currency}
                                        </p>
                                        <p class={"text-muted mb-0"}>
                                            {"本月收入"}
                                        </p>
                                    </div>
                                    <div class={"px-4 px-sm-5 border-start"}>
                                        <p class={"fs-3 text-dark mb-0"}>
                                            {formatIncome(t.last_month_income)}{" "}
                                            {n.site.currency}
                                        </p>
                                        <p class={"text-muted mb-0"}>
                                            {"上月收入"}
                                        </p>
                                    </div>
                                    <div class={"px-4 px-sm-5 border-start"}>
                                        <p class={"fs-3 text-dark mb-0"}>
                                            {formatIncome(t.commission_last_month_payout)}{" "}
                                            {n.site.currency}
                                        </p>
                                        <p class={"text-muted mb-0"}>
                                            {"上月佣金支出"}
                                        </p>
                                    </div>
                                    <div class={"px-4 px-sm-5 border-start"}>
                                        <p class={"fs-3 text-dark mb-0"}>
                                            {t.month_register_total || "-"}
                                        </p>
                                        <p class={"text-muted mb-0"}>
                                            {"本月新增用户"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-12 js-appear-enabled animated"} data-toggle={"appear"}>
                        <div className={"block border-bottom mb-0"}>
                            <div className={"px-sm-3 pt-sm-3 py-3 clearfix"} id={"orderChart"} style={{
            height: 400
          }} ref={this.orderChart}></div>
                        </div>
                    </div>
                </div>, <div className={"row mt-xl-3"}>
                    <div className={"col-lg-6 js-appear-enabled animated pr-xl-1"} data-toggle={"appear"}>
                        <div className={"block border-bottom"}>
                            <div class={"block-header block-header-default"}>
                                <h3 class={"block-title"}>
                                    {"今日节点流量排行"}
                                </h3>
                            </div>
                            <div className={"block-content"}>
                                <div className={"px-sm-3 pt-sm-3 py-3 clearfix"} id={"serverTodayRankChart"} style={{
              height: 400
            }} ref={this.serverTodayRankChart}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-6 js-appear-enabled animated"} data-toggle={"appear"}>
                        <div className={"block border-bottom"}>
                            <div class={"block-header block-header-default"}>
                                <h3 class={"block-title"}>
                                    {"昨日节点流量排行"}
                                </h3>
                            </div>
                            <div className={"block-content"}>
                                <div className={"px-sm-3 pt-sm-3 py-3 clearfix"} id={"serverLastRankChart"} style={{
              height: 400
            }} ref={this.serverLastRankChart}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-6 js-appear-enabled animated pr-xl-1"} data-toggle={"appear"}>
                        <div className={"block border-bottom"}>
                            <div class={"block-header block-header-default"}>
                                <h3 class={"block-title"}>
                                    {"今日用户流量排行"}
                                </h3>
                            </div>
                            <div className={"block-content"}>
                                <div className={"px-sm-3 pt-sm-3 py-3 clearfix"} id={"userTodayRankChart"} style={{
              height: 400
            }} ref={this.userTodayRankChart}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-6 js-appear-enabled animated"} data-toggle={"appear"}>
                        <div className={"block border-bottom"}>
                            <div class={"block-header block-header-default"}>
                                <h3 class={"block-title"}>
                                    {"昨日用户流量排行"}
                                </h3>
                            </div>
                            <div className={"block-content"}>
                                <div className={"px-sm-3 pt-sm-3 py-3 clearfix"} id={"userLastRankChart"} style={{
              height: 400
            }} ref={this.userLastRankChart}></div>
                            </div>
                        </div>
                    </div>
                </div>);
  }
}
legacyExports["default"] = Object(u["c"])(e => {
  var t = e.stat,
    n = e.config;
  return {
    stat: t,
    config: n
  };
})(O);
