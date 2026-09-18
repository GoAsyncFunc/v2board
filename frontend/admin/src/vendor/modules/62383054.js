let legacyModule = module,
  legacyExports = exports;
var r = require("./554e692f.js"),
  i = require("./3033412b.js"),
  o = require("./isArray.js"),
  a = require("./44535245.js"),
  s = require("./774a6737.js"),
  l = require("./63367747.js"),
  u = Object.prototype,
  c = u.hasOwnProperty;
function f(e, t) {
  var n = o(e),
    u = !n && i(e),
    f = !n && !u && a(e),
    d = !n && !u && !f && l(e),
    h = n || u || f || d,
    p = h ? r(e.length, String) : [],
    g = p.length;
  for (var m in e) !t && !c.call(e, m) || h && ("length" == m || f && ("offset" == m || "parent" == m) || d && ("buffer" == m || "byteLength" == m || "byteOffset" == m) || s(m, g)) || p.push(m);
  return p;
}
legacyModule.exports = f;
