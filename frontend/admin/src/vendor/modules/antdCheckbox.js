let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./reactLifecyclesCompat.js"),
  a = require("./classNames.js"),
  l = interopDefault(a),
  i = require("./78315961.js"),
  u = require("./47797478.js"),
  s = interopDefault(u),
  h = require("./48383455.js"),
  f = require("./36436658.js");
function p(e) {
  "@babel/helpers - typeof";

  return p = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, p(e);
}
function v(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function m() {
  return m = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, m.apply(this, arguments);
}
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function y(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function b(e, t, c) {
  return t && y(e.prototype, t), c && y(e, c), e;
}
function z(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && g(e, t);
}
function g(e, t) {
  return g = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, g(e, t);
}
function M(e) {
  var t = O();
  return function () {
    var c,
      n = V(e);
    if (t) {
      var r = V(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return C(this, c);
  };
}
function C(e, t) {
  return !t || "object" !== p(t) && "function" !== typeof t ? H(e) : t;
}
function H(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function O() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function V(e) {
  return V = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, V(e);
}
var w = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  S = function (e) {
    z(c, e);
    var t = M(c);
    function c() {
      var e;
      return d(this, c), e = t.apply(this, arguments), e.saveCheckbox = function (t) {
        e.rcCheckbox = t;
      }, e.renderCheckbox = function (t) {
        var c,
          r = t.getPrefixCls,
          o = H(e),
          a = o.props,
          u = o.context,
          s = a.prefixCls,
          h = a.className,
          f = a.children,
          p = a.indeterminate,
          d = a.style,
          y = a.onMouseEnter,
          b = a.onMouseLeave,
          z = w(a, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave"]),
          g = u.checkboxGroup,
          M = r("checkbox", s),
          C = m({}, z);
        g && (C.onChange = function () {
          z.onChange && z.onChange.apply(z, arguments), g.toggleOption({
            label: f,
            value: a.value
          });
        }, C.name = g.name, C.checked = -1 !== g.value.indexOf(a.value), C.disabled = a.disabled || g.disabled);
        var O = l()(h, (c = {}, v(c, "".concat(M, "-wrapper"), !0), v(c, "".concat(M, "-wrapper-checked"), C.checked), v(c, "".concat(M, "-wrapper-disabled"), C.disabled), c)),
          V = l()(v({}, "".concat(M, "-indeterminate"), p));
        return n["createElement"]("label", {
          className: O,
          style: d,
          onMouseEnter: y,
          onMouseLeave: b
        }, n["createElement"](i["a"], m({}, C, {
          prefixCls: M,
          className: V,
          ref: e.saveCheckbox
        })), void 0 !== f && n["createElement"]("span", null, f));
      }, e;
    }
    return b(c, [{
      key: "componentDidMount",
      value: function () {
        var e = this.props.value,
          t = this.context || {},
          c = t.checkboxGroup,
          n = void 0 === c ? {} : c;
        n.registerValue && n.registerValue(e), Object(f["a"])("checked" in this.props || (this.context || {}).checkboxGroup || !("value" in this.props), "Checkbox", "`value` is not validate prop, do you mean `checked`?");
      }
    }, {
      key: "shouldComponentUpdate",
      value: function (e, t, c) {
        return !s()(this.props, e) || !s()(this.state, t) || !s()(this.context.checkboxGroup, c.checkboxGroup);
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = e.value,
          c = this.props.value,
          n = this.context || {},
          r = n.checkboxGroup,
          o = void 0 === r ? {} : r;
        c !== t && o.registerValue && o.cancelValue && (o.cancelValue(t), o.registerValue(c));
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props.value,
          t = this.context || {},
          c = t.checkboxGroup,
          n = void 0 === c ? {} : c;
        n.cancelValue && n.cancelValue(e);
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
        return n["createElement"](h["a"], null, this.renderCheckbox);
      }
    }]), c;
  }(n["Component"]);
S.__ANT_CHECKBOX = !0, S.defaultProps = {
  indeterminate: !1
}, S.contextTypes = {
  checkboxGroup: r["any"]
}, Object(o["polyfill"])(S);
var L = S,
  k = require("./4247522b.js");
function x(e) {
  "@babel/helpers - typeof";

  return x = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, x(e);
}
function E() {
  return E = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, E.apply(this, arguments);
}
function P(e) {
  return R(e) || N(e) || j(e) || T();
}
function T() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function j(e, t) {
  if (e) {
    if ("string" === typeof e) return _(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _(e, t) : void 0;
  }
}
function N(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function R(e) {
  if (Array.isArray(e)) return _(e);
}
function _(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
function A(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function F(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function I(e, t, c) {
  return t && F(e.prototype, t), c && F(e, c), e;
}
function D(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && K(e, t);
}
function K(e, t) {
  return K = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, K(e, t);
}
function U(e) {
  var t = W();
  return function () {
    var c,
      n = G(e);
    if (t) {
      var r = G(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return B(this, c);
  };
}
function B(e, t) {
  return !t || "object" !== x(t) && "function" !== typeof t ? q(e) : t;
}
function q(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function W() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function G(e) {
  return G = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, G(e);
}
var Y = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  Q = function (e) {
    D(c, e);
    var t = U(c);
    function c(e) {
      var r;
      return A(this, c), r = t.call(this, e), r.cancelValue = function (e) {
        r.setState(function (t) {
          var c = t.registeredValues;
          return {
            registeredValues: c.filter(function (t) {
              return t !== e;
            })
          };
        });
      }, r.registerValue = function (e) {
        r.setState(function (t) {
          var c = t.registeredValues;
          return {
            registeredValues: [].concat(P(c), [e])
          };
        });
      }, r.toggleOption = function (e) {
        var t = r.state.registeredValues,
          c = r.state.value.indexOf(e.value),
          n = P(r.state.value);
        -1 === c ? n.push(e.value) : n.splice(c, 1), "value" in r.props || r.setState({
          value: n
        });
        var o = r.props.onChange;
        if (o) {
          var a = r.getOptions();
          o(n.filter(function (e) {
            return -1 !== t.indexOf(e);
          }).sort(function (e, t) {
            var c = a.findIndex(function (t) {
                return t.value === e;
              }),
              n = a.findIndex(function (e) {
                return e.value === t;
              });
            return c - n;
          }));
        }
      }, r.renderGroup = function (e) {
        var t = e.getPrefixCls,
          c = q(r),
          o = c.props,
          a = c.state,
          i = o.prefixCls,
          u = o.className,
          s = o.style,
          h = o.options,
          f = Y(o, ["prefixCls", "className", "style", "options"]),
          p = t("checkbox", i),
          v = "".concat(p, "-group"),
          m = Object(k["a"])(f, ["children", "defaultValue", "value", "onChange", "disabled"]),
          d = o.children;
        h && h.length > 0 && (d = r.getOptions().map(function (e) {
          return n["createElement"](L, {
            prefixCls: p,
            key: e.value.toString(),
            disabled: "disabled" in e ? e.disabled : o.disabled,
            value: e.value,
            checked: -1 !== a.value.indexOf(e.value),
            onChange: e.onChange,
            className: "".concat(v, "-item")
          }, e.label);
        }));
        var y = l()(v, u);
        return n["createElement"]("div", E({
          className: y,
          style: s
        }, m), d);
      }, r.state = {
        value: e.value || e.defaultValue || [],
        registeredValues: []
      }, r;
    }
    return I(c, [{
      key: "getChildContext",
      value: function () {
        return {
          checkboxGroup: {
            toggleOption: this.toggleOption,
            value: this.state.value,
            disabled: this.props.disabled,
            name: this.props.name,
            registerValue: this.registerValue,
            cancelValue: this.cancelValue
          }
        };
      }
    }, {
      key: "shouldComponentUpdate",
      value: function (e, t) {
        return !s()(this.props, e) || !s()(this.state, t);
      }
    }, {
      key: "getOptions",
      value: function () {
        var e = this.props.options;
        return e.map(function (e) {
          return "string" === typeof e ? {
            label: e,
            value: e
          } : e;
        });
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](h["a"], null, this.renderGroup);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e) {
        return "value" in e ? {
          value: e.value || []
        } : null;
      }
    }]), c;
  }(n["Component"]);
Q.defaultProps = {
  options: []
}, Q.propTypes = {
  defaultValue: r["array"],
  value: r["array"],
  options: r["array"].isRequired,
  onChange: r["func"]
}, Q.childContextTypes = {
  checkboxGroup: r["any"]
}, Object(o["polyfill"])(Q);
var X = Q;
L.Group = X;
legacyExports["a"] = L;
