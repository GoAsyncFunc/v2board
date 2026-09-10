let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./31377839.js"),
  o = require("./5a76705a.js"),
  a = o["a"];
function l(e) {
  "@babel/helpers - typeof";

  return l = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, l(e);
}
function i() {
  return i = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, i.apply(this, arguments);
}
function u(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function s(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function h(e, t, c) {
  return t && s(e.prototype, t), c && s(e, c), e;
}
function f(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && p(e, t);
}
function p(e, t) {
  return p = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, p(e, t);
}
function v(e) {
  var t = y();
  return function () {
    var c,
      n = b(e);
    if (t) {
      var r = b(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return m(this, c);
  };
}
function m(e, t) {
  return !t || "object" !== l(t) && "function" !== typeof t ? d(e) : t;
}
function d(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function b(e) {
  return b = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, b(e);
}
defineExport(legacyExports, "a", function () {
  return z;
});
var z = function (e) {
  f(c, e);
  var t = v(c);
  function c() {
    return u(this, c), t.apply(this, arguments);
  }
  return h(c, [{
    key: "getLocale",
    value: function () {
      var e = this.props,
        t = e.componentName,
        c = e.defaultLocale,
        n = c || a[t || "global"],
        r = this.context.antLocale,
        o = t && r ? r[t] : {};
      return i(i({}, "function" === typeof n ? n() : n), o || {});
    }
  }, {
    key: "getLocaleCode",
    value: function () {
      var e = this.context.antLocale,
        t = e && e.locale;
      return e && e.exist && !t ? a.locale : t;
    }
  }, {
    key: "render",
    value: function () {
      return this.props.children(this.getLocale(), this.getLocaleCode(), this.context.antLocale);
    }
  }]), c;
}(n["Component"]);
z.defaultProps = {
  componentName: "global"
}, z.contextTypes = {
  antLocale: r["object"]
};
