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
function i(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && a(e, t);
}
function a(e, t) {
  return a = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, a(e, t);
}
function s(e) {
  return function () {
    var t,
      n = h(e);
    if (u()) {
      var r = h(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return l(this, t);
  };
}
function l(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? c(e) : t;
}
function c(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function u() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function h(e) {
  return h = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, h(e);
}
var f = this && this.__importStar || function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  return t["default"] = e, t;
};
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var d = f(require("./reactRuntime.js")),
  p = function (e) {
    o(n, e);
    var t = s(n);
    function n() {
      return i(this, n), t.apply(this, arguments);
    }
    return n;
  }(d.Component);
legacyExports.default = p, p.isTableColumnGroup = !0;
