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
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? r(Object(n), !0).forEach(function (t) {
      i(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function i(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a,
  s = require("./4a525065.js"),
  c = require("./75637430.js");
function u(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
    n = window,
    r = n.g_langSeparator,
    o = void 0 === r ? "-" : r,
    i = new RegExp("^([a-z]{2})".concat(o, "?([A-Z]{2})?$"));
  if (void 0 !== e && !i.test(e)) throw new Error("setLocale lang format error");
  if (l() !== e && (window.g_lang = e, window.localStorage.setItem("umi_locale", e || ""), a && !t && a.reloadAppLocale(), t && window.location.reload(), window.dispatchEvent)) {
    var s = new Event("languagechange");
    window.dispatchEvent(s);
  }
}
function l() {
  var e = window,
    t = e.g_langSeparator,
    n = void 0 === t ? "-" : t,
    r = e.g_lang,
    o = "undefined" !== typeof localStorage ? window.localStorage.getItem("umi_locale") : "",
    i = "undefined" !== typeof navigator && "string" === typeof navigator.language,
    a = i ? navigator.language.split("-").join(n) : "";
  return o || r || a;
}
var f,
  p = c({
    lang: l()
  }),
  d = {};
function h(e) {
  f = e;
}
function m(e) {
  a = e;
}
["formatMessage", "formatHTMLMessage", "formatDate", "formatTime", "formatRelative", "formatNumber", "formatPlural", "LangContext", "now", "onError"].forEach(function (e) {
  d[e] = function () {
    var t;
    return f && f[e] ? (t = f[e]).call.apply(t, [f].concat(Array.prototype.slice.call(arguments))) : (console && console.warn && console.warn("[umi-plugin-locale] ".concat(e, " not initialized yet, you should use it after react app mounted.")), null);
  };
}), legacyModule.exports = o({}, s, {}, d, {
  setLocale: u,
  getLocale: l,
  _setIntlObject: h,
  LangContext: p,
  _setLocaleContext: m
});
