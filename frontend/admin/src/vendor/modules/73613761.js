let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = p, legacyExports.getUrlQuery = void 0;
var r = require("./36596b53.js");
function i(e, t) {
  return s(e) || a(e, t) || f(e, t) || o();
}
function o() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function a(e, t) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) {
    var n = [],
      r = !0,
      i = !1,
      o = void 0;
    try {
      for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) if (n.push(a.value), t && n.length === t) break;
    } catch (e) {
      i = !0, o = e;
    } finally {
      try {
        r || null == s["return"] || s["return"]();
      } finally {
        if (i) throw o;
      }
    }
    return n;
  }
}
function s(e) {
  if (Array.isArray(e)) return e;
}
function l(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function c(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? l(Object(n), !0).forEach(function (t) {
      u(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function u(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function h(e) {
  if ("undefined" === typeof Symbol || null == e[Symbol.iterator]) {
    if (Array.isArray(e) || (e = f(e))) {
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
    i,
    o = !0,
    a = !1;
  return {
    s: function () {
      r = e[Symbol.iterator]();
    },
    n: function () {
      var e = r.next();
      return o = e.done, e;
    },
    e: function (e) {
      a = !0, i = e;
    },
    f: function () {
      try {
        o || null == r.return || r.return();
      } finally {
        if (a) throw i;
      }
    }
  };
}
function f(e, t) {
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
function p(e, t) {
  var n,
    i = h(e);
  try {
    for (i.s(); !(n = i.n()).done;) {
      var o = n.value;
      if (o.routes) {
        var a = p(o.routes, t);
        if (a) return a;
      } else if ((0, r.matchPath)(t, o)) {
        var s = (0, r.matchPath)(t, o),
          l = s.params;
        return c({}, o, {
          params: l
        });
      }
    }
  } catch (e) {
    i.e(e);
  } finally {
    i.f();
  }
}
var m = function (e) {
  if ("string" === typeof e && e.indexOf("?") > -1) {
    var t = e.slice(1).split("&");
    if (Array.isArray(t) && t.length > 0) return t.reduce(function (e, t) {
      var n = t.split("="),
        r = i(n, 2),
        o = r[0],
        a = r[1];
      return c({}, e, u({}, o, a));
    }, {});
  }
  return {};
};
legacyExports.getUrlQuery = m;
