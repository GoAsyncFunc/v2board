let legacyModule = module,
  legacyExports = exports;
var r = require("./554e692f.js"),
  i = require("./3033412b.js"),
  a = require("./5a30636d.js"),
  o = require("./44535245.js"),
  u = require("./774a6737.js"),
  l = require("./63367747.js"),
  s = Object.prototype,
  c = s.hasOwnProperty;
function f(e, t) {
  var n = a(e),
    s = !n && i(e),
    f = !n && !s && o(e),
    d = !n && !s && !f && l(e),
    h = n || s || f || d,
    p = h ? r(e.length, String) : [],
    m = p.length;
  for (var v in e) !t && !c.call(e, v) || h && ("length" == v || f && ("offset" == v || "parent" == v) || d && ("buffer" == v || "byteLength" == v || "byteOffset" == v) || u(v, m)) || p.push(v);
  return p;
}
legacyModule.exports = f;
