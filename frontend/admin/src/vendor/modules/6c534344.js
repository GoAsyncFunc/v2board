let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./476f7951.js"),
  o = "[object AsyncFunction]",
  a = "[object Function]",
  s = "[object GeneratorFunction]",
  l = "[object Proxy]";
function u(e) {
  if (!i(e)) return !1;
  var t = r(e);
  return t == a || t == s || t == o || t == l;
}
legacyModule.exports = u;
