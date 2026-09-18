let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? r(Object(n), !0).forEach(function (t) {
      o(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a,
  s = require("./4a525065.js"),
  l = require("./75637430.js");
function c(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
    n = window,
    r = n.g_langSeparator,
    i = void 0 === r ? "-" : r,
    o = new RegExp("^([a-z]{2})".concat(i, "?([A-Z]{2})?$"));
  if (void 0 !== e && !o.test(e)) throw new Error("setLocale lang format error");
  if (u() !== e && (window.g_lang = e, window.localStorage.setItem("umi_locale", e || ""), a && !t && a.reloadAppLocale(), t && window.location.reload(), window.dispatchEvent)) {
    var s = new Event("languagechange");
    window.dispatchEvent(s);
  }
}
function u() {
  var e = window,
    t = e.g_langSeparator,
    n = void 0 === t ? "-" : t,
    r = e.g_lang,
    i = "undefined" !== typeof localStorage ? window.localStorage.getItem("umi_locale") : "",
    o = "undefined" !== typeof navigator && "string" === typeof navigator.language,
    a = o ? navigator.language.split("-").join(n) : "";
  return i || r || a;
}
var h,
  f = l({
    lang: u()
  }),
  d = {};
function p(e) {
  h = e;
}
function m(e) {
  a = e;
}
["formatMessage", "formatHTMLMessage", "formatDate", "formatTime", "formatRelative", "formatNumber", "formatPlural", "LangContext", "now", "onError"].forEach(function (e) {
  d[e] = function () {
    var t;
    return h && h[e] ? (t = h[e]).call.apply(t, [h].concat(Array.prototype.slice.call(arguments))) : (console && console.warn && console.warn("[umi-plugin-locale] ".concat(e, " not initialized yet, you should use it after react app mounted.")), null);
  };
}), legacyModule.exports = i({}, s, {}, d, {
  setLocale: c,
  getLocale: u,
  _setIntlObject: p,
  LangContext: f,
  _setLocaleContext: m
});
