let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./classNames.js"),
  a = interopDefault(o),
  l = require("./4247522b.js"),
  i = require("./73456643.js"),
  u = interopDefault(i),
  s = require("./48383455.js"),
  h = require("./43575167.js");
function f(e) {
  "@babel/helpers - typeof";

  return f = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, f(e);
}
function p() {
  return p = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, p.apply(this, arguments);
}
function v(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function m(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function d(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function y(e, t, c) {
  return t && d(e.prototype, t), c && d(e, c), e;
}
function b(e, t) {
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
function g(e) {
  var t = H();
  return function () {
    var c,
      n = O(e);
    if (t) {
      var r = O(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return M(this, c);
  };
}
function M(e, t) {
  return !t || "object" !== f(t) && "function" !== typeof t ? C(e) : t;
}
function C(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function H() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function O(e) {
  return O = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, O(e);
}
var V = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  w = Object(h["a"])("small", "default", "large"),
  S = null;
function L(e, t) {
  var c = t.indicator,
    r = "".concat(e, "-dot");
  return null === c ? null : n["isValidElement"](c) ? n["cloneElement"](c, {
    className: a()(c.props.className, r)
  }) : n["isValidElement"](S) ? n["cloneElement"](S, {
    className: a()(S.props.className, r)
  }) : n["createElement"]("span", {
    className: a()(r, "".concat(e, "-dot-spin"))
  }, n["createElement"]("i", {
    className: "".concat(e, "-dot-item")
  }), n["createElement"]("i", {
    className: "".concat(e, "-dot-item")
  }), n["createElement"]("i", {
    className: "".concat(e, "-dot-item")
  }), n["createElement"]("i", {
    className: "".concat(e, "-dot-item")
  }));
}
function k(e, t) {
  return !!e && !!t && !isNaN(Number(t));
}
var x = function (e) {
  b(c, e);
  var t = g(c);
  function c(e) {
    var r;
    m(this, c), r = t.call(this, e), r.debouncifyUpdateSpinning = function (e) {
      var t = e || r.props,
        c = t.delay;
      c && (r.cancelExistingSpin(), r.updateSpinning = u()(r.originalUpdateSpinning, c));
    }, r.updateSpinning = function () {
      var e = r.props.spinning,
        t = r.state.spinning;
      t !== e && r.setState({
        spinning: e
      });
    }, r.renderSpin = function (e) {
      var t,
        c = e.getPrefixCls,
        o = r.props,
        i = o.prefixCls,
        u = o.className,
        s = o.size,
        h = o.tip,
        f = o.wrapperClassName,
        m = o.style,
        d = V(o, ["prefixCls", "className", "size", "tip", "wrapperClassName", "style"]),
        y = r.state.spinning,
        b = c("spin", i),
        z = a()(b, (t = {}, v(t, "".concat(b, "-sm"), "small" === s), v(t, "".concat(b, "-lg"), "large" === s), v(t, "".concat(b, "-spinning"), y), v(t, "".concat(b, "-show-text"), !!h), t), u),
        g = Object(l["a"])(d, ["spinning", "delay", "indicator"]),
        M = n["createElement"]("div", p({}, g, {
          style: m,
          className: z
        }), L(b, r.props), h ? n["createElement"]("div", {
          className: "".concat(b, "-text")
        }, h) : null);
      if (r.isNestedPattern()) {
        var C = a()("".concat(b, "-container"), v({}, "".concat(b, "-blur"), y));
        return n["createElement"]("div", p({}, g, {
          className: a()("".concat(b, "-nested-loading"), f)
        }), y && n["createElement"]("div", {
          key: "loading"
        }, M), n["createElement"]("div", {
          className: C,
          key: "container"
        }, r.props.children));
      }
      return M;
    };
    var o = e.spinning,
      i = e.delay,
      s = k(o, i);
    return r.state = {
      spinning: o && !s
    }, r.originalUpdateSpinning = r.updateSpinning, r.debouncifyUpdateSpinning(e), r;
  }
  return y(c, [{
    key: "componentDidMount",
    value: function () {
      this.updateSpinning();
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      this.debouncifyUpdateSpinning(), this.updateSpinning();
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.cancelExistingSpin();
    }
  }, {
    key: "cancelExistingSpin",
    value: function () {
      var e = this.updateSpinning;
      e && e.cancel && e.cancel();
    }
  }, {
    key: "isNestedPattern",
    value: function () {
      return !(!this.props || !this.props.children);
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](s["a"], null, this.renderSpin);
    }
  }], [{
    key: "setDefaultIndicator",
    value: function (e) {
      S = e;
    }
  }]), c;
}(n["Component"]);
x.defaultProps = {
  spinning: !0,
  size: "default",
  wrapperClassName: ""
}, x.propTypes = {
  prefixCls: r["string"],
  className: r["string"],
  spinning: r["bool"],
  size: r["oneOf"](w),
  wrapperClassName: r["string"],
  indicator: r["element"]
}, legacyExports["a"] = x;
