let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./31377839.js"),
  o = require("./momentRuntime.js");
function l(e) {
  return e["default"] || e;
}
var a = require("./756c3562.js"),
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
function v(e, t, c) {
  return t && f(e.prototype, t), c && f(e, c), e;
}
function p(e, t) {
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
  var t = b();
  return function () {
    var c,
      n = M(e);
    if (t) {
      var r = M(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return z(this, c);
  };
}
function z(e, t) {
  return !t || "object" !== u(t) && "function" !== typeof t ? y(e) : t;
}
function y(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function b() {
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
defineExport(legacyExports, "a", function () {
  return g;
}), defineExport(legacyExports, "b", function () {
  return C;
});
var g = "internalMark";
function H(e) {
  e && e.locale ? l(o).locale(e.locale) : l(o).locale("en");
}
var C = function (e) {
  p(c, e);
  var t = d(c);
  function c(e) {
    var n;
    return h(this, c), n = t.call(this, e), H(e.locale), Object(a["a"])(e.locale && e.locale.Modal), Object(i["a"])(e._ANT_MARK__ === g, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale"), n;
  }
  return v(c, [{
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
      e.locale !== t && (H(t), Object(a["a"])(t && t.Modal));
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      Object(a["a"])();
    }
  }, {
    key: "render",
    value: function () {
      return this.props.children;
    }
  }]), c;
}(n["Component"]);
C.propTypes = {
  locale: r["object"]
}, C.defaultProps = {
  locale: {}
}, C.childContextTypes = {
  antLocale: r["object"]
};
