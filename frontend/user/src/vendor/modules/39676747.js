let legacyModule = module,
  legacyExports = exports;
var r = require("./isArray.js"),
  i = require("./isSymbol.js"),
  a = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  o = /^\w*$/;
function u(e, t) {
  if (r(e)) return !1;
  var n = typeof e;
  return !("number" != n && "symbol" != n && "boolean" != n && null != e && !i(e)) || o.test(e) || !a.test(e) || null != t && e in Object(t);
}
legacyModule.exports = u;
