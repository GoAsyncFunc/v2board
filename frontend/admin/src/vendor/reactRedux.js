let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../app/moduleInterop.js");
var r = require("./modules/71317449.js"),
  i = interopDefault(r),
  o = i.a.createContext(null);
function a(e) {
  e();
}
var s = a,
  l = function (e) {
    return s = e;
  },
  c = function () {
    return s;
  };
function u() {
  var e = c(),
    t = null,
    n = null;
  return {
    clear: function () {
      t = null, n = null;
    },
    notify: function () {
      e(function () {
        var e = t;
        while (e) e.callback(), e = e.next;
      });
    },
    get: function () {
      var e = [],
        n = t;
      while (n) e.push(n), n = n.next;
      return e;
    },
    subscribe: function (e) {
      var r = !0,
        i = n = {
          callback: e,
          next: null,
          prev: n
        };
      return i.prev ? i.prev.next = i : t = i, function () {
        r && null !== t && (r = !1, i.next ? i.next.prev = i.prev : n = i.prev, i.prev ? i.prev.next = i.next : t = i.next);
      };
    }
  };
}
var h = {
  notify: function () {},
  get: function () {
    return [];
  }
};
function f(e, t) {
  var n,
    r = h;
  function i(e) {
    return l(), r.subscribe(e);
  }
  function o() {
    r.notify();
  }
  function a() {
    f.onStateChange && f.onStateChange();
  }
  function s() {
    return Boolean(n);
  }
  function l() {
    n || (n = t ? t.addNestedSub(a) : e.subscribe(a), r = u());
  }
  function c() {
    n && (n(), n = void 0, r.clear(), r = h);
  }
  var f = {
    addNestedSub: i,
    notifyNestedSubs: o,
    handleChangeWrapper: a,
    isSubscribed: s,
    trySubscribe: l,
    tryUnsubscribe: c,
    getListeners: function () {
      return r;
    }
  };
  return f;
}
var d = "undefined" !== typeof window && "undefined" !== typeof window.document && "undefined" !== typeof window.document.createElement ? r["useLayoutEffect"] : r["useEffect"];
function p(e) {
  var t = e.store,
    n = e.context,
    a = e.children,
    s = Object(r["useMemo"])(function () {
      var e = f(t);
      return {
        store: t,
        subscription: e
      };
    }, [t]),
    l = Object(r["useMemo"])(function () {
      return t.getState();
    }, [t]);
  d(function () {
    var e = s.subscription;
    return e.onStateChange = e.notifyNestedSubs, e.trySubscribe(), l !== t.getState() && e.notifyNestedSubs(), function () {
      e.tryUnsubscribe(), e.onStateChange = null;
    };
  }, [s, l]);
  var c = n || o;
  return i.a.createElement(c.Provider, {
    value: s
  }, a);
}
var m = p;
function g() {
  return g = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, g.apply(this, arguments);
}
function v(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
var y = require("./modules/326d716c.js"),
  b = interopDefault(y),
  w = require("./modules/30767844.js"),
  x = ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"],
  _ = ["reactReduxForwardedRef"],
  E = [],
  S = [null, null];
function k(e, t) {
  var n = e[1];
  return [t.payload, n + 1];
}
function C(e, t, n) {
  d(function () {
    return e.apply(void 0, t);
  }, n);
}
function O(e, t, n, r, i, o, a) {
  e.current = r, t.current = i, n.current = !1, o.current && (o.current = null, a());
}
function T(e, t, n, r, i, o, a, s, l, c) {
  if (e) {
    var u = !1,
      h = null,
      f = function () {
        if (!u) {
          var e,
            n,
            f = t.getState();
          try {
            e = r(f, i.current);
          } catch (e) {
            n = e, h = e;
          }
          n || (h = null), e === o.current ? a.current || l() : (o.current = e, s.current = e, a.current = !0, c({
            type: "STORE_UPDATED",
            payload: {
              error: n
            }
          }));
        }
      };
    n.onStateChange = f, n.trySubscribe(), f();
    var d = function () {
      if (u = !0, n.tryUnsubscribe(), n.onStateChange = null, h) throw h;
    };
    return d;
  }
}
var L = function () {
  return [null, 0];
};
function A(e, t) {
  void 0 === t && (t = {});
  var n = t,
    a = n.getDisplayName,
    s = void 0 === a ? function (e) {
      return "ConnectAdvanced(" + e + ")";
    } : a,
    l = n.methodName,
    c = void 0 === l ? "connectAdvanced" : l,
    u = n.renderCountProp,
    h = void 0 === u ? void 0 : u,
    d = n.shouldHandleStateChanges,
    p = void 0 === d || d,
    m = n.storeKey,
    y = void 0 === m ? "store" : m,
    A = (n.withRef, n.forwardRef),
    P = void 0 !== A && A,
    j = n.context,
    M = void 0 === j ? o : j,
    R = v(n, x),
    N = M;
  return function (t) {
    var n = t.displayName || t.name || "Component",
      o = s(n),
      a = g({}, R, {
        getDisplayName: s,
        methodName: c,
        renderCountProp: h,
        shouldHandleStateChanges: p,
        storeKey: y,
        displayName: o,
        wrappedComponentName: n,
        WrappedComponent: t
      }),
      l = R.pure;
    function u(t) {
      return e(t.dispatch, a);
    }
    var d = l ? r["useMemo"] : function (e) {
      return e();
    };
    function m(e) {
      var n = Object(r["useMemo"])(function () {
          var t = e.reactReduxForwardedRef,
            n = v(e, _);
          return [e.context, t, n];
        }, [e]),
        o = n[0],
        a = n[1],
        s = n[2],
        l = Object(r["useMemo"])(function () {
          return o && o.Consumer && Object(w["isContextConsumer"])(i.a.createElement(o.Consumer, null)) ? o : N;
        }, [o, N]),
        c = Object(r["useContext"])(l),
        h = Boolean(e.store) && Boolean(e.store.getState) && Boolean(e.store.dispatch);
      Boolean(c) && Boolean(c.store);
      var m = h ? e.store : c.store,
        y = Object(r["useMemo"])(function () {
          return u(m);
        }, [m]),
        b = Object(r["useMemo"])(function () {
          if (!p) return S;
          var e = f(m, h ? null : c.subscription),
            t = e.notifyNestedSubs.bind(e);
          return [e, t];
        }, [m, h, c]),
        x = b[0],
        A = b[1],
        P = Object(r["useMemo"])(function () {
          return h ? c : g({}, c, {
            subscription: x
          });
        }, [h, c, x]),
        j = Object(r["useReducer"])(k, E, L),
        M = j[0],
        R = M[0],
        D = j[1];
      if (R && R.error) throw R.error;
      var I = Object(r["useRef"])(),
        $ = Object(r["useRef"])(s),
        F = Object(r["useRef"])(),
        B = Object(r["useRef"])(!1),
        V = d(function () {
          return F.current && s === $.current ? F.current : y(m.getState(), s);
        }, [m, R, s]);
      C(O, [$, I, B, s, V, F, A]), C(T, [p, m, x, y, $, I, B, F, A, D], [m, x, y]);
      var W = Object(r["useMemo"])(function () {
          return i.a.createElement(t, g({}, V, {
            ref: a
          }));
        }, [a, t, V]),
        H = Object(r["useMemo"])(function () {
          return p ? i.a.createElement(l.Provider, {
            value: P
          }, W) : W;
        }, [l, W, P]);
      return H;
    }
    var x = l ? i.a.memo(m) : m;
    if (x.WrappedComponent = t, x.displayName = m.displayName = o, P) {
      var A = i.a.forwardRef(function (e, t) {
        return i.a.createElement(x, g({}, e, {
          reactReduxForwardedRef: t
        }));
      });
      return A.displayName = o, A.WrappedComponent = t, b()(A, t);
    }
    return b()(x, t);
  };
}
function P(e, t) {
  return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e !== e && t !== t;
}
function j(e, t) {
  if (P(e, t)) return !0;
  if ("object" !== typeof e || null === e || "object" !== typeof t || null === t) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (var i = 0; i < n.length; i++) if (!Object.prototype.hasOwnProperty.call(t, n[i]) || !P(e[n[i]], t[n[i]])) return !1;
  return !0;
}
function M(e, t) {
  var n = {},
    r = function (r) {
      var i = e[r];
      "function" === typeof i && (n[r] = function () {
        return t(i.apply(void 0, arguments));
      });
    };
  for (var i in e) r(i);
  return n;
}
function R(e) {
  return function (t, n) {
    var r = e(t, n);
    function i() {
      return r;
    }
    return i.dependsOnOwnProps = !1, i;
  };
}
function N(e) {
  return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length;
}
function D(e, t) {
  return function (t, n) {
    n.displayName;
    var r = function (e, t) {
      return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e);
    };
    return r.dependsOnOwnProps = !0, r.mapToProps = function (t, n) {
      r.mapToProps = e, r.dependsOnOwnProps = N(e);
      var i = r(t, n);
      return "function" === typeof i && (r.mapToProps = i, r.dependsOnOwnProps = N(i), i = r(t, n)), i;
    }, r;
  };
}
function I(e) {
  return "function" === typeof e ? D(e, "mapDispatchToProps") : void 0;
}
function $(e) {
  return e ? void 0 : R(function (e) {
    return {
      dispatch: e
    };
  });
}
function F(e) {
  return e && "object" === typeof e ? R(function (t) {
    return M(e, t);
  }) : void 0;
}
var B = [I, $, F];
function V(e) {
  return "function" === typeof e ? D(e, "mapStateToProps") : void 0;
}
function W(e) {
  return e ? void 0 : R(function () {
    return {};
  });
}
var H = [V, W];
function U(e, t, n) {
  return g({}, n, e, t);
}
function z(e) {
  return function (t, n) {
    n.displayName;
    var r,
      i = n.pure,
      o = n.areMergedPropsEqual,
      a = !1;
    return function (t, n, s) {
      var l = e(t, n, s);
      return a ? i && o(l, r) || (r = l) : (a = !0, r = l), r;
    };
  };
}
function G(e) {
  return "function" === typeof e ? z(e) : void 0;
}
function q(e) {
  return e ? void 0 : function () {
    return U;
  };
}
var K = [G, q];
var Y = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function X(e, t, n, r) {
  return function (i, o) {
    return n(e(i, o), t(r, o), o);
  };
}
function Q(e, t, n, r, i) {
  var o,
    a,
    s,
    l,
    c,
    u = i.areStatesEqual,
    h = i.areOwnPropsEqual,
    f = i.areStatePropsEqual,
    d = !1;
  function p(i, u) {
    return o = i, a = u, s = e(o, a), l = t(r, a), c = n(s, l, a), d = !0, c;
  }
  function m() {
    return s = e(o, a), t.dependsOnOwnProps && (l = t(r, a)), c = n(s, l, a), c;
  }
  function g() {
    return e.dependsOnOwnProps && (s = e(o, a)), t.dependsOnOwnProps && (l = t(r, a)), c = n(s, l, a), c;
  }
  function v() {
    var t = e(o, a),
      r = !f(t, s);
    return s = t, r && (c = n(s, l, a)), c;
  }
  function y(e, t) {
    var n = !h(t, a),
      r = !u(e, o, t, a);
    return o = e, a = t, n && r ? m() : n ? g() : r ? v() : c;
  }
  return function (e, t) {
    return d ? y(e, t) : p(e, t);
  };
}
function Z(e, t) {
  var n = t.initMapStateToProps,
    r = t.initMapDispatchToProps,
    i = t.initMergeProps,
    o = v(t, Y),
    a = n(e, o),
    s = r(e, o),
    l = i(e, o);
  var c = o.pure ? Q : X;
  return c(a, s, l, e, o);
}
var J = ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"];
function ee(e, t, n) {
  for (var r = t.length - 1; r >= 0; r--) {
    var i = t[r](e);
    if (i) return i;
  }
  return function (t, r) {
    throw new Error("Invalid value of type " + typeof e + " for " + n + " argument when connecting component " + r.wrappedComponentName + ".");
  };
}
function te(e, t) {
  return e === t;
}
function ne(e) {
  var t = void 0 === e ? {} : e,
    n = t.connectHOC,
    r = void 0 === n ? A : n,
    i = t.mapStateToPropsFactories,
    o = void 0 === i ? H : i,
    a = t.mapDispatchToPropsFactories,
    s = void 0 === a ? B : a,
    l = t.mergePropsFactories,
    c = void 0 === l ? K : l,
    u = t.selectorFactory,
    h = void 0 === u ? Z : u;
  return function (e, t, n, i) {
    void 0 === i && (i = {});
    var a = i,
      l = a.pure,
      u = void 0 === l || l,
      f = a.areStatesEqual,
      d = void 0 === f ? te : f,
      p = a.areOwnPropsEqual,
      m = void 0 === p ? j : p,
      y = a.areStatePropsEqual,
      b = void 0 === y ? j : y,
      w = a.areMergedPropsEqual,
      x = void 0 === w ? j : w,
      _ = v(a, J),
      E = ee(e, o, "mapStateToProps"),
      S = ee(t, s, "mapDispatchToProps"),
      k = ee(n, c, "mergeProps");
    return r(h, g({
      methodName: "connect",
      getDisplayName: function (e) {
        return "Connect(" + e + ")";
      },
      shouldHandleStateChanges: Boolean(e),
      initMapStateToProps: E,
      initMapDispatchToProps: S,
      initMergeProps: k,
      pure: u,
      areStatesEqual: d,
      areOwnPropsEqual: m,
      areStatePropsEqual: b,
      areMergedPropsEqual: x
    }, _));
  };
}
var re = ne();
var ie = require("./modules/69386934.js");
defineExport(legacyExports, "a", function () {
  return m;
}), defineExport(legacyExports, "b", function () {
  return o;
}), defineExport(legacyExports, "c", function () {
  return re;
}), l(ie["unstable_batchedUpdates"]);
