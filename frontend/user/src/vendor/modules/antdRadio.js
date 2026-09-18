let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./RcCheckbox.js"),
  l = require("./classNames.js"),
  a = interopDefault(l),
  i = require("./shallowEqualWithComparator.js"),
  u = interopDefault(i),
  s = require("./48383455.js");
function h(e) {
  "@babel/helpers - typeof";

  return h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, h(e);
}
function f(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function v() {
  return v = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, v.apply(this, arguments);
}
function p(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function m(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function d(e, t, c) {
  return t && m(e.prototype, t), c && m(e, c), e;
}
function z(e, t) {
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
  var t = H();
  return function () {
    var c,
      n = C(e);
    if (t) {
      var r = C(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return M(this, c);
  };
}
function M(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? g(e) : t;
}
function g(e) {
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
function C(e) {
  return C = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, C(e);
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
  O = function (e) {
    z(c, e);
    var t = b(c);
    function c() {
      var e;
      return p(this, c), e = t.apply(this, arguments), e.saveCheckbox = function (t) {
        e.rcCheckbox = t;
      }, e.onChange = function (t) {
        e.props.onChange && e.props.onChange(t), e.context.radioGroup && e.context.radioGroup.onChange && e.context.radioGroup.onChange(t);
      }, e.renderRadio = function (t) {
        var c,
          r = t.getPrefixCls,
          l = g(e),
          i = l.props,
          u = l.context,
          s = i.prefixCls,
          h = i.className,
          p = i.children,
          m = i.style,
          d = V(i, ["prefixCls", "className", "children", "style"]),
          z = u.radioGroup,
          y = r("radio", s),
          b = v({}, d);
        z && (b.name = z.name, b.onChange = e.onChange, b.checked = i.value === z.value, b.disabled = i.disabled || z.disabled);
        var M = a()(h, (c = {}, f(c, "".concat(y, "-wrapper"), !0), f(c, "".concat(y, "-wrapper-checked"), b.checked), f(c, "".concat(y, "-wrapper-disabled"), b.disabled), c));
        return n["createElement"]("label", {
          className: M,
          style: m,
          onMouseEnter: i.onMouseEnter,
          onMouseLeave: i.onMouseLeave
        }, n["createElement"](o["a"], v({}, b, {
          prefixCls: y,
          ref: e.saveCheckbox
        })), void 0 !== p ? n["createElement"]("span", null, p) : null);
      }, e;
    }
    return d(c, [{
      key: "shouldComponentUpdate",
      value: function (e, t, c) {
        return !u()(this.props, e) || !u()(this.state, t) || !u()(this.context.radioGroup, c.radioGroup);
      }
    }, {
      key: "focus",
      value: function () {
        this.rcCheckbox.focus();
      }
    }, {
      key: "blur",
      value: function () {
        this.rcCheckbox.blur();
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](s["a"], null, this.renderRadio);
      }
    }]), c;
  }(n["Component"]);
O.defaultProps = {
  type: "radio"
}, O.contextTypes = {
  radioGroup: r["any"]
};
var w = require("./reactLifecyclesCompat.js");
function L(e) {
  "@babel/helpers - typeof";

  return L = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, L(e);
}
function S(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function k(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function E(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function x(e, t, c) {
  return t && E(e.prototype, t), c && E(e, c), e;
}
function P(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && j(e, t);
}
function j(e, t) {
  return j = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, j(e, t);
}
function T(e) {
  var t = R();
  return function () {
    var c,
      n = _(e);
    if (t) {
      var r = _(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return F(this, c);
  };
}
function F(e, t) {
  return !t || "object" !== L(t) && "function" !== typeof t ? A(e) : t;
}
function A(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function R() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function _(e) {
  return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, _(e);
}
function N(e) {
  var t = null,
    c = !1;
  return n["Children"].forEach(e, function (e) {
    e && e.props && e.props.checked && (t = e.props.value, c = !0);
  }), c ? {
    value: t
  } : void 0;
}
var D = function (e) {
  P(c, e);
  var t = T(c);
  function c(e) {
    var r, o;
    if (k(this, c), r = t.call(this, e), r.onRadioChange = function (e) {
      var t = r.state.value,
        c = e.target.value;
      "value" in r.props || r.setState({
        value: c
      });
      var n = r.props.onChange;
      n && c !== t && n(e);
    }, r.renderGroup = function (e) {
      var t = e.getPrefixCls,
        c = A(r),
        o = c.props,
        l = o.prefixCls,
        i = o.className,
        u = void 0 === i ? "" : i,
        s = o.options,
        h = o.buttonStyle,
        f = t("radio", l),
        v = "".concat(f, "-group"),
        p = a()(v, "".concat(v, "-").concat(h), S({}, "".concat(v, "-").concat(o.size), o.size), u),
        m = o.children;
      return s && s.length > 0 && (m = s.map(function (e) {
        return "string" === typeof e ? n["createElement"](O, {
          key: e,
          prefixCls: f,
          disabled: r.props.disabled,
          value: e,
          checked: r.state.value === e
        }, e) : n["createElement"](O, {
          key: "radio-group-value-options-".concat(e.value),
          prefixCls: f,
          disabled: e.disabled || r.props.disabled,
          value: e.value,
          checked: r.state.value === e.value
        }, e.label);
      })), n["createElement"]("div", {
        className: p,
        style: o.style,
        onMouseEnter: o.onMouseEnter,
        onMouseLeave: o.onMouseLeave,
        id: o.id
      }, m);
    }, "value" in e) o = e.value;else if ("defaultValue" in e) o = e.defaultValue;else {
      var l = N(e.children);
      o = l && l.value;
    }
    return r.state = {
      value: o
    }, r;
  }
  return x(c, [{
    key: "getChildContext",
    value: function () {
      return {
        radioGroup: {
          onChange: this.onRadioChange,
          value: this.state.value,
          disabled: this.props.disabled,
          name: this.props.name
        }
      };
    }
  }, {
    key: "shouldComponentUpdate",
    value: function (e, t) {
      return !u()(this.props, e) || !u()(this.state, t);
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](s["a"], null, this.renderGroup);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e) {
      if ("value" in e) return {
        value: e.value
      };
      var t = N(e.children);
      return t ? {
        value: t.value
      } : null;
    }
  }]), c;
}(n["Component"]);
D.defaultProps = {
  buttonStyle: "outline"
}, D.childContextTypes = {
  radioGroup: r["any"]
}, Object(w["polyfill"])(D);
var I = D;
function B(e) {
  "@babel/helpers - typeof";

  return B = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, B(e);
}
function q() {
  return q = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, q.apply(this, arguments);
}
function W(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function K(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function U(e, t, c) {
  return t && K(e.prototype, t), c && K(e, c), e;
}
function G(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Q(e, t);
}
function Q(e, t) {
  return Q = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Q(e, t);
}
function Y(e) {
  var t = J();
  return function () {
    var c,
      n = $(e);
    if (t) {
      var r = $(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return X(this, c);
  };
}
function X(e, t) {
  return !t || "object" !== B(t) && "function" !== typeof t ? Z(e) : t;
}
function Z(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function J() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function $(e) {
  return $ = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, $(e);
}
var ee = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  te = function (e) {
    G(c, e);
    var t = Y(c);
    function c() {
      var e;
      return W(this, c), e = t.apply(this, arguments), e.renderRadioButton = function (t) {
        var c = t.getPrefixCls,
          r = e.props,
          o = r.prefixCls,
          l = ee(r, ["prefixCls"]),
          a = c("radio-button", o);
        return e.context.radioGroup && (l.checked = e.props.value === e.context.radioGroup.value, l.disabled = e.props.disabled || e.context.radioGroup.disabled), n["createElement"](O, q({
          prefixCls: a
        }, l));
      }, e;
    }
    return U(c, [{
      key: "render",
      value: function () {
        return n["createElement"](s["a"], null, this.renderRadioButton);
      }
    }]), c;
  }(n["Component"]);
te.contextTypes = {
  radioGroup: r["any"]
}, O.Button = te, O.Group = I;
legacyExports["a"] = O;
