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
function i(e, t) {
  if (e === t) return !0;
  if (null == e || null == t) return !1;
  if (Array.isArray(e)) return Array.isArray(t) && e.length === t.length && e.every(function (e, n) {
    return i(e, t[n]);
  });
  var n = "undefined" === typeof e ? "undefined" : r(e),
    o = "undefined" === typeof t ? "undefined" : r(t);
  if (n !== o) return !1;
  if ("object" === n) {
    var a = e.valueOf(),
      s = t.valueOf();
    if (a !== e || s !== t) return i(a, s);
    var l = Object.keys(e),
      c = Object.keys(t);
    return l.length === c.length && l.every(function (n) {
      return i(e[n], t[n]);
    });
  }
  return !1;
}
legacyExports["default"] = i;
