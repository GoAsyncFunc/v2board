let legacyModule = module,
  legacyExports = exports;
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./momentRuntime.js"),
  a = require("./interopDefault.js"),
  l = require("./756c3562.js"),
  i = require("./36436658.js");
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
var M = "internalMark";
function C(e) {
  e && e.locale ? Object(a["a"])(o).locale(e.locale) : Object(a["a"])(o).locale("en");
}
var H = function (e) {
  v(c, e);
  var t = d(c);
  function c(e) {
    var n;
    return h(this, c), n = t.call(this, e), C(e.locale), Object(l["a"])(e.locale && e.locale.Modal), Object(i["a"])(e._ANT_MARK__ === M, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale"), n;
  }
  return p(c, [{
    key: "getChildContext",
    value: function () {
      return {
        antLocale: s(s({}, this.props.locale), {
          exist: !0
        })
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = this.props.locale;
      e.locale !== t && (C(t), Object(l["a"])(t && t.Modal));
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      Object(l["a"])();
    }
  }, {
    key: "render",
    value: function () {
      return this.props.children;
    }
  }]), c;
}(n["Component"]);
H.propTypes = {
  locale: r["object"]
}, H.defaultProps = {
  locale: {}
}, H.childContextTypes = {
  antLocale: r["object"]
};
var O = require("./594d6e48.js"),
  V = require("./48383455.js");
function w(e) {
  "@babel/helpers - typeof";

  return w = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, w(e);
}
function S() {
  return S = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, S.apply(this, arguments);
}
function L(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function k(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function x(e, t, c) {
  return t && k(e.prototype, t), c && k(e, c), e;
}
function E(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && P(e, t);
}
function P(e, t) {
  return P = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, P(e, t);
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
    return j(this, c);
  };
}
function j(e, t) {
  return !t || "object" !== w(t) && "function" !== typeof t ? N(e) : t;
}
function N(e) {
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
var A = function (e) {
  E(c, e);
  var t = T(c);
  function c() {
    var e;
    return L(this, c), e = t.apply(this, arguments), e.getPrefixCls = function (t, c) {
      var n = e.props.prefixCls,
        r = void 0 === n ? "ant" : n;
      return c || (t ? "".concat(r, "-").concat(t) : r);
    }, e.renderProvider = function (t, c) {
      var r = e.props,
        o = r.children,
        a = r.getPopupContainer,
        l = r.renderEmpty,
        i = r.csp,
        u = r.autoInsertSpaceInButton,
        s = r.locale,
        h = r.pageHeader,
        f = S(S({}, t), {
          getPrefixCls: e.getPrefixCls,
          csp: i,
          autoInsertSpaceInButton: u
        });
      return a && (f.getPopupContainer = a), l && (f.renderEmpty = l), h && (f.pageHeader = h), n["createElement"](V["b"].Provider, {
        value: f
      }, n["createElement"](H, {
        locale: s || c,
        _ANT_MARK__: M
      }, o));
    }, e;
  }
  return x(c, [{
    key: "render",
    value: function () {
      var e = this;
      return n["createElement"](O["a"], null, function (t, c, r) {
        return n["createElement"](V["a"], null, function (t) {
          return e.renderProvider(t, r);
        });
      });
    }
  }]), c;
}(n["Component"]);
legacyExports["a"] = A;
