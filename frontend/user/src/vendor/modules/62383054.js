let legacyModule = module,
  legacyExports = exports;
var r = require("./baseTimes.js"),
  i = require("./isArgumentsLegacy.js"),
  a = require("./isArray.js"),
  o = require("./isBufferCompat.js"),
  u = require("./isIndexWithinLength.js"),
  l = require("./isTypedArray.js"),
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
