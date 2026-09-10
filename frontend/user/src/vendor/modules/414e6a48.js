let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./72655042.js");
function o(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? o(Object(n), !0).forEach(function (t) {
      Object(r["a"])(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function a(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
defineExport(legacyExports, "a", function () {
  return m;
}), defineExport(legacyExports, "b", function () {
  return d;
}), defineExport(legacyExports, "c", function () {
  return h;
}), defineExport(legacyExports, "d", function () {
  return f;
});
var s = function () {
    return "function" === typeof Symbol && Symbol.observable || "@@observable";
  }(),
  c = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  u = {
    INIT: "@@redux/INIT" + c(),
    REPLACE: "@@redux/REPLACE" + c(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + c();
    }
  };
function l(e) {
  if ("object" !== typeof e || null === e) return !1;
  var t = e;
  while (null !== Object.getPrototypeOf(t)) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function f(e, t, n) {
  var r;
  if ("function" === typeof t && "function" === typeof n || "function" === typeof n && "function" === typeof arguments[3]) throw new Error(a(0));
  if ("function" === typeof t && "undefined" === typeof n && (n = t, t = void 0), "undefined" !== typeof n) {
    if ("function" !== typeof n) throw new Error(a(1));
    return n(f)(e, t);
  }
  if ("function" !== typeof e) throw new Error(a(2));
  var o = e,
    i = t,
    c = [],
    p = c,
    d = !1;
  function h() {
    p === c && (p = c.slice());
  }
  function m() {
    if (d) throw new Error(a(3));
    return i;
  }
  function v(e) {
    if ("function" !== typeof e) throw new Error(a(4));
    if (d) throw new Error(a(5));
    var t = !0;
    return h(), p.push(e), function () {
      if (t) {
        if (d) throw new Error(a(6));
        t = !1, h();
        var n = p.indexOf(e);
        p.splice(n, 1), c = null;
      }
    };
  }
  function y(e) {
    if (!l(e)) throw new Error(a(7));
    if ("undefined" === typeof e.type) throw new Error(a(8));
    if (d) throw new Error(a(9));
    try {
      d = !0, i = o(i, e);
    } finally {
      d = !1;
    }
    for (var t = c = p, n = 0; n < t.length; n++) {
      var r = t[n];
      r();
    }
    return e;
  }
  function g(e) {
    if ("function" !== typeof e) throw new Error(a(10));
    o = e, y({
      type: u.REPLACE
    });
  }
  function b() {
    var e,
      t = v;
    return e = {
      subscribe: function (e) {
        if ("object" !== typeof e || null === e) throw new Error(a(11));
        function n() {
          e.next && e.next(m());
        }
        n();
        var r = t(n);
        return {
          unsubscribe: r
        };
      }
    }, e[s] = function () {
      return this;
    }, e;
  }
  return y({
    type: u.INIT
  }), r = {
    dispatch: y,
    subscribe: v,
    getState: m,
    replaceReducer: g
  }, r[s] = b, r;
}
function p(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, {
        type: u.INIT
      });
    if ("undefined" === typeof r) throw new Error(a(12));
    if ("undefined" === typeof n(void 0, {
      type: u.PROBE_UNKNOWN_ACTION()
    })) throw new Error(a(13));
  });
}
function d(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var o = t[r];
    0, "function" === typeof e[o] && (n[o] = e[o]);
  }
  var i,
    s = Object.keys(n);
  try {
    p(n);
  } catch (e) {
    i = e;
  }
  return function (e, t) {
    if (void 0 === e && (e = {}), i) throw i;
    for (var r = !1, o = {}, c = 0; c < s.length; c++) {
      var u = s[c],
        l = n[u],
        f = e[u],
        p = l(f, t);
      if ("undefined" === typeof p) {
        t && t.type;
        throw new Error(a(14));
      }
      o[u] = p, r = r || p !== f;
    }
    return r = r || s.length !== Object.keys(e).length, r ? o : e;
  };
}
function h() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return 0 === t.length ? function (e) {
    return e;
  } : 1 === t.length ? t[0] : t.reduce(function (e, t) {
    return function () {
      return e(t.apply(void 0, arguments));
    };
  });
}
function m() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return function (e) {
    return function () {
      var n = e.apply(void 0, arguments),
        r = function () {
          throw new Error(a(15));
        },
        o = {
          getState: n.getState,
          dispatch: function () {
            return r.apply(void 0, arguments);
          }
        },
        s = t.map(function (e) {
          return e(o);
        });
      return r = h.apply(void 0, s)(n.dispatch), i(i({}, n), {}, {
        dispatch: r
      });
    };
  };
}
