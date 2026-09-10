let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./76705134.js"),
  o = require("./414e6a48.js"),
  i = require("./37624f2f.js"),
  a = require("./514c6150.js"),
  s = interopDefault(a),
  c = require("./55387055.js"),
  u = require("./2b306976.js"),
  l = interopDefault(u),
  f = require("./4b516d34.js");
function p(e) {
  if (Array.isArray(e)) return e;
}
var d = require("./32354245.js"),
  h = require("./42735744.js");
function m() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function v(e) {
  return p(e) || Object(d["a"])(e) || Object(h["a"])(e) || m();
}
var y = require("./6d796e32.js"),
  g = interopDefault(y),
  b = require("./314f7942.js"),
  w = require("./76754955.js"),
  x = require("./51544551.js"),
  O = interopDefault(x);
require("./76676d4f.js");
function E(e, t) {
  var n = null == e ? null : "undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (null != n) {
    var r,
      o,
      i = [],
      a = !0,
      s = !1;
    try {
      for (n = n.call(e); !(a = (r = n.next()).done); a = !0) if (i.push(r.value), t && i.length === t) break;
    } catch (e) {
      s = !0, o = e;
    } finally {
      try {
        a || null == n["return"] || n["return"]();
      } finally {
        if (s) throw o;
      }
    }
    return i;
  }
}
function _(e, t) {
  return p(e) || E(e, t) || Object(h["a"])(e, t) || m();
}
var k = require("./6f306f31.js"),
  S = interopDefault(k);
defineExport(legacyExports, "a", function () {
  return ie;
}), defineExport(legacyExports, "b", function () {
  return N;
});
var C = Array.isArray.bind(Array),
  j = function (e) {
    return "function" === typeof e;
  },
  P = function (e) {
    return e;
  },
  T = function () {},
  L = function (e, t) {
    for (var n = 0, r = e.length; n < r; n += 1) if (t(e[n], n)) return n;
    return -1;
  },
  N = Object.freeze({
    isPlainObject: l.a,
    isArray: C,
    isFunction: j,
    returnSelf: P,
    noop: T,
    findIndex: L
  });
var M = "/";
function A(e, t, n) {
  return Object.keys(e).reduce(function (r, o) {
    g()(0 !== o.indexOf("".concat(t).concat(M)), "[prefixNamespace]: ".concat(n, " ").concat(o, " should not be prefixed with namespace ").concat(t));
    var i = "".concat(t).concat(M).concat(o);
    return r[i] = e[o], r;
  }, {});
}
function D(e) {
  var t = e.namespace,
    n = e.reducers,
    r = e.effects;
  if (n) if (C(n)) {
    var o = v(n),
      i = o[0],
      a = o.slice(1);
    e.reducers = [A(i, t, "reducer")].concat(Object(f["a"])(a));
  } else e.reducers = A(n, t, "reducer");
  return r && (e.effects = A(r, t, "effect")), e;
}
var I = ["onError", "onStateChange", "onAction", "onHmr", "onReducer", "onEffect", "extraReducers", "extraEnhancers", "_handleActions"];
function R(e) {
  return Object.keys(e).reduce(function (t, n) {
    return I.indexOf(n) > -1 && (t[n] = e[n]), t;
  }, {});
}
var F = function () {
  function e() {
    Object(b["a"])(this, e), this._handleActions = null, this.hooks = I.reduce(function (e, t) {
      return e[t] = [], e;
    }, {});
  }
  return Object(w["a"])(e, [{
    key: "use",
    value: function (e) {
      s()(l()(e), "plugin.use: plugin should be plain object");
      var t = this.hooks;
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (s()(t[n], "plugin.use: unknown plugin property: ".concat(n)), "_handleActions" === n ? this._handleActions = e[n] : "extraEnhancers" === n ? t[n] = e[n] : t[n].push(e[n]));
    }
  }, {
    key: "apply",
    value: function (e, t) {
      var n = this.hooks,
        r = ["onError", "onHmr"];
      s()(r.indexOf(e) > -1, "plugin.apply: hook ".concat(e, " cannot be applied"));
      var o = n[e];
      return function () {
        if (o.length) {
          var e = !0,
            n = !1,
            r = void 0;
          try {
            for (var i, a = o[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
              var s = i.value;
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
      return s()(e in t, "plugin.get: hook ".concat(e, " cannot be got")), "extraReducers" === e ? V(t[e]) : "onReducer" === e ? z(t[e]) : t[e];
    }
  }]), e;
}();
function V(e) {
  var t = {},
    n = !0,
    o = !1,
    i = void 0;
  try {
    for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
      var c = a.value;
      t = Object(r["a"])({}, t, c);
    }
  } catch (e) {
    o = !0, i = e;
  } finally {
    try {
      n || null == s.return || s.return();
    } finally {
      if (o) throw i;
    }
  }
  return t;
}
function z(e) {
  return function (t) {
    var n = !0,
      r = !1,
      o = void 0;
    try {
      for (var i, a = e[Symbol.iterator](); !(n = (i = a.next()).done); n = !0) {
        var s = i.value;
        t = s(t);
      }
    } catch (e) {
      r = !0, o = e;
    } finally {
      try {
        n || null == a.return || a.return();
      } finally {
        if (r) throw o;
      }
    }
    return t;
  };
}
function B(e) {
  var t = e.reducers,
    n = e.initialState,
    r = e.plugin,
    i = e.sagaMiddleware,
    a = e.promiseMiddleware,
    u = e.createOpts.setupMiddlewares,
    l = void 0 === u ? P : u,
    p = r.get("extraEnhancers");
  s()(C(p), "[app.start] extraEnhancers should be array, but got ".concat(Object(c["a"])(p)));
  var d = r.get("onAction"),
    h = l([a, i].concat(Object(f["a"])(O()(d)))),
    m = o["c"],
    v = [o["a"].apply(void 0, Object(f["a"])(h))].concat(Object(f["a"])(p));
  return Object(o["d"])(t, n, m.apply(void 0, Object(f["a"])(v)));
}
function W(e, t) {
  var n = "".concat(t.namespace).concat(M).concat(e),
    r = n.replace(/\/@@[^/]+?$/, ""),
    o = Array.isArray(t.reducers) ? t.reducers[0][r] : t.reducers && t.reducers[r];
  return o || t.effects && t.effects[r] ? n : e;
}
function U(e, t, n, r) {
  var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
  return S.a.mark(function a() {
    var s;
    return S.a.wrap(function (a) {
      while (1) switch (a.prev = a.next) {
        case 0:
          a.t0 = S.a.keys(e);
        case 1:
          if ((a.t1 = a.t0()).done) {
            a.next = 7;
            break;
          }
          if (s = a.t1.value, !Object.prototype.hasOwnProperty.call(e, s)) {
            a.next = 5;
            break;
          }
          return a.delegateYield(S.a.mark(function a() {
            var c, u;
            return S.a.wrap(function (a) {
              while (1) switch (a.prev = a.next) {
                case 0:
                  return c = q(s, e[s], t, n, r, o), a.next = 3, i["b"].fork(c);
                case 3:
                  return u = a.sent, a.next = 6, i["b"].fork(S.a.mark(function e() {
                    return S.a.wrap(function (e) {
                      while (1) switch (e.prev = e.next) {
                        case 0:
                          return e.next = 2, i["b"].take("".concat(t.namespace, "/@@CANCEL_EFFECTS"));
                        case 2:
                          return e.next = 4, i["b"].cancel(u);
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
function q(e, t, n, r, o, a) {
  var c,
    u,
    l = S.a.mark(y),
    p = t,
    d = "takeEvery";
  if (Array.isArray(t)) {
    var h = _(t, 1);
    p = h[0];
    var m = t[1];
    m && m.type && (d = m.type, "throttle" === d && (s()(m.ms, "app.start: opts.ms should be defined if type is throttle"), c = m.ms), "poll" === d && (s()(m.delay, "app.start: opts.delay should be defined if type is poll"), u = m.delay)), s()(["watcher", "takeEvery", "takeLatest", "throttle", "poll"].indexOf(d) > -1, "app.start: effect type should be takeEvery, takeLatest, throttle, poll or watcher");
  }
  function v() {}
  function y() {
    var t,
      o,
      s,
      c,
      u,
      d,
      h,
      m,
      y,
      g = arguments;
    return S.a.wrap(function (l) {
      while (1) switch (l.prev = l.next) {
        case 0:
          for (t = g.length, o = new Array(t), s = 0; s < t; s++) o[s] = g[s];
          return c = o.length > 0 ? o[0] : {}, u = c.__dva_resolve, d = void 0 === u ? v : u, h = c.__dva_reject, m = void 0 === h ? v : h, l.prev = 2, l.next = 5, i["b"].put({
            type: "".concat(e).concat(M, "@@start")
          });
        case 5:
          return l.next = 7, p.apply(void 0, Object(f["a"])(o.concat(H(n, a))));
        case 7:
          return y = l.sent, l.next = 10, i["b"].put({
            type: "".concat(e).concat(M, "@@end")
          });
        case 10:
          d(y), l.next = 17;
          break;
        case 13:
          l.prev = 13, l.t0 = l["catch"](2), r(l.t0, {
            key: e,
            effectArgs: o
          }), l.t0._dontReject || m(l.t0);
        case 17:
        case "end":
          return l.stop();
      }
    }, l, null, [[2, 13]]);
  }
  var g = Y(o, y, n, e);
  switch (d) {
    case "watcher":
      return y;
    case "takeLatest":
      return S.a.mark(function t() {
        return S.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, i["b"].takeLatest(e, g);
            case 2:
            case "end":
              return t.stop();
          }
        }, t);
      });
    case "throttle":
      return S.a.mark(function t() {
        return S.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, i["b"].throttle(c, e, g);
            case 2:
            case "end":
              return t.stop();
          }
        }, t);
      });
    case "poll":
      return S.a.mark(function t() {
        var n, r, o, a, s, c, l;
        return S.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              o = function (e, t) {
                var o;
                return S.a.wrap(function (n) {
                  while (1) switch (n.prev = n.next) {
                    case 0:
                      o = e.call;
                    case 1:
                      return n.next = 4, o(g, t);
                    case 4:
                      return n.next = 6, o(r, u);
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
              }, n = S.a.mark(o), a = i["b"].call, s = i["b"].take, c = i["b"].race;
            case 4:
              return t.next = 7, s("".concat(e, "-start"));
            case 7:
              return l = t.sent, t.next = 10, c([a(o, i["b"], l), s("".concat(e, "-stop"))]);
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
      return S.a.mark(function t() {
        return S.a.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, i["b"].takeEvery(e, g);
            case 2:
            case "end":
              return t.stop();
          }
        }, t);
      });
  }
}
function H(e, t) {
  function n(n, r) {
    s()(n, "dispatch: action should be a plain Object with type");
    var o = t.namespacePrefixWarning,
      i = void 0 === o || o;
    i && g()(0 !== n.indexOf("".concat(e.namespace).concat(M)), "[".concat(r, "] ").concat(n, " should not be prefixed with namespace ").concat(e.namespace));
  }
  function o(t) {
    var o = t.type;
    return n(o, "sagaEffects.put"), i["b"].put(Object(r["a"])({}, t, {
      type: W(o, e)
    }));
  }
  function a(t) {
    var o = t.type;
    return n(o, "sagaEffects.put.resolve"), i["b"].put.resolve(Object(r["a"])({}, t, {
      type: W(o, e)
    }));
  }
  function c(t) {
    return "string" === typeof t ? (n(t, "sagaEffects.take"), i["b"].take(W(t, e))) : Array.isArray(t) ? i["b"].take(t.map(function (t) {
      return "string" === typeof t ? (n(t, "sagaEffects.take"), W(t, e)) : t;
    })) : i["b"].take(t);
  }
  return o.resolve = a, Object(r["a"])({}, i["b"], {
    put: o,
    take: c
  });
}
function Y(e, t, n, r) {
  var o = !0,
    a = !1,
    s = void 0;
  try {
    for (var c, u = e[Symbol.iterator](); !(o = (c = u.next()).done); o = !0) {
      var l = c.value;
      t = l(t, i["b"], n, r);
    }
  } catch (e) {
    a = !0, s = e;
  } finally {
    try {
      o || null == u.return || u.return();
    } finally {
      if (a) throw s;
    }
  }
  return t;
}
function G(e) {
  return e;
}
function K(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : G;
  return function (n, r) {
    var o = r.type;
    return s()(o, "dispatch: action should be a plain Object with type"), e === o ? t(n, r) : n;
  };
}
function Z() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return function (e, n) {
    return t.reduce(function (e, t) {
      return t(e, n);
    }, e);
  };
}
function Q(e, t) {
  var n = Object.keys(e).map(function (t) {
      return K(t, e[t]);
    }),
    r = Z.apply(void 0, Object(f["a"])(n));
  return function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t,
      n = arguments.length > 1 ? arguments[1] : void 0;
    return r(e, n);
  };
}
function X(e, t, n) {
  return Array.isArray(e) ? e[1]((n || Q)(e[0], t)) : (n || Q)(e || {}, t);
}
function J(e) {
  return function () {
    return function (e) {
      return function (n) {
        var o = n.type;
        return t(o) ? new Promise(function (t, o) {
          e(Object(r["a"])({
            __dva_resolve: t,
            __dva_reject: o
          }, n));
        }) : e(n);
      };
    };
  };
  function t(t) {
    if (!t || "string" !== typeof t) return !1;
    var n = t.split(M),
      r = _(n, 1),
      o = r[0],
      i = e._models.filter(function (e) {
        return e.namespace === o;
      })[0];
    return !!(i && i.effects && i.effects[t]);
  }
}
function $(e, t) {
  return function (n) {
    var o = n.type;
    return s()(o, "dispatch: action should be a plain Object with type"), g()(0 !== o.indexOf("".concat(t.namespace).concat(M)), "dispatch: ".concat(o, " should not be prefixed with namespace ").concat(t.namespace)), e(Object(r["a"])({}, n, {
      type: W(o, t)
    }));
  };
}
function ee(e, t, n, r) {
  var o = [],
    i = [];
  for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
    var s = e[a],
      c = s({
        dispatch: $(n._store.dispatch, t),
        history: n._history
      }, r);
    j(c) ? o.push(c) : i.push(a);
  }
  return {
    funcs: o,
    nonFuncs: i
  };
}
function te(e, t) {
  if (e[t]) {
    var n = e[t],
      r = n.funcs,
      o = n.nonFuncs;
    g()(0 === o.length, "[app.unmodel] subscription should return unlistener function, check these subscriptions ".concat(o.join(", ")));
    var i = !0,
      a = !1,
      s = void 0;
    try {
      for (var c, u = r[Symbol.iterator](); !(i = (c = u.next()).done); i = !0) {
        var l = c.value;
        l();
      }
    } catch (e) {
      a = !0, s = e;
    } finally {
      try {
        i || null == u.return || u.return();
      } finally {
        if (a) throw s;
      }
    }
    delete e[t];
  }
}
var ne = T,
  re = L,
  oe = {
    namespace: "@@dva",
    state: 0,
    reducers: {
      UPDATE: function (e) {
        return e + 1;
      }
    }
  };
function ie() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = t.initialReducer,
    a = t.setupApp,
    c = void 0 === a ? ne : a,
    u = new F();
  u.use(R(e));
  var l = {
    _models: [D(Object(r["a"])({}, oe))],
    _store: null,
    _plugin: u,
    use: u.use.bind(u),
    model: f,
    start: m
  };
  return l;
  function f(e) {
    var t = D(Object(r["a"])({}, e));
    return l._models.push(t), t;
  }
  function p(t, n, r, o) {
    o = f(o);
    var i = l._store;
    i.asyncReducers[o.namespace] = X(o.reducers, o.state, u._handleActions), i.replaceReducer(t()), o.effects && i.runSaga(l._getSaga(o.effects, o, n, u.get("onEffect"), e)), o.subscriptions && (r[o.namespace] = ee(o.subscriptions, o, l, n));
  }
  function d(e, t, n, r) {
    var o = l._store;
    delete o.asyncReducers[r], delete t[r], o.replaceReducer(e()), o.dispatch({
      type: "@@dva/UPDATE"
    }), o.dispatch({
      type: "".concat(r, "/@@CANCEL_EFFECTS")
    }), te(n, r), l._models = l._models.filter(function (e) {
      return e.namespace !== r;
    });
  }
  function h(e, t, n, r, o) {
    var i = l._store,
      a = o.namespace,
      s = re(l._models, function (e) {
        return e.namespace === a;
      });
    ~s && (i.dispatch({
      type: "".concat(a, "/@@CANCEL_EFFECTS")
    }), delete i.asyncReducers[a], delete t[a], te(n, a), l._models.splice(s, 1)), l.model(o), i.dispatch({
      type: "@@dva/UPDATE"
    });
  }
  function m() {
    var a = function (e, t) {
        e && ("string" === typeof e && (e = new Error(e)), e.preventDefault = function () {
          e._dontReject = !0;
        }, u.apply("onError", function (e) {
          throw new Error(e.stack || e);
        })(e, l._store.dispatch, t));
      },
      f = Object(i["a"])(),
      m = J(l);
    l._getSaga = U.bind(null);
    var v = [],
      y = Object(r["a"])({}, n),
      g = !0,
      b = !1,
      w = void 0;
    try {
      for (var x, O = l._models[Symbol.iterator](); !(g = (x = O.next()).done); g = !0) {
        var E = x.value;
        y[E.namespace] = X(E.reducers, E.state, u._handleActions), E.effects && v.push(l._getSaga(E.effects, E, a, u.get("onEffect"), e));
      }
    } catch (e) {
      b = !0, w = e;
    } finally {
      try {
        g || null == O.return || O.return();
      } finally {
        if (b) throw w;
      }
    }
    var _ = u.get("onReducer"),
      k = u.get("extraReducers");
    s()(Object.keys(k).every(function (e) {
      return !(e in y);
    }), "[app.start] extraReducers is conflict with other reducers, reducers list: ".concat(Object.keys(y).join(", "))), l._store = B({
      reducers: W(),
      initialState: e.initialState || {},
      plugin: u,
      createOpts: t,
      sagaMiddleware: f,
      promiseMiddleware: m
    });
    var S = l._store;
    S.runSaga = f.run, S.asyncReducers = {};
    var C = u.get("onStateChange"),
      j = !0,
      P = !1,
      T = void 0;
    try {
      for (var L, N = function () {
          var e = L.value;
          S.subscribe(function () {
            e(S.getState());
          });
        }, M = C[Symbol.iterator](); !(j = (L = M.next()).done); j = !0) N();
    } catch (e) {
      P = !0, T = e;
    } finally {
      try {
        j || null == M.return || M.return();
      } finally {
        if (P) throw T;
      }
    }
    v.forEach(f.run), c(l);
    var A = {},
      D = !0,
      I = !1,
      R = void 0;
    try {
      for (var F, V = this._models[Symbol.iterator](); !(D = (F = V.next()).done); D = !0) {
        var z = F.value;
        z.subscriptions && (A[z.namespace] = ee(z.subscriptions, z, l, a));
      }
    } catch (e) {
      I = !0, R = e;
    } finally {
      try {
        D || null == V.return || V.return();
      } finally {
        if (I) throw R;
      }
    }
    function W() {
      return _(Object(o["b"])(Object(r["a"])({}, y, k, l._store ? l._store.asyncReducers : {})));
    }
    l.model = p.bind(l, W, a, A), l.unmodel = d.bind(l, W, y, A), l.replaceModel = h.bind(l, W, y, A, a);
  }
}
