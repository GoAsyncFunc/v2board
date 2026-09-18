let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
  return typeof e;
} : function (e) {
  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
function o(e, t) {
  if (e === t) return !0;
  if (null == e || null == t) return !1;
  if (Array.isArray(e)) return Array.isArray(t) && e.length === t.length && e.every(function (e, n) {
    return o(e, t[n]);
  });
  var n = "undefined" === typeof e ? "undefined" : r(e),
    i = "undefined" === typeof t ? "undefined" : r(t);
  if (n !== i) return !1;
  if ("object" === n) {
    var a = e.valueOf(),
      s = t.valueOf();
    if (a !== e || s !== t) return o(a, s);
    var c = Object.keys(e),
      u = Object.keys(t);
    return c.length === u.length && c.every(function (n) {
      return o(e[n], t[n]);
    });
  }
  return !1;
}
legacyExports["default"] = o;
