let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return C;
});
var n = require("./reactRuntime.js"),
  r = require("./reactLifecyclesCompat.js"),
  o = require("./classNames.js"),
  l = interopDefault(o),
  a = require("../Icon.js"),
  i = require("./43575167.js"),
  u = require("./6d682f6c.js");
function s(e) {
  "@babel/helpers - typeof";

  return s = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, s(e);
}
function h(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function f(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function v(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function p(e, t, c) {
  return t && v(e.prototype, t), c && v(e, c), e;
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
function z(e) {
  var t = M();
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
  return !t || "object" !== s(t) && "function" !== typeof t ? b(e) : t;
}
function b(e) {
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
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
var H = Object(i["a"])("text", "input");
function C(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
var V = function (e) {
  m(c, e);
  var t = z(c);
  function c() {
    return f(this, c), t.apply(this, arguments);
  }
  return p(c, [{
    key: "renderClearIcon",
    value: function (e) {
      var t = this.props,
        c = t.allowClear,
        r = t.value,
        o = t.disabled,
        l = t.readOnly,
        i = t.inputType,
        u = t.handleReset;
      if (!c || o || l || void 0 === r || null === r || "" === r) return null;
      var s = i === H[0] ? "".concat(e, "-textarea-clear-icon") : "".concat(e, "-clear-icon");
      return n["createElement"](a["a"], {
        type: "close-circle",
        theme: "filled",
        onClick: u,
        className: s,
        role: "button"
      });
    }
  }, {
    key: "renderSuffix",
    value: function (e) {
      var t = this.props,
        c = t.suffix,
        r = t.allowClear;
      return c || r ? n["createElement"]("span", {
        className: "".concat(e, "-suffix")
      }, this.renderClearIcon(e), c) : null;
    }
  }, {
    key: "renderLabeledIcon",
    value: function (e, t) {
      var c,
        r = this.props,
        o = this.renderSuffix(e);
      if (!C(r)) return n["cloneElement"](t, {
        value: r.value
      });
      var a = r.prefix ? n["createElement"]("span", {
          className: "".concat(e, "-prefix")
        }, r.prefix) : null,
        i = l()(r.className, "".concat(e, "-affix-wrapper"), (c = {}, h(c, "".concat(e, "-affix-wrapper-sm"), "small" === r.size), h(c, "".concat(e, "-affix-wrapper-lg"), "large" === r.size), h(c, "".concat(e, "-affix-wrapper-input-with-clear-btn"), r.suffix && r.allowClear && this.props.value), c));
      return n["createElement"]("span", {
        className: i,
        style: r.style
      }, a, n["cloneElement"](t, {
        style: null,
        value: r.value,
        className: Object(u["c"])(e, r.size, r.disabled)
      }), o);
    }
  }, {
    key: "renderInputWithLabel",
    value: function (e, t) {
      var c,
        r = this.props,
        o = r.addonBefore,
        a = r.addonAfter,
        i = r.style,
        u = r.size,
        s = r.className;
      if (!o && !a) return t;
      var f = "".concat(e, "-group"),
        v = "".concat(f, "-addon"),
        p = o ? n["createElement"]("span", {
          className: v
        }, o) : null,
        m = a ? n["createElement"]("span", {
          className: v
        }, a) : null,
        d = l()("".concat(e, "-wrapper"), h({}, f, o || a)),
        z = l()(s, "".concat(e, "-group-wrapper"), (c = {}, h(c, "".concat(e, "-group-wrapper-sm"), "small" === u), h(c, "".concat(e, "-group-wrapper-lg"), "large" === u), c));
      return n["createElement"]("span", {
        className: z,
        style: i
      }, n["createElement"]("span", {
        className: d
      }, p, n["cloneElement"](t, {
        style: null
      }), m));
    }
  }, {
    key: "renderTextAreaWithClearIcon",
    value: function (e, t) {
      var c = this.props,
        r = c.value,
        o = c.allowClear,
        a = c.className,
        i = c.style;
      if (!o) return n["cloneElement"](t, {
        value: r
      });
      var u = l()(a, "".concat(e, "-affix-wrapper"), "".concat(e, "-affix-wrapper-textarea-with-clear-btn"));
      return n["createElement"]("span", {
        className: u,
        style: i
      }, n["cloneElement"](t, {
        style: null,
        value: r
      }), this.renderClearIcon(e));
    }
  }, {
    key: "renderClearableLabeledInput",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        c = e.inputType,
        n = e.element;
      return c === H[0] ? this.renderTextAreaWithClearIcon(t, n) : this.renderInputWithLabel(t, this.renderLabeledIcon(t, n));
    }
  }, {
    key: "render",
    value: function () {
      return this.renderClearableLabeledInput();
    }
  }]), c;
}(n["Component"]);
Object(r["polyfill"])(V), legacyExports["a"] = V;
