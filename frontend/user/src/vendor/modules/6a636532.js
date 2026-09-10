let legacyModule = module,
  legacyExports = exports;
function r(e) {
  "@babel/helpers - typeof";

  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
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
      a(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function a(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function s(e, t) {
  return p(e) || f(e, t) || u(e, t) || c();
}
function c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function u(e, t) {
  if (e) {
    if ("string" === typeof e) return l(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0;
  }
}
function l(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function f(e, t) {
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
function p(e) {
  if (Array.isArray(e)) return e;
}
function d(e) {
  return "/" === e.slice(-1) || ".html" === e.slice(-5) ? e : "".concat(e, ".html");
}
function h(e) {
  if ("string" === typeof e) {
    var t = e.split("?"),
      n = s(t, 2),
      r = n[0],
      o = n[1];
    return "".concat(d(r)).concat(o ? "?" : "").concat(o || "");
  }
  return i({}, e, {
    pathname: d(e.pathname || "")
  });
}
function m(e) {
  return !!e && "object" === r(e) && "function" === typeof e.then;
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.normalizePath = h, legacyExports.isPromiseLike = m;
