let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "configConsumerProps", function () {
  return b;
});
var n = require("./71317449.js"),
  r = require("./4d522f38.js"),
  o = require("./594d6e48.js"),
  l = require("./48383455.js");
function a(e) {
  "@babel/helpers - typeof";

  return a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, a(e);
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
  }), t && v(e, t);
}
function v(e, t) {
  return v = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, v(e, t);
}
function p(e) {
  var t = z();
  return function () {
    var c,
      n = y(e);
    if (t) {
      var r = y(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return m(this, c);
  };
}
function m(e, t) {
  return !t || "object" !== a(t) && "function" !== typeof t ? d(e) : t;
}
function d(e) {
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
function y(e) {
  return y = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, y(e);
}
defineExport(legacyExports, "ConfigConsumer", function () {
  return l["a"];
});
var b = ["getPopupContainer", "rootPrefixCls", "getPrefixCls", "renderEmpty", "csp", "autoInsertSpaceInButton", "locale", "pageHeader"],
  M = function (e) {
    f(c, e);
    var t = p(c);
    function c() {
      var e;
      return u(this, c), e = t.apply(this, arguments), e.getPrefixCls = function (t, c) {
        var n = e.props.prefixCls,
          r = void 0 === n ? "ant" : n;
        return c || (t ? "".concat(r, "-").concat(t) : r);
      }, e.renderProvider = function (t, c) {
        var o = e.props,
          a = o.children,
          u = o.getPopupContainer,
          s = o.renderEmpty,
          h = o.csp,
          f = o.autoInsertSpaceInButton,
          v = o.locale,
          p = o.pageHeader,
          m = i(i({}, t), {
            getPrefixCls: e.getPrefixCls,
            csp: h,
            autoInsertSpaceInButton: f
          });
        return u && (m.getPopupContainer = u), s && (m.renderEmpty = s), p && (m.pageHeader = p), n["createElement"](l["b"].Provider, {
          value: m
        }, n["createElement"](r["b"], {
          locale: v || c,
          _ANT_MARK__: r["a"]
        }, a));
      }, e;
    }
    return h(c, [{
      key: "render",
      value: function () {
        var e = this;
        return n["createElement"](o["a"], null, function (t, c, r) {
          return n["createElement"](l["a"], null, function (t) {
            return e.renderProvider(t, r);
          });
        });
      }
    }]), c;
  }(n["Component"]);
legacyExports["default"] = M;
