let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./476f7951.js"),
  a = "[object AsyncFunction]",
  o = "[object Function]",
  u = "[object GeneratorFunction]",
  l = "[object Proxy]";
function s(e) {
  if (!i(e)) return !1;
  var t = r(e);
  return t == o || t == u || t == a || t == l;
}
legacyModule.exports = s;
