let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return L;
}), defineExport(legacyExports, "d", function () {
  return S;
}), defineExport(legacyExports, "c", function () {
  return k;
});
var n = require("./reactRuntime.js"),
  r = require("./31377839.js"),
  o = require("./reactLifecyclesCompat.js"),
  l = require("./classNames.js"),
  a = interopDefault(l),
  i = require("./4247522b.js"),
  u = require("./43575167.js"),
  s = require("./4c6c5235.js"),
  h = require("./48383455.js"),
  f = require("./36436658.js");
function v(e) {
  "@babel/helpers - typeof";

  return v = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, v(e);
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
function m(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function d(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function z(e, t, c) {
  return t && d(e.prototype, t), c && d(e, c), e;
}
function y(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && b(e, t);
}
function b(e, t) {
  return b = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, b(e, t);
}
function M(e) {
  var t = C();
  return function () {
    var c,
      n = V(e);
    if (t) {
      var r = V(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return g(this, c);
  };
}
function g(e, t) {
  return !t || "object" !== v(t) && "function" !== typeof t ? H(e) : t;
}
function H(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function C() {
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
function O(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
var w = Object(u["a"])("small", "default", "large");
function L(e) {
  return "undefined" === typeof e || null === e ? "" : e;
}
function S(e, t, c) {
  if (c) {
    var n = t;
    if ("click" === t.type) {
      n = Object.create(t), n.target = e, n.currentTarget = e;
      var r = e.value;
      return e.value = "", c(n), void (e.value = r);
    }
    c(n);
  }
}
function k(e, t, c) {
  var n;
  return a()(e, (n = {}, O(n, "".concat(e, "-sm"), "small" === t), O(n, "".concat(e, "-lg"), "large" === t), O(n, "".concat(e, "-disabled"), c), n));
}
var E = function (e) {
  y(c, e);
  var t = M(c);
  function c(e) {
    var r;
    m(this, c), r = t.call(this, e), r.saveClearableInput = function (e) {
      r.clearableInput = e;
    }, r.saveInput = function (e) {
      r.input = e;
    }, r.handleReset = function (e) {
      r.setValue("", function () {
        r.focus();
      }), S(r.input, e, r.props.onChange);
    }, r.renderInput = function (e) {
      var t = r.props,
        c = t.className,
        o = t.addonBefore,
        l = t.addonAfter,
        u = t.size,
        s = t.disabled,
        h = Object(i["a"])(r.props, ["prefixCls", "onPressEnter", "addonBefore", "addonAfter", "prefix", "suffix", "allowClear", "defaultValue", "size", "inputType"]);
      return n["createElement"]("input", p({}, h, {
        onChange: r.handleChange,
        onKeyDown: r.handleKeyDown,
        className: a()(k(e, u, s), O({}, c, c && !o && !l)),
        ref: r.saveInput
      }));
    }, r.clearPasswordValueAttribute = function () {
      r.removePasswordTimeout = setTimeout(function () {
        r.input && "password" === r.input.getAttribute("type") && r.input.hasAttribute("value") && r.input.removeAttribute("value");
      });
    }, r.handleChange = function (e) {
      r.setValue(e.target.value, r.clearPasswordValueAttribute), S(r.input, e, r.props.onChange);
    }, r.handleKeyDown = function (e) {
      var t = r.props,
        c = t.onPressEnter,
        n = t.onKeyDown;
      13 === e.keyCode && c && c(e), n && n(e);
    }, r.renderComponent = function (e) {
      var t = e.getPrefixCls,
        c = r.state.value,
        o = r.props.prefixCls,
        l = t("input", o);
      return n["createElement"](s["a"], p({}, r.props, {
        prefixCls: l,
        inputType: "input",
        value: L(c),
        element: r.renderInput(l),
        handleReset: r.handleReset,
        ref: r.saveClearableInput
      }));
    };
    var o = "undefined" === typeof e.value ? e.defaultValue : e.value;
    return r.state = {
      value: o
    }, r;
  }
  return z(c, [{
    key: "componentDidMount",
    value: function () {
      this.clearPasswordValueAttribute();
    }
  }, {
    key: "componentDidUpdate",
    value: function () {}
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function (e) {
      return Object(s["b"])(e) !== Object(s["b"])(this.props) && Object(f["a"])(this.input !== document.activeElement, "Input", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), null;
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.removePasswordTimeout && clearTimeout(this.removePasswordTimeout);
    }
  }, {
    key: "focus",
    value: function () {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function () {
      this.input.blur();
    }
  }, {
    key: "select",
    value: function () {
      this.input.select();
    }
  }, {
    key: "setValue",
    value: function (e, t) {
      "value" in this.props || this.setState({
        value: e
      }, t);
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](h["a"], null, this.renderComponent);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e) {
      return "value" in e ? {
        value: e.value
      } : null;
    }
  }]), c;
}(n["Component"]);
E.defaultProps = {
  type: "text"
}, E.propTypes = {
  type: r["string"],
  id: r["string"],
  size: r["oneOf"](w),
  maxLength: r["number"],
  disabled: r["bool"],
  value: r["any"],
  defaultValue: r["any"],
  className: r["string"],
  addonBefore: r["node"],
  addonAfter: r["node"],
  prefixCls: r["string"],
  onPressEnter: r["func"],
  onKeyDown: r["func"],
  onKeyUp: r["func"],
  onFocus: r["func"],
  onBlur: r["func"],
  prefix: r["node"],
  suffix: r["node"],
  allowClear: r["bool"]
}, Object(o["polyfill"])(E), legacyExports["a"] = E;
