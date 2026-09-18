let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./31377839.js"),
  o = require("./4d466a32.js"),
  a = require("./4247522b.js"),
  l = require("./classNames.js"),
  i = interopDefault(l),
  u = require("./reactLifecyclesCompat.js"),
  s = require("./48383455.js");
function h(e) {
  "@babel/helpers - typeof";

  return h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, h(e);
}
function f() {
  return f = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, f.apply(this, arguments);
}
function p(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function v(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function m(e, t, c) {
  return t && v(e.prototype, t), c && v(e, c), e;
}
function d(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && y(e, t);
}
function y(e, t) {
  return y = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, y(e, t);
}
function b(e) {
  var t = M();
  return function () {
    var c,
      n = C(e);
    if (t) {
      var r = C(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return z(this, c);
  };
}
function z(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? g(e) : t;
}
function g(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function M() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function C(e) {
  return C = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, C(e);
}
function H(e) {
  return e ? e.toString().split("").reverse().map(function (e) {
    var t = Number(e);
    return isNaN(t) ? e : t;
  }) : [];
}
function O(e, t) {
  for (var c = [], r = 0; r < 30; r++) c.push(n["createElement"]("p", {
    key: r.toString(),
    className: i()(t, {
      current: e === r
    })
  }, r % 10));
  return c;
}
var V = function (e) {
  d(c, e);
  var t = b(c);
  function c(e) {
    var r;
    return p(this, c), r = t.call(this, e), r.onAnimated = function () {
      var e = r.props.onAnimated;
      e && e();
    }, r.renderScrollNumber = function (e) {
      var t = e.getPrefixCls,
        c = r.props,
        o = c.prefixCls,
        l = c.className,
        u = c.style,
        s = c.title,
        h = c.component,
        p = void 0 === h ? "sup" : h,
        v = c.displayComponent,
        m = Object(a["a"])(r.props, ["count", "onAnimated", "component", "prefixCls", "displayComponent"]),
        d = t("scroll-number", o),
        y = f(f({}, m), {
          className: i()(d, l),
          title: s
        });
      return u && u.borderColor && (y.style = f(f({}, u), {
        boxShadow: "0 0 0 1px ".concat(u.borderColor, " inset")
      })), v ? n["cloneElement"](v, {
        className: i()("".concat(d, "-custom-component"), v.props && v.props.className)
      }) : n["createElement"](p, y, r.renderNumberElement(d));
    }, r.state = {
      animateStarted: !0,
      count: e.count
    }, r;
  }
  return m(c, [{
    key: "componentDidUpdate",
    value: function (e, t) {
      var c = this;
      this.lastCount = t.count;
      var n = this.state.animateStarted;
      n && (this.clearTimeout(), this.timeout = setTimeout(function () {
        c.setState(function (e, t) {
          return {
            animateStarted: !1,
            count: t.count
          };
        }, c.onAnimated);
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.clearTimeout();
    }
  }, {
    key: "getPositionByNum",
    value: function (e, t) {
      var c = this.state.count,
        n = Math.abs(Number(c)),
        r = Math.abs(Number(this.lastCount)),
        o = Math.abs(H(this.state.count)[t]),
        a = Math.abs(H(this.lastCount)[t]);
      return this.state.animateStarted ? 10 + e : n > r ? o >= a ? 10 + e : 20 + e : o <= a ? 10 + e : e;
    }
  }, {
    key: "renderCurrentNumber",
    value: function (e, t, c) {
      if ("number" === typeof t) {
        var r = this.getPositionByNum(t, c),
          o = this.state.animateStarted || void 0 === H(this.lastCount)[c];
        return n["createElement"]("span", {
          className: "".concat(e, "-only"),
          style: {
            transition: o ? "none" : void 0,
            msTransform: "translateY(".concat(100 * -r, "%)"),
            WebkitTransform: "translateY(".concat(100 * -r, "%)"),
            transform: "translateY(".concat(100 * -r, "%)")
          },
          key: c
        }, O(r, "".concat(e, "-only-unit")));
      }
      return n["createElement"]("span", {
        key: "symbol",
        className: "".concat(e, "-symbol")
      }, t);
    }
  }, {
    key: "renderNumberElement",
    value: function (e) {
      var t = this,
        c = this.state.count;
      return c && Number(c) % 1 === 0 ? H(c).map(function (c, n) {
        return t.renderCurrentNumber(e, c, n);
      }).reverse() : c;
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](s["a"], null, this.renderScrollNumber);
    }
  }, {
    key: "clearTimeout",
    value: function (e) {
      function t() {
        return e.apply(this, arguments);
      }
      return t.toString = function () {
        return e.toString();
      }, t;
    }(function () {
      this.timeout && (clearTimeout(this.timeout), this.timeout = void 0);
    })
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e, t) {
      return "count" in e ? t.count === e.count ? null : {
        animateStarted: !0
      } : null;
    }
  }]), c;
}(n["Component"]);
V.defaultProps = {
  count: null,
  onAnimated: function () {}
}, Object(u["polyfill"])(V);
var w = V,
  S = require("./30395766.js");
function L(e) {
  "@babel/helpers - typeof";

  return L = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, L(e);
}
function k() {
  return k = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, k.apply(this, arguments);
}
function x(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function E(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function P(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function T(e, t, c) {
  return t && P(e.prototype, t), c && P(e, c), e;
}
function j(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && N(e, t);
}
function N(e, t) {
  return N = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, N(e, t);
}
function R(e) {
  var t = F();
  return function () {
    var c,
      n = I(e);
    if (t) {
      var r = I(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return _(this, c);
  };
}
function _(e, t) {
  return !t || "object" !== L(t) && "function" !== typeof t ? A(e) : t;
}
function A(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function F() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function I(e) {
  return I = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, I(e);
}
defineExport(legacyExports, "a", function () {
  return U;
});
var D = function (e, t) {
  var c = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
  }
  return c;
};
function K(e) {
  return -1 !== S["a"].indexOf(e);
}
var U = function (e) {
  j(c, e);
  var t = R(c);
  function c() {
    var e;
    return E(this, c), e = t.apply(this, arguments), e.renderBadge = function (t) {
      var c,
        r = t.getPrefixCls,
        l = e.props,
        u = l.prefixCls,
        s = l.scrollNumberPrefixCls,
        h = l.children,
        f = l.status,
        p = l.text,
        v = l.color,
        m = D(l, ["prefixCls", "scrollNumberPrefixCls", "children", "status", "text", "color"]),
        d = ["count", "showZero", "overflowCount", "className", "style", "dot", "offset", "title"],
        y = r("badge", u),
        b = r("scroll-number", s),
        z = e.renderBadgeNumber(y, b),
        g = e.renderStatusText(y),
        M = i()((c = {}, x(c, "".concat(y, "-status-dot"), e.hasStatus()), x(c, "".concat(y, "-status-").concat(f), !!f), x(c, "".concat(y, "-status-").concat(v), K(v)), c)),
        C = {};
      if (v && !K(v) && (C.background = v), !h && e.hasStatus()) {
        var H = e.getStyleWithOffset(),
          O = H && H.color;
        return n["createElement"]("span", k({}, Object(a["a"])(m, d), {
          className: e.getBadgeClassName(y),
          style: H
        }), n["createElement"]("span", {
          className: M,
          style: C
        }), n["createElement"]("span", {
          style: {
            color: O
          },
          className: "".concat(y, "-status-text")
        }, p));
      }
      return n["createElement"]("span", k({}, Object(a["a"])(m, d), {
        className: e.getBadgeClassName(y)
      }), h, n["createElement"](o["a"], {
        component: "",
        showProp: "data-show",
        transitionName: h ? "".concat(y, "-zoom") : "",
        transitionAppear: !0
      }, z), g);
    }, e;
  }
  return T(c, [{
    key: "getNumberedDispayCount",
    value: function () {
      var e = this.props,
        t = e.count,
        c = e.overflowCount,
        n = t > c ? "".concat(c, "+") : t;
      return n;
    }
  }, {
    key: "getDispayCount",
    value: function () {
      var e = this.isDot();
      return e ? "" : this.getNumberedDispayCount();
    }
  }, {
    key: "getScrollNumberTitle",
    value: function () {
      var e = this.props,
        t = e.title,
        c = e.count;
      return t || ("string" === typeof c || "number" === typeof c ? c : void 0);
    }
  }, {
    key: "getStyleWithOffset",
    value: function () {
      var e = this.props,
        t = e.offset,
        c = e.style;
      return t ? k({
        right: -parseInt(t[0], 10),
        marginTop: t[1]
      }, c) : c;
    }
  }, {
    key: "getBadgeClassName",
    value: function (e) {
      var t,
        c = this.props,
        n = c.className,
        r = c.children;
      return i()(n, e, (t = {}, x(t, "".concat(e, "-status"), this.hasStatus()), x(t, "".concat(e, "-not-a-wrapper"), !r), t));
    }
  }, {
    key: "hasStatus",
    value: function () {
      var e = this.props,
        t = e.status,
        c = e.color;
      return !!t || !!c;
    }
  }, {
    key: "isZero",
    value: function () {
      var e = this.getNumberedDispayCount();
      return "0" === e || 0 === e;
    }
  }, {
    key: "isDot",
    value: function () {
      var e = this.props.dot,
        t = this.isZero();
      return e && !t || this.hasStatus();
    }
  }, {
    key: "isHidden",
    value: function () {
      var e = this.props.showZero,
        t = this.getDispayCount(),
        c = this.isZero(),
        n = this.isDot(),
        r = null === t || void 0 === t || "" === t;
      return (r || c && !e) && !n;
    }
  }, {
    key: "renderStatusText",
    value: function (e) {
      var t = this.props.text,
        c = this.isHidden();
      return c || !t ? null : n["createElement"]("span", {
        className: "".concat(e, "-status-text")
      }, t);
    }
  }, {
    key: "renderDispayComponent",
    value: function () {
      var e = this.props.count,
        t = e;
      if (t && "object" === L(t)) return n["cloneElement"](t, {
        style: k(k({}, this.getStyleWithOffset()), t.props && t.props.style)
      });
    }
  }, {
    key: "renderBadgeNumber",
    value: function (e, t) {
      var c,
        r = this.props,
        o = r.status,
        a = r.count,
        l = r.color,
        u = this.getDispayCount(),
        s = this.isDot(),
        h = this.isHidden(),
        f = i()((c = {}, x(c, "".concat(e, "-dot"), s), x(c, "".concat(e, "-count"), !s), x(c, "".concat(e, "-multiple-words"), !s && a && a.toString && a.toString().length > 1), x(c, "".concat(e, "-status-").concat(o), !!o), x(c, "".concat(e, "-status-").concat(l), K(l)), c)),
        p = this.getStyleWithOffset();
      return l && !K(l) && (p = p || {}, p.background = l), h ? null : n["createElement"](w, {
        prefixCls: t,
        "data-show": !h,
        className: f,
        count: u,
        displayComponent: this.renderDispayComponent(),
        title: this.getScrollNumberTitle(),
        style: p,
        key: "scrollNumber"
      });
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](s["a"], null, this.renderBadge);
    }
  }]), c;
}(n["Component"]);
U.defaultProps = {
  count: null,
  showZero: !1,
  dot: !1,
  overflowCount: 99
}, U.propTypes = {
  count: r["node"],
  showZero: r["bool"],
  dot: r["bool"],
  overflowCount: r["number"]
};
