let legacyModule = module,
  legacyExports = exports;
var r = require("./6c6a684e.js"),
  i = require("./4d4d6d44.js"),
  o = require("./774a6737.js"),
  a = require("./476f7951.js");
function s(e, t, n) {
  if (!a(n)) return !1;
  var s = typeof t;
  return !!("number" == s ? i(n) && o(t, n.length) : "string" == s && t in n) && r(n[t], e);
}
legacyModule.exports = s;
