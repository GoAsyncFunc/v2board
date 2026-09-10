let legacyModule = module,
  legacyExports = exports;
var r = require("./4d725064.js"),
  i = require("./6879706f.js");
function a(e, t, n, a) {
  var o = !n;
  n || (n = {});
  var u = -1,
    l = t.length;
  while (++u < l) {
    var s = t[u],
      c = a ? a(n[s], e[s], s, n, e) : void 0;
    void 0 === c && (c = e[s]), o ? i(n, s, c) : r(n, s, c);
  }
  return n;
}
legacyModule.exports = a;
