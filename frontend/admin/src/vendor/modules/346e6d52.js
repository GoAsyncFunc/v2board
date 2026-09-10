let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./76705134.js"),
  i = require("./414e6a48.js"),
  o = require("./37624f2f.js"),
  a = require("./514c6150.js"),
  s = interopDefault(a),
  l = require("./55387055.js"),
  c = require("./2b306976.js"),
  u = interopDefault(c),
  h = require("./4b516d34.js");
function f(e) {
  if (Array.isArray(e)) return e;
}
var d = require("./32354245.js"),
  p = require("./42735744.js");
function m() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function g(e) {
  return f(e) || Object(d["a"])(e) || Object(p["a"])(e) || m();
}
var v = require("./6d796e32.js"),
  y = interopDefault(v),
  b = require("./314f7942.js"),
  w = require("./76754955.js"),
  x = require("./51544551.js"),
  _ = interopDefault(x);
require("./76676d4f.js");
function E(e, t) {
  var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (null != n) {
    var r,
      i,
      o,
      a,
      s = [],
      l = !0,
      c = !1;
    try {
      if (o = (n = n.call(e)).next, 0 === t) {
        if (Object(n) !== n) return;
        l = !1;
      } else for (; !(l = (r = o.call(n)).done) && (s.push(r.value), s.length !== t); l = !0);
    } catch (e) {
      c = !0, i = e;
    } finally {
      try {
        if (!l && null != n["return"] && (a = n["return"](), Object(a) !== a)) return;
      } finally {
        if (c) throw i;
      }
    }
    return s;
  }
}
function S(e, t) {
  return f(e) || E(e, t) || Object(p["a"])(e, t) || m();
}
var k = require("./6f306f31.js"),
  C = interopDefault(k);
defineExport(legacyExports, "a", function () {
  return oe;
}), defineExport(legacyExports, "b", function () {
  return j;
});
var O = Array.isArray.bind(Array),
  T = function (e) {
    return "function" === typeof e;
  },
  L = function (e) {
    return e;
  },
  A = function () {},
  P = function (e, t) {
    for (var n = 0, r = e.length; n < r; n += 1) if (t(e[n], n)) return n;
    return -1;
  },
  j = Object.freeze({
    isPlainObject: u.a,
    isArray: O,
    isFunction: T,
    returnSelf: L,
    noop: A,
    findIndex: P
  });
var M = "/";
function R(e, t, n) {
  return Object.keys(e).reduce(function (r, i) {
    y()(0 !== i.indexOf("".concat(t).concat(M)), "[prefixNamespace]: ".concat(n, " ").concat(i, " should not be prefixed with namespace ").concat(t));
    var o = "".concat(t).concat(M).concat(i);
    return r[o] = e[i], r;
  }, {});
}
function N(e) {
  var t = e.namespace,
    n = e.reducers,
    r = e.effects;
  if (n) if (O(n)) {
    var i = g(n),
      o = i[0],
      a = i.slice(1);
    e.reducers = [R(o, t, "reducer")].concat(Object(h["a"])(a));
  } else e.reducers = R(n, t, "reducer");
  return r && (e.effects = R(r, t, "effect")), e;
}
var D = ["onError", "onStateChange", "onAction", "onHmr", "onReducer", "onEffect", "extraReducers", "extraEnhancers", "_handleActions"];
function I(e) {
  return Object.keys(e).reduce(function (t, n) {
    return D.indexOf(n) > -1 && (t[n] = e[n]), t;
  }, {});
}
var $ = function () {
  function e() {
    Object(b["a"])(this, e), this._handleActions = null, this.hooks = D.reduce(function (e, t) {
      return e[t] = [], e;
    }, {});
  }
  return Object(w["a"])(e, [{
    key: "use",
    value: function (e) {
      s()(u()(e), "plugin.use: plugin should be plain object");
      var t = this.hooks;
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (s()(t[n], "plugin.use: unknown plugin property: ".concat(n)), "_handleActions" === n ? this._handleActions = e[n] : "extraEnhancers" === n ? t[n] = e[n] : t[n].push(e[n]));
    }
  }, {
    key: "apply",
    value: function (e, t) {
      var n = this.hooks,
        r = ["onError", "onHmr"];
      s()(r.indexOf(e) > -1, "plugin.apply: hook ".concat(e, " cannot be applied"));
      var i = n[e];
      return function () {
        if (i.length) {
          var e = !0,
            n = !1,
            r = void 0;
          try {
            for (var o, a = i[Symbol.iterator](); !(e = (o = a.next()).done); e = !0) {
              var s = o.value;
              s.apply(void 0, arguments);
            }
          } catch (e) {
            n = !0, r = e;
          } finally {
            try {
              e || null == a.return || a.return();
            } finally {
              if (n) throw r;
            }
          }
        } else t && t.apply(void 0, arguments);
      };
    }
  }, {
    key: "get",
    value: function (e) {
      var t = this.hooks;
      return s()(e in t, "plugin.get: hook ".concat(e, " cannot be got")), "extraReducers" === e ? F(t[e]) : "onReducer" === e ? B(t[e]) : t[e];
    }
  }]), e;
}();
function F(e) {
  var t = {},
    n = !0,
    i = !1,
    o = void 0;
  try {
    for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
      var l = a.value;
      t = Object(r["a"])({}, t, l);
    }
  } catch (e) {
    i = !0, o = e;
  } finally {
    try {
      n || null == s.return || s.return();
    } finally {
      if (i) throw o;
    }
  }
  return t;
}
function B(e) {
  return function (t) {
    var n = !0,
      r = !1,
      i = void 0;
    try {
      for (var o, a = e[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) {
        var s = o.value;
        t = s(t);
      }
    } catch (e) {
      r = !0, i = e;
    } finally {
      try {
        n || null == a.return || a.return();
      } finally {
        if (r) throw i;
      }
    }
    return t;
  };
}
function V(e) {
  var t = e.reducers,
    n = e.initialState,
    r = e.plugin,
    o = e.sagaMiddleware,
    a = e.promiseMiddleware,
    c = e.createOpts.setupMiddlewares,
    u = void 0 === c ? L : c,
    f = r.get("extraEnhancers");
  s()(O(f), "[app.start] extraEnhancers should be array, but got ".concat(Object(l["a"])(f)));
  var d = r.get("onAction"),
    p = u([a, o].concat(Object(h["a"])(_()(d)))),
    m = i["c"],
    g = [i["a"].apply(void 0, Object(h["a"])(p))].concat(Object(h["a"])(f));
  return Object(i["d"])(t, n, m.apply(void 0, Object(h["a"])(g)));
}
function W(e, t) {
  var n = "".concat(t.namespace).concat(M).concat(e),
    r = n.replace(/\/@@[^/]+?$/, ""),
    i = Array.isArray(t.reducers) ? t.reducers[0][r] : t.reducers && t.reducers[r];
  return i || t.effects && t.effects[r] ? n : e;
}
function H(e, t, n, r) {
  var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
  return C.a.mark(function a() {
    var s;
    return C.a.wrap(function (a) {
      while (1) switch (a.prev = a.next) {
        case 0:
          a.t0 = C.a.keys(e);
        case 1:
          if ((a.t1 = a.t0()).done) {
            a.next = 7;
            break;
          }
          if (s = a.t1.value, !Object.prototype.hasOwnProperty.call(e, s)) {
            a.next = 5;
            break;
          }
          return a.delegateYield(C.a.mark(function a() {
            var l, c;
            return C.a.wrap(function (a) {
              while (1) switch (a.prev = a.next) {
                case 0:
                  return l = U(s, e[s], t, n, r, i), a.next = 3, o["b"].fork(l);
                case 3:
                  return c = a.sent, a.next = 6, o["b"].fork(C.a.mark(function e() {
                    return C.a.wrap(function (e) {
                      while (1) switch (e.prev = e.next) {
                        case 0:
                          return e.next = 2, o["b"].take("".concat(t.namespace, "/@@CANCEL_EFFECTS"));
                        case 2:
                          return e.next = 4, o["b"].cancel(c);
                        case 4:
                        case "end":
                          return e.stop();
                      }
                    }, e);
                  }));
                case 6:
                case "end":
                  return a.stop();
              }
            }, a);
          })(), "t2", 5);
        case 5:
          a.next = 1;
          break;
        case 7:
        case "end":
          return a.stop();
      }
    }, a);
  });
}
function U(e, t, n, r, i, a) {
  var l,
    c,
    u = C.a.mark(v),
    f = t,
    d = "takeEvery";
  if (Array.isArray(t)) {
    var p = S(t, 1);
    f = p[0];
    var m = t[1];
    m && m.type && (d = m.type, "throttle" === d && (s()(m.ms, "app.start: opts.ms should be defined if type is throttle"), l = m.ms), "poll" === d && (s()(m.delay, "app.start: opts.delay should be defined if type is poll"), c = m.delay)), s()(["watcher", "takeEvery", "takeLatest", "throttle", "poll"].indexOf(d) > -1, "app.start: effect type should be takeEvery, takeLatest, throttle, poll or watcher");
  }
  function g() {}
  function v() {
    var t,
      i,
      s,
      l,
      c,
      d,
      p,
      m,
      v,
      y = arguments;
    return C.a.wrap(function (u) {
      while (1) switch (u.prev = u.next) {
        case 0:
          for (t = y.length, i = new Array(t), s = 0; s < t; s++) i[s] = y[s];
          return l = i.length > 0 ? i[0] : {}, c = l.__dva_resolve, d = void 0 === c ? g : c, p = l.__dva_reject, m = void 0 === p ? g : p, u.prev = 2, u.next = 5, o["b"].put({
            type: "".concat(e).concat(M, "@@start")
          });
        case 5:
          return u.next = 7, f.apply(void 0, Object(h["a"])(i.concat(z(n, a))));
        case 7:
          return v = u.sent, u.next = 10, o["b"].put({
            type: "".concat(e).concat(M, "@@end")
          });
        case 10:
          d(v), u.next = 17;
          break;
        case 13:
          u.prev = 13, u.t0 = u["catch"](2), r(u.t0, {
            key: e,
            effectArgs: i
          }), u.t0._dontReject || m(u.t0);
        case 17:
        case "end":
          return u.stop();
      }
    }, u, null, [[2, 13]]);
  }
  var y = G(i, v, n, e);
  switch (d) {
    case "watcher":
      return v;
    case "takeLatest":
      return C.a.mark(function t() {
        return C.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, o["b"].takeLatest(e, y);
            case 2:
            case "end":
              return t.stop();
          }
        }, t);
      });
    case "throttle":
      return C.a.mark(function t() {
        return C.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, o["b"].throttle(l, e, y);
            case 2:
            case "end":
              return t.stop();
          }
        }, t);
      });
    case "poll":
      return C.a.mark(function t() {
        var n, r, i, a, s, l, u;
        return C.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              i = function (e, t) {
                var i;
                return C.a.wrap(function (n) {
                  while (1) switch (n.prev = n.next) {
                    case 0:
                      i = e.call;
                    case 1:
                      return n.next = 4, i(y, t);
                    case 4:
                      return n.next = 6, i(r, c);
                    case 6:
                      n.next = 1;
                      break;
                    case 8:
                    case "end":
                      return n.stop();
                  }
                }, n);
              }, r = function (e) {
                return new Promise(function (t) {
                  return setTimeout(t, e);
                });
              }, n = C.a.mark(i), a = o["b"].call, s = o["b"].take, l = o["b"].race;
            case 4:
              return t.next = 7, s("".concat(e, "-start"));
            case 7:
              return u = t.sent, t.next = 10, l([a(i, o["b"], u), s("".concat(e, "-stop"))]);
            case 10:
              t.next = 4;
              break;
            case 12:
            case "end":
              return t.stop();
          }
        }, t);
      });
    default:
      return C.a.mark(function t() {
        return C.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, o["b"].takeEvery(e, y);
            case 2:
            case "end":
              return t.stop();
          }
        }, t);
      });
  }
}
function z(e, t) {
  function n(n, r) {
    s()(n, "dispatch: action should be a plain Object with type");
    var i = t.namespacePrefixWarning,
      o = void 0 === i || i;
    o && y()(0 !== n.indexOf("".concat(e.namespace).concat(M)), "[".concat(r, "] ").concat(n, " should not be prefixed with namespace ").concat(e.namespace));
  }
  function i(t) {
    var i = t.type;
    return n(i, "sagaEffects.put"), o["b"].put(Object(r["a"])({}, t, {
      type: W(i, e)
    }));
  }
  function a(t) {
    var i = t.type;
    return n(i, "sagaEffects.put.resolve"), o["b"].put.resolve(Object(r["a"])({}, t, {
      type: W(i, e)
    }));
  }
  function l(t) {
    return "string" === typeof t ? (n(t, "sagaEffects.take"), o["b"].take(W(t, e))) : Array.isArray(t) ? o["b"].take(t.map(function (t) {
      return "string" === typeof t ? (n(t, "sagaEffects.take"), W(t, e)) : t;
    })) : o["b"].take(t);
  }
  return i.resolve = a, Object(r["a"])({}, o["b"], {
    put: i,
    take: l
  });
}
function G(e, t, n, r) {
  var i = !0,
    a = !1,
    s = void 0;
  try {
    for (var l, c = e[Symbol.iterator](); !(i = (l = c.next()).done); i = !0) {
      var u = l.value;
      t = u(t, o["b"], n, r);
    }
  } catch (e) {
    a = !0, s = e;
  } finally {
    try {
      i || null == c.return || c.return();
    } finally {
      if (a) throw s;
    }
  }
  return t;
}
function q(e) {
  return e;
}
function K(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : q;
  return function (n, r) {
    var i = r.type;
    return s()(i, "dispatch: action should be a plain Object with type"), e === i ? t(n, r) : n;
  };
}
function Y() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return function (e, n) {
    return t.reduce(function (e, t) {
      return t(e, n);
    }, e);
  };
}
function X(e, t) {
  var n = Object.keys(e).map(function (t) {
      return K(t, e[t]);
    }),
    r = Y.apply(void 0, Object(h["a"])(n));
  return function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t,
      n = arguments.length > 1 ? arguments[1] : void 0;
    return r(e, n);
  };
}
function Q(e, t, n) {
  return Array.isArray(e) ? e[1]((n || X)(e[0], t)) : (n || X)(e || {}, t);
}
function Z(e) {
  return function () {
    return function (e) {
      return function (n) {
        var i = n.type;
        return t(i) ? new Promise(function (t, i) {
          e(Object(r["a"])({
            __dva_resolve: t,
            __dva_reject: i
          }, n));
        }) : e(n);
      };
    };
  };
  function t(t) {
    if (!t || "string" !== typeof t) return !1;
    var n = t.split(M),
      r = S(n, 1),
      i = r[0],
      o = e._models.filter(function (e) {
        return e.namespace === i;
      })[0];
    return !!(o && o.effects && o.effects[t]);
  }
}
function J(e, t) {
  return function (n) {
    var i = n.type;
    return s()(i, "dispatch: action should be a plain Object with type"), y()(0 !== i.indexOf("".concat(t.namespace).concat(M)), "dispatch: ".concat(i, " should not be prefixed with namespace ").concat(t.namespace)), e(Object(r["a"])({}, n, {
      type: W(i, t)
    }));
  };
}
function ee(e, t, n, r) {
  var i = [],
    o = [];
  for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
    var s = e[a],
      l = s({
        dispatch: J(n._store.dispatch, t),
        history: n._history
      }, r);
    T(l) ? i.push(l) : o.push(a);
  }
  return {
    funcs: i,
    nonFuncs: o
  };
}
function te(e, t) {
  if (e[t]) {
    var n = e[t],
      r = n.funcs,
      i = n.nonFuncs;
    y()(0 === i.length, "[app.unmodel] subscription should return unlistener function, check these subscriptions ".concat(i.join(", ")));
    var o = !0,
      a = !1,
      s = void 0;
    try {
      for (var l, c = r[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
        var u = l.value;
        u();
      }
    } catch (e) {
      a = !0, s = e;
    } finally {
      try {
        o || null == c.return || c.return();
      } finally {
        if (a) throw s;
      }
    }
    delete e[t];
  }
}
var ne = A,
  re = P,
  ie = {
    namespace: "@@dva",
    state: 0,
    reducers: {
      UPDATE: function (e) {
        return e + 1;
      }
    }
  };
function oe() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = t.initialReducer,
    a = t.setupApp,
    l = void 0 === a ? ne : a,
    c = new $();
  c.use(I(e));
  var u = {
    _models: [N(Object(r["a"])({}, ie))],
    _store: null,
    _plugin: c,
    use: c.use.bind(c),
    model: h,
    start: m
  };
  return u;
  function h(e) {
    var t = N(Object(r["a"])({}, e));
    return u._models.push(t), t;
  }
  function f(t, n, r, i) {
    i = h(i);
    var o = u._store;
    o.asyncReducers[i.namespace] = Q(i.reducers, i.state, c._handleActions), o.replaceReducer(t()), i.effects && o.runSaga(u._getSaga(i.effects, i, n, c.get("onEffect"), e)), i.subscriptions && (r[i.namespace] = ee(i.subscriptions, i, u, n));
  }
  function d(e, t, n, r) {
    var i = u._store;
    delete i.asyncReducers[r], delete t[r], i.replaceReducer(e()), i.dispatch({
      type: "@@dva/UPDATE"
    }), i.dispatch({
      type: "".concat(r, "/@@CANCEL_EFFECTS")
    }), te(n, r), u._models = u._models.filter(function (e) {
      return e.namespace !== r;
    });
  }
  function p(e, t, n, r, i) {
    var o = u._store,
      a = i.namespace,
      s = re(u._models, function (e) {
        return e.namespace === a;
      });
    ~s && (o.dispatch({
      type: "".concat(a, "/@@CANCEL_EFFECTS")
    }), delete o.asyncReducers[a], delete t[a], te(n, a), u._models.splice(s, 1)), u.model(i), o.dispatch({
      type: "@@dva/UPDATE"
    });
  }
  function m() {
    var a = function (e, t) {
        e && ("string" === typeof e && (e = new Error(e)), e.preventDefault = function () {
          e._dontReject = !0;
        }, c.apply("onError", function (e) {
          throw new Error(e.stack || e);
        })(e, u._store.dispatch, t));
      },
      h = Object(o["a"])(),
      m = Z(u);
    u._getSaga = H.bind(null);
    var g = [],
      v = Object(r["a"])({}, n),
      y = !0,
      b = !1,
      w = void 0;
    try {
      for (var x, _ = u._models[Symbol.iterator](); !(y = (x = _.next()).done); y = !0) {
        var E = x.value;
        v[E.namespace] = Q(E.reducers, E.state, c._handleActions), E.effects && g.push(u._getSaga(E.effects, E, a, c.get("onEffect"), e));
      }
    } catch (e) {
      b = !0, w = e;
    } finally {
      try {
        y || null == _.return || _.return();
      } finally {
        if (b) throw w;
      }
    }
    var S = c.get("onReducer"),
      k = c.get("extraReducers");
    s()(Object.keys(k).every(function (e) {
      return !(e in v);
    }), "[app.start] extraReducers is conflict with other reducers, reducers list: ".concat(Object.keys(v).join(", "))), u._store = V({
      reducers: W(),
      initialState: e.initialState || {},
      plugin: c,
      createOpts: t,
      sagaMiddleware: h,
      promiseMiddleware: m
    });
    var C = u._store;
    C.runSaga = h.run, C.asyncReducers = {};
    var O = c.get("onStateChange"),
      T = !0,
      L = !1,
      A = void 0;
    try {
      for (var P, j = function () {
          var e = P.value;
          C.subscribe(function () {
            e(C.getState());
          });
        }, M = O[Symbol.iterator](); !(T = (P = M.next()).done); T = !0) j();
    } catch (e) {
      L = !0, A = e;
    } finally {
      try {
        T || null == M.return || M.return();
      } finally {
        if (L) throw A;
      }
    }
    g.forEach(h.run), l(u);
    var R = {},
      N = !0,
      D = !1,
      I = void 0;
    try {
      for (var $, F = this._models[Symbol.iterator](); !(N = ($ = F.next()).done); N = !0) {
        var B = $.value;
        B.subscriptions && (R[B.namespace] = ee(B.subscriptions, B, u, a));
      }
    } catch (e) {
      D = !0, I = e;
    } finally {
      try {
        N || null == F.return || F.return();
      } finally {
        if (D) throw I;
      }
    }
    function W() {
      return S(Object(i["b"])(Object(r["a"])({}, v, k, u._store ? u._store.asyncReducers : {})));
    }
    u.model = f.bind(u, W, a, R), u.unmodel = d.bind(u, W, v, R), u.replaceModel = p.bind(u, W, v, R, a);
  }
}
