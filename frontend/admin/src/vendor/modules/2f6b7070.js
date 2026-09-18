let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return O;
});
var n = require("./reactRuntime.js"),
  r = require("./31377839.js"),
  o = require("./classNames.js"),
  a = interopDefault(o),
  l = require("./6f2f322b.js"),
  i = require("./48383455.js");
function u(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
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
function h(e) {
  "@babel/helpers - typeof";

  return h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, h(e);
}
function f(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function p(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function v(e, t, c) {
  return t && p(e.prototype, t), c && p(e, c), e;
}
function m(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && d(e, t);
}
function d(e, t) {
  return d = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, d(e, t);
}
function y(e) {
  var t = g();
  return function () {
    var c,
      n = M(e);
    if (t) {
      var r = M(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return b(this, c);
  };
}
function b(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? z(e) : t;
}
function z(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function g() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function M(e) {
  return M = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, M(e);
}
var C = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  H = r["oneOfType"]([r["object"], r["number"]]),
  O = function (e) {
    m(c, e);
    var t = y(c);
    function c() {
      var e;
      return f(this, c), e = t.apply(this, arguments), e.renderCol = function (t) {
        var c,
          r = t.getPrefixCls,
          o = z(e),
          i = o.props,
          f = i.prefixCls,
          p = i.span,
          v = i.order,
          m = i.offset,
          d = i.push,
          y = i.pull,
          b = i.className,
          g = i.children,
          M = C(i, ["prefixCls", "span", "order", "offset", "push", "pull", "className", "children"]),
          H = r("col", f),
          O = {};
        ["xs", "sm", "md", "lg", "xl", "xxl"].forEach(function (e) {
          var t,
            c = {},
            n = i[e];
          "number" === typeof n ? c.span = n : "object" === h(n) && (c = n || {}), delete M[e], O = s(s({}, O), (t = {}, u(t, "".concat(H, "-").concat(e, "-").concat(c.span), void 0 !== c.span), u(t, "".concat(H, "-").concat(e, "-order-").concat(c.order), c.order || 0 === c.order), u(t, "".concat(H, "-").concat(e, "-offset-").concat(c.offset), c.offset || 0 === c.offset), u(t, "".concat(H, "-").concat(e, "-push-").concat(c.push), c.push || 0 === c.push), u(t, "".concat(H, "-").concat(e, "-pull-").concat(c.pull), c.pull || 0 === c.pull), t));
        });
        var V = a()(H, (c = {}, u(c, "".concat(H, "-").concat(p), void 0 !== p), u(c, "".concat(H, "-order-").concat(v), v), u(c, "".concat(H, "-offset-").concat(m), m), u(c, "".concat(H, "-push-").concat(d), d), u(c, "".concat(H, "-pull-").concat(y), y), c), b, O);
        return n["createElement"](l["a"].Consumer, null, function (e) {
          var t = e.gutter,
            c = M.style;
          return t && (c = s(s(s({}, t[0] > 0 ? {
            paddingLeft: t[0] / 2,
            paddingRight: t[0] / 2
          } : {}), t[1] > 0 ? {
            paddingTop: t[1] / 2,
            paddingBottom: t[1] / 2
          } : {}), c)), n["createElement"]("div", s({}, M, {
            style: c,
            className: V
          }), g);
        });
      }, e;
    }
    return v(c, [{
      key: "render",
      value: function () {
        return n["createElement"](i["a"], null, this.renderCol);
      }
    }]), c;
  }(n["Component"]);
O.propTypes = {
  span: r["number"],
  order: r["number"],
  offset: r["number"],
  push: r["number"],
  pull: r["number"],
  className: r["string"],
  children: r["node"],
  xs: H,
  sm: H,
  md: H,
  lg: H,
  xl: H,
  xxl: H
};
