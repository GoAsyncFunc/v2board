let legacyModule = module,
  legacyExports = exports;
var r = Object.getOwnPropertySymbols,
  o = Object.prototype.hasOwnProperty,
  i = Object.prototype.propertyIsEnumerable;
function a(e) {
  if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(e);
}
function s() {
  try {
    if (!Object.assign) return !1;
    var e = new String("abc");
    if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
    for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
    var r = Object.getOwnPropertyNames(t).map(function (e) {
      return t[e];
    });
    if ("0123456789" !== r.join("")) return !1;
    var o = {};
    return "abcdefghijklmnopqrst".split("").forEach(function (e) {
      o[e] = e;
    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("");
  } catch (e) {
    return !1;
  }
}
legacyModule.exports = s() ? Object.assign : function (e, t) {
  for (var n, s, c = a(e), u = 1; u < arguments.length; u++) {
    for (var l in n = Object(arguments[u]), n) o.call(n, l) && (c[l] = n[l]);
    if (r) {
      s = r(n);
      for (var f = 0; f < s.length; f++) i.call(n, s[f]) && (c[s[f]] = n[s[f]]);
    }
  }
  return c;
};
