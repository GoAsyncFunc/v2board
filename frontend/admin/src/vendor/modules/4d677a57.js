let legacyModule = module,
  legacyExports = exports;
var r = Object.getOwnPropertySymbols,
  i = Object.prototype.hasOwnProperty,
  o = Object.prototype.propertyIsEnumerable;
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
    var i = {};
    return "abcdefghijklmnopqrst".split("").forEach(function (e) {
      i[e] = e;
    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("");
  } catch (e) {
    return !1;
  }
}
legacyModule.exports = s() ? Object.assign : function (e, t) {
  for (var n, s, l = a(e), c = 1; c < arguments.length; c++) {
    for (var u in n = Object(arguments[c]), n) i.call(n, u) && (l[u] = n[u]);
    if (r) {
      s = r(n);
      for (var h = 0; h < s.length; h++) o.call(n, s[h]) && (l[s[h]] = n[s[h]]);
    }
  }
  return l;
};
