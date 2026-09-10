let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./31377839.js"),
  o = require("./4d466a32.js"),
  l = require("./4247522b.js"),
  a = require("./54535951.js"),
  i = interopDefault(a),
  u = require("./56434c38.js"),
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
function v(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function p(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function m(e, t, c) {
  return t && p(e.prototype, t), c && p(e, c), e;
}
function d(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && z(e, t);
}
function z(e, t) {
  return z = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, z(e, t);
}
function y(e) {
  var t = g();
  return function () {
    var c,
      n = H(e);
    if (t) {
      var r = H(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return b(this, c);
  };
}
function b(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? M(e) : t;
}
function M(e) {
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
function H(e) {
  return H = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, H(e);
}
function C(e) {
  return e ? e.toString().split("").reverse().map(function (e) {
    var t = Number(e);
    return isNaN(t) ? e : t;
  }) : [];
}
function V(e, t) {
  for (var c = [], r = 0; r < 30; r++) c.push(n["createElement"]("p", {
    key: r.toString(),
    className: i()(t, {
      current: e === r
    })
  }, r % 10));
  return c;
}
var O = function (e) {
  d(c, e);
  var t = y(c);
  function c(e) {
    var r;
    return v(this, c), r = t.call(this, e), r.onAnimated = function () {
      var e = r.props.onAnimated;
      e && e();
    }, r.renderScrollNumber = function (e) {
      var t = e.getPrefixCls,
        c = r.props,
        o = c.prefixCls,
        a = c.className,
        u = c.style,
        s = c.title,
        h = c.component,
        v = void 0 === h ? "sup" : h,
        p = c.displayComponent,
        m = Object(l["a"])(r.props, ["count", "onAnimated", "component", "prefixCls", "displayComponent"]),
        d = t("scroll-number", o),
        z = f(f({}, m), {
          className: i()(d, a),
          title: s
        });
      return u && u.borderColor && (z.style = f(f({}, u), {
        boxShadow: "0 0 0 1px ".concat(u.borderColor, " inset")
      })), p ? n["cloneElement"](p, {
        className: i()("".concat(d, "-custom-component"), p.props && p.props.className)
      }) : n["createElement"](v, z, r.renderNumberElement(d));
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
        o = Math.abs(C(this.state.count)[t]),
        l = Math.abs(C(this.lastCount)[t]);
      return this.state.animateStarted ? 10 + e : n > r ? o >= l ? 10 + e : 20 + e : o <= l ? 10 + e : e;
    }
  }, {
    key: "renderCurrentNumber",
    value: function (e, t, c) {
      if ("number" === typeof t) {
        var r = this.getPositionByNum(t, c),
          o = this.state.animateStarted || void 0 === C(this.lastCount)[c];
        return n["createElement"]("span", {
          className: "".concat(e, "-only"),
          style: {
            transition: o ? "none" : void 0,
            msTransform: "translateY(".concat(100 * -r, "%)"),
            WebkitTransform: "translateY(".concat(100 * -r, "%)"),
            transform: "translateY(".concat(100 * -r, "%)")
          },
          key: c
        }, V(r, "".concat(e, "-only-unit")));
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
      return c && Number(c) % 1 === 0 ? C(c).map(function (c, n) {
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
O.defaultProps = {
  count: null,
  onAnimated: function () {}
}, Object(u["polyfill"])(O);
var w = O,
  L = require("./30395766.js");
function S(e) {
  "@babel/helpers - typeof";

  return S = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, S(e);
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
function E(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function x(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function P(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function j(e, t, c) {
  return t && P(e.prototype, t), c && P(e, c), e;
}
function T(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && F(e, t);
}
function F(e, t) {
  return F = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, F(e, t);
}
function A(e) {
  var t = N();
  return function () {
    var c,
      n = D(e);
    if (t) {
      var r = D(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return R(this, c);
  };
}
function R(e, t) {
  return !t || "object" !== S(t) && "function" !== typeof t ? _(e) : t;
}
function _(e) {
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
function D(e) {
  return D = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, D(e);
}
defineExport(legacyExports, "a", function () {
  return q;
});
var I = function (e, t) {
  var c = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
  }
  return c;
};
function B(e) {
  return -1 !== L["a"].indexOf(e);
}
var q = function (e) {
  T(c, e);
  var t = A(c);
  function c() {
    var e;
    return x(this, c), e = t.apply(this, arguments), e.renderBadge = function (t) {
      var c,
        r = t.getPrefixCls,
        a = e.props,
        u = a.prefixCls,
        s = a.scrollNumberPrefixCls,
        h = a.children,
        f = a.status,
        v = a.text,
        p = a.color,
        m = I(a, ["prefixCls", "scrollNumberPrefixCls", "children", "status", "text", "color"]),
        d = ["count", "showZero", "overflowCount", "className", "style", "dot", "offset", "title"],
        z = r("badge", u),
        y = r("scroll-number", s),
        b = e.renderBadgeNumber(z, y),
        M = e.renderStatusText(z),
        g = i()((c = {}, E(c, "".concat(z, "-status-dot"), e.hasStatus()), E(c, "".concat(z, "-status-").concat(f), !!f), E(c, "".concat(z, "-status-").concat(p), B(p)), c)),
        H = {};
      if (p && !B(p) && (H.background = p), !h && e.hasStatus()) {
        var C = e.getStyleWithOffset(),
          V = C && C.color;
        return n["createElement"]("span", k({}, Object(l["a"])(m, d), {
          className: e.getBadgeClassName(z),
          style: C
        }), n["createElement"]("span", {
          className: g,
          style: H
        }), n["createElement"]("span", {
          style: {
            color: V
          },
          className: "".concat(z, "-status-text")
        }, v));
      }
      return n["createElement"]("span", k({}, Object(l["a"])(m, d), {
        className: e.getBadgeClassName(z)
      }), h, n["createElement"](o["a"], {
        component: "",
        showProp: "data-show",
        transitionName: h ? "".concat(z, "-zoom") : "",
        transitionAppear: !0
      }, b), M);
    }, e;
  }
  return j(c, [{
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
      return i()(n, e, (t = {}, E(t, "".concat(e, "-status"), this.hasStatus()), E(t, "".concat(e, "-not-a-wrapper"), !r), t));
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
      if (t && "object" === S(t)) return n["cloneElement"](t, {
        style: k(k({}, this.getStyleWithOffset()), t.props && t.props.style)
      });
    }
  }, {
    key: "renderBadgeNumber",
    value: function (e, t) {
      var c,
        r = this.props,
        o = r.status,
        l = r.count,
        a = r.color,
        u = this.getDispayCount(),
        s = this.isDot(),
        h = this.isHidden(),
        f = i()((c = {}, E(c, "".concat(e, "-dot"), s), E(c, "".concat(e, "-count"), !s), E(c, "".concat(e, "-multiple-words"), !s && l && l.toString && l.toString().length > 1), E(c, "".concat(e, "-status-").concat(o), !!o), E(c, "".concat(e, "-status-").concat(a), B(a)), c)),
        v = this.getStyleWithOffset();
      return a && !B(a) && (v = v || {}, v.background = a), h ? null : n["createElement"](w, {
        prefixCls: t,
        "data-show": !h,
        className: f,
        count: u,
        displayComponent: this.renderDispayComponent(),
        title: this.getScrollNumberTitle(),
        style: v,
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
q.defaultProps = {
  count: null,
  showZero: !1,
  dot: !1,
  overflowCount: 99
}, q.propTypes = {
  count: r["node"],
  showZero: r["bool"],
  dot: r["bool"],
  overflowCount: r["number"]
};
