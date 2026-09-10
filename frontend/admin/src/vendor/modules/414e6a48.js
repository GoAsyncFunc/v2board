let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./72655042.js");
function i(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? i(Object(n), !0).forEach(function (t) {
      Object(r["a"])(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function (t) {
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
  return p;
}), defineExport(legacyExports, "d", function () {
  return h;
});
var s = function () {
    return "function" === typeof Symbol && Symbol.observable || "@@observable";
  }(),
  l = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  c = {
    INIT: "@@redux/INIT" + l(),
    REPLACE: "@@redux/REPLACE" + l(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + l();
    }
  };
function u(e) {
  if ("object" !== typeof e || null === e) return !1;
  var t = e;
  while (null !== Object.getPrototypeOf(t)) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function h(e, t, n) {
  var r;
  if ("function" === typeof t && "function" === typeof n || "function" === typeof n && "function" === typeof arguments[3]) throw new Error(a(0));
  if ("function" === typeof t && "undefined" === typeof n && (n = t, t = void 0), "undefined" !== typeof n) {
    if ("function" !== typeof n) throw new Error(a(1));
    return n(h)(e, t);
  }
  if ("function" !== typeof e) throw new Error(a(2));
  var i = e,
    o = t,
    l = [],
    f = l,
    d = !1;
  function p() {
    f === l && (f = l.slice());
  }
  function m() {
    if (d) throw new Error(a(3));
    return o;
  }
  function g(e) {
    if ("function" !== typeof e) throw new Error(a(4));
    if (d) throw new Error(a(5));
    var t = !0;
    return p(), f.push(e), function () {
      if (t) {
        if (d) throw new Error(a(6));
        t = !1, p();
        var n = f.indexOf(e);
        f.splice(n, 1), l = null;
      }
    };
  }
  function v(e) {
    if (!u(e)) throw new Error(a(7));
    if ("undefined" === typeof e.type) throw new Error(a(8));
    if (d) throw new Error(a(9));
    try {
      d = !0, o = i(o, e);
    } finally {
      d = !1;
    }
    for (var t = l = f, n = 0; n < t.length; n++) {
      var r = t[n];
      r();
    }
    return e;
  }
  function y(e) {
    if ("function" !== typeof e) throw new Error(a(10));
    i = e, v({
      type: c.REPLACE
    });
  }
  function b() {
    var e,
      t = g;
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
  return v({
    type: c.INIT
  }), r = {
    dispatch: v,
    subscribe: g,
    getState: m,
    replaceReducer: y
  }, r[s] = b, r;
}
function f(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, {
        type: c.INIT
      });
    if ("undefined" === typeof r) throw new Error(a(12));
    if ("undefined" === typeof n(void 0, {
      type: c.PROBE_UNKNOWN_ACTION()
    })) throw new Error(a(13));
  });
}
function d(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    0, "function" === typeof e[i] && (n[i] = e[i]);
  }
  var o,
    s = Object.keys(n);
  try {
    f(n);
  } catch (e) {
    o = e;
  }
  return function (e, t) {
    if (void 0 === e && (e = {}), o) throw o;
    for (var r = !1, i = {}, l = 0; l < s.length; l++) {
      var c = s[l],
        u = n[c],
        h = e[c],
        f = u(h, t);
      if ("undefined" === typeof f) {
        t && t.type;
        throw new Error(a(14));
      }
      i[c] = f, r = r || f !== h;
    }
    return r = r || s.length !== Object.keys(e).length, r ? i : e;
  };
}
function p() {
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
        i = {
          getState: n.getState,
          dispatch: function () {
            return r.apply(void 0, arguments);
          }
        },
        s = t.map(function (e) {
          return e(i);
        });
      return r = p.apply(void 0, s)(n.dispatch), o(o({}, n), {}, {
        dispatch: r
      });
    };
  };
}
