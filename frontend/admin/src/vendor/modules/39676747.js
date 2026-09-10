let legacyModule = module,
  legacyExports = exports;
var r = require("./5a30636d.js"),
  i = require("./2f396161.js"),
  o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  a = /^\w*$/;
function s(e, t) {
  if (r(e)) return !1;
  var n = typeof e;
  return !("number" != n && "symbol" != n && "boolean" != n && null != e && !i(e)) || a.test(e) || !o.test(e) || null != t && e in Object(t);
}
legacyModule.exports = s;
