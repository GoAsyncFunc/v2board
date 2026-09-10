let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = h, legacyExports.getUrlQuery = void 0;
var r = require("./36596b53.js");
function o(e, t) {
  return s(e) || a(e, t) || p(e, t) || i();
}
function i() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function a(e, t) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) {
    var n = [],
      r = !0,
      o = !1,
      i = void 0;
    try {
      for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) if (n.push(a.value), t && n.length === t) break;
    } catch (e) {
      o = !0, i = e;
    } finally {
      try {
        r || null == s["return"] || s["return"]();
      } finally {
        if (o) throw i;
      }
    }
    return n;
  }
}
function s(e) {
  if (Array.isArray(e)) return e;
}
function c(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function u(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? c(Object(n), !0).forEach(function (t) {
      l(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function l(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function f(e) {
  if ("undefined" === typeof Symbol || null == e[Symbol.iterator]) {
    if (Array.isArray(e) || (e = p(e))) {
      var t = 0,
        n = function () {};
      return {
        s: n,
        n: function () {
          return t >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[t++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: n
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var r,
    o,
    i = !0,
    a = !1;
  return {
    s: function () {
      r = e[Symbol.iterator]();
    },
    n: function () {
      var e = r.next();
      return i = e.done, e;
    },
    e: function (e) {
      a = !0, o = e;
    },
    f: function () {
      try {
        i || null == r.return || r.return();
      } finally {
        if (a) throw o;
      }
    }
  };
}
function p(e, t) {
  if (e) {
    if ("string" === typeof e) return d(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0;
  }
}
function d(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function h(e, t) {
  var n,
    o = f(e);
  try {
    for (o.s(); !(n = o.n()).done;) {
      var i = n.value;
      if (i.routes) {
        var a = h(i.routes, t);
        if (a) return a;
      } else if ((0, r.matchPath)(t, i)) {
        var s = (0, r.matchPath)(t, i),
          c = s.params;
        return u({}, i, {
          params: c
        });
      }
    }
  } catch (e) {
    o.e(e);
  } finally {
    o.f();
  }
}
var m = function (e) {
  if ("string" === typeof e && e.indexOf("?") > -1) {
    var t = e.slice(1).split("&");
    if (Array.isArray(t) && t.length > 0) return t.reduce(function (e, t) {
      var n = t.split("="),
        r = o(n, 2),
        i = r[0],
        a = r[1];
      return u({}, e, l({}, i, a));
    }, {});
  }
  return {};
};
legacyExports.getUrlQuery = m;
