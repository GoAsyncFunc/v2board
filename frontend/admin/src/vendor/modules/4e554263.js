let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./362b6555.js"),
  o = require("./48346667.js"),
  a = require("./54535951.js"),
  l = interopDefault(a),
  i = require("./32664d37.js");
function u(e) {
  "@babel/helpers - typeof";

  return u = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, u(e);
}
function s() {
  return s = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, s.apply(this, arguments);
}
function h(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function f(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function p(e, t, c) {
  return t && f(e.prototype, t), c && f(e, c), e;
}
function v(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && m(e, t);
}
function m(e, t) {
  return m = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, m(e, t);
}
function d(e) {
  var t = z();
  return function () {
    var c,
      n = g(e);
    if (t) {
      var r = g(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return y(this, c);
  };
}
function y(e, t) {
  return !t || "object" !== u(t) && "function" !== typeof t ? b(e) : t;
}
function b(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function z() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
var M = function (e) {
  v(c, e);
  var t = d(c);
  function c() {
    return h(this, c), t.apply(this, arguments);
  }
  return p(c, [{
    key: "render",
    value: function () {
      return n["createElement"](i["a"], s({
        size: "small"
      }, this.props));
    }
  }]), c;
}(n["Component"]);
M.Option = i["a"].Option;
var C = require("../Icon.js"),
  H = require("./594d6e48.js"),
  O = require("./48383455.js");
function V(e) {
  "@babel/helpers - typeof";

  return V = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, V(e);
}
function w() {
  return w = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, w.apply(this, arguments);
}
function S(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function L(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function k(e, t, c) {
  return t && L(e.prototype, t), c && L(e, c), e;
}
function x(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && E(e, t);
}
function E(e, t) {
  return E = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, E(e, t);
}
function P(e) {
  var t = N();
  return function () {
    var c,
      n = R(e);
    if (t) {
      var r = R(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return T(this, c);
  };
}
function T(e, t) {
  return !t || "object" !== V(t) && "function" !== typeof t ? j(e) : t;
}
function j(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function N() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function R(e) {
  return R = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, R(e);
}
var _ = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  A = function (e) {
    x(c, e);
    var t = P(c);
    function c() {
      var e;
      return S(this, c), e = t.apply(this, arguments), e.getIconsProps = function (e) {
        var t = n["createElement"]("a", {
            className: "".concat(e, "-item-link")
          }, n["createElement"](C["a"], {
            type: "left"
          })),
          c = n["createElement"]("a", {
            className: "".concat(e, "-item-link")
          }, n["createElement"](C["a"], {
            type: "right"
          })),
          r = n["createElement"]("a", {
            className: "".concat(e, "-item-link")
          }, n["createElement"]("div", {
            className: "".concat(e, "-item-container")
          }, n["createElement"](C["a"], {
            className: "".concat(e, "-item-link-icon"),
            type: "double-left"
          }), n["createElement"]("span", {
            className: "".concat(e, "-item-ellipsis")
          }, "\u2022\u2022\u2022"))),
          o = n["createElement"]("a", {
            className: "".concat(e, "-item-link")
          }, n["createElement"]("div", {
            className: "".concat(e, "-item-container")
          }, n["createElement"](C["a"], {
            className: "".concat(e, "-item-link-icon"),
            type: "double-right"
          }), n["createElement"]("span", {
            className: "".concat(e, "-item-ellipsis")
          }, "\u2022\u2022\u2022")));
        return {
          prevIcon: t,
          nextIcon: c,
          jumpPrevIcon: r,
          jumpNextIcon: o
        };
      }, e.renderPagination = function (t) {
        var c = e.props,
          o = c.prefixCls,
          a = c.selectPrefixCls,
          u = c.className,
          s = c.size,
          h = c.locale,
          f = _(c, ["prefixCls", "selectPrefixCls", "className", "size", "locale"]),
          p = w(w({}, t), h),
          v = "small" === s;
        return n["createElement"](O["a"], null, function (t) {
          var c = t.getPrefixCls,
            s = c("pagination", o),
            h = c("select", a);
          return n["createElement"](r["a"], w({}, f, {
            prefixCls: s,
            selectPrefixCls: h
          }, e.getIconsProps(s), {
            className: l()(u, {
              mini: v
            }),
            selectComponentClass: v ? M : i["a"],
            locale: p
          }));
        });
      }, e;
    }
    return k(c, [{
      key: "render",
      value: function () {
        return n["createElement"](H["a"], {
          componentName: "Pagination",
          defaultLocale: o["a"]
        }, this.renderPagination);
      }
    }]), c;
  }(n["Component"]);
legacyExports["a"] = A;
